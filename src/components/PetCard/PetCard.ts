import Pet from "../../types/Pet";
import styles from './PetCard.module.css';

const PetCardTag = 'pet-card';

type PetCard = Pet;

// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
function petCard(args: PetCard) {
  const {
    adaptability,
    maintenance,
    image,

    breed,
    species
  } = args;
  // constructor() {
    // Always call super first in constructor
    // super();

    // Create a shadow root
    // var shadow = this.attachShadow({mode: 'open'});

    // Create wrappers
    let cardContainer = document.createElement('div');
    cardContainer.setAttribute('class', "card mb-3");

    let card = document.createElement('div');
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
    cardTitle.className = `card-title ${styles.capitalize}`;

    let cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text');
    cardText.textContent = `
      Adaptability: ${adaptability},
      Maintenance: ${maintenance}
    `;

    // attach the created elements to the shadow dom
    // shadow.appendChild(container);
    cardContainer.appendChild(card);

    card.appendChild(cardImageContainer);
    cardImageContainer.appendChild(cardImage);

    card.appendChild(cardBodyContainer);
    cardBodyContainer.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    return cardContainer;
  // }
}

export {
  petCard,
  PetCardTag,
}