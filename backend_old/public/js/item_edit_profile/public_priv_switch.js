const toggleBtn = document.getElementById("public-priv-toggle")

//add the ui functionality to toggle button
toggleBtn.addEventListener("change", saveStateChange)

async function saveStateChange() {
    const isPublic = toggleBtn.checked

    //get item id from the url
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value

    try {
        const response = await fetch("/api/key-binding/edit-state", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isPublic: isPublic,
                itemId: itemId
            })
        })

        const responseData = await response.json()
        if (responseData.status === "error") {
            // showMsgState(responseData.msg, "error")
            return
        }

        const successMag = isPublic ? "Item set to public" : "Item set to private"
        // showMsgState(successMag, "success")
    } catch (error) {
        console.log(error)
    }
}

//set the initial statte