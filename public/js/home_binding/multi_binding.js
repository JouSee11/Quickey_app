// global variables used for multi action
const curMultipleSet = new Set([])

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

        const submitBtn = document.getElementById("multi-submit-button")
        const cancelBtn = document.getElementById("multi-cancel-button")

        const dialogTitle = document.getElementById("dialog-title")
        const optionsDiv = document.getElementById("multi-selection-cont")

        //edit the elements
        dialogTitle.innerHTML = `<i class="fa-solid fa-pen"></i>Multi Keys - key ${buttonNumber}`
        multiDialog.showModal() // function for dialog, disables the backgorund and centers it self

        //hander for the action button press
        optionsDiv.addEventListener("click", handleOptionBtnPress)

        //listeners for buttons
        cancelBtn.addEventListener("click", () => multiDialog.close());
        // on submit add the "multiplAction" to the curMultipleSet on first position
        // submitBtn.addEventListener("click", () => saveToDb(nameInput, descriptionInput, saveDialog)) 
     

    } catch (error) {
        console.log(error)
    }
}

// !!! handle the genearl options button press !!!
function handleOptionBtnPress(e) {
    switch(e.target.id) {
        case "btn-press-release": 
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
        default: return
    }

}

// !!! handle the node add !!!

async function showNodeGeneral(nodeFileName, actionName) {
    const actionContainer = document.getElementById("multi-action-cont")
    try {
        const response = await fetch(`/html/multi_action_nodes/${nodeFileName}.html`)
        const nodeHtml = await response.text();
        
        // Create temporary container to parse HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = nodeHtml;
        
        // Get the node element
        const node = tempDiv.firstElementChild;

        // add the node value to the set (initial empty value) - format is: !!! nodePositionActionType_value !!!
        const nodeNumber = curMultipleSet.size
        node.dataset.nodePostion = nodeNumber;
        curMultipleSet.add(`${nodeNumber}_${actionName}_`);

        // event listener for the delete button
        const deleteBtn = node.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => handleNodeRemove(node));
        
        // Add to container
        actionContainer.appendChild(node);
        
        return node
    } catch (error) {
        console.error(error);
    }
}

// handle node remove and refactor the set so that the numbers are in order
function handleNodeRemove(node) {
    const nodeNumberDel = node.dataset.nodePostion;
    node.remove();

    // Remove item from Set
    const itemToDelete = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumberDel));
    if (itemToDelete) {
        curMultipleSet.delete(itemToDelete);
    }

    // Get all remaining nodes and update their positions
    const remainingNodes = document.querySelectorAll('.action-node');
    remainingNodes.forEach((node, index) => {
        const oldPosition = parseInt(node.dataset.nodePostion);
        if (oldPosition > nodeNumberDel) {
            // Update node position
            const newPosition = oldPosition - 1;
            node.dataset.nodePostion = newPosition;

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

async function addNodePressRelease() {
    showNodeGeneral("node_press_release", "pressRelease")


}

function addNodeHold() {
    showNodeGeneral("node_hold", "hold")
}

function addNodeRelease() {
    showNodeGeneral("node_release", "release")
}

function addNodeReleaseAll() {
    showNodeGeneral("node_release_all", "releaseAll")
}

async function addNodeDelay() {
    const delayNode = await showNodeGeneral("node_delay", "delay")
    const nodeNumber = delayNode.dataset.nodePostion

    const delayInput = delayNode.querySelector(`.node-delay-input`)

    delayInput.addEventListener("blur", () => {
        // find the old value and delete it
        const existingItem = Array.from(curMultipleSet).find(item => item.startsWith(nodeNumber));
        if (existingItem) {
            curMultipleSet.delete(existingItem);
        }
        //add the new item
        curMultipleSet.add(`${nodeNumber}_delay_${delayInput.value}`)

        console.log(curMultipleSet)
    })
}

async function addNodeWrite() {
    const writeNode = await showNodeGeneral("node_write", "write")
    const nodeNumber = writeNode.dataset.nodePostion

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