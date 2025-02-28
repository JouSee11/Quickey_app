// global variables used for multi action
let curMultipleSet = new Set([])

let capturingMulti = false
let capturingMultiItem = null 
let capturingMultiAction = null

async function showMultiBindingDialog(buttonNumber) {
    try {
        const response = await fetch("/html/multi_binding_dialog.html")
        const multiDialogHtml = await response.text()
        
        // Insert dialog into the page (only once)
        if (!document.getElementById("multi-binding-dialog")) {
            document.body.insertAdjacentHTML("beforeend", multiDialogHtml);
        } 
        
        //restat the container
        // document.getElementById("multi-action-cont").innerHTML = ""
        curMultipleSet = new Set([])
        
        //get the dialog elements
        const multiDialog = document.getElementById("multi-binding-dialog")

        const submitBtn = document.getElementById("multi-submit-button")
        const cancelBtn = document.getElementById("multi-cancel-button")

        const dialogTitle = document.getElementById("dialog-title")
        const optionsDiv = document.getElementById("multi-selection-cont")

        //edit the elements
        dialogTitle.innerHTML = `<i class="fa-solid fa-pen"></i>Multi Keys - key ${buttonNumber}`

        // Add event listeners
        const cleanup = () => {
            optionsDiv.removeEventListener("click", handleOptionBtnPress)
            multiDialog.remove()
        }

        optionsDiv.addEventListener("click", handleOptionBtnPress)

        cancelBtn.addEventListener("click", () => {
            cleanup()
            multiDialog.close()
        })

        submitBtn.addEventListener("click", () => {
            saveMultiAction(buttonNumber)
            cleanup()
            multiDialog.close()
        })

        multiDialog.showModal()
        loadMultiAction(buttonNumber)

     
    } catch (error) {
        console.log(error)
    }
}

// !!! handle the genearl options button press !!!
function handleOptionBtnPress(e) {
    console.log(e.target.id)
    switch(e.target.id) {
        case "btn-press-release": 
            console.log("here switchc one")
            addNodePressRelease()
            break
        case "btn-hold": 
            addNodeHold()
            break
        case "btn-release": 
            addNodeRelease()
            break
        case "btn-release-all": 
            addNodeReleaseAll()
            break
        case "btn-delay": 
            addNodeDelay()
            break
        case "btn-write": 
            addNodeWrite()
            break
        case "btn-mouse-move":
            addNodeMouseMove()
            break
        case "btn-mouse-click":
            addNodeMouseClick();
            break
        default: return
    }

}

// !!! handle node add !!!

async function showNodeGeneral(nodeFileName, actionName, value = "") {
    const actionContainer = document.getElementById("multi-action-cont")
    try {
        const response = await fetch(`/html/multi_action_nodes/${nodeFileName}.html`)
        const nodeHtml = await response.text();
        
        // Create temporary container to parse HsTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = nodeHtml;
        
        // Get the node element
        const node = tempDiv.firstElementChild;

        // add the node value to the set (initial empty value) - format is: !!! nodePositionActionType_value !!!
        const nodeNumber = curMultipleSet.size
        node.dataset.nodePosition = nodeNumber;
        curMultipleSet.add(`${nodeNumber}_${actionName}_${value}`);

        //if there is a set value make the node binded
        if (value) {
            console.log(value)
            showInitNodeValue(node, actionName, value)
            // node.querySelector(".node-content-key").textContent = value
            // node.classList.add("binded")
        }

        // event listener for the delete button
        const deleteBtn = node.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            handleNodeRemove(node),
            e.stopPropagation()
        });
        
        // Add to container
        actionContainer.appendChild(node);
        actionContainer.scrollTop = actionContainer.scrollHeight;
        
        return node
    } catch (error) {
        console.error(error);
    }
}

