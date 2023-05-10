const btnLogin = document.querySelector("body > header > nav > ul > a > li")
const headerGlobal = document.querySelector("body > header")

const presentationArticle = document.querySelector("#introduction > article")
const picture = document.querySelector("#introduction > figure")

const myproject = document.querySelector("#portfolio > h2")
const porteFolio = document.querySelector("#portfolio")

const filtersRemove = document.querySelector("#portfolio > div.filters")

const editPost = () => {
    const editPost = `
    
    <div class="edit_post">
		<i class="fa-regular fa-pen-to-square"></i><div class="edit_mod">Mode édition</div>
		<button class="btn_post">publier les changements</button>
	</div>
    
    `
    headerGlobal.insertAdjacentHTML("beforebegin", editPost)
}


const editArticle = () => {
    const editArticle = `
    
    <div class="description_edit">
    <i class="fa-regular fa-pen-to-square"></i> modifier
    </div>
    `

    presentationArticle.insertAdjacentHTML('afterbegin', editArticle)

}


const editPicture = () => {
    const editPicture = `

    <div class="picture_edit">
    <i class="fa-regular fa-pen-to-square"></i> modifier
    </div>

    `

    picture.insertAdjacentHTML('beforeend', editPicture)

}


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


if (sessionStorage.token) {

    btnLogin.textContent = "logout"

    filtersRemove.remove()

    editPost()

    editArticle()

    editPicture()

    editGallery()

}


btnLogin.addEventListener('click', () => {

    sessionStorage.removeItem('token')

})











































let workId = ""



const deleteUrl = `http://localhost:5678/api/works/${workId}`


const deleteWork = () => {

    fetch(deleteUrl, {
        method: 'DELETE',
        body: 1,
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
        }
    })

}





