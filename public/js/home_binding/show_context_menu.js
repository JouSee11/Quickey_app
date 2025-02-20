//add the context menu listender for each button
buttonsList.forEach((button) => {
    button.addEventListener("contextmenu", showCustomContextMenu)
})

async function showCustomContextMenu(e) {
    disableCaptureAll()
    this.classList.add("active")
    e.preventDefault()
    try {
        const response = await fetch("/html/home_binding_context_menu.html")
        const menuHtml = await response.text()
        
        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = menuHtml
        
        // Query the parsed DOM for the custom context menu container
        const menuContainer = tempDiv.querySelector("#custom-context-menu")
        if (!menuContainer) {
            throw new Error("No element with ID 'custom-context-menu' found in the fetched HTML.")
        }
        
        // Set the position of the menu based on the cursor coordinates
        menuContainer.style.top = `${e.pageY}px`
        menuContainer.style.left = `${e.pageX}px`

        // Check if the element is already in the document
        let insertedMenu = document.getElementById("custom-context-menu")
        if (!insertedMenu) {
            // Append the parsed element to the document so that our style changes are preserved
            document.body.appendChild(menuContainer)
        } else {
            insertedMenu.style.top = `${e.pageY}px`
            insertedMenu.style.left = `${e.pageX}px`
        }

        const buttonNumber = e.target.dataset.keyNum

        //add events to the buttons in the context
        const deleteButton = document.getElementById("context-delete-btn")
        deleteButton.addEventListener("click", () => {resetSingleButton(buttonNumber)})

        //show edit dialog when the edit button is pressed
        const buttonEdit = document.getElementById("context-action-btn")
        buttonEdit.addEventListener("click", () => {showMultiBindingDialog(buttonNumber)})

    } catch (error) {
        console.error(error)
    }
}