//get inputs
const inputUsername = document.querySelector('input[name="username"]');
const contUsername = document.querySelector('.input-cont-username')

const inputEmail = document.querySelector('input[name="email"]');
const contEmail = document.querySelector('.input-cont-email')

const inputPwd = document.querySelector('input[name="password"]');
const contPwd = document.querySelector('.input-cont-pwd')

const inputPwdConf = document.querySelector('input[name="passwordConfirm"]');
const contPwdConf = document.querySelector('.input-cont-pwdConf')

const submitBtn = document.querySelector("button[type='submit']")

// add everything to the errors, because nothing is filled
let errors = ["pwd", "pwdConf"]

if (inputUsername.vlaue === "") errors.push("username")
if (inputEmail.vlaue === "") errors.push("email")

//add checking listeners when the user leaves the input
inputUsername.addEventListener("blur", checkUsername)
inputEmail.addEventListener("blur", checkEmail)
inputPwd.addEventListener("blur", checkPwd)
inputPwdConf.addEventListener("blur", checkPwdConf)

// username check
async function checkUsername() {
    const username = inputUsername.value
    
    //check length
    if (username.length < 3 || username.length > 20) {
        if (!errors.includes("username")) {
            errors.push("username")
        }
        inputUsername.className = "inputError"
        changeErrorUI("username", contUsername, "Username length must be 3-20!")

    } else if (!(await checkUniqueUsername(username))) { // username if username is unique
        if (!errors.includes("username")) {
            errors.push("username")
        }
        inputUsername.className = "inputError"
        changeErrorUI("username", contUsername, "Username is already taken")
        
    } else { // if it is correct
        errors = errors.filter(item => item != "username")

        inputUsername.className = "inputCorrect"

        changeCorrectUI("username", contUsername)
    }

    console.log(errors)
}

async function checkUniqueUsername(usernameVal) {
    try{
        const response = await fetch("/api/auth/unique-username", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameVal
            })
        })

        if (!response.ok) {
            return true
        }

        const {unique} = await response.json()

        if (unique === "true") {
            return true
        } else {
            return false
        }
    } catch (error) {
        return true
    }
}

//email check
async function checkEmail() {
    const email = inputEmail.value
    
    //check email validity
    if (!validator.isEmail(email)) {
        if (!errors.includes("email")) {
            errors.push("email")
        }
        inputEmail.className = "inputError"
        changeErrorUI("email", contEmail, "Email is not valid")
    } else if (!(await checkUniqueEmail(email))) {
        if (!errors.includes("email")) {
            errors.push("email")
        }
        inputEmail.className = "inputError"
        changeErrorUI("email", contEmail, "Email is already taken")
        
    } else { // if it is correct  
        errors = errors.filter(item => item != "email")

        inputEmail.className = "inputCorrect"

        changeCorrectUI("email", contEmail)
    }

    console.log(errors)
}

async function checkUniqueEmail(emailVal) {
    try{
        const response = await fetch("/api/auth/unique-email", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailVal
            })
        })

        if (!response.ok) {
            return true
        }

        const {unique} = await response.json()

        if (unique === "true") {
            return true
        } else {
            return false
        }
    } catch (error) {
        return true
    }
}


//password check
function checkPwd() {
    const pwd = inputPwd.value
    
    //check email validity
    if (pwd.length < 8 || pwd.length > 256) {
        if (!errors.includes("pwd")) {
            errors.push("pwd")
        }
        inputPwd.className = "inputError"
        changeErrorUI("pwd", contPwd, "Password length: 8-256")
    } else if (!checkPwdValid(pwd)) {
        if (!errors.includes("pwd")) {
            errors.push("pwd")
        }
        inputPwd.className = "inputError"
        changeErrorUI("pwd", contPwd, "Password requirements: -[A-Z] -[0-9]")
        
    } else { // if it is correct  
        errors = errors.filter(item => item != "pwd")

        inputPwd.className = "inputCorrect"

        changeCorrectUI("pwd", contPwd)
    }

    console.log(errors)
}

function checkPwdValid(pwd) {
    const hasUppercase = /[A-Z]/.test(pwd);  // Checks for at least one uppercase letter
    const hasNumber = /\d/.test(pwd);        // Checks for at least one digit
    if (!hasNumber || !hasUppercase) {
        return false
    }
    return true
}

//check pwd confirm
async function checkPwdConf() {
    const pwd = inputPwd.value
    const pwdConf = inputPwdConf.value
    
    //check email validity
    if (pwd !== pwdConf || pwdConf === "") {
        if (!errors.includes("pwdConf")) {
            errors.push("pwdConf")
        }
        inputPwdConf.className = "inputError"
        changeErrorUI("pwdConf", contPwdConf, "Passwords do not match")
    } else { // if it is correct  
        errors = errors.filter(item => item != "pwdConf")
        inputPwdConf.className = "inputCorrect"
        changeCorrectUI("pwdConf", contPwdConf)
    }

    console.log(errors)
}


//check ui states
function changeErrorUI(inputName, inputCont, msg = "") {
    //check if the error is already there
    let errIcon = document.querySelector(`.${inputName}-error-icon`);
    let errMsg = document.querySelector(`.${inputName}-error-msg`)
    
    // Add icon and message if it is not already there
    if (!errIcon) {
        errIcon = document.createElement("i");
        errIcon.classList.add("fa-solid", "fa-circle-info", "tooltip-icon", `${inputName}-error-icon`);
        inputCont.appendChild(errIcon); 
    }

    // remove the msg and show it with actuall msg
    if (errMsg) {
        errMsg.parentNode.removeChild(errMsg)
    }
    errMsg = document.createElement("span");
    errMsg.className = `tooltip-text ${inputName}-error-msg`;
    errMsg.textContent = msg;
    inputCont.appendChild(errMsg); 
}

function changeCorrectUI(inputName, inputCont) {
    // Remove icon and message
    const errIcon = document.querySelector(`.${inputName}-error-icon`);
    const errMsg = document.querySelector(`.${inputName}-error-msg`);

    if (errIcon) {
        inputCont.removeChild(errIcon);
    }

    if (errMsg) {
        inputCont.removeChild(errMsg);
    }
}



submitBtn.addEventListener("click", (e) => {
    checkUsername()
    checkEmail()
    checkPwd()
    checkPwdConf()
    if (errors.length !== 0) {
        e.preventDefault()
    }
})