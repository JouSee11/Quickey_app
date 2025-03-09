function saveMultiAction(buttonNumber) {
    // Only proceed if we have items to save
    if (curMultipleSet.size === 0) {
        return;
    }


    //sort the array and add the "multi" at the beginning
    const sortedArray = Array.from(curMultipleSet).sort((a, b) => {
        const numA = parseInt(a.split('_')[0]);
        const numB = parseInt(b.split('_')[0]);
        return numA - numB;
    });
    
    if (!sortedArray.includes("multi")) {
        sortedArray.unshift("multi");
    }
    const newSet = new Set(sortedArray);

    console.log(buttonNumber)
    
    keyBindingValues.set(Number(buttonNumber), newSet)
    multiKeySubmitBtnUi(buttonNumber)

    curMultipleSet.clear();

    console.log(keyBindingValues)
}


async function loadMultiAction(buttonNumber) {
    const currentSet = keyBindingValues.get(Number(buttonNumber));
    if (!currentSet) return;

    //check if the save is multi or not
    if (!currentSet.has("multi")) {
        for (let item of currentSet) {
            console.log(item)
            await addNodeHold(item)
        }
    } else {
        //remove the multi from the set
        const currentArray = Array.from(currentSet).slice(1);
        for (let item of currentArray) {
            const parts = item.split('_');
            let keyValue = parts[2];
            console.log(keyValue)

            switch (item.split('_')[1]) {
                case "pressRelease":
                     await addNodePressRelease(keyValue);
                    break;
                case "hold":
                    await addNodeHold(keyValue);
                    break;
                case "release":
                    await addNodeRelease(keyValue);
                    break;
                case "releaseAll":
                    await addNodeReleaseAll();
                    break;
                case "delay":
                    await addNodeDelay(keyValue);
                    break;
                case "write":
                    await addNodeWrite(keyValue);
                    break;
                case "mouseMove":
                    await addNodeMouseMove(keyValue);
                    break;
                case "mouseClick":
                    await addNodeMouseClick(keyValue);
                    break;
                case "volumeUp":
                    await addNodeVolumeUp();
                    break;
                case "volumeDown":
                    await addNodeVolumeDown();
                    break;
                case "volumeMute":
                    await addNodeVolumeMute();
                    break;
                case "playPause":
                    await addNodePlayPause();
                    break;
                case "playNext":
                    await addNodePlayNext();
                    break;
                case "playPrev":
                    await addNodePlayPrev();
                    break;
            }
        }
    }   
}