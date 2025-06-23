
window.addEventListener("beforeunload", saveToSession);
window.addEventListener("DOMContentLoaded", laodFromSession);


async function saveToSession(e) {
    
    try {
        //convert the current binding to data that can be recieved by the server
        const mapObject = Object.fromEntries(
            Array.from(keyBindingValues, ([key, value]) => [key, Array.from(value)]))
        
        //send data to server
        const response = await fetch("/api/session/save-binding", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(mapObject),
            keepalive: true // important with the beforeunload 
        })

        if (!response.ok) {
            alert("Error: Data not saved!")
        }
        
    } catch (error) {
        console.log(error)
    }
    

}

async function laodFromSession(e) {
    try {
        const response = await fetch("/api/session/get-binding", {
            method: "GET"
        })

        if (!response.ok) {
            alert("Error, data not loaded")
        }

        const responseData = await response.json()
        
        //handle the incoming data with seting it to a local list of binding and updating the ui
        addLoadedDataToList(responseData)
        addInitialValuesUI()
        console.log(responseData)

    } catch (error){
        alert(error)
    }
}


function addLoadedDataToList(loadedData) {
    Object.entries(loadedData).forEach(([key, value]) => {
        // console.log(`Key: ${key}, Value: ${value}`)
        const valueSet = new Set([])
        value.forEach(element => {
            valueSet.add(element)
        });
        keyBindingValues.set(Number(key), valueSet)
    })
}