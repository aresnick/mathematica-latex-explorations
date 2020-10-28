# README

This is a small collection of examples of how one might use Mathematica to parse LaTeX in order to detect various characteristics of a mathematical expression (like degree).

These are somewhere between scratch work and proofs of concept.  They do not yet reflect a variety of edge cases, and was created as part of [the PBLL](https://www.notion.so/An-introduction-to-the-PBLL-624f34255da844228dc1276221d791c9), which was interested in attempting to automatically understand what kinds of mathematical ideas someone may be working with.

Each example conains a README with some context for the original problem or question.

## Toy functions

1. [`detectOrderOfTeXExpression`](toy-parsing-latex-order) — Explore how to extract the degree/order of an expression from its LaTeX representation .
2. [`deTeXify`](toy-detexify/README.md) — Parse a LaTeX expression (_e.g._ from a Desmos calculator) and attempt to disambiguate parentheses as implied multiplication from function calls.
