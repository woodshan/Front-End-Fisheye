/**
 * Observer pattern
 * Observe a subject and react sent actions
 */
export default class Counter {
  constructor() {
    // set counter
    this._count = 0;
  }

  /**
   * When subject notify change of state update observer
   * @param {string} action (like/unlike)
   * @param {Object} count number of likes
   */
  update(action, count) {
    // set counter to number of likes
    this._count = Number(count.innerText);
    // set total likes
    let sumLikes = Number(document.querySelector(".total_likes").innerText);

    // Like
    if (action === "INC") {
      // Like +1
      this._count += 1;
      // Total likes  +1
      document.querySelector(".total_likes").innerText = sumLikes += 1;

      // Unlike
    } else if (action === "DEC") {
      // Like -1
      this._count -= 1;

      // Total likes  -1
      document.querySelector(".total_likes").innerText = sumLikes -= 1;
    } else {
      throw "Unknow action";
    }

    // Update number of likes in dom
    count.innerHTML = this._count;
  }
}
