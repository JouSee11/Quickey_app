document.addEventListener("DOMContentLoaded", loadItemBinding)

async function loadItemBinding() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value
    
    const response = await fetch("/api/profile/item?id=" + encodeURIComponent(itemId))
    
    const jsonData = await response.json()
    const {keyBinding} = jsonData[0]

    updateButtonsUI(keyBinding)
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