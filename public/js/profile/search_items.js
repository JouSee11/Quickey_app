const searchInput = document.getElementById("search-saves-profile")

// A simple debounce function
function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

// Debounce the search function for 300ms delay
const debouncedSearch = debounce((event) => {
    const query = event.target.value;
    showSaves(query, currentLiked, 1);
}, 300);

searchInput.addEventListener("input", debouncedSearch);