function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement("h3");
        const description = document.createElement("p");
        const pricePerDay = document.createElement("p");

        link.setAttribute("aria-label", name);
        link.setAttribute("href", `photographer.html?id=${id}`);
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        description.classList.add("description");
        pricePerDay.classList.add("price");

        h2.textContent = name;
        location.textContent = `${city}, ${country}`;
        description.textContent = tagline;
        pricePerDay.textContent = `${price}€/jour`

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(pricePerDay);

        return (article);
    }

    return { name, picture, getUserCardDOM }
}