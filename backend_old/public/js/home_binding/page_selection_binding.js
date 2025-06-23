// page buttons
const pageOneBtn = document.getElementById('page-one');
const pageTwoBtn = document.getElementById('page-two');
const pageThreeBtn = document.getElementById('page-three');

// page containers
const pageOne = document.querySelector("[data-page='1']");
const pageTwo = document.querySelector("[data-page='2']");
const pageThree = document.querySelector("[data-page='3']");


function changeBtnPage(pageButtonsCont){
    pageOne.classList.remove("active")
    pageTwo.classList.remove("active")
    pageThree.classList.remove("active")

    pageButtonsCont.classList.add("active")

    pageButtonsCont.classList.add("showed")
    setTimeout(() => {
        pageButtonsCont.classList.remove("showed")
    }, 10)
}

pageOneBtn.addEventListener('click', () => {
    changeBtnPage(pageOne)
    pageBtnChangeColor(pageOneBtn);
})

pageTwoBtn.addEventListener('click', () => {
    changeBtnPage(pageTwo)
    pageBtnChangeColor(pageTwoBtn);
}) 

pageThreeBtn.addEventListener('click', () => {
    changeBtnPage(pageThree)
    pageBtnChangeColor(pageThreeBtn);
})



//change page on tab press
document.addEventListener('keydown', (e) => {
    if(e.key === "Tab") {
        e.preventDefault();
        if(pageOne.classList.contains("active")){
            changeBtnPage(pageTwo)
            pageBtnChangeColor(pageTwoBtn);
        } else if(pageTwo.classList.contains("active")){
            changeBtnPage(pageThree)
            pageBtnChangeColor(pageThreeBtn);
        } else if(pageThree.classList.contains("active")){
            changeBtnPage(pageOne)
            pageBtnChangeColor(pageOneBtn);
        }
    }
})