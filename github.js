const axios = require('axios');

var pullUrl = "https://api.github.com/repos/skillcrush/skillcrush-104/pulls";

axios.get(pullUrl).then((response) => {

    var pulls = [];  
    var data = response.data; 

    data.forEach((pull) => {
         if (pull.state === "open"){
            pulls.push(pull.number);
        }
    });

    console.log(pulls.length + " open pull requests.");

    pulls.forEach((pullNumber) => {
        var individualPull = `https://api.github.com/repos/skillcrush/skillcrush-104/pulls/${pullNumber}`;

        axios.get(individualPull).then((response) => {
             var mergeable = response.data.mergeable ? "is mergeable" : "is not mergeable."
            if (response.data.comments === 0){
                console.log(`Pull request ${pullNumber} has no comments. Needs feedback.`);
            } else {
                console.log(`Student repo: ${response.data.head.repo.full_name}`);
                console.log(`${response.data.changed_files} number of files changed and ${mergeable}.`);
            }
        }).catch((e) => {
            if (e.code === 'ENOTFOUND') {
                console.log('Unable to connect to API servers.');
            } else {
            console.log(e.message);
            }
        });
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});