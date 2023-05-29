const numMovies = 454;
const numPeople = 200;

const results = [];

const people = Array.from({ length: numPeople }, (_, i) => i + 1);

for (let i = 1; i <= numMovies; i++) {
  const availablePeople = [...people];

  for (let j = 0; j < 2; j++) {
    const randomIndex = Math.floor(Math.random() * availablePeople.length);
    const personId = availablePeople[randomIndex];

    const result = { movie_id: i, person_id: personId };
    results.push(result);

    availablePeople.splice(randomIndex, 1);
  }
}

const jsonPerson = JSON.stringify(results);
console.log(jsonPerson);
