import fullCountry from './templates/countryFull.hbs';
import listCountry from './templates/countryList.hbs';
import countryApi from './js/fetchCountries';

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
import { defaults } from '@pnotify/core';
defaults.width = '400px';
defaults.delay = '3000';
defaults.minHeight = '86px';

const refs = {
  searchCountry: document.querySelector('.input_country'),
  countryContainer: document.querySelector('.container'),
};

var debounce = require('lodash.debounce');

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  countryApi.fetchCountry(event.target.value).then(fetchFinish).catch(fetchError);
}

function fetchFinish(country) {
  if (country.status === 404) {
    refs.countryContainer.innerHTML = '';
    alert({ text: 'Check the correctness of the data entered, this country does not exist!' });
    return;
  } else if (country.length > 10) {
    refs.countryContainer.innerHTML = '';
    error({ text: 'Too many matches found. Please enter a more specific query!' });
    return;
  } else if (country.length > 1) {
    refs.countryContainer.innerHTML = listCountry(country);
    const listGroup = document.querySelector('.list-group');
    listGroup.addEventListener('click', event => {
      countryApi.fetchCountry(event.target.textContent).then(fetchFinish).catch(fetchError);
    });
    return;
  }
  refs.countryContainer.innerHTML = fullCountry(country);
}

function fetchError(err) {
  refs.countryContainer.innerHTML = '';
}
