function updatePaginationControls(paginationData) {
    // Remove existing pagination if any
    const existingPagination = document.getElementById("pagination-container")
    if (existingPagination) {
        existingPagination.remove()
    }

    //dont show pagination if there is only one page or no data
    if (paginationData.pages <= 1) {
        return
    }

    // Create pagination container
    const paginationContainer = document.createElement("div")
    paginationContainer.id = "pagination-container"
    paginationContainer.className = "pagination-container"

    // Create previous button
    const prevButton = document.createElement("button")
    prevButton.innerText = "Prev"
    prevButton.className = "pagination-btn prev-btn"
    prevButton.disabled = paginationData.page <= 1
    prevButton.onclick = () => showSaves(currentSearch, currentLiked, currentPage - 1)

    // Create next button
    const nextButton = document.createElement("button")
    nextButton.innerText = "Next"
    nextButton.className = "pagination-btn next-btn"
    nextButton.disabled = paginationData.page >= paginationData.pages
    nextButton.onclick = () => showSaves(currentSearch, currentLiked, currentPage + 1)

    // Create page info
    const pageInfo = document.createElement("span")
    pageInfo.className = "pagination-info"
    pageInfo.innerText = `Page ${paginationData.page} of ${paginationData.pages}`

    // Add page number buttons (show at most 5 pages)
    const pageButtons = document.createElement("div")
    pageButtons.className = "page-numbers"

    let startPage = Math.max(1, paginationData.page - 2)
    let endPage = Math.min(paginationData.pages, startPage + 4)
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4)
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button")
        pageBtn.innerText = i
        pageBtn.className = `page-number-btn ${i === paginationData.page ? 'active' : ''}`
        pageBtn.onclick = () => showSaves(currentSearch, currentLiked, i)
        pageButtons.appendChild(pageBtn)
    }

    const paginationControlsDiv = document.createElement("div")
    paginationControlsDiv.className = "pagination-controls-cont"

    // Assemble the pagination controls
    paginationControlsDiv.appendChild(prevButton)
    paginationControlsDiv.appendChild(pageButtons)
    paginationControlsDiv.appendChild(nextButton)
    paginationContainer.appendChild(paginationControlsDiv)
    paginationContainer.appendChild(pageInfo)

    // Add pagination after the saves container
    document.getElementById("section-right").appendChild(paginationContainer)
}