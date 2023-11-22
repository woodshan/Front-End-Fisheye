/**
 * Observer pattern
 */
export default class Subject {
  constructor() {
    // Set an empty array of subscribed subject observers
    this._observers = [];
  }

  /**
   * Observer subscribes to subject
   * &
   * add to observers list
   * @param {Object} observer
   */
  subscribe(observer) {
    this._observers.push(observer);
  }

  /**
   * Observer unsubscribes to subject
   * &
   * remove the observer
   * @param {Object} observer
   */
  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  /**
   * Notify all subscribed observers
   * &
   * update observer
   * @param {string} action
   * @param {Object} count
   */
  fire(action, count) {
    this._observers.forEach((observer) => observer.update(action, count));
  }
}
