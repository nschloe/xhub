const getPlotlyInject = () => {
  return document.querySelectorAll("pre[lang='plotly']").length > 0;
}

const renderPlotly = () => {
  collection = document.querySelectorAll("pre[lang='plotly']");
  k = 0;
  for (element of collection) {
    obj = JSON.parse(element.textContent);

    div = document.createElement("div");
    id = "docvance-plotly-" + k;
    div.setAttribute("id", id);
    element.parentNode.appendChild(div);
    Plotly.newPlot(id, obj);

    k += 1;

    // remove the ``` code block
    element.remove();
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-plotly-inject") {
    sendResponse({ inject: getPlotlyInject() });
  } else if (message === "render-plotly") {
    renderPlotly();
  }
});
