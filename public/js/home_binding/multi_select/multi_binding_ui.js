function disableCaptureAllMulti() {
    const allNodes = document.querySelectorAll(".action-node");

    allNodes.forEach((node) => {
        const nodeText = node.querySelector(".node-content-key")
        if (!nodeText) return

        if (nodeText.textContent === capturingMsg) {
            multiItemCapturingReset();

            nodeText.textContent = defaultMsg;
            node.classList.remove("active");
            capturingMulti = false;
            capturingMultiItem = null;
            capturingMultiAction = null;
        }
    });
}


function multiItemCapturingReset() {
    // Find and remove the old item from Set
    const existingItem = Array.from(curMultipleSet).find(item => 
        item.startsWith(`${capturingMultiItem}_`)
    );
    if (existingItem) {
        curMultipleSet.delete(existingItem);
    }

    // Add new item with updated key value
    curMultipleSet.add(`${capturingMultiItem}_${capturingMultiAction}_`);
}


//disable all capturing when we press out of the buttons
document.body.addEventListener("click", disableCaptureAllMulti)