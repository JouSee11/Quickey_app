const buttonSend = document.getElementById("submit-button")
const statusMsg = document.getElementById("status-message")

buttonSend.addEventListener("click", () => {
    //check if all the values for the buttons are filled
    // for (const buttonValues of keyBindingValues) {
    //     if (buttonValues[1].size === 0) {
    //         alert("Please, bind all buttons to send it to the device")
    //         return
    //     }
    // }

    //send the data
    const dataToSend = {}
    keyBindingValues.forEach((value, key) => {
        dataToSend[key] = Array.from(value)
    })

    axios.post("http://localhost:3000/save-to-device", dataToSend)
        .then(_ => {
            statusMsg.className = "successfull"
            statusMsg.textContent = "Data send successfully"
            setTimeout(() => statusMsg.textContent = "", 3000)
        })
        .catch(_ => {
            statusMsg.className = "error"
            statusMsg.textContent = "Error while sending data, try again later..."
            setTimeout(() => statusMsg.textContent = "", 3000)
        }) 

})