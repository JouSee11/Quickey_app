//load all binding initially 
document.addEventListener("DOMContentLoaded", () => {showSaves("", false, 1)})
const savesContainer = document.getElementById("saves-display-area")

//pagination data
let currentPage = 1
let currentSearch = ""
let currentLiked = false
let totalPages = 1
const ITEMS_PER_PAGE = 20 //sets the number of items per page


async function showSaves(searchText, liked, page = 1) {
    try {
        currentSearch = searchText
        currentLiked = liked
        currentPage = page

        const response = await fetch(`/api/profile/get-default?search=${encodeURIComponent(searchText)}&liked=${liked}&page=${page}&limit=${ITEMS_PER_PAGE}`)
        
        const dataResponse = await response.json()

        //check if there is some error
        if (dataResponse.status === "error") {
            return console.log("Error getting data from server")
        }

        const savedRecords = dataResponse.data
        savesContainer.innerHTML = "" //clear the previous data
        
        //update pagination data
        if(dataResponse.pagination) {
            totalPages = dataResponse.pagination.pages
            updatePaginationControls(dataResponse.pagination)
        }


        //check if there are any records from the response 
        if (savedRecords.length === 0) {
            showNoRecordMsg()
        } else {
            showItems(savedRecords)
        }
        

    } catch (error) {
        console.log(error)
        
    }
}

function showNoRecordMsg() {
    if (document.querySelector(".no-saves-msg")) { return }
    const infoMsg = document.createElement("p")
    infoMsg.textContent = "No saves availible"
    infoMsg.className = "no-saves-msg"

    document.getElementById("section-right").appendChild(infoMsg)
}

 async function showItems(savedRecords) {
            //get template for binding
            const responseTemplate = await fetch("/html/save_block_template.html")
            const displayTemplate = await responseTemplate.text()
    
            // Create a template element and set its innerHTML
            const templateElement = document.createElement("template");

            //empty the container
            //delete the empty info message if it is there
            const infoMsg = document.querySelector(".no-saves-msg")
            if (infoMsg) {infoMsg.remove()}
            templateElement.innerHTML = displayTemplate;
            
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

                //show the curent page on hover
                function changeVisibePage(cont) {
                    pageOneCont.classList.remove("active")
                    pageTwoCont.classList.remove("active")
                    pageThreeCont.classList.remove("active")

                    cont.classList.add("active")
                    
                    cont.classList.add("change")
                    setTimeout(() => {  // Use global setTimeout, not cont.setTimeout
                        cont.classList.remove("change")
                    }, 1);  // Match your CSS transition time (0.3s = 300ms)

                    // change the page display number
                    const pageNumber = cont.closest(".save-cont").querySelector(".page-num-val")
                    switch (cont.dataset.page) {
                        case "1":
                            pageNumber.innerHTML = "1"
                            break
                        case "2":
                            pageNumber.innerHTML = "2"
                            break
                        case "3":
                            pageNumber.innerHTML = "3"
                            break
                    }
                }

                const pageOneHover = cloneTemplate.querySelector(".hover-page-one")
                const pageTwoHover = cloneTemplate.querySelector(".hover-page-two")
                const pageThreeHover = cloneTemplate.querySelector(".hover-page-three")

                const pageOneCont = cloneTemplate.querySelector("[data-page='1']")
                const pageTwoCont = cloneTemplate.querySelector("[data-page='2']")
                const pageThreeCont = cloneTemplate.querySelector("[data-page='3']")

                pageOneHover.addEventListener("mouseover", () => {
                    changeVisibePage(pageOneCont)
                })
                pageTwoHover.addEventListener("mouseover", () => {
                    changeVisibePage(pageTwoCont)
                })
                pageThreeHover.addEventListener("mouseover", () => {
                    changeVisibePage(pageThreeCont)
                })

    
                //handle binded and not binded keys
                const allKeys = cloneTemplate.querySelectorAll(".save-key")
                allKeys.forEach((keyDiv) => {
                    const keyNumber = Number(keyDiv.dataset.keyNum - 1)
                    const keyData = saveRecord.keyBinding[keyNumber].keyValues
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
    
    
                //fade in animation
                const newElement = cloneTemplate.firstElementChild;
                newElement.classList.add("fade-in");
    
                savesContainer.appendChild(cloneTemplate)
            });
}