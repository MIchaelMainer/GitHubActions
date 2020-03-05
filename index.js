const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    const url = `https://api.github.com/repos/${core.getInput('repo')}/pulls`;
    console.log(`The url is: ${url}`);

    const url2 = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls`;
    var headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${core.getInput('repo-token')}`,
        "Accept": "application/json"
    }
    var data = {
        "title": "PR Title",
        "head": `${process.env.GITHUB_REF}`,
        "base": "master",
        "body": `This pull request was automatically created by the GitHub Action workflow **${process.env.GITHUB_WORKFLOW}**.`,
        "draft": false
    }
    console.log(`The url is: ${url2}`);
    console.log(`The headers: ${JSON.stringify(headers)}`);
    console.log(`The data: ${JSON.stringify(data)}`);

    fetch(url, { method: 'POST', headers: headers, body: data })
        .then((res) => {
            console.log(`The headers: ${JSON.stringify(res.headers)}`);
            return res.json()
        })
        .then((json) => {
            console.log(json);
            // Do something with the returned data.
        });

    fetch('https://api.github.com/repos/MIchaelMainer/GitHubActions/pulls')
        .then(response => response.json())
        .then(data => {
            console.log('Calling the PR api:');
            console.log(data);
        });


    getResponse = async () => {

        const url3 = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls`;

        const settings = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        const response = await fetch(url3, settings);
        console.log('Sent request');
        if (!response.ok) throw Error(response.message);
        try {
            const data = await response.json();
            console.log(`data: ${JSON.stringify(data)}`);
            return data;
        } catch (err) {
            throw err;
        }
    };

    console.log(`Response: ${JSON.stringify(getResponse)}`);

} catch (error) {
    core.setFailed(`error message: ${error.message}`);
}