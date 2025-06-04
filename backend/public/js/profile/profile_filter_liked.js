const likedBtn = document.getElementById("liked-button")

likedBtn.addEventListener("click", () => {
    currentLiked = !currentLiked
    likedBtn.classList.toggle("selected")

    likedBtn.innerHTML = likedBtn.classList.contains("selected") ? "<i class='fa-solid fa-heart'></i>Liked" : "<i class='fa-solid fa-heart'></i>All"

    searchText = searchInput.value
    showSaves(searchText, currentLiked, 1)
})