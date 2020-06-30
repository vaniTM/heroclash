// Copyright (C) 2020  Markus Seiwald, GPLv3

class UI {
  game;

  //cards:
  cards = document.querySelectorAll(".card");

  //images:
  image1 = document.querySelector("#image1");
  image2 = document.querySelector("#image2");

  //stats (to display card values):
  intelligence1 = document.querySelector("#intelligence1");
  strength1 = document.querySelector("#strength1");
  speed1 = document.querySelector("#speed1");
  durability1 = document.querySelector("#durability1");
  power1 = document.querySelector("#power1");
  combat1 = document.querySelector("#combat1");

  intelligence2 = document.querySelector("#intelligence2");
  strength2 = document.querySelector("#strength2");
  speed2 = document.querySelector("#speed2");
  durability2 = document.querySelector("#durability2");
  power2 = document.querySelector("#power2");
  combat2 = document.querySelector("#combat2");

  //stat classes (for clicks to choose next duel discipline):
  intelligence = document.querySelectorAll(".intelligence");
  strength = document.querySelectorAll(".strength");
  speed = document.querySelectorAll(".speed");
  durability = document.querySelectorAll(".durability");
  power = document.querySelectorAll(".power");
  combat = document.querySelectorAll(".combat");

  //set event handlers

  constructor() {
    this.game = new Heroclash();

    if (localStorage.getItem("allHeroes") === null) {
      this.game.loadData().then(location.reload);
    }
    this.game.start(3);
    this.startTurn();
    this.updateCards();

    console.log(this.game);
  }

  updateCards() {
    let cards = document.querySelectorAll(".card-inner");
    cards.forEach((card, index) => {
      let playerNumber = index + 1;
      let activeCard = this.game.players[index].activeCard;
      card.innerHTML = `
            <div class="card-front">
              <img
                src="images/card-red.png"
                width="330"
                alt="A red Playing Card"
              />
            </div>
            <div class="card-back">
              <div class="card-image">
                <img
                  id="image1"
                  src="${activeCard.image}"
                  alt="Avatar"
                />
              </div>
              <div id="stats1" class="stats">
                <h2>${activeCard.name}</h2>
  
                <ul>
                  <li id="intelligence1">
                    <i class="fas fa-brain"> </i>Intelligence
                    <span style="margin-left: auto;">${activeCard.intelligence}</span>
                  </li>
                  <li id="strength1">
                    <i class="fas fa-dumbbell"></i>Strength
                    <span style="margin-left: auto;">${activeCard.strength}</span>
                  </li>
                  <li id="speed1">
                    <i class="fas fa-tachometer-alt"></i>Speed
                    <span style="margin-left: auto;">${activeCard.speed}</span>
                  </li>
                  <li id="durability1">
                    <i class="fas fa-shield-alt"></i>Durability
                    <span style="margin-left: auto;">${activeCard.durability}</span>
                  </li>
                  <li id="power1"><i class="fas fa-fist-raised"></i>Power
                  <span style="margin-left: auto;">${activeCard.power}</span>
                  </li>
                  <li id="combat1"><i class="fas fa-khanda"></i>Combat
                  <span style="margin-left: auto;">${activeCard.combat}</span>
                  </li>
                </ul>
              </div>
    `;
    });
  }

  turnCard(card) {
    if (card.classList.contains("active")) {
      card.style.transform = "";
      card.classList.remove("active");
    } else {
      card.style.transform = "rotateY(180deg)";
      card.classList.add("active");
    }
  }

  startTurn() {
    this.game.players[0].initiative === true
      ? this.turnCard(document.querySelector("#card-inner1"))
      : this.turnCard(document.querySelector("#card-inner2"));
  }
}

ui = new UI();

//rotate cards on click
// document.querySelector("#card-inner1").addEventListener("click", ui.turnCard);
// document.querySelector("#card-inner2").addEventListener("click", ui.turnCard);

//update cards
// document.querySelector("#next").addEventListener("click", ui.updateCards);
