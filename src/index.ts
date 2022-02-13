import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchDataList } from './app/actions';
import { getSortingOptions } from './app/selectors';
import dispatch, { useSelector } from './app/store';
import petGroup from './components/PetGroup/PetGroup';
import petList from './components/PetList/PetList';
import preferenceList from './components/PreferenceList/PreferenceList';
import sortOption from './components/SortOption/SortOption';
import type Pet from './types/Pet';

// window.customElements.define(PetCardTag, PetCard);

async function main() {
  // fetch data onload
  const response = await fetch('/pets');
  const petsArr: Array<Pet> = await response.json();
  dispatch(fetchDataList(petsArr));

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
  petList();

  // render preference list
  preferenceList();

  }
}

window.onload = main;