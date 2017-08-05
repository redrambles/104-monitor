const axios = require('axios');

var pullUrl = "https://api.github.com/repos/skillcrush/skillcrush-104/pulls";

axios.get(pullUrl).then((response) => {

    var pulls = [];  
    var data = response.data; 

    data.forEach((pull) => {
         if (pull.state === "open"){
            pulls.push(pull.number);
        }
    }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
             console.log('Unable to connect to API servers.');
        } else {
           console.log(e.message);
        }
    });

    console.log(pulls.length + " open pull requests.");

    pulls.forEach((pullNumber) => {
        var individualPull = `https://api.github.com/repos/skillcrush/skillcrush-104/pulls/${pullNumber}`;

        axios.get(individualPull).then((response) => {
            if (response.data.comments === 0){
                console.log(`Pull request ${pullNumber} has no comments.`);x
            }
        }).catch((e) => {
            if (e.code === 'ENOTFOUND') {
                console.log('Unable to connect to API servers.');
            } else {
            console.log(e.message);
            }
        });
    });
});