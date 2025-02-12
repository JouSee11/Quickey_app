//load all binding initially 
document.addEventListener("DOMContentLoaded", showSaves)
const savesContainer = document.getElementById("saves-display-area")

async function showSaves() {
    try {
        const response = await fetch("/api/profile/get-default")
        
        const dataResponse = await response.json()

        //check if there is some error
        if (dataResponse.status === "error") {
            return console.log("Error getting data from server")
        }

        const savedRecords = dataResponse.data

        //get template for binding
        const responseTemplate = await fetch("/html/save_block_template.html")
        const displayTemplate = await responseTemplate.text()

        // Create a template element and set its innerHTML
        const templateElement = document.createElement("template");
        templateElement.innerHTML = displayTemplate;
        console.log(templateElement)

        savedRecords.forEach(saveRecord => {
            const cloneTemplate = templateElement.content.cloneNode(true)

            cloneTemplate.querySelector("#save-name").textContent = saveRecord.name
            cloneTemplate.querySelector("#save-date").textContent = saveRecord.updatedAt


            savesContainer.appendChild(cloneTemplate)
        });
        

    } catch (error) {
        console.log(error)
        
    }
}