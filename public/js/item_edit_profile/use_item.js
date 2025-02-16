const useButton = document.getElementById("button-use")

useButton.addEventListener("click", useCurrentItem)


async function useCurrentItem() {
    try {
        const formatedBinding = await getFormatedBinding()
        //send data to server
        const response = await fetch("/api/session/save-binding", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formatedBinding),
        })

        if (response.ok) {
            window.location.href = "/"
        }
        
    } catch (error) {
        console.log(error)        
    }



}

async function getFormatedBinding(){
    try {
        //get the id and fetch the binding for the item save
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id'); // Automatically decoded value
        
        const response = await fetch("/api/profile/item?id=" + encodeURIComponent(itemId))
        const jsonData = await response.json()
        const {keyBinding} = jsonData.data[0]
    
        const keyBindingFormated = {}
    
        keyBinding.forEach(element => {
            const elementIndex = element.keyIndex
            keyBindingFormated[elementIndex] = element.keyValues
        });
    
        return keyBindingFormated
        
    } catch (error) {
        console.log(error)
        return "error getting data"
    }
}