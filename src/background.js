// Include the LESS file, it's injected below. This require() call makes sure it's
// picked up by webpack.
require("../node_modules/katex/src/katex.less");

// create png from svg
// https://www.npmjs.com/package/svg-to-png-loader
require("svg-to-png-loader?" +
  "sizes[]=16," +
  "sizes[]=32," +
  "sizes[]=48," +
  "sizes[]=128," +
  "&name=assets/icon-color[height].png!../images/icon-color.svg");
require("svg-to-png-loader?" +
  "sizes[]=16," +
  "sizes[]=32," +
  "sizes[]=48," +
  "sizes[]=128," +
  "&name=assets/icon-gray[height].png!../images/icon-gray.svg");

// Check when/if a page has finished loading, and take events from there.
// In a previous version, we just had content_script.js loaded and check the contents of
// the page, but that doesn't always trigger. For example, it triggers when loading a
// new page, but not when changing from github/issues to github/code. onUpdated()
// triggers on every iframe update, so sometimes that's one or two too many, but better
// than not at all.
// Alternatively, we could wait for events like webNavigation.onHistoryStateUpdated or
// webNavigation.onCompleted.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== "complete") {
    return;
  }

  icons_gray = {
    16: "assets/icon-gray16.png",
    32: "assets/icon-gray32.png",
    48: "assets/icon-gray48.png",
    128: "assets/icon-gray128.png",
  };
  icons_color = {
    16: "assets/icon-color16.png",
    32: "assets/icon-color32.png",
    48: "assets/icon-color48.png",
    128: "assets/icon-color128.png",
  };
  chrome.action.setIcon({ tabId: tabId, path: icons_gray });

  // Only the content_script knows the DOM, so let's ask it if we need to inject
  // KaTeX.
  // Use tabs.sendMessage, not runtime.sendMessage
  // https://stackoverflow.com/a/14245504/353337
  chrome.tabs.sendMessage(tabId, "get-math-inject", async (response) => {
    if (!response.inject) {
      return;
    }

    // multiple executeScripts: <https://stackoverflow.com/a/67973100/353337>
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["katex.js"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["auto-render.js"],
    });
    await chrome.scripting.insertCSS({
      target: { tabId: tabId },
      // webpack compiles the katex.less to background.css
      files: ["background.css"],
    });
    chrome.action.setIcon({ tabId: tabId, path: icons_color });
    chrome.tabs.sendMessage(tabId, "render-math");
  });

  chrome.tabs.sendMessage(tabId, "get-chartjs-inject", async (response) => {
    if (!response.inject) {
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["chart.js"],
    });
    chrome.action.setIcon({ tabId: tabId, path: icons_color });
    chrome.tabs.sendMessage(tabId, "render-chartjs");
  });

  chrome.tabs.sendMessage(tabId, "get-mermaid-inject", async (response) => {
    if (!response.inject) {
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["mermaid.js"],
    });
    chrome.action.setIcon({ tabId: tabId, path: icons_color });
    chrome.tabs.sendMessage(tabId, "render-mermaid");
  });

  chrome.tabs.sendMessage(tabId, "get-plotly-inject", async (response) => {
    if (!response.inject) {
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["plotly-strict.js"],
    });
    chrome.action.setIcon({ tabId: tabId, path: icons_color });
    chrome.tabs.sendMessage(tabId, "render-plotly");
  });
});
