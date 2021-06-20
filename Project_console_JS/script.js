"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function(){
        personalMovieDB.count = +prompt("Сколько фиьмов вы уже посмотрели?", "");
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count))
        {
            personalMovieDB.count = +prompt("Сколько фиьмов вы уже посмотрели", "");
        }
    },
    setMovies: function(){
        for(let i = 0; i < personalMovieDB.count; i++){
            const 
                a = prompt("Один из последних просмотренных фильмов?",""),
                b = prompt("На сколько оцените его?","");
        
            if(a == null || b == null || a == "" || b == "" || a.length > 50)
            {
                console.log("Error");
                
                if (i == 0) 
                    i = 0;
                else 
                    i--;
            }    
            else
            {
                personalMovieDB.movies[a] = b;
                console.log("Done");
            }
        }
    },
    levelOfFilms: function(){
        if(personalMovieDB.count < 10)
            console.log("Просмотрено довольно мало фильмов");
        else if(personalMovieDB.count >= 10 && personalMovieDB.count <= 30)
            console.log("Вы классический зритель");
        else if(personalMovieDB.count > 30)
            console.log("Вы киноман");
        else
            console.log("Произошла ошибка");
    },
    showMyDB: function(){
        if(personalMovieDB.privat == false)
            console.log(personalMovieDB);
        else
            console.log("Access Denied");
    },
    writeYourGenres: function(){
        for (let i = 1; i < 2; i++) {
            let genre = prompt(`Введите ваши жанры через запятую`, "").toLocaleLowerCase(); 
            if(genre == null || genre === ""){
                console.log("Error");
                i--;
            }
            else{
                personalMovieDB.genres = genre.split("; ");
                personalMovieDB.genres.sort();
            }                       
        }

        personalMovieDB.genres.forEach((item) => {
            console.log(`Любимый жанры: ${item}`);
        });
    },
    toggleVisibleMyDB: function(){
       if(personalMovieDB.privat == false)
           personalMovieDB.privat = true;
       else
            personalMovieDB.privat = false; 
    }
};
