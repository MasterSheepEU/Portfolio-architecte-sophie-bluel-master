"use strict";


/* Déclaration des variables */

const url = "http://localhost:5678/api/users/login";
const loginForm = document.querySelector("#login");


/* Récupération des données de connection */




const login = async (email, password) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        return response.json();

    } catch (error) {
        console.error("Erreur:", error);
        return null;
    }
};



const loginSend = async (e) => {

    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    login(email, password).then((data) => {
        if (data) {
            console.log(data);
            const token = localStorage.setItem("token", data.token);
            console.log(token);
        }
    });
};

loginForm.addEventListener("submit", loginSend);
