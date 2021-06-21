"use strict";
/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Я Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const reklama = document.querySelectorAll('.promo__adv'),
            poster = document.querySelector('.promo__bg'),
            zhanr = poster.querySelector('.promo__genre'),
            movieList = document.querySelector('.promo__interactive-list'),
            addForm = document.querySelector('form.add'),
            addInput = addForm.querySelector('.adding__input'),
            checkbox = addForm.querySelector('[type="checkbox"]'),
            btn = addForm.querySelector('button');
    
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm){

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            
            if (favorite) {
                console.log('Добавляем любимый фильм ');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            
            createMovieList(movieDB.movies, movieList);
        }
        else{
            alert("Ничего не ввели");
        }
        e.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });    
    };     
   
    const makeChanges = () =>{
        zhanr.textContent = 'ДРАМА';
        poster.style.backgroundImage = 'url("img/bg.jpg")'; 
    };   

    const sortArr = (arr) => {
        arr.sort();
    };    

    function createMovieList(films, parent){
        parent.innerHTML = "";
        
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film} 
                <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) =>{
            btn.addEventListener('click', () =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
                
            });
        });
    }

    deleteAdv(reklama);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});




