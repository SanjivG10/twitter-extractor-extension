let createdTabId = "";

chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "start") {
        chrome.tabs.create({ url: request.url, active: false,}, function(tab) {
            createdTabId = tab.id;
            chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo) {
                if (tabId === createdTabId && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(onUpdated);
                    chrome.tabs.sendMessage(createdTabId, {"message": "start"});
                }
            });
        });
    }
    else if (request.action === "stop" && createdTabId !== null) {
        chrome.tabs.sendMessage(createdTabId, {"message": "stop"});
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabId === createdTabId) {
        createdTabId = null; 
    }
});