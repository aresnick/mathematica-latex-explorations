#!/usr/bin/env node

console.assert(
    process.argv.length == 3 &&
    process.argv[2].match(/^[a-z0-9]{10}$/) !== null,
    "Expected a ten character, lowercase hash, received " + process.argv.slice(2).join(" ")
    )
