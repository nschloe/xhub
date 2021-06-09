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

const renderChartjs = () => {
  for (block of chartjs_blocks) {
    console.log("YY");
    console.log(block);
    const ctx = document.getElementById("line-chart");
    new Chart(ctx, block);
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-chartjs-inject") {
    sendResponse({ inject: getChartjsInject() });
  } else if (message === "render-chartjs") {
    renderChartjs();
  }
});
