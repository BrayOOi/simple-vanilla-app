import { getPetsMapping, getSortingOptions } from "../../app/selectors";
import smartComponent from "../../app/SmartComponent";
import { Store } from "../../app/store";
import Pet from "../../types/Pet";
import petGroup from "../PetGroup/PetGroup";

const parentNode = document.querySelector('#pet-list');

function petList() {
  const render = (store: Store) => {
    const petsMapping = getPetsMapping(store);
    const sortingOptions = getSortingOptions(store);
    const listContainer = document.createElement('div');

    if (petsMapping) {
      Object.entries(petsMapping).forEach(([key, pets]) => {
        if (pets.length) {
          petGroup({
            title: key as Pet["type"],
            pets,
          },
          sortingOptions,
          listContainer);
        }
      });
    }

    return listContainer;
  };

  smartComponent(render, parentNode);
}

export default petList;
