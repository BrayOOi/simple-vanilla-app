async function main() {
  // fetch data onload
  const response = await fetch('/pets');
  const petsArr: Array<Pet> = await response.json();
}

window.onload = main;