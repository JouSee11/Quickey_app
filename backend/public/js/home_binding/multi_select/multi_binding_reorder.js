//chage the position of the node in the DOM and change its dataset attribute
function moveNodeUp(node) {
    const prevNode = node.previousElementSibling;

    console.log(node);
    
    
    if (prevNode && prevNode.classList.contains('action-node')) {        
        // Add animation classes
        node.classList.add('moving-up', "swapping");
        prevNode.classList.add('moving-down', "swapping");
        
        // Wait for animation to complete before DOM change
        setTimeout(() => {
            // Perform the DOM movement
            node.parentNode.insertBefore(node, prevNode);
            
            // Update the dataset attributes
            const curNumber = node.dataset.nodePosition;
            node.dataset.nodePosition = prevNode.dataset.nodePosition;
            prevNode.dataset.nodePosition = curNumber;
            
            // Remove animation classes
            node.classList.remove('moving-up', "swapping");
            prevNode.classList.remove('moving-down', "swapping");
            
            // Update your set
            updateCurSetPosChange(curNumber, 'up');
            
        }, 250); // Animation time in ms
    }

    console.log(curMultipleSet);
    
}

//chage the position of the node in the DOM and change its dataset attribute
function moveNodeDown(node) {
    const nextNode = node.nextElementSibling;
        
    if (nextNode && nextNode.classList.contains('action-node')) {        
        // Add animation classes
        node.classList.add('moving-down', "swapping");
        nextNode.classList.add('moving-up', "swapping");
        
        // Wait for animation to complete before DOM change
        setTimeout(() => {
            // Perform the DOM movement
            node.parentNode.insertBefore(nextNode, node);
            
            // Update the dataset attributes
            const curNumber = node.dataset.nodePosition;
            node.dataset.nodePosition = nextNode.dataset.nodePosition;
            nextNode.dataset.nodePosition = curNumber;
            
            // Remove animation classes
            node.classList.remove('moving-down', "swapping");
            nextNode.classList.remove('moving-up', "swapping");
            
            // Update your set
            updateCurSetPosChange(curNumber, 'down');
            
        }, 250); // Animation time in ms
    }

    console.log(curMultipleSet);

}

// change the position in the set of the current order of the action
function updateCurSetPosChange(fromNumber, direction) {
    const toNumber = direction === 'up' ? 
        parseInt(fromNumber) - 1 : 
        parseInt(fromNumber) + 1;
    // Convert Set to Array to use .find()
    const elementsArray = Array.from(curMultipleSet);
    
    // Find the element that starts with the specified position
    const elementFromToChange = elementsArray.find(actionName => 
        actionName.split("_")[0] == fromNumber
    );

    if (elementFromToChange) {
        // Remove the old element from the Set
        curMultipleSet.delete(elementFromToChange);
        
        // Create new element with updated position
        const parts = elementFromToChange.split("_");
        const newPosition = toNumber
            
        const newElement = newPosition + "_" + parts.slice(1).join("_");
        
        // Add the new element to the Set
        curMultipleSet.add(newElement);
        
        console.log(`Changed ${elementFromToChange} to ${newElement}`);
    }


    const elementToToChange = elementsArray.find(actionName => 
        actionName.split("_")[0] == toNumber
    );

    if (elementToToChange) {
        // Remove the old element from the Set
        curMultipleSet.delete(elementToToChange);
        
        // Create new element with updated position
        const parts = elementToToChange.split("_");
        const newPosition = fromNumber
            
        const newElement = newPosition + "_" + parts.slice(1).join("_");
        
        // Add the new element to the Set
        curMultipleSet.add(newElement);
        
        console.log(`Changed ${elementToToChange} to ${newElement}`);
    }
    
    console.log("Updated Set:", curMultipleSet);
}
