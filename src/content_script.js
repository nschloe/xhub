const getMathInject = () => {
  // block math
  // check for <pre lang="math"> tags
  if (document.querySelectorAll("pre[lang='math']").length > 0) {
    return true;
  }

  // inline math
  for (element of document.getElementsByTagName("code")) {
    if (
      element.previousSibling !== null &&
      element.previousSibling.textContent.slice(-1) == "$" &&
      element.nextSibling !== null &&
      element.nextSibling.textContent.charAt(0) == "$"
    ) {
      return true;
    }
  }
  return false;
};


chartjs_blocks = [];

const getChartjsInject = () => {
  console.log("getChartjsInject");
  for (element of document.querySelectorAll("pre[lang='chartjs-html']")) {
    // chartjs-html contains canvas spec; insert it into the page
    console.log(element.textContent);
    element.parentNode.insertAdjacentHTML("afterbegin", element.textContent);
  }
  // remove the chartjs-html code blocks
  collection = document.querySelectorAll("pre[lang='chartjs-html']");
  for (elem of collection) {
      elem.remove();
  }

  // gather the javascript code blocks
  collection = document.querySelectorAll("pre[lang='chartjs-js']");
  for (element of collection) {
    obj = JSON.parse(element.textContent);
    chartjs_blocks.push(obj);
    element.remove();
  }

  console.log("out", chartjs_blocks);
  return chartjs_blocks.length > 0;
};


const renderMath = () => {
  // make sure this comes before the explicit <code> loop. <pre> tags contain <code>,
  // too, but are removed there.
  for (element of document.querySelectorAll("pre[lang='math']")) {
    // render; only use textContent, so throw away <code> tags etc.
    katex.render(element.textContent, element.parentNode, {
      displayMode: true,
      throwOnError: false,
    });
  }

  // Using getElementsByTagName("code") doesn't work here since the list is dynamic and
  // the <code> tags are removed in the loop. Instead, use querySelectorAll which is
  // static.
  for (element of document.querySelectorAll("code")) {
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
      });

      // remove surrounding <code></code>
      element.outerHTML = element.innerHTML;
    }
  }
};


const renderChartjs = () => {
  for (block of chartjs_blocks) {
    console.log("YY");
    console.log(block);
    const ctx = document.getElementById('line-chart');
    new Chart(ctx, block);
  }
};


const renderD3 = () => {
  // make sure this comes before the explicit <code> loop. <pre> tags contain <code>,
  // too, but are removed there.
  for (element of document.querySelectorAll("pre[lang='d3js']")) {
    // render; only use textContent, so throw away <code> tags etc.
    katex.render(element.textContent, element.parentNode, {
      displayMode: true,
      throwOnError: false,
    });
  }
};


chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-math-inject") {
    sendResponse({ inject: getMathInject() });
  } else if (message === "get-chartjs-inject") {
    sendResponse({ inject: getChartjsInject() });
  } else if (message === "render-math") {
    renderMath();
  } else if (message === "render-chartjs") {
    renderChartjs();
  } else if (message === "render-d3") {
    // renderD3();
  }
});
