# README

This is a small command-line node script which, provided the id from a Desmos share link, returns a JSON object of the collection of expressions, with the mathematical expressions enriched by parsing Desmos's internal LaTeX representation into MathML.  It was created as a demonstration to support explorations of how to parse mathematical work as part of the [PBLL](https://www.notion.so/An-introduction-to-the-PBLL-624f34255da844228dc1276221d791c9).

---

## Background

As far as I know, this is an undocumented API for Desmos.  I found it by observing network behavior when you save a calculator in Desmos.

When you save a blank calculator…
![Screenshot of empty Desmos calculator and the developer console](/media/empty-save.png)

When you save a calculator with `x^2`…
![Screenshot of Desmos calculator with a single x^2 and the developer console](/media/x2-save.png)

When you look at the GET request to the `stateURL`
![Screenshot of the GET request to the stateURL and the developer console](/media/calc-state-get.png)

When you save a calculator with multiple expressions…
![Screenshot of Desmos calculator with multiple expressions and the developer console](/media/multi-expression-save.png)

When you look at the prettified JSON for the `stateURL` for that multiple expression notebook…
![Screenshot of prettified JSON response from the state URL for a multiple expression notebook and the developer console](/media/multi-expression-save.png)

This is a very simple setup, and we use [`node-fetch`](https://github.com/node-fetch/node-fetch) to fetch and parse the JSON and [`mathjax-node`](https://github.com/mathjax/MathJax-node) to parse the LaTeX into [MathML](https://www.w3.org/Math/whatIsMathML.html).

## To use

1. Find or create a Desmos project.
2. "Share" the Desmos project by clicking the share button like this
    ![Image of share button in Desmos](/media/share-link.png)
3. Copy the link indicated, and extract the ten character ID, _e.g_ `yahb3wbmu0` from `https://www.desmos.com/calculator/yahb3wbmu0`)
4. `git clone` this repository and run `npm install` within the resulting folder.
5. Run `node mml-parse.js $ID`, where `$ID` is replaced with the ID you found in step 3.