'use strict';

const axios = require('axios');
const searchTerm = process.argv[2];
const BASE_URL = 'https://swapi.co/api';

axios.get(`${BASE_URL}/people/?search=${searchTerm}`)
  .then(results => {
    const character = results.data.results[0];
    console.log(character);
  })
  .catch(err => console.log(err.message));