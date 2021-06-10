<p align="center">
  <a href="https://github.com/nschloe/supercharge"><img alt="supercharge" src="https://nschloe.github.io/supercharge/logo-with-text.svg" width="60%"></a>
  <p align="center">LaTeX math wherever you want.</p>
</p>

[![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/ingbbliecffofmmokknelnijicfcgolb)](https://chrome.google.com/webstore/detail/supercharge/ingbbliecffofmmokknelnijicfcgolb)
[![chrome users](https://img.shields.io/chrome-web-store/users/ingbbliecffofmmokknelnijicfcgolb?label=Chrome%20users&logo=google-chrome&logoColor=white&style=flat-square)](https://chrome.google.com/webstore/detail/supercharge/ingbbliecffofmmokknelnijicfcgolb)

[![gh-actions](https://img.shields.io/github/workflow/status/nschloe/supercharge/ci?style=flat-square)](https://github.com/nschloe/supercharge/actions?query=workflow%3Aci)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Purple Pi is a browser extension for Google Chrome that renders LaTeX-style mathematics
on pages that don't otherwise support it. Examples are [GitHub
READMEs](https://github.com/nschloe/ndim#the-formulas) and
[Wikis](https://github.com/nschloe/supercharge/wiki/Classical-gallery) or [StackOverflow
posts](https://stackoverflow.com/a/63796209/353337).

Simply install the extension from the

  * [Chrome Web Store](https://chrome.google.com/webstore/detail/supercharge/ingbbliecffofmmokknelnijicfcgolb)

and enjoy.

#### Cauchy's integral formula

Let $`U`$ be an open subset of the complex plane $`\mathbb{C}`$, and suppose the closed
disk $`D`$ defined as
```math
D = \bigl\{z:|z-z_{0}|\leq r\bigr\}
```
is completely contained in $`U`$. Let $`f: U\to\mathbb{C}`$ be a holomorphic function,
and let $`\gamma`$ be the circle, oriented counterclockwise, forming the boundary of
$`D`$.  Then for every $`a`$ in the interior of $`D`$,
```math
f(a) = \frac{1}{2\pi i} \oint _{\gamma}\frac{f(z)}{z-a} dz.
```

### Content authors

On GitHub (READMEs, Wikis, Issues etc.), LaTeX inline and display formulas are supported
using native syntax, i.e.:
````markdown
Some inline math: $`x\in R`$.
Some display-style math:
```math
e^i + 1 = 0
```
````
[GitLab](https://docs.gitlab.com/ee/user/markdown.html#math) uses the same syntax.

Purple Pi also runs on pages which contain the _activation link_
```markdown
https://github.com/nschloe/supercharge?activate
```
You can then use the classical `$...$` notation for inline and `$$...$$` for
display math. You can add it as an `<a>` tag
```
Rendered with <a href="https://github.com/nschloe/supercharge?activate">Purple Pi</a>.
```
or as a badge
```
[![supercharge](https://img.shields.io/badge/Rendered%20with-Purple%20Pi-bd00ff?style=flat-square)](https://github.com/nschloe/supercharge?activate)
```
The extension will then inject [KaTeX](https://katex.org/) into the page.

### Build instructions

To build the production zip, simply install the dependencies (`npm ci`), then run
```
npm run build
```

### Development
```
npm ci
npm run watch
```
The unpacked development version of the extension will then be in `dist/`. Open Google
Chrome, go to `chrome://extensions` and `Load unpacked` this directory. Reload as
necessary.


### More module ideas

 * [D3.js](https://d3js.org/)
   Cannot be configured from a data file, but needs actual (user-provided) JS to be
   `eval()`d - a no-go for extensions.
 * [C3.js](https://c3js.org/)
   [Hardly maintained?](https://github.com/c3js/c3/issues/2831)
 * [plotly.js](https://www.npmjs.com/package/plotly.js)
   Disadvanted: Minified version is 3.4 MB

### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
