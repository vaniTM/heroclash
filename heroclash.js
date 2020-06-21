const http = new EasyHTTP();

//Get one random character:
async function randomCharacter() {
  const id = Math.floor(Math.random() * 731 + 1);
  const response = await http.get(
    `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3521494294562439/${id}`
    // "heroes.json"
    // "herostats.json"
  );
  console.log(response);
  return response;
}

document
  .getElementById("randomHero")
  .addEventListener("click", randomCharacter);

class Game {
  player1 = new Player();
  player2 = new Player();
}

class Player {
  Player() {}
}
