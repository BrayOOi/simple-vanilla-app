import { getPetsMapping, getSortingOptions } from "../../app/selectors";
import { rerenderEvent, Store, useSelector } from "../../app/store";
import Pet, { PetMapping } from "../../types/Pet";
import petGroup from "../PetGroup/PetGroup";

const parentNode = document.querySelector('#pet-list');

function petList() {
  const petsMapping = useSelector(getPetsMapping);
  const sortingOptions = useSelector(getSortingOptions);

  const listContainer = document.createElement('div');
  parentNode?.appendChild(listContainer);

  const render = (petsMapping: PetMapping | null, sortingOptions: Store["settings"]["sorting"]) => {
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

  let node = render(petsMapping, sortingOptions);

  rerenderEvent.addEventListener('rerender', (e) => {
    const store = (e as CustomEvent<Store>).detail;
    const petsMapping = getPetsMapping(store);
    const sortingOptions = useSelector(getSortingOptions);

    Array.from(node.children).forEach(child => {
      node.removeChild(child);
    });

    const nextNode = render(petsMapping, sortingOptions);

    parentNode?.replaceChild(nextNode, node);

    node = nextNode;
  });
}

export default petList;
