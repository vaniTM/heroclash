class Heroclash {
  stats1 = [];
  stats2 = [];
  images1 = [];
  images2 = [];

  //load data from json-file and save to localStorage
  async loadData() {
    //fetch hero data:
    let response = await fetch("herostats.json");
    const herodata = await response.json();

    // fetch image-urls:
    response = await fetch("heroimages.json");
    const images = await response.json();

    //save to localStorage
    localStorage.setItem("allHeroes", JSON.stringify(herodata));
    localStorage.setItem("allImages", JSON.stringify(images));
    location.reload();
  }

  //start the game with the chosen deckSize
  start(deckSize) {
    let herodata;
    let images;

    //load herodata from localStorage
    herodata = JSON.parse(localStorage.getItem("allHeroes"));
    images = JSON.parse(localStorage.getItem("allImages"));

    let ids = [];

    //refactoring needed! nasty code duplication
    while (this.stats1.length < deckSize) {
      let id = Math.floor(Math.random() * 731);
      while (!ids.includes(id)) {
        if (this.validStats(herodata[id])) {
          this.stats1.push(herodata[id]);
          this.images1.push(images[id]);
        } else {
          id = (id + 1) % 731;
        }
        ids.push(id);
      }
    }
    while (this.stats2.length < deckSize) {
      let id = Math.floor(Math.random() * 731);
      while (!ids.includes(id)) {
        if (this.validStats(herodata[id])) {
          this.stats2.push(herodata[id]);
          this.images2.push(images[id]);
        } else {
          id = (id + 1) % 731;
        }
        ids.push(id);
      }
    }
  }

  //checks if hero-stats contain a null-value
  validStats(hero) {
    let validStats = true;
    if (
      hero.intelligence === "null" ||
      hero.durability === "null" ||
      hero.speed === "null" ||
      hero.strength === "null" ||
      hero.combat === "null" ||
      hero.power === "null"
    ) {
      validStats = false;
    }
    return validStats;
  }
}

//-------------------------------------------------------------------
class Player {}

//-------------------------------------------------------------------

// const game = new Heroclash();
// // if (localStorage.getItem("allHeroes") === null) {
// //   game.loadData();
// // }
// // game.start(3);

// console.log(game.stats1);
// console.log(game.stats2);
