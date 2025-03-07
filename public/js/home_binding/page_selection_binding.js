// page buttons
const pageOneBtn = document.getElementById('page-one');
const pageTwoBtn = document.getElementById('page-two');
const pageThreeBtn = document.getElementById('page-three');

// page containers
const pageOne = document.querySelector("[data-page='1']");
const pageTwo = document.querySelector("[data-page='2']");
const pageThree = document.querySelector("[data-page='3']");

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

function changeBtnPage(pageButtonsCont){
    pageOne.classList.remove("active")
    pageTwo.classList.remove("active")
    pageThree.classList.remove("active")

    pageButtonsCont.classList.add("active")

    pageButtonsCont.classList.add("showed")
    setTimeout(() => {
        pageButtonsCont.classList.remove("showed")
    }, 1)

}