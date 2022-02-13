import { reorderPreference } from "../../app/actions";
import dispatch, { useSelector } from "../../app/store";
import Pet from "../../types/Pet";
import { preferenceListDragAbortHandler, preferenceListDragEventHandler } from "../PreferenceList/PreferenceList";
import { removeButtonDragAboutHandler, removeButtonDragEventHandler } from "../RemoveButton/RemoveButton";
import styles from './PetCard.module.css';

const PetCardTag = 'pet-card';

type PetCard = Pet;

let MEMOIZED_CARDS: { [key: string]: HTMLDivElement } = {};

// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
function petCard(args: PetCard, index: number) {
  const {
    adaptability,
    maintenance,
    image,
    type,

    breed,
    species
  } = args;

  const render = () => {  
    // Create wrappers
    let cardContainer = document.createElement('div');
    cardContainer.className = `card mb-3 ${styles["card-container"]}`;
    cardContainer.setAttribute('draggable', 'true');

    // user can drag and drop cards to preference list
    cardContainer.addEventListener('mousedown', e => {
      cardContainer.className = `card mb-3 ${styles["is-dragging"]}`;

      preferenceListDragEventHandler();
    });

    cardContainer.addEventListener('dragstart', e => {
      e.dataTransfer!.setData("text/plain", [type, breed || species || ''].join('/'));

      preferenceListDragEventHandler();
      preferenceListReorderDragHandler(type, cardContainer);
      removeButtonDragEventHandler(type, breed || species || '');
    })

    cardContainer.addEventListener('dragend', e => {
      cardContainer.className = `card mb-3 ${styles["card-container"]}`;

      preferenceListDragAbortHandler();
      removeButtonDragAboutHandler();
    });

    // user can drop card on top of other cards to displace cards in preference list
    cardContainer.addEventListener('drop', e => {
      e.preventDefault();
  
      const data = e.dataTransfer!.getData("text/plain");

      dispatch(reorderPreference(data, index));
    });

    // Create children
    let card;
    if (MEMOIZED_CARDS[breed || species || type]) {
      card = MEMOIZED_CARDS[breed || species || type];
    } else {
      card = document.createElement('div');
      card.className = 'row g-0';
  
      let cardImageContainer = document.createElement('div');
      cardImageContainer.className = 'col-md-4';
  
      let cardImage = document.createElement('img');
      cardImage.setAttribute('src', image);
      cardImage.className = 'img-fluid rounded-start';
  
      let cardBodyContainer = document.createElement('div');
      cardBodyContainer.className = 'col-md-8';
  
      let cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card-body');
  
      let cardTitle = document.createElement('h5');
      const petTitle = breed || species || '';
      cardTitle.textContent = petTitle.replaceAll('-', ' ');
      cardTitle.className = `card-title capitalize`;
  
      let cardText = document.createElement('p');
      cardText.setAttribute('class', 'card-text');
      cardText.textContent = `
        Adaptability: ${adaptability},
        Maintenance: ${maintenance}
      `;

      card.appendChild(cardImageContainer);
      cardImageContainer.appendChild(cardImage);

      card.appendChild(cardBodyContainer);
      cardBodyContainer.appendChild(cardBody);

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
    }

    cardContainer.appendChild(card);

    MEMOIZED_CARDS[breed || species || type] = card;

    return cardContainer;
  }

  return render();
}

function preferenceListReorderDragHandler(type: Pet["type"], card: HTMLDivElement) {
  // highlight the preference list's same type of pets
  const node = document.querySelector('#preference-list-container');

  if (node) {
    const targetGroup = Array.from(node.children).find(child => child.children[0].textContent === type);

    if (targetGroup) {
      Array.from(targetGroup.children)
      .filter(child => child.tagName === 'DIV' && !child.isSameNode(card))
      .forEach(child => {
        child.classList.add(styles['can-drop']);
      })
    }
  }
}

export {
  petCard,
  PetCardTag,
}