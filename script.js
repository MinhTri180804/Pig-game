'use strict';
// Get element for player 0
const player_0 = document.querySelector('.player--0');
const score_player_0 = document.querySelector('#score--0');
const current__player_0 = document.querySelector('#current--0');

// Get element for player 1
const player_1 = document.querySelector('.player--1');
const score_player_1 = document.querySelector('#score--1');
const current__player_1 = document.querySelector('#current--1');

// Get element action for application
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const imageDice = document.querySelector('#image-dice');

// define value
const players = [player_0, player_1];
const scorePlayers = [score_player_0, score_player_1];
const currentPlayers = [current__player_0, current__player_1];
let valueRoll;
let isNextRoll = true;
let playerPlay = 0;

// Define function change status
const isDisabledHold = function (value) {
  btnHold.disabled = value;
};

const isDisabledRollDice = function (value) {
  btnRollDice.disabled = value;
};

const isDisabledNew = function (value) {
  btnNew.disabled = value;
};

// Define function for feature
const rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

const switchPlayer = function () {
  // reset current score for player before switch
  currentPlayers[playerPlay].textContent = '0';

  playerPlay = playerPlay === 0 ? (playerPlay = 1) : (playerPlay = 0);
  isDisabledHold(true);
  imageDice.style.visibility = 'hidden';
  players[playerPlay === 0 ? 1 : 0].classList.remove('player--active');
  currentPlayers[playerPlay].textContent = '0';
  players[playerPlay].classList.add('player--active');
};

const playerWin = function (player_id) {
  players[player_id].classList.add('player--winner');

  isDisabledRollDice(true);
  isDisabledHold(true);
};

const init = function () {
  players.forEach(player => {
    player.classList.remove('player--winner');
  });

  scorePlayers.forEach(scorePlayer => {
    scorePlayer.textContent = '0';
  });

  currentPlayers.forEach(currentPlayer => {
    currentPlayer.textContent = '0';
  });

  imageDice.style.visibility = 'hidden';
  isDisabledRollDice(false);
  isDisabledHold(true);
  isDisabledNew(true);
};

init();

// Define function for application
const eventRollDice = function () {
  if (btnNew.disabled) {
    isDisabledNew(false);
  }
  isDisabledHold(false);
  imageDice.style.visibility = 'visible';
  valueRoll = rollDice();
  imageDice.setAttribute('src', `dice-${valueRoll}.png`);

  if (valueRoll === 1) {
    switchPlayer();
    return;
  }
  currentPlayers[playerPlay].textContent =
    Number(currentPlayers[playerPlay].textContent) + valueRoll;
  if (
    Number(currentPlayers[playerPlay].textContent) +
      Number(scorePlayers[playerPlay].textContent) >=
    100
  )
    playerWin(playerPlay);

  return;
};

const holdValueRoll = function () {
  scorePlayers[playerPlay].textContent =
    Number(scorePlayers[playerPlay].textContent) +
    Number(currentPlayers[playerPlay].textContent);

  switchPlayer();
};

btnRollDice.addEventListener('click', eventRollDice);
btnNew.addEventListener('click', init);

btnHold.addEventListener('click', holdValueRoll);
