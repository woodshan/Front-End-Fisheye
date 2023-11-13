export class Subject {
    constructor() {
        this._observers = []
    }

    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer);
    }

    fire(action, count) {
        this._observers.forEach(obeserver => obeserver.update(action, count));
    }
}