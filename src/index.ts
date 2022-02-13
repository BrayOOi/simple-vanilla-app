import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDataList } from './app/actions';
import { getSortingOptions } from './app/selectors';
import dispatch, { useSelector } from './app/store';
import petGroup from './components/PetGroup/PetGroup';
import sortOption from './components/SortOption/SortOption';
import type Pet from './types/Pet';

// window.customElements.define(PetCardTag, PetCard);

async function main() {
  // fetch data onload
  const response = await fetch('/pets');
  const petsArr: Array<Pet> = await response.json();
  dispatch(fetchDataList(petsArr));

  const petsMapping = useSelector(state => state.petMapping);

  // render options
  const optionsContainer = document.querySelector('#sort-options');
  const settings = useSelector(getSortingOptions);
  Object.entries(settings).forEach(([key, value]) => {
    sortOption({
      state: value,
      value: key as keyof typeof settings
    }, optionsContainer);
  });
  
  // render pet groups
  if (petsMapping) {
    Object.entries(petsMapping).forEach(([key, pets]) => {
      petGroup({
        title: key as Pet["type"],
        pets,
      },
      settings);
    });
  }
}

window.onload = main;