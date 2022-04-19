'use strict';

document.addEventListener('DOMContentLoaded', ()=> {

    function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        //------tabs
        const   tabs = document.querySelectorAll(tabsSelector),
                tabsContent = document.querySelectorAll(tabsContentSelector),
                tabsParent = document.querySelector(tabsParentSelector);
    
        function hideTabContent (){
            tabsContent.forEach(element => {
                element.classList.add('hide');
                element.classList.remove('show', 'fade');
            });
            tabs.forEach(element =>{
                element.classList.remove(activeClass);
            });
        }
    
        function showTabContent (i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
        
    
        tabsParent.addEventListener('click', (event)=> {
            const target = event.target;
            if(target && target.classList.contains(tabsSelector.slice(1))){
                tabs.forEach((item, i) => {
                    if(target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }

/* 

    function cards() {
        class MenuCard {
            constructor(img, alt, title, descr, cost, parent, ...clases){
                this.img = img;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.cost = cost;
                this.clases = clases;
                this.parent = document.querySelector(parent);
            }
        
            render(){
                const element = document.createElement('div');
                if (this.clases.length === 0){
                    this.element = "menu__item";
                    element.classList.add(this.element);
                }else{
                    this.clases.forEach(className => element.classList.add(className));
                }
                
                element.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.cost}</span> руб/день</div>
                    </div>
                `;
                this.parent.append(element);
            }
        }
        
        getResource('http://localhost:3000/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price,}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            }); 
    } */

    function openModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
    
        modal.classList.remove('hide'); 
        modal.classList.add('show'); 
        modal.classList.toggle('fade');
        document.body.style.overflow = 'hidden';
    
    }
    
    function closeModal (modalSelector) {
        const modal = document.querySelector(modalSelector);
    
        modal.classList.remove('show'); 
        modal.classList.add('hide'); 
        modal.classList.toggle('fade');
        document.body.style.overflow = '';
    }
    
    function modal (triggerSelector, modalSelector) {
        const modalShow = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    
        modalShow.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector)); 
        });
    
        modal.addEventListener('click', (e)=> {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
        });
        document.addEventListener('keydown', (e) => {
        if (e.code ==="Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
        });
    
        function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        } 
        }
    
        window.addEventListener('scroll', showModalByScroll);
    }


    tabs('.catalog__tab', '.catalog__item', '.catalog__tabs', 'catalog__tab-active');
    modal('[data-modal]', '.modal');

});

