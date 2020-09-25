#!/usr/bin/env node

const fetch = require('node-fetch');

/* Check that we receive exactly one command line argument,
and that it is a ten character, lower case hash */
const validHash =
    process.argv.length == 3 &&
    process.argv[2].match(/^[a-z0-9]{10}$/) !== null;

console.assert(
    validHash,
    "Expected a ten character, lowercase hash, received " + process.argv.slice(2).join(" ")
);

// If we get a valid hash, assign it
if (validHash) {
    const hash = process.argv[2];;

    // Observed by inspecting network traffic on desmos.com/calculator when clicking Save
    const endpoints = {
        state: "https://saved-work.desmos.com/calc-states/production"
    };

    // Check our endpoints do not have trailing slashes
    const validEndpoints = Object.values(endpoints).every(v => v[v.length - 1] !== "/")
    console.assert(validEndpoints, "Endpoints cannot have trailing slashes, ", endpoints);

    // Construct and GET the state url
    async function getCalcState(hash) {
        const stateURL = [endpoints.state, hash].join('/')
        const response = await fetch(stateURL);
        const data = await response.json()
        return data;
    }

    getCalcState(hash)
        .then(data => console.log(data));
}