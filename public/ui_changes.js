const statusMsg = document.getElementById("status-message")
const conIco = document.getElementById("connection-icon")
const conMsg = document.getElementById("connection-msg")
const logArea = document.getElementById("log-area")
const toggleLogBtn = document.getElementById("toggle-textarea")


//change the initial connection state
changeConnectionState()

//ui functions
function addLogs(textLog) {
    logArea.value += "-->" + textLog + "\n"
    logArea.scrollTop = logArea.scrollHeight
}

function showSuccessMsg() {
    statusMsg.className = "successfull"
    statusMsg.textContent = "Data send successfully"
    setTimeout(() => statusMsg.textContent = "", 3000)
}

function changeConnectionState(state){
    //if the serial is connected
    if (state) {
        conIco.className = "connected"
        conMsg.className = "connected"
        buttonConnect.className = "connected"

        conMsg.textContent = "Connected"
        buttonConnect.textContent = "Disconnect"

        //allow submit button
        console.log(buttonSend.classList)
        buttonSend.classList.add("allowed")
        buttonSend.classList.remove("disabled")
    } 
    else { // serial is disconnected
        conIco.className = "not-connected"
        conMsg.className = "not-connected"
        buttonConnect.className = "not-connected"

        conMsg.textContent = "Disconnected"
        buttonConnect.textContent = "Connect"

        //disable submit button
        buttonSend.classList.add("disabled")
        buttonSend.classList.remove("allowed")
    }
}

function toggleLogArea() {
    logArea.classList.toggle("hidden")
    logArea.classList.toggle("visible")

    if (logArea.classList.contains("hidden")) {
        toggleLogBtn.textContent = "Show log"
    } else {
        toggleLogBtn.textContent = "Hide log"
    }
}

function focusOutOfButtons() {
    buttonsList.forEach((button) => {
        button.classList.remove("active")
    })
}


toggleLogBtn.addEventListener("click", toggleLogArea)

document.body.addEventListener("click", focusOutOfButtons)