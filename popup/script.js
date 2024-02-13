
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

document.getElementById('start-scraping').addEventListener('click', function() {
    const scrapingContent =  document.getElementById('scraping-status').innerText;
    if (scrapingContent==="Start"){
        chrome.runtime.sendMessage({
            action: "start",
            url: "https://twitter.com/@ronaldo"
        });
        document.getElementById('scraping-status').innerText = 'Scraping';
    }
    else {
        chrome.runtime.sendMessage({
            action: "stop",
            url: "https://twitter.com/@ronaldo"
        });
        document.getElementById('scraping-status').innerText = 'Stop';
    }

});
