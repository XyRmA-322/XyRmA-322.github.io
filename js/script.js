const   hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeEl = document.querySelector('.menu__close');
        l1 = document.querySelector('.l1');
        l2 = document.querySelector('.l2');
        l3 = document.querySelector('.l3');
        l4 = document.querySelector('.l4');
        l5 = document.querySelector('.l5');
hamburger.addEventListener('click', ()=>{
    menu.classList.add('active');
});

closeEl.addEventListener('click', ()=>{
    menu.classList.remove('active');
});

l1.addEventListener('click', ()=>{
    menu.classList.remove('active');
});
l2.addEventListener('click', ()=>{
    menu.classList.remove('active');
});
l3.addEventListener('click', ()=>{
    menu.classList.remove('active');
});
l4.addEventListener('click', ()=>{
    menu.classList.remove('active');
});
l5.addEventListener('click', ()=>{
    menu.classList.remove('active');
});



 

    