const getMathInject = () => {
  // block math
  // check for <pre lang="math"> tags
  if (
    document.querySelectorAll("pre[lang='math'],pre[lang='katex']").length > 0
  ) {
    return true;
  }

  // inline math
  for (element of document.getElementsByTagName("code")) {
    if (
      // This is the $`...`$ syntax that is also used by GitLab.
      // Since GitHub introduced their own buggy $-based math syntax, this
      // doesn't work anymore.
      (element.previousSibling !== null &&
        element.previousSibling.textContent.slice(-1) == "$" &&
        element.nextSibling !== null &&
        element.nextSibling.textContent.charAt(0) == "$") ||
      // This is the syntax `$...$`. It should work even with GitHub's own
      // math.
      (element.textContent.charAt(0) == "$" &&
        element.textContent.slice(-1) == "$")
    ) {
      return true;
    }
  }
  return false;
};

// Macros has to be specified here, not inside the loop. This makes sure that
// `globalGroup=true` can actually add something to is that gets reused later.
macros = {
  // https://github.com/KaTeX/KaTeX/issues/2003#issuecomment-843991794
  "\\eqref": "\\href{###1}{(\\text{#1})}",
  "\\ref": "\\href{###1}{\\text{#1}}",
  "\\label": "\\htmlId{#1}{}",
};

const renderMath = () => {
  // make sure this comes before the explicit <code> loop. <pre> tags contain <code>,
  // too, but are removed there.
  for (element of document.querySelectorAll(
    "pre[lang='math'],pre[lang='katex']",
  )) {
    // render; only use textContent, so throw away <code> tags etc.
    katex.render(element.textContent, element.parentNode, {
      displayMode: true,
      throwOnError: false,
      globalGroup: true,
      trust: ({ command }) => ["\\href", "\\htmlId"].includes(command),
      macros: macros,
    });
  }

  // Using getElementsByTagName("code") doesn't work here since the list is
  // dynamic and the <code> tags are removed in the loop. Instead, use
  // querySelectorAll which is static.
  for (element of document.querySelectorAll("code")) {
    // $`...`$ syntax
    if (
      element.previousSibling !== null &&
      element.previousSibling.textContent.slice(-1) == "$" &&
      element.nextSibling !== null &&
      element.nextSibling.textContent.charAt(0) == "$"
    ) {
      // remove $ before and after
      element.previousSibling.textContent =
        element.previousSibling.textContent.slice(0, -1);
      element.nextSibling.textContent =
        element.nextSibling.textContent.substring(1);

      // render
      katex.render(element.textContent, element, {
        displayMode: false,
        throwOnError: false,
        // https://github.com/KaTeX/KaTeX/issues/2003#issuecomment-843991794
        trust: ({ command }) => command === "\\href",
        globalGroup: true,
        macros: macros,
      });

      // remove surrounding <code></code>
      element.outerHTML = element.innerHTML;
    } else if (
      // `$...$` syntax
      element.textContent.charAt(0) == "$" &&
      element.textContent.slice(-1) == "$"
    ) {
      // remove $ before and after
      element.textContent = element.textContent.slice(1, -1);

      // render
      katex.render(element.textContent, element, {
        displayMode: false,
        throwOnError: false,
        // https://github.com/KaTeX/KaTeX/issues/2003#issuecomment-843991794
        trust: ({ command }) => command === "\\href",
        globalGroup: true,
        macros: macros,
      });

      // remove surrounding <code></code>
      element.outerHTML = element.innerHTML;
    }
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-math-inject") {
    sendResponse({ inject: getMathInject() });
  } else if (message === "render-math") {
    renderMath();
  }
});
