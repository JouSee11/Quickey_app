const minWindowSize = 800;
let isMsgShown = false;

document.addEventListener("DOMContentLoaded", (e) => {
    handleSmallScreen();
});

window.addEventListener("resize", handleSmallScreen);

//go the the page with the message
function handleSmallScreen() {
    if (window.outerWidth < minWindowSize && !isMsgShown) {
        //show the overlay with small screen message
        showNotSupportedMsg();
        isMsgShown = true;
        // window.location.href = "/not-supported";
    } else if (window.outerWidth >= minWindowSize && isMsgShown) {
        
        removeNotSupportedMsg();
        console.log(`${window.innerWidth}, ${isMsgShown}`);
        
        isMsgShown = false;
    }
}

async function showNotSupportedMsg() {
    try {
        const response = await fetch("/html/not_supported_overlay.html")
        const notSupportedHtml = await response.text()
        // Insert dialog into the page (only once)
        document.body.insertAdjacentHTML("beforeend", notSupportedHtml);
    } catch (error) {
        console.log(error);
        
    }
}


function removeNotSupportedMsg() {
    const background = document.querySelector(".not-supported-background")
    if (background) {
        document.body.removeChild(background)
    }
}