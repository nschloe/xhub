mermaid_configs = [];

const getMermaidInject = () => {
  return document.querySelectorAll("pre[lang='mermaid']").length > 0;
};

const renderMermaid = () => {
  // convert the <pre>-blocks to <div class="mermaid>
  collection = document.querySelectorAll("pre[lang='mermaid']");
  for (element of collection) {
    div = document.createElement("div");
    div.setAttribute("class", "mermaid");
    div.textContent = element.textContent;
    element.parentNode.appendChild(div);
    element.remove();
  }
  // run mermaid, render it all
  mermaid.init();
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.log("c");
  if (message === "get-mermaid-inject") {
    sendResponse({ inject: getMermaidInject() });
  } else if (message === "render-mermaid") {
    renderMermaid();
  }
});
