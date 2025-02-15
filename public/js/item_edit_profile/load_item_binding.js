document.addEventListener("DOMContentLoaded", loadItemBinding)

async function loadItemBinding() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value
    
    const response = await fetch("/api/profile/item?id=" + encodeURIComponent(itemId))
    
    const jsonData = await response.json()
    
    //add the data to the 
    updateTexts(jsonData[0])
    
    const {keyBinding} = jsonData[0]
    updateButtonsUI(keyBinding)
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
        } else {
            button.classList.add("binded")
            button.textContent = Array.from(curBindingData).join(" + ")
        }
    })

}