const URL = 'https://restcountries.com/v2/name';

function fetchCountry(searchQuery) {
  return fetch(`${URL}/${searchQuery}`).then(response => response.json());
}

export default { fetchCountry };
