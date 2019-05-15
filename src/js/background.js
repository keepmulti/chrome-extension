// add install event
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({url: 'https://youtubevi.com/'});
});

// get icon path
function getIcon(path) {
    return chrome.runtime.getManifest().icon_path[path];
}

/**
 * Handle URL to change icon
 *
 * @param url
 */
function handleURL(url) {
    if (url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)) {
        chrome.browserAction.setIcon({path: getIcon('has')});
    } else if (url.match(/youtube.com/)) {
        chrome.browserAction.setIcon({path: getIcon('active')});
    } else {
        chrome.browserAction.setIcon({path: getIcon('inactive')});
    }
}

// add event on active tab
chrome.tabs.onActivated.addListener(function (currentTab) {
    chrome.tabs.query({
        currentWindow: true
    }, function (tabs) {
        var length = tabs.length;
        for (i = 0; i < length; i++) {
            if (tabs[i].id === currentTab.tabId) {
                var url = tabs[i].url;
                handleURL(url);

            }
        }
    });
});

// add event on tab change url
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var url = tab.url;
    handleURL(url);
});

