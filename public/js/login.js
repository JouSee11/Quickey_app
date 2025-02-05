const loginBtn = document.querySelector("button[type='submit']")
const usernameInput = document.querySelector("input[name='username']")
const emailInput = document.querySelector("input[name='password']")

loginBtn.addEventListener("click", (e) => {
    if (usernameInput.value === "" || emailInput.value === "") e.preventDefault()
})