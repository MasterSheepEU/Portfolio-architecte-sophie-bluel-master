"use strict";

const btnLogin = document.getElementById("login")
const headerGlobal = document.querySelector("body > header")
const presentationArticle = document.querySelector("#introduction > article")
const picture = document.querySelector("#introduction > figure")
const myproject = document.querySelector("#portfolio > h2")
const porteFolio = document.querySelector("#portfolio")
const filtersRemove = document.querySelector("#portfolio > div.filters")
const btnModale = document.querySelector("#edit-trigger")
const formGlobal = document.querySelector('.form-send')
const btnAddWork = document.querySelector("body > div.modale-container-edit > div.modale-edit > form > div.send > label")
const miniFigure = document.querySelector('.mini_pictures')
const modaleContainerEdit = document.querySelector('.modale-container-edit')
const titleInput = document.getElementById('title-work')
const categorySelect = document.getElementById('cat')
const photoInput = document.getElementById('file-selected')
const btnModaleClose = document.querySelectorAll('.modale-close')
const btnAddImage = document.querySelector("#file-selected")
const newImgArea = document.querySelector('.new-picture')


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

            if (confirm("Voulez-vous vraiment supprimer le projet ?")) {

                e.target.parentElement.remove();
                cleanGallery()
                fetchWorks(creatFiguresWork)
                alert("Projet supprimé")

            }

        }

    })
}

deleteElementDOM()


/* Fonction pour le passage du bouton de gris à vert */

function checkFormFields() {
    const titleValue = document.getElementById('title-work').value;
    const categoryValue = document.getElementById('cat').value;
    const imageFile = document.getElementById('file-selected').files[0];

    // Vérification champs
    const allFieldsFilled = titleValue.trim() !== '' && categoryValue.trim() !== '' && imageFile !== undefined;

    // Update de la couleur
    btnAddWork.style.backgroundColor = allFieldsFilled ? '#1D6154' : '#A7A7A7';
}

// Add event listeners pour les champs
titleInput.addEventListener('input', checkFormFields);
categorySelect.addEventListener('change', checkFormFields);
photoInput.addEventListener('change', checkFormFields);


/* File Reader */

btnAddImage.addEventListener("change", previewFile);

function previewFile() {

    const fileExtensionRegex = /\.(jpg|png)$/i;

    if (this.files.length === 0 || !fileExtensionRegex.test(this.files[0].name)) {
        return;
    }

    const file = this.files[0];
    const fileReader = new FileReader();


    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (e) => displayImage(e, file));

}


function displayImage(e, file) {

    const imgPreview = document.querySelector('.imgPreview')

    /* Suppression de l'espace type d'ajout */

    if (!imgPreview) {

        newImgArea.style.visibility = "hidden";

    }

    /* Déclaration du nouvel espace d'ajout et ajout de l'image récupéré avec FileReader */

    const containerImg = document.querySelector(".container-add")

    const displayImage =
        `   
        <figure class="imgPreview">
        
        <label for="file-selected" class=file-label> <img src=${e.target.result} class=imgScale></label>
        
        
        </figure>
        `;

    if (!imgPreview) {

        containerImg.insertAdjacentHTML('afterbegin', displayImage)

    } else {
        imgPreview.remove()
        containerImg.insertAdjacentHTML('afterbegin', displayImage)
    }
}

/* Fonction d'envois d'un nouveau Work */

formGlobal.addEventListener('submit', (e) => {

    e.preventDefault()
    const imgPreview = document.querySelector('.imgPreview')
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

        cleanGallery()
        fetchWorks(creatFiguresWork)
        miniFigure.innerHTML = "";
        fetchWorks(creatFiguresModale)
    }

    if (image === "" || title === "" || category === "") {
        alert('Veuillez compléter tous les champs')

    } else {
        alert('Projet envoyé')
        addWork(formData)
        imgPreview.remove()
        newImgArea.style.visibility = "visible"
        formGlobal.reset()
        modaleContainerEdit.classList.remove('active')

    }
})






