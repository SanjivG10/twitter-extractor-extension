let interval  = null;
let scrollTimes = 0;
const TOTAL_SCROLL = 20;

const JOBS_KEYWORDS = ["career","job",'we are hiring','join the team','work']
const PAGES_TO_IGNORE = ["facebook","twitter","instagram","google","youtube","fastkey","gmail","openai","github","zoho"]
let postInfo = [];

chrome.runtime.onMessage.addListener(
    function(request) {
      if (request.message === "startTwitterScrape") {
        interval = setInterval(()=>{
            const posts = getTwitterPostContent();
            scrollTimes+=1;
            window.scrollTo(0, document.body.scrollHeight);
            if (scrollTimes>=TOTAL_SCROLL){
                clearInterval(interval);
                chrome.runtime.sendMessage({
                    action: "data",
                    data: posts
                });
            }

        },5000)
      }
      else if (request.message==="stopTwitterScrape"){
        if (interval)
        clearInterval(interval)
      }
    }
  );

const getTwitterPostContent = ()=>{
    const articles = document.querySelectorAll("article");

    for (const article of articles){
        const tweetTextElement = article.querySelector('[data-testid="tweetText"]')
        const allAnchorText = article.querySelectorAll("a");
        let eachLinkInfo = {
            "text":tweetTextElement.textContent,
            "post": "",
            "user":"",
            "time":"",
            isProcessed: false
        }

        const timeContainer = article.querySelector("time");
        const time = timeContainer.getAttribute("datetime");
        eachLinkInfo.time= time;
        const querySelectorString = "[data-testid='User-Name'] a"
        const anchorsForUserInfo = article.querySelectorAll(querySelectorString);
        for (const anchor of anchorsForUserInfo){
            const content  = anchor.textContent;
            if (content.includes("@")){
                eachLinkInfo.user = content
                break;
            }
        }

        for (const anchor of allAnchorText){
            const href = anchor.getAttribute("href");
            if (href.includes("/status/")){
                eachLinkInfo.post = href
                break;
            }
        }
        postInfo.push(eachLinkInfo)
    }
    return postInfo;
}


const searchAndGetHiringPage = ()=>{
  const currentUrl = window.location.href;
  const url = new URL(currentUrl).hostname.toLowerCase();

  if (PAGES_TO_IGNORE.includes(url)){
    return;
  }

  console.log("Searching for job ...");

  const anchors = document.querySelectorAll("a");
        let jobLink = "";
        for (const anchor of anchors){
            const text = anchor.textContent;
            for (const keyword of JOBS_KEYWORDS){
                if (text.toLowerCase().includes(keyword.toLowerCase())){
                    console.log("possible job found")
                    jobLink = anchor.getAttribute("href");
                    if (jobLink.startsWith("/")){
                        jobLink+=window.location.href + jobLink
                    }
                }
            }
            if (jobLink) break;
        }
        console.log(`Job link is ${jobLink}`)
        if (jobLink){
            chrome.runtime.sendMessage({
                action: "possibleJobLink",
                data: jobLink 
            });
        }

        chrome.runtime.sendMessage({
            action: "stopCurrentPageScrape",
        });
}

if (document.readyState !== 'loading') {
    console.log("LOADED");
    searchAndGetHiringPage();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log("LOADED");
        searchAndGetHiringPage();
    });
}

