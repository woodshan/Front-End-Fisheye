export class FilterTemplate {
    createFilter () {
        const sort = document.createElement("div");
        const sortBy = document.createElement("p");
        const select = document.createElement("div");
        const popularity = document.createElement("button");
        const arrow = document.createElement("i");
        const hidden = document.createElement("div");
        const date = document.createElement("button");
        const title = document.createElement("button");

        sort.setAttribute("class", "sort")
        sortBy.setAttribute("class", "sort-by")
        select.setAttribute("class", "select")
        arrow.setAttribute("class", "fa-solid fa-chevron-down arrow-up");
        hidden.setAttribute("class", "hidden");
        popularity.setAttribute("value", "Popularité");
        date.setAttribute("value", "Date");
        title.setAttribute("value", "Titre");

        sortBy.innerText = "Trier par";
        popularity.innerText = "Popularité";
        date.innerText = "Date";
        title.innerText = "Titre";

        sort.appendChild(sortBy);
        sort.appendChild(select);
        select.appendChild(popularity);
        popularity.appendChild(arrow );
        select.appendChild(hidden);
        hidden.appendChild(date);
        hidden.appendChild(title);

        return sort;
    }
}