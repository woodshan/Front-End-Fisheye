/**
 * Fetch datas
 */
export default class Api {
    constructor(url) {
        this._url = url
    }

    async getData() {
        const response = await fetch(this._url);
        const data = await response.json();

        return data
    }
}