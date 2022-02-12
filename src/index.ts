import 'bootstrap/dist/css/bootstrap.min.css';
import { getPetsMapping } from './app/utils';
import petGroup from './components/PetGroup/PetGroup';
import type Pet from './types/Pet';

// window.customElements.define(PetCardTag, PetCard);

async function main() {
  // fetch data onload
  const response = await fetch('/pets');
  const petsArr: Array<Pet> = await response.json();
  const petsMapping = getPetsMapping(petsArr);

  const list = document.querySelector('#pet-list');

  // append pet groups to pet-list
  Object.entries(petsMapping).forEach(([key, pets]) => {
    list?.appendChild(petGroup({
      title: key as Pet["type"],
      pets,
    }));
  });
}

window.onload = main;