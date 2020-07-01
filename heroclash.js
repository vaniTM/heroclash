// Copyright (C) 2020  Markus Seiwald, GPLv3

class Heroclash {
  players = [];
  heap = [];

  constructor() {
    this.players.push(new Player("Player 1"));
    this.players.push(new Player("Player 2"));
  }

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
    // location.reload();
  }

  //start the game with the chosen deckSize
  start(deckSize) {
    let herodata;
    let images;

    //load herodata from localStorage
    herodata = JSON.parse(localStorage.getItem("allHeroes"));
    images = JSON.parse(localStorage.getItem("allImages"));

    //merge data from images into herodata:
    herodata.forEach((hero, index) => {
      let image = images[index].url;
      hero.image = image;
    });

    //store the id of all drawn characters:
    let ids = [];

    //draw the decks for the players:
    this.players.forEach((player) => {
      while (player.deck.length < deckSize) {
        let id = Math.floor(Math.random() * 731);
        while (!ids.includes(id)) {
          if (this.validStats(herodata[id])) {
            player.deck.push(herodata[id]);
          } else {
            id = Math.floor(Math.random() * 731);
            continue;
          }
          ids.push(id);
        }
      }
      //draw first card:
      player.activeCard = player.deck.pop();
    });

    //decide who starts:
    Math.random() < 0.5
      ? (this.players[0].initiative = false)
      : (this.players[1].initiative = false);
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

  handleCombat(discipline) {
    const p1 = this.players[0];
    const p2 = this.players[1];

    //TODO: create function determineWinner
    const result = p1.activeCard[discipline] - p2.activeCard[discipline];

    //TODO: refactor with result from determineWinner:
    if (result > 0) {
      p1.deck.push(this.players[0].activeCard);
      p1.deck.push(this.players[1].activeCard);
      p1.deck = p1.deck.concat(this.heap);
      this.heap.length = 0;
      p1.initiative = true;
      p2.initiative = false;
    } else if (result < 0) {
      p2.deck.push(this.players[0].activeCard);
      p2.deck.push(this.players[1].activeCard);
      p2.deck = p2.deck.concat(this.heap);
      this.heap.length = 0;
      p1.initiative = false;
      p2.initiative = true;
    } else {
      this.heap.push(p1.activeCard);
      this.heap.push(p1.deck.shift());
      this.heap.push(p2.activeCard);
      this.heap.push(p2.deck.shift());
      if (p1.initiative === true) {
        p1.initiative = false;
        p2.initiative = true;
      } else {
        p1.initiative = true;
        p2.initiative = false;
      }
    }

    p1.activeCard = p1.deck.shift();
    p2.activeCard = p2.deck.shift();
  }
}

//-------------------------------------------------------------------
class Player {
  constructor(name) {
    this.name = name;
    this.deck = [];
    this.initiative = true;
    this.activeCard = null;
  }
}
