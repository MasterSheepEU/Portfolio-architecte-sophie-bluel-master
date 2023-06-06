"use strict";


const btnLogin = document.getElementById("login")
const headerGlobal = document.querySelector("body > header")

const presentationArticle = document.querySelector("#introduction > article")
const picture = document.querySelector("#introduction > figure")

const myproject = document.querySelector("#portfolio > h2")
const porteFolio = document.querySelector("#portfolio")

const filtersRemove = document.querySelector("#portfolio > div.filters")

/* Ajout bandeau noir pour l'édition */

const editPost = () => {
    const editPost = `
    
    <div class="edit_post">
		<i class="fa-regular fa-pen-to-square"></i><div class="edit_mod">Mode édition</div>
		<button class="btn_post">publier les changements</button>
	</div>
    
    `
    headerGlobal.insertAdjacentHTML("beforebegin", editPost)
}

/* Ajout bouton édition description */

const editArticle = () => {
    const editArticle = `
    
    <div class="description_edit">
    <i class="fa-regular fa-pen-to-square"></i> modifier
    </div>
    `

    presentationArticle.insertAdjacentHTML('afterbegin', editArticle)

}

/* Ajout bouton modification de la photo*/

const editPicture = () => {
    const editPicture = `

    <div class="picture_edit">
    <i class="fa-regular fa-pen-to-square"></i> modifier
    </div>

    `

    picture.insertAdjacentHTML('beforeend', editPicture)

}

/*Ajout du bouton pour l'édition de la galerie */

const editGallery = () => {

    myproject.remove()

    const editGallery = `
    
    <div class="gallery_edit">
    
        <h2>Mes projets</h2>
    
        <div class="btn_edit modale-trigger">
        <i class="fa-regular fa-pen-to-square"></i> modifier
        </div>
    
    </div>
    
    `;

    porteFolio.insertAdjacentHTML("beforebegin", editGallery);

}


/* Appel des fonctions créées précédement si le token est bien enregistrer */

if (sessionStorage.token) {

    btnLogin.textContent = "logout"

    filtersRemove.remove()

    editPost()

    editArticle()

    editPicture()

    editGallery()

}


/* Ajout de la fonctionnalité de vidange du sessionStorage une fois la déconnexion */

btnLogin.addEventListener('click', () => {

    sessionStorage.removeItem('token')

})




/* Fonction pour la suppresion des travaux depuis la modale pour la galerie */

const deleteElementDOM = () => {

    const modale = document.querySelector("body > div.modale-container")

    modale.addEventListener('click', (e) => {

        let workId = e.target.classList[2]
        const deleteUrl = `http://localhost:5678/api/works/${workId}`


        if (e.target.classList.contains('fa-trash-can')) {

            fetch(deleteUrl, {
                method: 'DELETE',
                body: 1,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`,
                }
            })

            e.target.parentElement.remove();

            swipe()
            fetchWorks(creatFigures)

            alert('Projet supprimé')
        }

    })
}

deleteElementDOM()




const btnModale = document.querySelector("#edit-trigger")

btnModale.addEventListener('click', () => {
    modale.classList.remove('active')
})

const formGlobal = document.querySelector('.form-send')
const btnAddWork = document.querySelector("body > div.modale-container-edit > div.modale-edit > form > div.send > label")


const miniFigure = document.querySelector('.mini_pictures')
const modaleContainerEdit = document.querySelector('.modale-container-edit')

formGlobal.addEventListener('submit', (e) => {

    e.preventDefault()

    const image = document.getElementById('file-selected').files[0];
    const title = document.getElementById('title-work').value;
    const category = document.getElementById('cat').value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);


    const addWork = async (formData) => {
        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${sessionStorage.token}`,
                },
                body: formData,
            });
        } catch (error) {
            console.log(error);
        }

        swipe()
        fetchWorks(creatFigures)
        miniFigure.innerHTML = "";
        fetchWorks(creatFiguresModale)
    }

    if (image === "" || title === "" || category === "") {
        alert('Veuillez compléter tous les champs')

    } else if (btnAddWork.classList.contains("grey-color")) {

        btnAddWork.addEventListener("mouseover", () => {
            btnAddWork.classList.remove('grey-color')
            btnAddWork.classList.add('green-color')
        })


        // btnAddWork.classList.remove('grey-color')
        // btnAddWork.classList.add('green-color')
        return;




    } else {
        alert('Projet envoyé')
        addWork(formData)
        modaleContainerEdit.classList.remove('active')

    }
})











