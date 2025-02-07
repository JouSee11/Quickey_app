

const saveButton = document.getElementById("save-button")

saveButton.addEventListener("click", showSaveDialog)


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

        saveDialog.showModal() // function for dialog, disables the backgorund and centers it self

        cancelButton.addEventListener("click", () => saveDialog.close());
        
    } catch (error) {
        console.log(error)
    }

}