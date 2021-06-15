const getHtmlEmbedInject = () => {
  return document.querySelectorAll("pre[lang='html-embed']").length > 0;
};

const renderHtmlEmbed = () => {
  collection = document.querySelectorAll("pre[lang='html-embed']");

  for (element of collection) {
    try {
      div = document.createElement("div");
      div.innerHTML = element.textContent;
      element.parentNode.appendChild(div);
      element.remove();
    } catch (err) {
      element.setAttribute("style", "color:red");
      element.textContent = err.message;
    }
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "get-html-embed-inject") {
    sendResponse({ inject: getHtmlEmbedInject() });
  } else if (message === "render-html-embed") {
    renderHtmlEmbed();
  }
});
