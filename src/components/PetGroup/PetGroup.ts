import Pet from "../../types/Pet";
import { petCard } from "../PetCard";
import styles from './PetGroup.module.css';

type PetGroup = {
  title: Pet["type"];
  pets: Array<Pet>;
}

function petGroup(args: PetGroup) {
  const { title, pets } = args;

  // Create wrappers
  let groupContainer = document.createElement('div');
  groupContainer.className = 'pet-group';

  let groupTitle = document.createElement('h6');
  groupTitle.className = `text-white ${styles.capitalize}`;
  groupTitle.textContent = title;

  groupContainer.appendChild(groupTitle);
  groupContainer.appendChild(document.createElement('hr'));

  // add children
  pets.forEach(pet => {
    const card = petCard(pet);

    groupContainer.appendChild(card);
  });

  return groupContainer;
}

export default petGroup;
