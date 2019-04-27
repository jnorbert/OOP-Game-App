/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display pharse on game board
   */
  addPhraseToDisplay() {
    const ul = document.getElementById("phrase").firstElementChild;

    for (let i = 0; i < this.phrase.length; i++) {
      let li = document.createElement('li');

      li.textContent = this.phrase[i];
      if (li.textContent === ' ') {
        li.classList.add('hide', 'space');
      } else {
        li.classList.add('hide', 'letter');
      }
      ul.appendChild(li);
    }
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  };

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const arrLi = document.querySelectorAll('#phrase li');
    arrLi.forEach(li => { // Iteration in array LI
      if (li.textContent === letter) { //if text content of an index is matched to selected char
        li.classList.remove('hide', 'letter', letter); //remove old class attributes
        li.classList.add('show', 'bounce', letter); //add new class attributes
      }
    });
  }
}