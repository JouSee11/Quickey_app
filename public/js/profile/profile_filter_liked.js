const likedBtn = document.getElementById("liked-button")
let filterLiked = false

likedBtn.addEventListener("click", () => {
    filterLiked = !filterLiked
    likedBtn.classList.toggle("selected")

    likedBtn.innerHTML = likedBtn.classList.contains("selected") ? "<i class='fa-solid fa-heart'></i>Liked" : "<i class='fa-solid fa-heart'></i>All"

    searchText = searchInput.value
    showSaves(searchText, filterLiked)
})