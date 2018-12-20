'use strict';

const axios = require('axios');
const searchTerm = process.argv[2];
const BASE_URL = 'https://swapi.co/api';

function possessivePronoun(character) {
  return character.gender === 'male' ? 'He has' : character.gender === 'female' ? 'She has' : 'They have';
}

axios.get(`${BASE_URL}/people/?search=${searchTerm}`)
  .then(results => {
    const character = results.data.results[0];

    if (!character) {
      throw new Error(`${searchTerm} is not an entity we're looking for. Move along.`);
      
    }

    console.log(`${character.name} has been found!`);
    console.log(`${possessivePronoun(character)} starred in the following films:`);

    const films = character.films;
    const filmPromises = films.map(film => {
      return axios.get(film);
    });
    Promise.all(filmPromises)
      .then(results => {
        const data = results.map(result => result.data);
        data.sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
        for (let i = 0; i < data.length; i++) {
          console.log(`${i + 1}. ${data[i].title}`);
        }
        console.log(`${possessivePronoun(character)} has also been associated with a total of ${character.vehicles.length} vehicles and ${character.starships.length} starships.`);
      });
  })
  .catch(err => console.log(err.message));