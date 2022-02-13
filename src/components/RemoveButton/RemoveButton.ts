import { removePreference } from "../../app/actions";
import { getPreferenceMapping } from "../../app/selectors";
import dispatch, { useSelector } from "../../app/store";
import Pet from "../../types/Pet";

import styles from './RemoveButton.module.css';

function removeButton() {
  const removeButton = document.querySelector('#preference-list-remove');

  removeButton?.addEventListener('drop', e => {
    e.preventDefault();

    const data = (e as DragEvent).dataTransfer!.getData("text/plain");

    dispatch(removePreference(data));
  });

  let firstInvoke = true;

  removeButton?.addEventListener('dragover', e => {
    e.preventDefault();

    if (firstInvoke) {
      (e as DragEvent).dataTransfer!.dropEffect = "move";

      firstInvoke = false;
    }
  });
}

export function removeButtonDragEventHandler(type: Pet["type"], breedOrSpecies: string) {
  const node = document.querySelector('#preference-list-remove');
  const preferenceList = useSelector(getPreferenceMapping);

  let isInPreferenceList;

  if (preferenceList && type in preferenceList) {
    isInPreferenceList = preferenceList[type]!.find(pet => pet?.breed === breedOrSpecies || pet?.species === breedOrSpecies);
  }

  if (node && isInPreferenceList) {
    node.className = styles["can-drop"];
  }
}

export function removeButtonDragAboutHandler() {
  const node = document.querySelector('#preference-list-remove');

  if (node) {
    node.className = '';
  }
}

export default removeButton;
