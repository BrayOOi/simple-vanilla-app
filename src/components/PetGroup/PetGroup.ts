import { getSortingOptions } from "../../app/selectors";
import { rerenderEvent, Store } from "../../app/store";
import Pet from "../../types/Pet";
import { petCard } from "../PetCard/PetCard";
import styles from './PetGroup.module.css';

type PetGroup = {
  title: Pet["type"];
  pets: Array<Pet>;
}

const list = document.querySelector('#pet-list');

function petGroup(args: PetGroup, sortingOptions: Store["settings"]["sorting"], parentNode = list) {

  const render = (args: PetGroup, sortingOptions: Store["settings"]["sorting"]) => {
    const { title, pets } = args;
    
    // Create wrappers
    let groupContainer = document.createElement('div');
    groupContainer.className = 'pet-group';

    let groupTitle = document.createElement('h6');
    groupTitle.className = `text-white capitalize`;
    groupTitle.textContent = title;
  
    groupContainer.appendChild(groupTitle);
    groupContainer.appendChild(document.createElement('hr'));
  
    // sort the lists and render children
    [...pets]
    .sort((a, b) => {
      switch (sortingOptions.maintenance) {
        case 'asc':
          return a.maintenance - b.maintenance;
        case 'desc':
          return  b.maintenance - a.maintenance;
        default:
          return 0;
      }
    })
    .sort((a, b) => {
      switch (sortingOptions.adaptability) {
        case 'asc':
          return a.adaptability - b.adaptability;
        case 'desc':
          return b.adaptability - a.adaptability;
        default:
          return 0;
      }
    })
    .forEach(pet => {
      const card = petCard(pet);
  
      groupContainer.appendChild(card);
    });
  
    return groupContainer;
  }

  let node = render(args, sortingOptions);
  parentNode?.appendChild(node);

  rerenderEvent.addEventListener('rerender', (e) => {
    const store = (e as CustomEvent<Store>).detail;
    const sortingOptions = getSortingOptions(store);

    const nextNode = render(args, sortingOptions);

    parentNode?.replaceChild(nextNode, node);

    node = nextNode;
  });
}

export default petGroup;
