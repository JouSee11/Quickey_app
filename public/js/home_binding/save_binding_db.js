

const saveButton = document.getElementById("save-button")

saveButton.addEventListener("click", () => {
    if (!saveButton.classList.contains("disabled")) {
        showSaveDialog()
    }
})


async function showSaveDialog() {
    try {
        const response = await fetch("/html/save_binding_dialog.html")
        // const response = await fetch("js/bind_keys.js")
        const saveDialogHtml = await response.text()
        
        console.log(saveDialogHtml)
        // Insert dialog into the page (only once)
        if (!document.getElementById("save-binding-dialog")) {
            console.log("in the if")
            document.body.insertAdjacentHTML("beforeend", saveDialogHtml);
        } 

        //get the dialog elements
        const saveDialog = document.getElementById("save-binding-dialog")

        const saveSubmitButton = document.getElementById("submit-save-button")
        const cancelButton = document.getElementById("cancel-save-button")
        const nameInput = document.querySelector("input[name='bindingName']")
        const descriptionInput = document.querySelector("textarea[name='description']")

        saveDialog.showModal() // function for dialog, disables the backgorund and centers it self

        
        //listeners for buttons
        cancelButton.addEventListener("click", () => saveDialog.close());
        saveSubmitButton.addEventListener("click", () => saveToDb(nameInput, descriptionInput, saveDialog))

    } catch (error) {
        console.log(error)
    }

}

async function saveToDb(nameInput, descriptionInput, saveDialog) {
    const nameVal = nameInput.value
    const descriptionVal = descriptionInput.value

    //validate the data client side
    const validation = checkData(nameVal, descriptionVal) 
    if (!validation.status) {
        showErrorMsg(validation.msg, saveDialog)
        return
    }

    try {
        const keyBindingArray = Array.from(keyBindingValues, ([key, value]) => ({
            keyIndex: Number(key),
            keyValues: Array.from(value)
        }))

        const response = await fetch("/api/key-binding/save-key-binding", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: nameVal.trim(),
                description: descriptionVal.trim(),
                bindingValues: keyBindingArray
            })
        })
        
        // if (!response.ok) {
        //     //show error msg
        //     return alert("Response not ok")
        // }

        const responseData = await response.json()
        if (responseData.status === "error") {
            showErrorMsg(responseData.msg, saveDialog)
            console.log(responseData) 
            return
        }

        showSuccessMsg("Preset saved successfully!")
        saveDialog.close()
        console.log(responseData)
        nameInput.value = ""
        descriptionInput.value = ""
        
    } catch (error) {
        //show error
        alert(error)
    }
}


function checkData (nameVal, descriptionVal) {
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

function showErrorMsg(errorMsg, saveDialog) {
    if (!document.getElementById("dialog-error-msg")) {
        const parMsg = document.createElement("p")
        parMsg.textContent = errorMsg
        parMsg.id = "dialog-error-msg"
        saveDialog.appendChild(parMsg)
        saveDialog.classList.add("with-error")
        setTimeout(() => {
            saveDialog.removeChild(document.getElementById("dialog-error-msg"))
            saveDialog.classList.remove("with-error")
        }, 2000)
    }
}