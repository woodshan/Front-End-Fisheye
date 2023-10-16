//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let photographerId = params.get('id');


async function getPhotographers() {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();

    const photographers = data.photographers;
    const medias = data.media;

    photographers.filter(photographer => {
        if(photographer.id === parseInt(photographerId)) {
            console.log("Info correspondant à l'id du photographe")
        }
    });

    medias.filter(media => {
        if(media.photographerId === parseInt(photographerId)) {
            console.log("Media correspondant à l'id du photographe");
        }
    });
}

getPhotographers();