function showInitNodeValue(node, actionName, value) {
    node.classList.add("binded")
    switch(actionName) {
        case "pressRelease":
        case "hold":
        case "release":
            node.querySelector(".node-content-key").textContent = value
            break
        case "delay":
            node.querySelector(".node-delay-input").value = value
            break
        case "write":
            node.querySelector(".node-write-input").value = value
            break
        case "mouseMove":
            const valuesList = value.split('&')
            node.querySelector(".select-mouse-move-horizontal").value = valuesList[0]
            node.querySelector(".select-mouse-move-vertical").value = valuesList[1]
            node.querySelector(".node-mouse-move-input-horizontal").value = valuesList[2]
            node.querySelector(".node-mouse-move-input-vertical").value = valuesList[3]
            break
        case "mouseClick":
            node.querySelector(".select-mouse-click").value = value
            break
    }
}

// handle node remove and refactor the set so that the numbers are in order
function handleNodeRemove(node) {
    const nodeNumberDel = node.dataset.nodePosition;
    node.remove();

    // af the deleted node was capturing, reset the capturing
    if (node.classList.contains("active")) {
        console.log("reseting")
        capturingMulti = false
        capturingMultiItem = null 
        capturingMultiAction = null
    }

    // Remove item from Set
    const itemToDelete = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumberDel));
    if (itemToDelete) {
        curMultipleSet.delete(itemToDelete);
    }

    // Get all remaining nodes and update their positions
    const remainingNodes = document.querySelectorAll('.action-node');
    remainingNodes.forEach((node, index) => {
        const oldPosition = parseInt(node.dataset.nodePosition);
        if (oldPosition > nodeNumberDel) {
            // Update node position
            const newPosition = oldPosition - 1;
            node.dataset.nodePosition = newPosition;

            // Update corresponding item in Set
            const oldItem = Array.from(curMultipleSet).find(item => item.startsWith(oldPosition + '_'));
            if (oldItem) {
                curMultipleSet.delete(oldItem);
                // Create new item with updated position, keeping the action and value
                const [_, action, value] = oldItem.split('_');
                const newItem = `${newPosition}_${action}_${value}`;
                curMultipleSet.add(newItem);
            }
        }
    });

    console.log('Updated Set:', curMultipleSet);
}


// !!! handle specific button press !!!
async function addNodePressRelease(value = "") {
    const pressReleaseNode = await showNodeGeneral("node_press_release", "pressRelease", value)
    
    //start captring the key press
    pressReleaseNode.addEventListener("click", (e) => {
        const nodeNumber = pressReleaseNode.dataset.nodePosition
        console.log(nodeNumber)
        buttonClickListenerMulti(pressReleaseNode, nodeNumber, "pressRelease")
        e.stopPropagation()
    })


}

async function addNodeHold(value = "") {
    const pressReleaseNode = await showNodeGeneral("node_hold", "hold", value)
    
    //start captring the key press
    pressReleaseNode.addEventListener("click", (e) => {
        const nodeNumber = pressReleaseNode.dataset.nodePosition
        console.log(nodeNumber)
        buttonClickListenerMulti(pressReleaseNode, nodeNumber, "hold")
        e.stopPropagation()
    })
}

async function addNodeRelease(value = "") {
    const pressReleaseNode = await showNodeGeneral("node_release", "release", value)
    
    //start captring the key press
    pressReleaseNode.addEventListener("click", (e) => {
        const nodeNumber = pressReleaseNode.dataset.nodePosition
        console.log(nodeNumber)
        buttonClickListenerMulti(pressReleaseNode, nodeNumber, "release")
        e.stopPropagation()
    })
}

async function addNodeReleaseAll() {
    await showNodeGeneral("node_release_all", "releaseAll")
}

async function addNodeDelay(value = "") {
    const delayNode = await showNodeGeneral("node_delay", "delay", value)
    const nodeNumber = delayNode.dataset.nodePosition

    const delayInput = delayNode.querySelector(`.node-delay-input`)

    delayInput.addEventListener("blur", () => {
        // find the old value and delete it
        const existingItem = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumber));
        if (existingItem) {
            curMultipleSet.delete(existingItem);
        }
        //add the new item
        curMultipleSet.add(`${nodeNumber}_delay_${delayInput.value}`)

    })
}

async function addNodeWrite(value = "") {
    const writeNode = await showNodeGeneral("node_write", "write", value)
    const nodeNumber = writeNode.dataset.nodePosition

    const writeInput = writeNode.querySelector(`.node-write-input`)

    writeInput.addEventListener("blur", () => {
        // find the old value and delete it
        const existingItem = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumber));
        if (existingItem) {
            curMultipleSet.delete(existingItem);
        }
        //add the new item
        curMultipleSet.add(`${nodeNumber}_write_${writeInput.value}`)

        console.log(curMultipleSet)
    })
}

