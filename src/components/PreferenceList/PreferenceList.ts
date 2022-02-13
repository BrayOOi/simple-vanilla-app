import { addPreference } from "../../app/actions";
import { getPreferenceMapping, getSortingOptions } from "../../app/selectors";
import dispatch, { rerenderEvent, Store, useSelector } from "../../app/store";
import Pet, { PetMapping } from "../../types/Pet";
import petGroup from "../PetGroup/PetGroup";

import styles from './PreferenceList.module.css';

const parentNode = document.querySelector('#preference-list');

function preferenceList() {
  const preferenceMapping = useSelector(getPreferenceMapping);
  const sortingOptions = useSelector(getSortingOptions);

  const listContainer = document.createElement('div');
  listContainer.setAttribute('id', 'preference-list-container');
  parentNode?.appendChild(listContainer);

  const render = (preferenceMapping: Partial<PetMapping> | null, sortingOptions: Store["settings"]["sorting"]) => {
    if (preferenceMapping) {
      listContainer.className = '';

      Object.entries(preferenceMapping).forEach(([key, pets]) => {
        petGroup({
          title: key as Pet["type"],
          pets,
        },
        sortingOptions,
        listContainer);
      });
    } else {
      // placeholder
      listContainer.className = styles["is-empty"];

      const plusIcon = document.createElement('p');
      plusIcon.textContent = '+';
      plusIcon.className = `text-white ${styles["preference-list-icon"]}`;
      const helperText = document.createElement('p');
      helperText.className = `text-white`; 
      helperText.textContent = 'Drag pets here!'

      listContainer.appendChild(plusIcon);
      listContainer.appendChild(helperText);
    }

    return listContainer;
  };
  
  let node = render(preferenceMapping, sortingOptions);

  node?.addEventListener('drop', e => {
    e.preventDefault();
    
    const data = e.dataTransfer!.getData("text/plain");

    dispatch(addPreference(data));
  });

  let firstInvoke = true;

  node?.addEventListener('dragover', e => {
    e.preventDefault();

    if (firstInvoke) {
      e.dataTransfer!.dropEffect = "move";

      firstInvoke = false;
    }
  });

  rerenderEvent.addEventListener('rerender', (e) => {
    const store = (e as CustomEvent<Store>).detail;
    const preferenceMapping = getPreferenceMapping(store);
    const sortingOptions = useSelector(getSortingOptions);

    Array.from(node.children).forEach(child => {
      node.removeChild(child);
    });

    const nextNode = render(preferenceMapping, sortingOptions);

    parentNode?.replaceChild(nextNode, node);

    node = nextNode;
  });
}

export function preferenceListDragEventHandler() {
  const node = document.querySelector('#preference-list-container');

  if (node) {
    // remove helper text if user successfully dragged the card to preference list
    node.className += 
      Array.from(node.children).every(child => child.tagName === 'DIV')
      ? ''
      : ` ${styles["is-dragging"]}`;
  }
}

export function preferenceListDragAbortHandler() {
  const node = document.querySelector('#preference-list-container');

  if (node) {
    // remove helper text if user successfully dragged the card to preference list
    node.className = Array.from(node.children).every(child => child.tagName === 'DIV')
    ? ''
    : styles["is-empty"];
  }
}

export default preferenceList;
