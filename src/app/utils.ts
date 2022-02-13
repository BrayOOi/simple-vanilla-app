import Pet, { PetMapping } from "../types/Pet";

// this will map to pet tokens in Array to Map
const PetsMap = (pets: Array<Pet>) => {
  const petMapping = pets.reduce((accum, pet) => ({
    ...accum,
    [pet.type]: pet.type in accum ? [...accum[pet.type], pet] : [pet]
  }), {} as PetMapping);

  return petMapping;
};

// disregard subsequent calls with this decorator
function onlyFirst(fn: () => void) {
  let firstInvoke = true;

  if (firstInvoke) {
    firstInvoke = false;
    fn();
  }
}

export {
  PetsMap,
  onlyFirst
};
