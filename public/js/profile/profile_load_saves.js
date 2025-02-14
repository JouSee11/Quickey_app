
//load all binding initially 
document.addEventListener("DOMContentLoaded", () => {showSaves("")})
const savesContainer = document.getElementById("saves-display-area")

async function showSaves(searchText) {
    try {
        const response = await fetch("/api/profile/get-default?search=" + encodeURIComponent(searchText))
        
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

        //laod it to each template
        savedRecords.forEach(saveRecord => {
            const cloneTemplate = templateElement.content.cloneNode(true)

            //convert the time to date only
            const originalDate = saveRecord.updatedAt;
            const formattedDate = new Date(originalDate).toISOString().split("T")[0]; 

            //format name
            const nameOriginal = saveRecord.name
            const formattedName = nameOriginal.length > 25 ? nameOriginal.substring(0, 22) + "..." : nameOriginal

            //public or private - put appropriate icon
            const public_private_ico = saveRecord.public ? "fa-solid fa-globe" : "fa-solid fa-lock"

            //handle binded and not binded keys
            const allKeys = cloneTemplate.querySelectorAll(".save-key")
            allKeys.forEach((keyDiv) => {
                const keyNumber = Number(keyDiv.dataset.keyNum - 1)
                const keyData = saveRecord.keyBinding[keyNumber].keyValues
                console.log(keyData)
                if (keyData.length === 0) {
                    keyDiv.classList.add("save-key-empty")
                } else {
                    keyDiv.classList.add("save-key-binded")
                }
            })



            cloneTemplate.querySelector(".save-name").textContent = formattedName
            cloneTemplate.querySelector(".save-date").textContent = formattedDate
            cloneTemplate.querySelector(".save-username").textContent = saveRecord.userId.username
            cloneTemplate.querySelector(".save-likes-num").textContent = saveRecord.likes
            cloneTemplate.querySelector(".save-public-state").classList.add(...public_private_ico.split(" "))
            cloneTemplate.querySelector(".save-block-link").href = "/profile/item?id=" + encodeURIComponent(saveRecord._id)



            savesContainer.appendChild(cloneTemplate)
        });
        

    } catch (error) {
        console.log(error)
        
    }
}