const nameInput = document.getElementById("item-name")
const descInput = document.getElementById("item-desc")

const confirmButton = document.getElementById("confirm-changes")
const cancelButton = document.getElementById("cancel-changes")

//initial values compre
let nameValInit = null
let descValInit = null

//check of blur if the value has changed and eneble the buttons
nameInput.addEventListener("blur", () =>{
    if (nameInput.value !== nameValInit) {
        confirmButton.classList.remove("disabled")
        confirmButton.classList.add("enabled")

        cancelButton.classList.remove("disabled")
        cancelButton.classList.add("enabled")
    } 
})

descInput.addEventListener("blur", () =>{
    if (descInput.value !== descValInit) {
        confirmButton.classList.remove("disabled")
        confirmButton.classList.add("enabled")

        cancelButton.classList.remove("disabled")
        cancelButton.classList.add("enabled")
    } 
})


//actions on confirm and cancel
confirmButton.addEventListener("click", () => {
    if (confirmButton.classList.contains("disabled")) return

    console.log("confirmed")
})

cancelButton.addEventListener("click", () => {
    if (cancelButton.classList.contains("disabled")) return

    console.log("canceled")
})