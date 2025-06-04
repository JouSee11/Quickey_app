const tokenInput = document.getElementById("input-code")
const verifyForm = document.getElementById("form-cont"); // ensure your form has an id

window.addEventListener("beforeunload", confirmExit)
console.log("herer")

async function confirmExit(e) {  
    e.preventDefault()
    e.returnValue = ""
}

// Remove beforeunload listener on form submission.
verifyForm.addEventListener("submit", () => {
    window.removeEventListener("beforeunload", confirmExit);
});