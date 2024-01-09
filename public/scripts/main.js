import {
  rockBtn,
  paperBtn,
  scissorsBtn,
  userName,
  userPick,
  compPick,
  winner,
  userInput,
} from "/public/scripts/variables.js";

// Score
let score = {
  wins: 0,
  losses: 0,
  ties: 0
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
  score = savedScore;
}

updateScoreElement();

// Computer Choice
function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return 'rock';
      break;
    case 1:
      return 'paper';
      break;
    case 2:
      return 'scissors';
      break
  }
};

// Determine Winner
function determineWinner(userChoice, compChoice) {
  if (userChoice === compChoice) {
    score.ties++
    return 'Tie!';
  }
  if (userChoice === 'rock') {
    if (compChoice === 'paper') {
      score.losses++
      return 'The Computer won!';
    } else {
      score.wins++
      return 'You won!'
    }
  };
  if (userChoice === 'paper') {
    if (compChoice === 'scissors') {
      score.losses++
      return 'The Computer won!'
    } else {
      score.wins++
      return 'You won!'
    }
  };
  if (userChoice === 'scissors') {
    if (compChoice === 'rock') {
      score.losses++
      return 'The Computer won!'
    } else {
      score.wins++
      return 'You won!'
    }
  };
};

// Rock button click
rockBtn.addEventListener('click', () => {
  // Function to play Game
  const playGame = () => {
    const userChoice = userInput.rock;
    const computerChoice = getComputerChoice();
    // Icon
    const userIcon = `<img src="/public/images/${userChoice}.png" class="move-icon">`;
    const compIcon = `<img src="/public/images/${computerChoice}.png" class="move-icon">`;
    // DOM
    userPick.innerHTML = userIcon;
    compPick.innerHTML = compIcon;
    winner.innerHTML = `${determineWinner(userChoice, computerChoice)}`;
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
  };
  playGame();
});

// Paper button click
paperBtn.addEventListener('click', () => {
  // Function to play Game
  const playGame = () => {
    const userChoice = userInput.paper;
    const computerChoice = getComputerChoice();
    // Icon
    const userIcon = `<img src="/public/images/${userChoice}.png" class="move-icon">`;
    const compIcon = `<img src="/public/images/${computerChoice}.png" class="move-icon">`;
    // DOM
    userPick.innerHTML = userIcon;
    compPick.innerHTML = compIcon;
    winner.innerHTML = `${determineWinner(userChoice, computerChoice)}`;
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
  };
  playGame();
});

// Scissors button click
scissorsBtn.addEventListener('click', () => {
  // Function to play Game
  const playGame = () => {
    const userChoice = userInput.scissors;
    const computerChoice = getComputerChoice();
    // Icon
    const userIcon = `<img src="/public/images/${userChoice}.png" class="move-icon">`;
    const compIcon = `<img src="/public/images/${computerChoice}.png" class="move-icon">`;
    // DOM
    userPick.innerHTML = userIcon;
    compPick.innerHTML = compIcon;
    winner.innerHTML = `${determineWinner(userChoice, computerChoice)}`;
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
  };
  playGame();
});

function updateScoreElement() {
  document.querySelector('.score').innerHTML = `
          Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
        `;
}

const resetScore = document.querySelector('.resetScore');

function resetScores() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
  localStorage.removeItem('score');
}

resetScore.addEventListener('click', resetScores);

// Input User Name
const nameList = ['You'];
const addBtn = document.querySelector('.addBtn');
const inputElement = document.querySelector('.nameBox');

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function firstLetter(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '-' : text;
}

addText();

function addText() {
  const maxLength = 8; // Adjust the maximum length as needed
  let nameListHTML = '';

  for (let i = 0; i < nameList.length; i++) {
    const names = capitalizeFirstLetter(nameList[i]);
    const namesModify = firstLetter(names, maxLength);
    const addList = `<p>${namesModify}</p>`;
    nameListHTML += addList;
    nameList.pop();
  }

  document.querySelector('.renderNames').innerHTML = nameListHTML;
};


addBtn.addEventListener('click', addNames);
inputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addNames();
  }
});

function addNames() {
  const nameInput = inputElement.value;
  inputElement.value = '';

  if (nameInput.trim() !== '') {
    nameList.push(nameInput);
    console.log(nameList);
  }
  addText();
  nameList.pop();

  const showInsertName = document.querySelector('.changeUserName');
  showInsertName.style.display = 'none';
  editNameBtn.style.display = 'block';
  userName.style.display = 'flex';

}

const editNameBtn = document.querySelector('.editName');

editNameBtn.addEventListener('click', () => {
  const hideInputName = () => {
    const showInsertName = document.querySelector('.changeUserName');
    showInsertName.style.display = 'flex';
    editNameBtn.style.display = 'none';
    userName.style.display = 'none';
  };
  hideInputName();
});