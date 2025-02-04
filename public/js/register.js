//get inputs
const inputUsername = document.querySelector('input[name="username"]');
const contUsername = document.querySelector('.input-cont-username')

const inputEmail = document.querySelector('input[name="email"]');
const inputPwd = document.querySelector('input[name="password"]');
const inputPwdConf = document.querySelector('input[name="passwordConfirm"]');

let errors = []

//add checking listeners when the user leaves the input
inputUsername.addEventListener("blur", checkUsername)
inputEmail.addEventListener("blur", checkEmail)
inputPwd.addEventListener("blur", checkPwd)
inputPwdConf.addEventListener("blur", checkPwdConf)


function checkUsername() {
    const username = inputUsername.value
    
    //check length
    if (username.length < 3 || username.length > 20) {
        if (!errors.includes("username")) {
            errors.push("username")
        }

        inputUsername.className = "inputError"

        //check if the error is already there
        let errIcon = document.querySelector('.username-error-icon');
        let usernameErrMsg = document.querySelector('.username-error-msg');
        
        // Add icon and message if it is not already there
        if (!errIcon) {
            errIcon = document.createElement("i");
            errIcon.classList.add("fa-solid", "fa-circle-info", "tooltip-icon", "username-error-icon");
            contUsername.appendChild(errIcon); 
        }
        if (!usernameErrMsg) {
            usernameErrMsg = document.createElement("span");
            usernameErrMsg.className = "tooltip-text username-error-msg";
            usernameErrMsg.textContent = "Username length must be 3-20!";
            contUsername.appendChild(usernameErrMsg); 
        }
    } else if (false) { //check validity
        return 
    } else { // if it is correct
        errors = errors.filter(item => item != "username")

        inputUsername.className = "inputCorrect"

        // Remove icon and message
        const errIcon = document.querySelector('.username-error-icon');
        const usernameErrMsg = document.querySelector('.username-error-msg');

        if (errIcon) {
            contUsername.removeChild(errIcon);
        }

        if (usernameErrMsg) {
            contUsername.removeChild(usernameErrMsg);
        }
    }

    console.log(errors)
}