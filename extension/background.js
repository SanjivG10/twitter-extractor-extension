let createdTabId = "";

const manifestObj = chrome.runtime.getManifest();

//  try to place your url to first item of host permission
let LOCAL_URL = manifestObj["host_permissions"]?.[0].replace("\/\*","");


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

    else if (request.action==="data"){
        console.log("Got saving",request.data);
        fetch(`${LOCAL_URL}/save-tweet`,{
            method: "POST",
            body: JSON.stringify(request.data),
            headers: {
                "Content-Type":"application/json"
            }
        })
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabId === createdTabId) {
        createdTabId = null; 
    }
});