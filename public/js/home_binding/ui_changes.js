const statusMsg = document.getElementById("status-message")
const conIco = document.getElementById("connection-icon")
const conMsg = document.getElementById("connection-msg")

const logArea = document.getElementById("log-area")
const toggleLogBtn = document.getElementById("toggle-textarea")
const btnArea = document.getElementById("button-cont")
const controlsBtn = document.getElementById("controls-button")

const buttonReset = document.getElementById("reset-button")
const buttonImport = document.getElementById("import-button")

//icon on the item
const iconWranch = Object.assign(document.createElement("i"), { className: "fa-solid fa-wrench" });
// iconDisplay.classList.add("fa-solid", "fa-wrench")

//icon for connect
// const iconConnect = Object.assign(document.createElement("i"), { className: "fa-brands fa-usb" });

//change the initial connection state
changeConnectionState()

//ui functions
function addLogs(textLog) {
    logArea.value += "-->" + textLog + "\n"
    logArea.scrollTop = logArea.scrollHeight
}

function showSuccessMsg(message) {
    statusMsg.className = "successfull"
    // statusMsg.textContent = "Data send successfully"
    statusMsg.textContent = message
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

function toggleControls() {
    btnArea.classList.toggle("hidden")

    if (btnArea.classList.contains("hidden")) {
        controlsBtn.textContent = "Show controls"

    } else {
        controlsBtn.textContent = "Hide controls"
    }
}


//disable capturing on the previous capturing button
function disableCaptureAll() {
    //if the custom menu is visible delete it
    if (document.getElementById("custom-context-menu")) {
        document.getElementById("custom-context-menu").remove()
    }

    buttonsList.forEach((button) => {
        if (button.textContent === capturingMsg) {
            button.textContent = defaultMsg
            button.classList.remove("binded")
            button.prepend(iconWranch.cloneNode(true))
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
            button.prepend(iconWranch.cloneNode(true))
            capturing = false
            capturingButton = null
            const btnNumber = Number(button.dataset.keyNum)
            keyBindingValues.set(btnNumber, new Set([]))
        })
    }
}

function resetSingleButton(resetBtnNum) {
    console.log("here" + resetBtnNum)
    const buttonReset = Array.from(buttonsList).find((button) => button.dataset.keyNum === resetBtnNum)
    buttonReset.textContent = defaultMsg
    buttonReset.classList.remove("binded")
    buttonReset.prepend(iconWranch.cloneNode(true))
    keyBindingValues.set(Number(resetBtnNum), new Set([]))
}

function addInitialValuesUI() {
    buttonsList.forEach((button) => {
        //get info about button
        const buttonNumber = Number(button.dataset.keyNum)
        const currentSet = keyBindingValues.get(buttonNumber)
        //if no values are set to the button
        if (currentSet.size === 0) {
            return
        }

        const keyCombination = Array.from(currentSet).join(" + ")
        button.textContent = keyCombination
        button.classList.add("binded")
    })
}


toggleLogBtn.addEventListener("click", toggleLogArea)
controlsBtn.addEventListener("click", toggleControls)

//disable all capturing when we press out of the buttons
document.body.addEventListener("click", disableCaptureAll)

buttonReset.addEventListener("click", resetButtons)

buttonImport.addEventListener("click", async () =>{
    if (!buttonImport.classList.contains("disabled")){
        await sendToPico("import data")
    }
})