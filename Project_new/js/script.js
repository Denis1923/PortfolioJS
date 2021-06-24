"use strict";

window.addEventListener('DOMContentLoaded', () => {
    
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) =>{
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer
    
    const dedline = '2021-06-28';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else{
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerInterval = setInterval(updateClock, 1000);
        
            updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
                
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock('.timer', dedline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //браузер сам поймет что надо вставить
    }

    modalTrigger.forEach(btn =>{
        btn.addEventListener('click', openModal);    
    });   
    
    modalCloseBtn.addEventListener('click', closeModal);
   
    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });      

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        } 
    });

   // const modalTimerId = setTimeout(openModal, 3000);

    function showByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.
            documentElement.scrollHeight){
                openModal();
                window.removeEventListener('scroll', showByScroll);
        }
    }

    window.addEventListener('scroll', showByScroll);
    

    // используем классы для карточек товара

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        
        changeToUAH(){
            this.price = this.price * this.transfer;
        }
        
        render(){
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
                                    <img src=${this.src} alt=${this.alt}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.descr}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>
                                </div>
                                `;
            this.parent.append(element);
        }
    }

    // const div = mew MenuCard();
    // div.render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.',
        250,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.',
        20,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.',
        25,
        ".menu .container"
    ).render();
});