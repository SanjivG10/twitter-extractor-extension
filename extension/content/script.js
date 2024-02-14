let interval  = null;
let scrollTimes = 0;
const TOTAL_SCROLL = 2;

chrome.runtime.onMessage.addListener(
    function(request) {
      if (request.message === "start") {
        interval = setInterval(()=>{
            console.log("fetching content");
            const posts = getTwitterPostContent();
            scrollTimes+=1;
            window.scrollTo(0, document.body.scrollHeight);
            if (scrollTimes>=TOTAL_SCROLL){
                clearInterval(interval);
                console.log("sending",posts);
                chrome.runtime.sendMessage({
                    action: "data",
                    data: posts
                });
            }

            // send these posts back to backend to process
        },5000)
      }
      else if (request.message==="stop"){
        if (interval)
        clearInterval(interval)
      }
    }
  );

const getTwitterPostContent = ()=>{
    const articles = document.querySelectorAll("article");

    let postInfo = [];
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

