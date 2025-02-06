window.addEventListener("beforeunload", saveToSession);
window.addEventListener("DOMContentLoaded", laodFromSession);


function saveToSession(e) {
    //convert the current binding to data that can be recieved by the server
    const mapObject = Object.fromEntries(
        Array.from(keyBindingValues, ([key, value]) => [key, Array.from(value)])
      )
    
    axios.post("/api/session/save-binding", mapObject)
        .then(response => {
            console.log(response.data.msg)
        })
        .catch(error => {
            e.preventDefault()
            this.alert("Data cannot be saved")
        })

    e.preventDefault(); // Required in some browsers
    e.returnValue = "Are you sure you want to leave?";
}



