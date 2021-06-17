"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);
console.log(colors);

createCards(colors);

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

// variables
let firstCard = "";
let secondCard = "";
let total = 0;

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  let gameBoard = document.getElementById("game");

  for (let color of colors) {
    let newDiv = document.createElement("div");
    newDiv.classList.add(`${color}`);
    newDiv.addEventListener("click", function (e) {
      handleCardClick(e);
    });
    gameBoard.append(newDiv);
  }
}

let allCards = document.querySelectorAll("div");

function resetGame() {
  console.log(colors);
  shuffle(colors);
  console.log(colors);
  for (let [i, card] of allCards.entries()) {
    card.style.backgroundColor = "";
    card.className = colors[i - 1];
  }
  clearCardVars();
  total = 0;
}

const newGameBtn = document.querySelector("#new-game");
newGameBtn.addEventListener("click", resetGame);

/** Flip a card face-up. */

function flipCard(card) {
  // change background color to classname
  card.style.backgroundColor = card.className;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = "";
}

/** Handle clicking on a card: this could be first-card or second-card. */

let compareCards = function () {
  if (
    firstCard.style.backgroundColor === secondCard.style.backgroundColor &&
    firstCard.style.backgroundColor
  ) {
    clearCardVars();
    total += 2;
    console.log(total);
    if (total >= 10) {
      alert("I think you won the game");
    }
  } else {
    unFlipCard(firstCard);
    unFlipCard(secondCard);
    clearCardVars();
  }
};

function handleCardClick(e) {
  console.log(e.target.style.backgroundColor);
  if (e.target.style.backgroundColor) {
    console.log("card out of play");
  } else if (!firstCard) {
    firstCard = e.target;
    flipCard(firstCard);
  } else if (!secondCard) {
    secondCard = e.target;
    flipCard(secondCard);
    setTimeout(compareCards, 1000);
  }
}
//   if (e.target.style.backgroundColor) {
//     unFlipCard(e.target);
//   } else {
//     flipCard(e.target);
//   }
// }

function clearCardVars() {
  firstCard = "";
  secondCard = "";
}
