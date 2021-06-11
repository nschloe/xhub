const getChartjsInject = () => {
  return document.querySelectorAll("pre[lang='chartjs']").length > 0;
};

const renderChartjs = () => {
  collection = document.querySelectorAll("pre[lang='chartjs']");

  for (element of collection) {
    obj = JSON.parse(element.textContent);

    canvas = document.createElement("canvas");
    for (const [key, value] of Object.entries(obj.canvas)) {
      canvas.setAttribute(key, value);
    }
    element.parentNode.appendChild(canvas);

    new Chart(canvas, obj.config);

    // remove the code block
    element.remove();
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-chartjs-inject") {
    sendResponse({ inject: getChartjsInject() });
  } else if (message === "render-chartjs") {
    renderChartjs();
  }
});
