const imgUrls = [
  "./img/download (1).jpeg",
  "./img/download.jpeg",
  "./img/images (1).jpeg",
  "./img/images (2).jpeg",
  "./img/images (4).jpeg",
  "./img/images (3).jpeg",
  "./img/images.jpeg",
  "./img/download3.jpeg",
  "./img/download (1).jpeg",
  "./img/download.jpeg",
  "./img/images (1).jpeg",
  "./img/images (2).jpeg",
  "./img/images (4).jpeg",
  "./img/images (3).jpeg",
  "./img/images.jpeg",
  "./img/download3.jpeg",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}



const shuffledImgUrls = shuffle([...imgUrls]);
const game = document.getElementById("game");
const grid = document.createElement("div");
const timer = document.getElementById("timer");

const allcount = document.getElementById("count1");
grid.setAttribute("class", "grid");
game.appendChild(grid);

grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(4, 1fr)";
grid.style.gap = "10px";

shuffledImgUrls.forEach((imgUrl) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const front = document.createElement("div");
  front.setAttribute("class", "front");

  const back = document.createElement("div");
  back.setAttribute("class", "back");

  front.style.backgroundImage = `url("./question-mark-vector-icon-png_256683.jpg")`;
  back.style.backgroundImage = `url('${imgUrl}')`;
  front.style.backgroundSize = "cover";
  back.style.backgroundSize = "cover";

  card.appendChild(front);
  card.appendChild(back);
  grid.appendChild(card);
});

let firstGuess = "";
let secondGuess = "";
let count = 0;
let moves = 0;
let checked = false;
let lettimercount = 0;
let timerStarted = false;

// grid.addEventListener("click", (event) => {
//   if (checked) return;

//   const clickedCard = event.target.closest(".card");
//   if (
//     !clickedCard ||
//     clickedCard.classList.contains("match") ||
//     clickedCard.classList.contains("selected")
//   ) {
//     return;
//   }

//   clickedCard.classList.add("selected", "flip");

//   let min = 0;
//   // let completetime = setInterval(() => {
//   //   min++;
//   //   timer.textContent = `time taken:${min}sec`;
//   // }, 1000);
//   if (count === 0) {
//     firstGuess = clickedCard.querySelector(".back").style.backgroundImage;
//     count++;
//     moves++;
//   } else if (count === 1) {
//     secondGuess = clickedCard.querySelector(".back").style.backgroundImage;
//     count++;
//     checked = true;
//     moves++;
//     if (firstGuess === secondGuess) {
//       match();
//       lettimercount++;
//       console.log(lettimercount);
//       // timeofgame();
//       // if (lettimercount === 8) {
//       //   clearInterval(completetime);
//       //   timer.textContent += " - Game Over!";
//       // }
//     } else {
//       setTimeout(resetGuesses, 1000);
//     }
//   }
//   if (allcount) {
//     allcount.textContent = `count:${moves}`;
//   }
// });

let min = 0;
let completetime;

grid.addEventListener("click", (event) => {
  if (checked) return;

  const clickedCard = event.target.closest(".card");
  if (
    !clickedCard ||
    clickedCard.classList.contains("match") ||
    clickedCard.classList.contains("selected")
  ) {
    return;
  }

  // Start timer on first click
  if (!timerStarted) {
    timerStarted = true;
    completetime = setInterval(() => {
      min++;
      timer.textContent = `Time taken: ${min} sec`;
    }, 1000);
  }

  clickedCard.classList.add("selected", "flip");

  if (count === 0) {
    firstGuess = clickedCard.querySelector(".back").style.backgroundImage;
    count++;
    moves++;
  } else if (count === 1) {
    secondGuess = clickedCard.querySelector(".back").style.backgroundImage;
    count++;
    checked = true;
    moves++;

    if (firstGuess === secondGuess) {
      match();
      lettimercount++;
      console.log(lettimercount);

      // Check if game is over
      if (lettimercount === 8) {
        clearInterval(completetime);
        timer.textContent += " - Game Over! please restart to play new game";
      }
    } else {
      setTimeout(resetGuesses, 1000);
    }
  }

  if (allcount) {
    allcount.textContent = `Count: ${moves}`;
  }
});

function match() {
  const selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
    card.classList.remove("selected");
    card.style.pointerEvents = "none";
    const front = card.querySelector(".front");
    front.style.backgroundColor = "green";
    front.style.backgroundImage = "none";
  });
  setTimeout(() => {
    selected.forEach((card) => {
      card.classList.remove("flip");
    });
  }, 1000);

  resetGuesses();
}

function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  checked = false;
  const selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected", "flip");
  });
}
