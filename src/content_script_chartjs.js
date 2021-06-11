const getChartjsInject = () => {
  return document.querySelectorAll("pre[lang='chartjs']").length > 0;
};

const renderChartjs = () => {
  collection = document.querySelectorAll("pre[lang='chartjs']");

  k = 0;
  for (element of collection) {
    obj = JSON.parse(element.textContent);

    canvas = document.createElement("canvas");
    id = "supercharge-chartjs-" + k;
    canvas.setAttribute("id", id);
    for (const [key, value] of Object.entries(obj.canvas)) {
      canvas.setAttribute(key, value);
    }
    element.parentNode.appendChild(canvas);

    const ctx = document.getElementById(id);
    new Chart(ctx, obj.config);

    k += 1;

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
