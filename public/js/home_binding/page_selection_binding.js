const pageOneBtn = document.getElementById('page-one');
const pageTwoBtn = document.getElementById('page-two');
const pageThreeBtn = document.getElementById('page-three');

pageOneBtn.addEventListener('click', () => {
    pageBtnChangeColor(pageOneBtn);
})

pageTwoBtn.addEventListener('click', () => {
    pageBtnChangeColor(pageTwoBtn);
}) 

pageThreeBtn.addEventListener('click', () => {
    pageBtnChangeColor(pageThreeBtn);
})

