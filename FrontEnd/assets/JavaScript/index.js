"use strict";

/* Déclaration des variables*/

const workRecover = "http://localhost:5678/api/works";
const catRecover = "http://localhost:5678/api/categories";
const gallery = document.getElementById('gallery')
const filters = document.querySelector(".filters");
const miniPictures = document.querySelector("body > div.modale-container > div.modale > div.mini_pictures")
const modale = document.querySelector("body > div.modale-container")
const btnTrigger = document.querySelectorAll(".modale-trigger")
const btnEdit = document.querySelector("#edit-trigger")
const modaleEdit = document.querySelector("body > div.modale-container-edit")
const arrowReturn = document.querySelector(".fa-arrow-left")
const containerAdd = document.querySelector('.container-add')
const imgPreview = document.querySelector('.imgPreview')
const imageFile = document.querySelector('.imgScale')
let indexFilter = 0


/* Fonction nettoyage pour les filtres */

const cleanGallery = () => {
    const works = document.querySelectorAll("#gallery > figure")
    works.forEach((work) => {
        work.remove()
    })
}

/* Fonction mis en place des filtres */

const filterActive = (indexNumber) => {
    indexFilter = indexNumber
    cleanGallery()
    fetchWorks(creatFiguresWork)
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

const creatFiguresWork = (items) => {
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

fetchWorks(creatFiguresWork);

/* Fonction création des bouttons de filtres + ajout de la fonctionnalité de filtrage */

const creatBtnCat = (categories) => {

    for (const categorie of categories) {

        const htmlContentCate = `
        <button class= filters-btn data-id=${categorie.id}>${categorie.name}</button>
        `;

        filters.insertAdjacentHTML("beforeend", htmlContentCate);
    }

    /* Déclarations des bouttons des filtres */

    const buttonsFilters = document.querySelectorAll('.filters-btn')

    /* Event Click pour les filtres + fond vert */

    for (let i = 0; i < buttonsFilters.length; i++) {

        buttonsFilters[i].addEventListener('click', () => {
            filterActive(i)

            buttonsFilters.forEach(btn =>
                btn.classList.remove('active'),
            )

            buttonsFilters[i].classList.add('active')
        })
    }

};

fetchCategories(creatBtnCat);


/*Toggle de la modale */


const modaleToggle = () => {
    modale.classList.toggle("active")

    if (!modaleEdit.classList.contains('active')) {
        formGlobal.reset()
    }

}

btnTrigger.forEach(trigger => trigger.addEventListener('click', modaleToggle))


/*Passage modale à l'autre */

btnEdit.addEventListener('click', () => {
    modale.classList.remove('active')
    modaleEdit.classList.add('active')
})

arrowReturn.addEventListener('click', () => {
    modaleEdit.classList.remove('active')
    modale.classList.add('active')
})


/* Systéme fermeture 2éme modale */

const modaleClose = () => {
    modaleEdit.classList.remove('active')
}

btnModaleClose.forEach(triggerClose => triggerClose.addEventListener('click', modaleClose))


/* Intégration image à la modale */

const creatFiguresModale = (items) => {
    for (const item of items) {

        if (item.categoryId === indexFilter || indexFilter === 0) {

            const htmlContentWork = `
            
            <article class="work-img">
                <i class="fa-solid fa-arrows-up-down-left-right"></i>
                <i class="fa-solid fa-trash-can ${item.id}"></i>
                <img src=${item.imageUrl} alt=${item.title}>
                <span>éditer</span>
            </article>

            `;

            miniPictures.insertAdjacentHTML("beforeend", htmlContentWork);

        }
    }
};

fetchWorks(creatFiguresModale)





