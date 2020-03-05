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


} catch (error) {
    core.setFailed(error.message);
}