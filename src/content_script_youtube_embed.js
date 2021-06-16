const whitelistAttrs = [
  "width",
  "height",
  "src",
  "title",
  "frameborder",
  "allow",
  "allowfullscreen",
];

const youtubeEmbed = () => {
  collection = document.querySelectorAll("pre[lang='youtube-embed']");
  if (collection.length === 0) {
    return false;
  }

  for (element of collection) {
    try {
      obj = JSON.parse(element.textContent);

      iframe = document.createElement("iframe");
      for (const [key, value] of Object.entries(obj)) {
        if (!(key in whitelistAttrs)) {
          continue;
        } else if (value === false) {
          continue;
        } else if (value === true) {
          iframe.setAttribute(key, "");
        } else {
          iframe.setAttribute(key, value);
        }
      }
      element.parentNode.appendChild(iframe);

      // remove the ``` code block
      element.remove();
    } catch (err) {
      element.setAttribute("style", "color:red");
      element.textContent = err.message;
    }
  }

  return true;
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message === "youtube-embed") {
    sendResponse({ takeAction: youtubeEmbed() });
  }
});
