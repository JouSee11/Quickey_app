const likeBtn = document.getElementById("like-button")

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id'); // Automatically decoded value

likeBtn.addEventListener("click", toggleLike)

//set initial state
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/key-binding/check-user-like" ,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ itemId: itemId })
        })

        const responseData = await response.json()
        if (responseData.status === "success") {
            if (responseData.curStatus) {
                likeBtn.classList.toggle("active")
            }
        }

    } catch (error) {
        console.log(error)
    }
})

async function toggleLike() {
    try {
        const response = await fetch("/api/key-binding/like", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                itemId: itemId
            })
        })

        const responseData = await response.json()
        if (responseData.status === "success") {
            likeBtn.classList.toggle("active")
        }
    } catch (error) {
        console.log(error)
    }
}
