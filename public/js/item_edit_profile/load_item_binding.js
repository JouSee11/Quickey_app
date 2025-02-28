document.addEventListener("DOMContentLoaded", loadItemBinding)

async function loadItemBinding() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value
    
    try {
        const response = await fetch("/api/profile/item?id=" + encodeURIComponent(itemId))
        
        const jsonData = await response.json()
        
        //when the data fetch fails (user is not authorized or server errror) page is not displayed
        if (jsonData.status === "error") {
            displayPageWithError(jsonData.msg)
            return
        }
        console.log(jsonData.status)

        //add the data to the 
        updateTexts(jsonData.data[0])
        
        const {keyBinding} = jsonData.data[0]
        updateButtonsUI(keyBinding)
        
    } catch (error) {
        console.log(error)
    }
}

function displayPageWithError(errorMsg) {
    const mainContainer = document.getElementById("content-container") 
    mainContainer.innerHTML = ""
    const errMsg = document.createElement("p")
    errMsg.textContent = errorMsg
    errMsg.id = "error-msg-main"
    mainContainer.appendChild(errMsg)

}

function updateTexts(data) {
    nameValInit = data.name
    descValInit = data.description
    document.querySelector("#item-name").value = data.name
    document.querySelector("#item-desc").value = data.description
    
    //update the public/privete state
    if (data.public) {
        document.querySelector("#public-priv-toggle").checked = true
    }
}


function updateButtonsUI(keyBindingData) {
    const keyButtons = document.querySelectorAll(".button-bind")

    keyButtons.forEach((button) => {
        const buttonIndex = Number(button.dataset.keyNum - 1)
        const curBindingData = keyBindingData[buttonIndex].keyValues

        //if the data for the specific key is empty dont show anyting
        if (curBindingData.length === 0) {
            return 
        } else if (curBindingData.includes("multi")) { //check if it is a multi binding or simple
            button.innerHTML = "<i class='fa-solid fa-layer-group'></i>Multi"
            button.classList.add("binded")
        } else {
            button.classList.add("binded")
            button.textContent = Array.from(curBindingData).join(" + ")
        }
    })

}