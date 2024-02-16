
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('twitter-tab').addEventListener('click', function() {
        openTab('twitter');
    });

    document.getElementById('webpages-tab').addEventListener('click', function() {
        openTab('webpages');
    });

    openTab('twitter'); // Adjust as needed
});

function openTab(tabName) {
    let tabcontent = []; 
    let tabbuttons = [];
    tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabbuttons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName + '-tab').className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.session.get(['twitterScrapingState'], function(result) {
        if(result.twitterScrapingState === 'Start') {
            document.getElementById('start-twitter-scrape-btn').innerText = 'Stop';
        } else {
            document.getElementById('start-twitter-scrape-btn').innerText = 'Start';
        }
    });
});

document.getElementById('start-twitter-scrape-btn').addEventListener('click', function() {
    const scrapingContent = this.innerText;
    if (scrapingContent === "Start") {
        this.innerText = 'Stop';
        chrome.storage.session.set({twitterScrapingState: 'Start'});
        chrome.runtime.sendMessage({
            action: "startTwitterScrape",
            url: "https://twitter.com/search?q=jobs%20hiring&src=typed_query" 
        });
    } else {
        this.innerText = 'Start';
        chrome.storage.session.set({twitterScrapingState: 'Stop'});
        chrome.runtime.sendMessage({
            action: "stopTwitterScrape",
        });
    }
});