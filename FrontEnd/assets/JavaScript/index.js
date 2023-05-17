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
        <button class= filters-btn>${categorie.name}</button>
        `;

        filters.insertAdjacentHTML("beforeend", htmlContentCate);
    }

    /* Déclarations des bouttons des filtres */

    const buttonsFilters = document.querySelectorAll('.filters-btn')

    /* Event Click pour les filtres */

    for (let i = 0; i < 4; i++) {

        buttonsFilters[i].addEventListener('click', () => {
            filterActive(i)
        })
    }

};

fetchCategories(creatCat);


/* intégration image à la modale */


const miniPictures = document.querySelector("body > div.modale-container > div.modale > div.mini_pictures")


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



/*toggle de la modale */

const modale = document.querySelector("body > div.modale-container")
const btnTrigger = document.querySelectorAll(".modale-trigger")


const modaleToggle = () => {
    modale.classList.toggle("active")
}


btnTrigger.forEach(trigger => trigger.addEventListener('click', modaleToggle))


/*Passage modale à l'autre */

const btnEdit = document.querySelector("#edit-trigger")
const modaleEdit = document.querySelector("body > div.modale-container-edit")

btnEdit.addEventListener('click', () => {
    modale.classList.remove('active')
    modaleEdit.classList.add('active')
})

const arrowReturn = document.querySelector(".fa-arrow-left")

arrowReturn.addEventListener('click', () => {
    modaleEdit.classList.remove('active')
    modale.classList.add('active')
})




/* Systéme fermeture 2éme modale */

const btnModaleClose = document.querySelectorAll('.modale-close')

const modaleClose = () => {
    modaleEdit.classList.remove('active')
}

btnModaleClose.forEach(triggerClose => triggerClose.addEventListener('click', modaleClose))




const imagePreview = document.getElementById('#file-selected')

imagePreview.addEventListener('change', previewFile);

const previewFile = () => {

}





