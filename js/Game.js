/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    const phrasesArray = [
      new Phrase('life is like a box of chocolates'),
      new Phrase('there is no trying'),
      new Phrase('may the force be with you'),
      new Phrase('you have to see the matrix of yourself'),
      new Phrase('you talking to me')
    ];
    return phrasesArray;
  };

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * (this.phrases.length - 1))];
  };

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    const intro = document.getElementById('overlay');
    intro.style.display = 'none';

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  };

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won 
   */
  checkForWin() {
    const hiddenLetter = document.querySelectorAll('li.letter');
    let checkWin = false; // array of collection of letter class in elemnt 'li'
    if (hiddenLetter.length === 0) { // $('li.show.letter'): array of objects which match to li has classes are show and letter
      checkWin = true;
    }
    return checkWin;
  };

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    const heartImg = document.querySelector("img[src='images/liveHeart.png");
    heartImg.src = "images/lostHeart.png";
    this.missed = this.missed + 1;
    if (this.missed >= 5) {
      this.gameOver(false);
    }
  };

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    //setting the overlay display back to block
    document.querySelector('#overlay').style.display = '';

    //make reset button visable
    document.querySelector('button').style.display = '';

    // if the player won
    if (gameWon) {
      document.querySelector('#overlay').setAttribute('class', 'win');
      document.querySelector('#game-over-message').innerHTML = 'You did it! You Won!'
    } else {
      // if the player lost
      document.querySelector('#overlay').setAttribute('class', 'lose');
      document.querySelector('#game-over-message').innerHTML = 'Better Luck Next Time! Try Again!?'
    }
  };

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction($button) {
    $button.prop("disabled", true);
    const letter = $button.text();
    if (this.activePhrase.checkLetter(letter)) {
      $button.addClass("chosen");
      this.activePhrase.showMatchedLetter(letter);
      if (this.checkForWin()) {
        this.gameOver(true);
      };
    } else {
      $button.addClass("wrong");
      this.removeLife();
    }
  };
}