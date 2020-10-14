# README

This is a small example of how one might use Mathematica to parse LaTeX expressions in order to detect various characteristics of a mathematical expression (like degree).  It does not yet reflect a variety of edge cases, and was created as part of [the PBLL](https://www.notion.so/An-introduction-to-the-PBLL-624f34255da844228dc1276221d791c9), which was interested in attempting to automatically understand what kinds of mathematical ideas someone may be working with.

Select excerpts from [the original Slack thread](https://pbllprojectteam.slack.com/archives/C015PKJ66DA/p1602251497112900) prompting its creation:

> A: […] here is a toy function demonstrating how you might approach parsing expressions in Mathematica.
> 
> A: Note that you can simply switch out `TeXForm` for others (including [MathML](https://www.w3.org/Math/), the "informal" form the [math.js examples](https://mathjs.org/docs/expressions/parsing.html) use, _etc._)
> 
> A: In terms of integration with the existing app, there are a few options for deployment:
> 
> * This function could be published as [an API](https://reference.wolfram.com/language/guide/CreatingAnInstantAPI.html) which the app could call.
> * This function could be called from the command line on a server _via_ [WolframScript](https://www.wolfram.com/wolframscript/).
> * You could compile this function to another language which Flutter (or whatever server environment) offered a FFI to.  _e.g._ in the JavaScript ecosystem, you could compile this to [WebAssembly](https://www.wolfram.com/language/12/code-compilation/create-machine-code-for-exotic-architectures.html?product=mathematica) (which I believe people have been able to integrate into Flutter as an FFI, [_e.g._](https://github.com/rodydavis/flutter_ffi_webassembly))
> 
> A: […] Generalized it a bit and added a missing edge case— Here's the revised code and test. […] Note there are a few questions to address as a matter of categorizing things appropriately… […] Some subtleties these and related examples raise:
> 
> * Is `e^x` exponential in `e` or constant or both?  How should multivariate expressions be handled (e.g. if e were a variable rather than constant?)
> * Is `(x+1)(x-1)` linear and quadratic or just quadratic?
> * Is `e^(x^2)` exponential in `x` or in `e`.  Quadratic?
> * For functions with shifting periods (e.g. sin(e^x) or sin(x^2)), should they be considered periodic?
> * How should expressions whose degree would change in simplification be handled?  e.g. `x/(x + 1) + x/(x - 1)` is ostensibly linear or hyperbolic, but reduced would be equal to `(2 x^2)/(-1 + x^2)`; should it be quadratic?
> 
> A: These are some of the kinds of questions which I think highlight the relatively poorly-posed conceptual nature of the "degree" question (aside from whether it is pedagogically useful).
> 
> A: So with that grain of salt, take this toy example more as an example of what parsing and heuristics with Mathematica might look like with LaTeX rather than a particular proposal for exactly how to categorize or define them—
> 
> B: Nice. I think we are less worried about identifying degree than in identifying model. We can’t get that definitively from the expressions, as you have pointed out. But we can make a decent guess perhaps. Some of the corner cases you identify would just be "complex" as far as Algebra 1 is concerned. So for a first version, it seems to me that you have solved it, if we can get Desmos (etc) entries into a form that fits your parser.
> 
> B: TBC, if we can feed a Desmos page into a function and get "Linear in x" out, we’re done for v0.1.
> 
> A: The function in that Mathematica notebook takes a LaTeX expression.  You can see what pulling the data from a Desmos calculator looks like [here](https://github.com/aresnick/get-desmos-mathml), and in [the state screenshot](https://github.com/aresnick/get-desmos-mathml/blob/master/media/calc-state-get.png) you can see that a JSON object representing the calculator includes a `latex` string, which would be the input to the Mathematica function defined above.  Unfortunately, Desmos's handling of LaTeX involves [some gotchas](http://chrislusto.com/desmos/working-with-expressions/#sect-latex-gotchas) which merit testing and checking.