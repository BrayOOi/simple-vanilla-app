import Pet from "../types/Pet";

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

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    let cardImage = document.createElement('p');
    cardImage.textContent = image;

    let cardTitle = document.createElement('h5');
    cardBody.setAttribute('class', 'card-title');
    cardTitle.textContent = breed || species || '';

    let cardText = document.createElement('p');
    cardBody.setAttribute('class', 'card-text');
    cardText.textContent = `
      Adaptability: ${adaptability},
      Maintenance: ${maintenance}
    `;

    // attach the created elements to the shadow dom
    // shadow.appendChild(container);
    cardContainer.appendChild(cardBody);
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    return cardContainer;
  // }
}

export {
  petCard,
  PetCardTag,
}