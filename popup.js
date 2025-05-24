let matchedTabs = [];

function isZoomSuccessTab(tab) {
  try {
    const url = new URL(tab.url);
    return url.hostname.endsWith('zoom.us');
  } catch (e) {
    return false;
  }
}

document.getElementById('scanBtn').addEventListener('click', () => {
  matchedTabs = [];
  document.getElementById('tabList').innerHTML = '';

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (isZoomSuccessTab(tab)) {
        matchedTabs.push(tab);
        const li = document.createElement('li');
        li.textContent = tab.url;
        document.getElementById('tabList').appendChild(li);
      }
    });
  });
});

document.getElementById('cleanBtn').addEventListener('click', () => {
  matchedTabs.forEach(tab => {
    chrome.tabs.remove(tab.id);
  });
  document.getElementById('tabList').innerHTML = '';
  matchedTabs = [];
});
