chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "start") {
        const posts = getTwitterPostContent();
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

