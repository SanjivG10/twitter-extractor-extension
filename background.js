chrome.runtime.onMessage.addListener(function(request) {
    if (request.action === "startScrapingTwitter") {
        chrome.tabs.create({ url: request.url, active: false }, function(tab) {
            chrome.tabs.sendMessage(tab.id, {"message": "start"});
        });
    }
});