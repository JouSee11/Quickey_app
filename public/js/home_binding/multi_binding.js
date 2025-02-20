async function showMultiBindingDialog(buttonNumber) {
    try {
        const response = await fetch("/html/multi_binding_dialog.html")
        const multiDialogHtml = await response.text()
        
        // Insert dialog into the page (only once)
        if (!document.getElementById("multi-binding-dialog")) {
            document.body.insertAdjacentHTML("beforeend", multiDialogHtml);
        } 

        //get the dialog elements
        const multiDialog = document.getElementById("multi-binding-dialog")

        // const saveSubmitButton = document.getElementById("submit-save-button")
        // const cancelButton = document.getElementById("cancel-save-button")
        // const nameInput = document.querySelector("input[name='bindingName']")
        // const descriptionInput = document.querySelector("textarea[name='description']")
        const submitBtn = document.getElementById("multi-submit-button")
        const cancelBtn = document.getElementById("multi-cancel-button")

        multiDialog.showModal() // function for dialog, disables the backgorund and centers it self

        //listeners for buttons
        cancelBtn.addEventListener("click", () => multiDialog.close());
        // submitBtn.addEventListener("click", () => saveToDb(nameInput, descriptionInput, saveDialog))
     

    } catch (error) {
        console.log(error)
    }
}