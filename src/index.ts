import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDataList } from './app/actions';
import dispatch, { useSelector } from './app/store';
import petGroup from './components/PetGroup/PetGroup';
import type Pet from './types/Pet';

// window.customElements.define(PetCardTag, PetCard);

async function main() {
  // fetch data onload
  const response = await fetch('/pets');
  const petsArr: Array<Pet> = await response.json();
  dispatch(fetchDataList(petsArr));
  
  const list = document.querySelector('#pet-list');
  const petsMapping = useSelector(state => state.petMapping);

  // append pet groups to pet-list
  if (petsMapping) {
    Object.entries(petsMapping).forEach(([key, pets]) => {
      list?.appendChild(petGroup({
        title: key as Pet["type"],
        pets,
      }));
    });
  }
}

window.onload = main;