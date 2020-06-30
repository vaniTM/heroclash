// Copyright (C) 2020  Markus Seiwald, GPLv3

class UI {
  game;

  //stat classes (for clicks to choose next duel discipline):
  intelligence = document.querySelectorAll(".intelligence");
  strength = document.querySelectorAll(".strength");
  speed = document.querySelectorAll(".speed");
  durability = document.querySelectorAll(".durability");
  power = document.querySelectorAll(".power");
  combat = document.querySelectorAll(".combat");

  //start everything off with this constructor:
  constructor() {
    this.game = new Heroclash();

    if (localStorage.getItem("allHeroes") === null) {
      this.game.loadData().then(location.reload);
    }
    this.game.start(3);

    this.startTurn();
    this.updateCards();

    console.log(this.game);

    //handle clicks and combat:
    let stats = document.querySelectorAll(".card-inner");
    stats.forEach((element) =>
      element.addEventListener("click", (event) => {
        console.log(event.target.classList[0]);

        if (element.id === "card-inner1") {
          this.turnCard(document.querySelector("#card-inner2"));
        }
        if (element.id === "card-inner2") {
          this.turnCard(document.querySelector("#card-inner1"));
        }

        let that = this;
        setTimeout(function () {
          that.game.handleCombat(event.target.classList[0]);
          that.turnCard(document.querySelector("#card-inner1"));
          that.turnCard(document.querySelector("#card-inner2"));
          setTimeout(function () {
            that.updateCards();
            that.startTurn();
          }, 1000);
        }, 2000);
      })
    );
  }

  //display the active card of the two players:
  updateCards() {
    let cards = document.querySelectorAll(".card-inner");
    cards.forEach((card, index) => {
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
                  class="image"
                  src="${activeCard.image}"
                  alt="Avatar"
                />
              </div>
              <div class="stats">
                <h2>${activeCard.name}</h2>
  
                <ul>
                  <li class="intelligence">
                    <i class="fas fa-brain"> </i>Intelligence
                    <span style="margin-left: auto;">${activeCard.intelligence}</span>
                  </li>
                  <li class="strength">
                    <i class="fas fa-dumbbell"></i>Strength
                    <span style="margin-left: auto;">${activeCard.strength}</span>
                  </li>
                  <li class="speed">
                    <i class="fas fa-tachometer-alt"></i>Speed
                    <span style="margin-left: auto;">${activeCard.speed}</span>
                  </li>
                  <li class="durability">
                    <i class="fas fa-shield-alt"></i>Durability
                    <span style="margin-left: auto;">${activeCard.durability}</span>
                  </li>
                  <li class="power">
                    <i class="fas fa-fist-raised"></i>Power
                    <span style="margin-left: auto;">${activeCard.power}</span>
                  </li>
                  <li class="combat">
                    <i class="fas fa-khanda"></i>Combat
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

  //kick off a turn by turning the card of the player with initiative:
  startTurn() {
    this.game.players[0].initiative === true
      ? this.turnCard(document.querySelector("#card-inner1"))
      : this.turnCard(document.querySelector("#card-inner2"));
  }
}

ui = new UI();
