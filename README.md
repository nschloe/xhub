<p align="center">
  <a href="https://github.com/nschloe/docvance"><img alt="docvance" src="https://nschloe.github.io/docvance/logo-docvance.svg" width="60%"></a>
  <p align="center">Advance GitHub pages with support for LaTeX, plotly, etc.</p>
</p>

[![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/ingbbliecffofmmokknelnijicfcgolb)](https://chrome.google.com/webstore/detail/docvance/ingbbliecffofmmokknelnijicfcgolb)
[![chrome users](https://img.shields.io/chrome-web-store/users/ingbbliecffofmmokknelnijicfcgolb?label=Chrome%20users&logo=google-chrome&logoColor=white&style=flat-square)](https://chrome.google.com/webstore/detail/docvance/ingbbliecffofmmokknelnijicfcgolb)

[![gh-actions](https://img.shields.io/github/workflow/status/nschloe/docvance/ci?style=flat-square)](https://github.com/nschloe/docvance/actions?query=workflow%3Aci)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

docvance is a browser extension for Google Chrome that lets you use various add-ons on
GitHub READMEs, issues, wikis etc. The add-ons currently are

 * [KaTeX](https://katex.org/) for LaTeX mathematics
 * [Chart.js](https://www.chartjs.org/) for charts
 * [Plotly](https://plotly.com/) for graphing
 * [Mermaid](https://mermaid-js.github.io/mermaid/#/) for diagrams

Simply install the extension from the

  * [Chrome Web Store](https://chrome.google.com/webstore/detail/docvance/ingbbliecffofmmokknelnijicfcgolb)

and enjoy.

### Math
#### Usage
````markdown
Some display math:
```math
D = \bigl\{z:|z-z_{0}|\leq r\bigr\}
```
Inline math is used with dollar-signs, $`a^2 + b^2 = c^2`$.
````

#### Example

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

#### Chart.js
Include a config JSON as markdown and mark it with `chartjs`, e.g.,
````markdown
```chartjs
{
  "canvas": {
    "width": "800",
    "height": "450"
  },
  "config": {
    "type": "line",
    "data": {
      "labels": [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      "datasets": [{ 
          "data": [86,114,106,106,107,111,133,221,783,2478],
          "label": "Africa",
          "borderColor": "#3e95cd",
          "fill": false
        }, { 
          "data": [282,350,411,502,635,809,947,1402,3700,5267],
          "label": "Asia",
          "borderColor": "#8e5ea2",
          "fill": false
        }, { 
          "data": [168,170,178,190,203,276,408,547,675,734],
          "label": "Europe",
          "borderColor": "#3cba9f",
          "fill": false
        }, { 
          "data": [40,20,10,16,24,38,74,167,508,784],
          "label": "Latin America",
          "borderColor": "#e8c3b9",
          "fill": false
        }, { 
          "data": [6,3,2,2,7,26,82,172,312,433],
          "label": "North America",
          "borderColor": "#c45850",
          "fill": false
        }
      ]
    },
    "options": {
      "title": {
        "display": true,
        "text": "World population per region (in millions)"
      }
    }
  }
}
```
````
```chartjs
{
  "config": {
    "type": "line",
    "data": {
      "labels": [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
      "datasets": [{ 
          "data": [86,114,106,106,107,111,133,221,783,2478],
          "label": "Africa",
          "borderColor": "#3e95cd",
          "fill": false
        }, { 
          "data": [282,350,411,502,635,809,947,1402,3700,5267],
          "label": "Asia",
          "borderColor": "#8e5ea2",
          "fill": false
        }, { 
          "data": [168,170,178,190,203,276,408,547,675,734],
          "label": "Europe",
          "borderColor": "#3cba9f",
          "fill": false
        }, { 
          "data": [40,20,10,16,24,38,74,167,508,784],
          "label": "Latin America",
          "borderColor": "#e8c3b9",
          "fill": false
        }, { 
          "data": [6,3,2,2,7,26,82,172,312,433],
          "label": "North America",
          "borderColor": "#c45850",
          "fill": false
        }
      ]
    },
    "options": {
      "title": {
        "display": true,
        "text": "World population per region (in millions)"
      }
    }
  }
}
```


### Development

#### Build instructions

To build the production zip, simply install the dependencies (`npm ci`), then run
```
npm run build
```
or
```
npm run watch
```
The unpacked development version of the extension will then be in `dist/`. Open Google
Chrome, go to `chrome://extensions` and `Load unpacked` this directory. Reload as
necessary.


### More module ideas

 * [D3.js](https://d3js.org/)
   Cannot be configured from a data file, but needs actual (user-provided) JS to be
   `eval()`d - a no-go for extensions.

### License
This software is published under the [GPLv3
license](https://www.gnu.org/licenses/gpl-3.0.en.html).
