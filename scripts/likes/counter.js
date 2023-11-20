export class Counter {
    constructor() {
        this._count = 0;
    }

    update(action, count) {
        this._count = Number(count.innerText);
        let sumLikes = Number(document.querySelector(".total_likes").innerText);

        if(action === "INC") {
            this._count += 1;
            document.querySelector(".total_likes").innerText = sumLikes += 1;
        } else if(action === "DEC") {
            this._count -= 1;
            document.querySelector(".total_likes").innerText = sumLikes -= 1;
        } else {
            throw "Unknow action";
        }

        count.innerHTML = this._count;
    }
}