async function addNodeMouseMove(value = "left&up&0&0") {
    const mouseNode = await showNodeGeneral("node_mouse_move", "mouseMove", value)
    const nodeNumber = mouseNode.dataset.nodePosition

    const horizontalSelect = mouseNode.querySelector(`.select-mouse-move-horizontal`)
    const horizontalInput = mouseNode.querySelector(`.node-mouse-move-input-horizontal`)

    const verticalSelect = mouseNode.querySelector(`.select-mouse-move-vertical`)
    const verticalInput = mouseNode.querySelector(`.node-mouse-move-input-vertical`)
    
    //change the saved value when user changes the settings
    const changeSavedState = () => {
        const horizontalDirection = horizontalSelect.value
        const verticalDirection = verticalSelect.value

        const horizontalValue = horizontalInput.value ? horizontalInput.value : 0
        const verticalValue = verticalInput.value ? verticalInput.value : 0

        // delethe the old record
        const existingItem = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumber));
        if (existingItem) {
            curMultipleSet.delete(existingItem);
        }
        //add the new record
        curMultipleSet.add(`${nodeNumber}_mouseMove_${horizontalDirection}&${verticalDirection}&${horizontalValue}&${verticalValue}`)

        // console.log(`${nodeNumber}_mouseMove_${horizontalDirection}_${verticalDirection}_${horizontalValue}_${verticalValue}`)
    }

    horizontalSelect.addEventListener("change", changeSavedState)
    verticalSelect.addEventListener("change", changeSavedState)
    horizontalInput.addEventListener("change", changeSavedState)
    verticalInput.addEventListener("change", changeSavedState)
}

async function addNodeMouseClick(value = "") {
    const mouseNode = await showNodeGeneral("node_mouse_click", "mouseClick", value)
    const nodeNumber = mouseNode.dataset.nodePosition

    const clickSelect = mouseNode.querySelector(`.select-mouse-click`)
    
    clickSelect.addEventListener("change", () => {
        // find the old value and delete it
        const existingItem = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumber));
        if (existingItem) {
            curMultipleSet.delete(existingItem);
        }
        //add the new item
        curMultipleSet.add(`${nodeNumber}_mouseClick_${clickSelect.value}`)
        }
    )
}

// !!! handle capturing key press!!!
function getItemByNumMulti(itemNum) {
    const item = document.querySelector(`[data-node-Position="${itemNum}"]`)
    return item;
}


//capturing the key press general for multi
function buttonClickListenerMulti(nodeElement, nodeNumber, actionType) {
    console.log(curMultipleSet)

    //when something else was capturing disable it
    disableCaptureAllMulti()
    capturingMulti = true
    capturingMultiItem = Number(nodeNumber)
    capturingMultiAction = actionType

    nodeElement.classList.remove("binded")
    nodeElement.classList.add("active")

    //check if some binding is already set and delete it
    const displayText = nodeElement.querySelector(".node-content-key")
    displayText.textContent = capturingMsg

}

//capture the keydown event when capturing multi
document.addEventListener("keydown", (event) => {
    //if no button is "listening", I dont want to capture anything 
    if (!capturingMulti) return;

    event.preventDefault();

    //get the current values
    let pressedKey = event.code

    //get the element that is capturing and change classes and text
    const nodeElement = getItemByNumMulti(capturingMultiItem)
    nodeElement.querySelector(".node-content-key").textContent = pressedKey
    nodeElement.classList.remove("active")
    nodeElement.classList.add("binded")

    // Find and remove the old item from Set
    const existingItem = Array.from(curMultipleSet).find(item => 
        item.startsWith(`${capturingMultiItem}_`)
    );
    if (existingItem) {
        curMultipleSet.delete(existingItem);
    }

    // Add new item with updated key value
    curMultipleSet.add(`${capturingMultiItem}_${capturingMultiAction}_${pressedKey}`);

    capturingMulti = false
    capturingMultiItem = null

})