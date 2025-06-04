const nameInput = document.getElementById("item-name")
const descInput = document.getElementById("item-desc")

const confirmButton = document.getElementById("confirm-changes")
const cancelButton = document.getElementById("cancel-changes")

const backButton = document.querySelector(".back-button")

//initial values compre
let nameValInit = null
let descValInit = null

//check of blur if the value has changed and eneble the buttons
nameInput.addEventListener("blur", () =>{
    if (nameInput.value.trim() !== nameValInit) {
        enableButtons()
    } 
})

descInput.addEventListener("blur", () =>{
    if (descInput.value.trim() !== descValInit) {
        enableButtons()
    } 
})


//validate and save data to db
confirmButton.addEventListener("click", () => {
    if (confirmButton.classList.contains("disabled")) return
    saveNewData()
})

async function saveNewData() {
    const nameVal = nameInput.value.trim()
    const descVal = descInput.value.trim()

    //get item id from the url
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value

    const validation = validationData(nameVal, descVal)
    if (!validation.status) {
        showMsg(validation.msg, "error")
        return
    }

    try {
        const response = await fetch("/api/key-binding/edit-info", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nameVal.trim(),
                description: descVal.trim(),
                itemId: itemId
            })
        })

        const responseData = await response.json()
        if (responseData.status === "error") {
            showMsg(responseData.msg, "error")
            return
        }

        showMsg("Update successfull", "success")
        nameValInit = nameVal
        descValInit = descVal
        disableButtons()

    } catch (error) {
        console.log(error)
    }
}

function validationData (nameVal, descriptionVal) {
    // const nameVal = nameInput.value
    // const descriptionVal = descriptionInput.value

    //check description length
    if (descriptionVal.length > 2000) {
        return {status: false, msg: "Max description length is 2000 characters"}
    }
    //check name
    if (nameVal.length > 50 || nameVal.length < 1) {
        return {status: false, msg: "Name must be provided! Max length 50 chars!"}
    }

    return {status: true, msg: "Client validation valid"}
    
}

function showMsg(errorMsg, status) {
    const rightSection = document.getElementById("left-section") 
    if (!document.getElementById("edit-error-msg")) {
        const parMsg = document.createElement("p")
        parMsg.textContent = errorMsg
        parMsg.id = "edit-error-msg"

        if (status === "error") {
            parMsg.className = "error"
        } else {
            parMsg.className = "success"
        }

        rightSection.appendChild(parMsg)
        setTimeout(() => {
            rightSection.removeChild(document.getElementById("edit-error-msg"))
        }, 1000)
    }
}



//cancel button
cancelButton.addEventListener("click", () => {
    if (cancelButton.classList.contains("disabled")) return

    nameInput.value = nameValInit
    descInput.value = descValInit

    disableButtons()
    console.log("canceled")
})

//bakc button ask when leve
backButton.addEventListener("click", (e) => {
    if (confirmButton.classList.contains("enabled") ) {
        if (!confirm("Do you want to exit before saving")) e.preventDefault() 
    }
})

//general functions for disable/enable buttons
function disableButtons() {
    confirmButton.classList.remove("enabled")
    confirmButton.classList.add("disabled")

    cancelButton.classList.remove("enabled")
    cancelButton.classList.add("disabled")
}

function enableButtons() {
    confirmButton.classList.remove("disabled")
    confirmButton.classList.add("enabled")

    cancelButton.classList.remove("disabled")
    cancelButton.classList.add("enabled")
}