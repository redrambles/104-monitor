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
    console.log("==========================================");
    console.log(pulls.length + " open pull requests.");
    console.log("==========================================");

    pulls.forEach((pullNumber) => {
        var individualPull = `https://api.github.com/repos/skillcrush/skillcrush-104/pulls/${pullNumber}`;

        axios.get(individualPull).then((response) => {
             var mergeable = response.data.mergeable ? "are mergeable" : "are not mergeable";
             var branchName = response.data.head.ref;
             var compareBase = "https://github.com/skillcrush/skillcrush-104/compare/master...";
             var branchLabel = response.data.head.label;
             let numFilesChanged = response.data.changed_files;
            if (response.data.comments === 0){
                console.log("***********************************************************");
                console.log(`Pull request ${pullNumber} has no comments. Needs feedback.`);
                console.log(`Branch name ${branchName}.`);
                console.log(`Number of files changed: ${numFilesChanged}`);
                console.log(`Compare changes here ${compareBase}${branchLabel}`);
                console.log("***********************************************************");
            } else {
                console.log(`Student repo: ${response.data.head.repo.full_name}`);
                console.log(`Branch name ${branchName}.`);
                console.log(`Compare changes here ${compareBase}${branchLabel}`);
                console.log(`Number of files changed: ${numFilesChanged}`);                
                console.log(`${response.data.changed_files} number of files changed. Changes ${mergeable}.`);
                console.log(`Comments: ${response.data.comments}`);
                console.log("---");
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