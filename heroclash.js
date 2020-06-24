class Heroclash {
  stats1 = [];
  stats2 = [];
  images1 = [];
  images2 = [];

  async init(numberOfCards) {
    // fetch herostats:
    let response = await fetch("herostats.json");
    const herodata = await response.json();

    // fetch image-urls:
    response = await fetch("heroimages.json");
    const images = await response.json();

    let ids = [];

    for (let i = 0; i < numberOfCards; i++) {
      let id = Math.floor(Math.random() * 731 + 1);
      while (!ids.includes(id)) {
        this.stats1.push(herodata[id]);
        this.images1.push(images[id]);
        ids.push(id);
      }
      id = Math.floor(Math.random() * 731 + 1);
      while (!ids.includes(id)) {
        this.stats2.push(herodata[id]);
        this.images2.push(images[id]);
        ids.push(id);
      }
    }
  }
}

const game = new Heroclash();
game.init(3);
console.log(game.stats1);
console.log(game.images1);
console.log(game.stats2);
console.log(game.images2);
