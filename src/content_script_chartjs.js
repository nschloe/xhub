chartjs_configs = [];

const getChartjsInject = () => {
  collection = document.querySelectorAll("pre[lang='chartjs']");

  for (element of collection) {
    obj = JSON.parse(element.textContent);

    canvas = document.createElement("canvas");
    for (const [key, value] of Object.entries(obj.canvas)) {
      canvas.setAttribute(key, value);
    }
    element.parentNode.appendChild(canvas);
    // element.parentNode.insertAdjacentHTML("afterbegin", element.textContent);

    chartjs_configs.push({"id": obj.canvas.id, "config": obj.config});
  }
  // remove the chartjs code blocks
  for (elem of collection) {
    elem.remove();
  }

  return chartjs_configs.length > 0;
};

const renderChartjs = () => {
  for (config of chartjs_configs) {
    const ctx = document.getElementById(config.id);
    new Chart(ctx, config.config);
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-chartjs-inject") {
    sendResponse({ inject: getChartjsInject() });
  } else if (message === "render-chartjs") {
    renderChartjs();
  }
});
