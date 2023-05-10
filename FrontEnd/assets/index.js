"use strict";

/* Déclaration des variables*/

const workRecover = "http://localhost:5678/api/works";
const catRecover = "http://localhost:5678/api/categories";
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let indexFilter = 0



/* Fonction nettoyage pour les filtres */

const swipe = () => {
    const works = document.querySelectorAll(".gallery > figure")
    works.forEach((work) => {
        work.remove()
    })
}


/* Fonction mis en place des filtres */

const filterActive = (indexNumber) => {
    indexFilter = indexNumber
    swipe()
    fetchWorks(creatFigures)
}


/* Récupération des données des travaux */

const fetchCategories = async (inportCat) => {
    fetch(catRecover)
        .then((res) => {
            console.log(res.ok);
            console.log(res.status);
            return res.json();
        })
        .then((categories) => inportCat(categories))
        .catch((error) => console.log(`Erreur : ${error}`));
};

/* Récupération des données des bouttons */

const fetchWorks = async (inportWork) => {
    fetch(workRecover)
        .then((res) => {
            console.log(res.ok);
            console.log(res.status);
            return res.json();
        })
        .then((works) => inportWork(works))
        .catch((error) => console.log(`Erreur : ${error}`));
};

/* Fonction création de la galarie des travaux */

const creatFigures = (items) => {
    for (const item of items) {

        if (item.categoryId === indexFilter || indexFilter === 0) {

            const htmlContentWork = `
            
            <figure>
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            </figure >
            
            `;

            gallery.insertAdjacentHTML("beforeend", htmlContentWork);

        }
    }
};

fetchWorks(creatFigures);


/* Fonction création des bouttons de filtres + ajout de la fonctionnalité de filtrage */

const creatCat = (categories) => {

    for (const categorie of categories) {

        const htmlContentCate = `
        <button>${categorie.name}</button>
        `;

        filters.insertAdjacentHTML("beforeend", htmlContentCate);
    }

    /* Déclarations des bouttons des filtres */

    const buttons = document.querySelectorAll('button')

    /* Event Click pour les filtres */

    buttons[0].addEventListener('click', () => {
        filterActive(0)
    })

    buttons[1].addEventListener('click', () => {
        filterActive(1)
    })

    buttons[2].addEventListener('click', () => {
        filterActive(2)
    })

    buttons[3].addEventListener('click', () => {
        filterActive(3)
        console.log('test');
    })

};

fetchCategories(creatCat);











































const miniPictures = document.querySelector("body > div.modale-container > div.modale > div.mini_pictures")


const creatFiguresModale = (items) => {
    for (const item of items) {

        if (item.categoryId === indexFilter || indexFilter === 0) {

            const htmlContentWork = `
            
            <article class="work-img">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <i class="fa-solid fa-trash-can"></i>
                <img src=${item.imageUrl} alt=${item.title}>
                <span>éditer</span>
            </article>

            `;

            miniPictures.insertAdjacentHTML("beforeend", htmlContentWork);

        }
    }
};

fetchWorks(creatFiguresModale)


const modale = document.querySelector("body > div.modale-container")
const btnTrigger = document.querySelectorAll(".modale-trigger")


const modaleToggle = () => {
    modale.classList.toggle("active")
}


btnTrigger.forEach(trigger => trigger.addEventListener('click', modaleToggle))

