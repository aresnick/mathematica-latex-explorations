#!/usr/bin/env node

const fetch = require('node-fetch');

const validHash =
    process.argv.length == 3 &&
    process.argv[2].match(/^[a-z0-9]{10}$/) !== null;

console.assert(
    validHash,
    "Expected a ten character, lowercase hash, received " + process.argv.slice(2).join(" ")
);

if (validHash) {
    const hash = process.argv[2];;

    const endpoints = {
        state: "https://saved-work.desmos.com/calc-states/production"
    };

    const validEndpoints = Object.values(endpoints).every(v => v[v.length - 1] !== "/")
    console.assert(validEndpoints, "Endpoints cannot have trailing slashes, ", endpoints);

    async function getCalcState(hash) {
        let stateURL = [endpoints.state, hash].join('/')
        let response = await fetch(stateURL);
        let data = await response.json()
        return data;
    }

    getCalcState(hash)
        .then(data => console.log(data));
}