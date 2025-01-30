//variables
// const button1 = document.getElementById("key-1")
const capturingMsg = "Capturing key press"
const defaultMsg = "Press to bind"

let capturing = false
let capturingButton = null
let keyBindingValues = new Map()
//can delete this
let keyBindingDisplay = new Map()

// get all buttons and assign listener to them
const buttonsList = document.querySelectorAll(".button-bind")
buttonsList.forEach((button) => {
    const buttonNumber = Number(button.dataset.keyNum)
    //add all buttons to the bindings map
    keyBindingValues.set(buttonNumber, new Set([]))
    keyBindingDisplay.set(buttonNumber, new Set([]))

    //assign even listener on click
    button.addEventListener("click", (e) => {
        buttonClickListener(button, buttonNumber)
        e.stopPropagation()

    })
})


// listener on click function
const buttonClickListener = (buttonElement, buttonNumber) => {
    // when somethin elese was capturing disable it 
    disableCaptureAll()
    capturing = true
    capturingButton = Number(buttonNumber)
    buttonElement.classList.add("active")
    buttonElement.classList.add("binded")

    //check if some binding is already set and delete it
    keyBindingValues.set(capturingButton, new Set([]))
    keyBindingDisplay.set(capturingButton, new Set([]))
    
    buttonElement.textContent = capturingMsg
}


const getButtonByNum = (btnNum) => {
    const buttonsArray = Array.from(buttonsList)
    return buttonsArray.find((button) => Number(button.dataset.keyNum) === btnNum)
}

// events on keydown when capturing
document.addEventListener("keydown", (event) => {
    //if no button is "listening", I dont want to capture anything 
    if (!capturing) return;

    event.preventDefault();

    //get the current values
    let currentSet = keyBindingValues.get(capturingButton)
    let currentSetDisplay = keyBindingDisplay.get(capturingButton)
    currentSet.add(event.code)
    currentSetDisplay.add(event.key)
    
    keyBindingValues.set(capturingButton, currentSet)
    keyBindingDisplay.set(capturingButton, currentSetDisplay)

})

// events on keyup when capturing
document.addEventListener("keyup", (event) => {
    // console.log(pressedKeys1)
    if (!capturing) return
    
    //display the key combination the the button
    const currentSet = keyBindingValues.get(capturingButton)
    const keyCombination = Array.from(currentSet).join(" + ")
    console.log(keyCombination.length)
    const activeBtnElement = getButtonByNum(capturingButton)
    activeBtnElement.textContent = keyCombination
    activeBtnElement.classList.remove("active")
    
    capturing = false
    capturingButton = null
    console.log(keyBindingValues)

})
