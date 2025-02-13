const deleteButton = document.getElementById("button-delete")

deleteButton.addEventListener("click", deleteItem)

async function deleteItem() {
    if (!confirm("Do you really want to delete this save?")) return 

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Automatically decoded value

    try {
        const response = await fetch("/api/profile/item", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                deleteId: itemId 
            })
        })

        const responseData = await response.json()

        if (responseData.status === "error") {
            return console.log("error deleting item")
        }

        window.location.href = "/profile"


        console.log(response)

        
    } catch (error) {
        return 
    }
}