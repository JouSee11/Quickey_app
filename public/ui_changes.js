const statusMsg = document.getElementById("status-message")
const conIco = document.getElementById("connection-icon")
const conMsg = document.getElementById("connection-msg")
const logArea = document.getElementById("log-area")
const toggleLogBtn = document.getElementById("toggle-textarea")
const buttonReset = document.getElementById("reset-button")
const buttonImport = document.getElementById("import-button")


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

        buttonImport.classList.remove("disabled")
        buttonImport.classList.add("allowed")
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

        buttonImport.classList.remove("allowed")
        buttonImport.classList.add("disabled")
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

//disable capturing on the previous capturing button
function disableCaptureAll() {
    buttonsList.forEach((button) => {
        if (button.textContent === capturingMsg) {
            button.textContent = defaultMsg
            button.classList.remove("binded")
            capturing = false
            capturingButton = null
            button.classList.add("removed")
            setTimeout(() => {
                button.classList.remove("removed")
            }, 300)
        }
        button.classList.remove("active")
    })
}

function resetButtons() {
    if (confirm("Are you sure you want to delete the current binding?")) {
        buttonsList.forEach((button) => {
            button.textContent = defaultMsg
            button.classList.remove("binded")
            capturing = false
            capturingButton = null
            keyBindingValues = new Map()
        })
    }
}

// function focusOutOfButtons() {
//     buttonsList.forEach((button) => {
//         if (button.textContent === capturingMsg) {
//             button.classList.remove("binded")
//             button.textContent = defaultMsg
//         }
//         button.classList.remove("active")
//     })
// }


toggleLogBtn.addEventListener("click", toggleLogArea)

//disable all capturing when we press out of the buttons
document.body.addEventListener("click", disableCaptureAll)

buttonReset.addEventListener("click", resetButtons)