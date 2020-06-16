const http = new EasyHTTP;

//Get one random character:
function randomCharacter() {
    const id = Math.floor(Math.random() * 731 + 1);
    http.get(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3521494294562439/${id}`)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

document.getElementById("randomHero").addEventListener("click", randomCharacter);