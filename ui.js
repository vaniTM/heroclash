class UI {
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
    const game = new Heroclash();

    if (localStorage.getItem("allHeroes") === null) {
      game.loadData();
    }
    game.start(3);

    console.log(game.stats1);
    console.log(game.stats2);
  }

  updateCards = function () {
    document.getElementById("card-inner1").innerHTML = `
    <div class="card-front">
              <img
                src="images/card-red.png"
                width="330px"
                alt="A red Playing Card"
              />
            </div>
            <div class="card-back">
              <div class="card-image">
                <img
                  id="image1"
                  src="https://www.superherodb.com/pictures2/portraits/10/100/727.jpg"
                  alt="Avatar"
                />
              </div>
              <div id="stats1" class="stats">
                <h2>Someone Else</h2>
  
                <ul>
                  <li id="intelligence1">
                    <i class="fas fa-brain"> </i>Intelligence<span
                      style="margin-left: auto;"
                      >100</span
                    >
                  </li>
                  <li id="strength1">
                    <i class="fas fa-dumbbell"></i>Strength
                  </li>
                  <li id="speed1">
                    <i class="fas fa-tachometer-alt"></i>Speed
                  </li>
                  <li id="durability1">
                    <i class="fas fa-shield-alt"></i>Durability
                  </li>
                  <li id="power1"><i class="fas fa-fist-raised"></i>Power</li>
                  <li id="combat1"><i class="fas fa-khanda"></i>Combat</li>
                </ul>
              </div>
    `;
  };

  turnCard() {
    if (this.classList.contains("active")) {
      this.style.transform = "";
      this.classList.remove("active");
    } else {
      this.style.transform = "rotateY(180deg)";
      this.classList.add("active");
    }
  }
}

ui = new UI();

//rotate cards on click
document.querySelector("#card-inner1").addEventListener("click", ui.turnCard);
document.querySelector("#card-inner2").addEventListener("click", ui.turnCard);

//update cards
document.querySelector("#next").addEventListener("click", ui.updateCards);
