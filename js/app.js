/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

// add an event listener to the button element with the id "btn__reset"
$("#btn__reset").click(function () {
  $("#phrase ul").empty();
  $(".key").attr("disabled", false).removeClass("wrong chosen");
  $(".tries img").attr("src", "images/liveHeart.png");
  $("#overlay").removeClass("lose won");
  document.removeEventListener("keypress", handleKeyPressEvent);

  game = new Game();
  game.startGame();

  // add the keypress eventlistener (should usually be keydown instead as keypress is deprecated, but the project explicitly asks for a keypress eventhandler)
  document.addEventListener("keypress", handleKeyPressEvent);
});

$("#qwerty").click(function (e) {
  // check if the clicked element contains the class "key"
  if (e.target.classList.contains("key")) {
    // call the handleInteraction method on the game passing in the clicked element
    game.handleInteraction($(e.target));
  }
});

const handleKeyPressEvent = function (e) {
  // use a regular expression to check if the pressed key is a valid character and store the result in a variable
  const isAllowedCharacter = (new RegExp("[a-z]", "gi")).test(e.key);
  const $button = $(`.key:contains(${e.key.toLowerCase()})`);
  if (isAllowedCharacter && !$button.prop("disabled")) {
    game.handleInteraction($button);
  }
}