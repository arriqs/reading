"use strict";
let wordBegin = [];
let wordEnd = ["at", "ot", "ut", "et"];
let activeEndLetters = wordEnd[0];
let container = document.getElementById("_App");
let exercise = 1;
let startButton;

function generateStartBtn(exercise) {
  switch (exercise) {
    case 2:
      wordBegin = ["Th", "S", "V", "Gn"];
      break;
    case 3:
      wordBegin = ["C", "H", "N", "R"];
      activeEndLetters = wordEnd[exercise - 1];
      break;
    case 4:
      wordBegin = ["P", "L", "B", "N"];
      activeEndLetters = wordEnd[exercise - 1];
      break;
    default:
      wordBegin = ["B", "P", "H", "C"];
      activeEndLetters = wordEnd[0];
  }
  startButton = document.createElement("button");
  let startButtonContent = document.createTextNode("Begin Exercise");
  startButton.id = "start-button";
  startButton.appendChild(startButtonContent);
  startButton.addEventListener("click", beginExercise);
  container.appendChild(startButton);  
}

generateStartBtn(exercise);

function clearExercise() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  exercise++
  generateStartBtn(exercise)
}

function beginExercise() {
  let clickedBtns = [];
  let buttonContent;
  function setClickedBtns(clickedBtn) {
    if (!clickedBtns.includes(clickedBtn)) {
      clickedBtns.push(clickedBtn);
    }
  }
  
  function renderBtns() {
    for (let i = 0; i < wordBegin.length; i++) {
      let button = document.createElement("button");
      button.id = i + "-button";
      button.className = "letterBtn";
      let letter = wordBegin[i];
      buttonContent  = document.createTextNode(letter);
      button.appendChild(buttonContent);
      container.appendChild(button);
      
      function handleUpdateBlank(e) {
        var blank = document.querySelector(".fillInTheBlank").firstChild;
        var newBtnColor = getComputedStyle(document.body)
    .getPropertyValue('--myTeal');
        button.style.backgroundColor = newBtnColor;
        blank.textContent = letter;
      }
      function handleEncouragement(e) {
        let encouragingMsgs = ["Good job! Keep going!", "Awesome!", "You're almost done - finish strong!", "Mission accomplished!"];
        let encourage = document.createElement("p");
        let encourageContent = document.createTextNode(encouragingMsgs[0]);
        encourage.appendChild(encourageContent);
        if (clickedBtns.length < wordBegin.length) {
          encourage.textContent = encouragingMsgs[clickedBtns.length];
          container.appendChild(encourage);
          setTimeout(() => {
            encourage.remove();
          }, 5000);
        } 
        if (clickedBtns.length == wordBegin.length - 1) {
          let finishBtn = document.createElement("button");
          let finishBtnContent = document.createTextNode("Next Exercise");
          finishBtn.appendChild(finishBtnContent);
          finishBtn.addEventListener("click", clearExercise);
          container.appendChild(finishBtn);
        }
        setClickedBtns(e.target.id);
        console.log(clickedBtns);
      }
      button.addEventListener("click", handleUpdateBlank);
      button.addEventListener("click", handleEncouragement);
    }
    startButton.remove();
  }
  function fillInTheBlank() {
    const text = document.createElement("p");
    text.className = "fillInTheBlank";
    const span = document.createElement("span");
    const dynamicContent =  document.createTextNode("_");
    const staticContent =  document.createTextNode(activeEndLetters);
    span.appendChild(dynamicContent);
    text.appendChild(span);
    text.appendChild(staticContent);
    container.appendChild(text);
  };
  renderBtns();
  fillInTheBlank();
} 
