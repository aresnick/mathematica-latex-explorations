#!/usr/bin/env node

const fetch = require("node-fetch");
const mathjax = require("mathjax-node");
mathjax.config({
    MathJax: {
        // use the default MathJax configuration
    }
});
mathjax.start();  // Loads the configuration, per https://github.com/mathjax/MathJax-node#start


/* Check that we receive exactly one command line argument,
and that it is a ten character, lower case hash */
const validId =
    process.argv.length == 3 &&
    process.argv[2].match(/^[a-z0-9]{10}$/) !== null;

console.assert(
    validId,
    "Expected a ten character, lowercase id, received",
    process.argv.slice(2).join(" ")
);

// If we get a valid hash, assign it
if (validId) {
    const id = process.argv[2];;

    // Observed by inspecting network traffic 
    // on desmos.com/calculator when clicking Save
    const endpoints = {
        state: "https://saved-work.desmos.com/calc-states/production"
    };

    // Check our endpoints do not have trailing slashes
    const validEndpoints = Object.values(endpoints).every(v => v[v.length - 1] !== "/")
    console.assert(
        validEndpoints, 
        "Endpoints cannot have trailing slashes,", endpoints);

    // Construct and GET the state url
    async function getCalcState(id) {
        const stateURL = [endpoints.state, id].join('/')
        const response = await fetch(stateURL);
        const data = await response.json()
        return data;
    }

    async function addMathMLToCalcState(calcState) {
        // mathjax returns a promise; so we return a promise which 
        // will resolve when all mathjax promises resolve
        return Promise.all(
            // For all the expressions in the list
            calcState.expressions.list.map(async function(expression) {
                // Check if it's an expression, as opposed to text, etc.
                if (expression.type == "expression") {
                    // and then if it is, typeset as MathML 
                    // and add the result to a new key in the expression object
                    expression.mathml = await mathjax.typeset({
                        math: expression.latex,
                        format: "TeX",
                        mml: true
                    });
                }

                // return the object (non-expressions unchangd)
                return expression; 
            })
        );
    }

    // Get the state
    getCalcState(id)
        .then(function(state) {
            // Enrich with MathML
            addMathMLToCalcState(state)
            .then(mmledState => console.log(mmledState));
        });
}