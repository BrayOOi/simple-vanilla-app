import Pet, { PetMapping } from "../types/Pet";

// this will map to pet tokens in Array to Map
const getPetsMapping = (pets: Array<Pet>) => {
  const petMapping = pets.reduce((accum, pet) => ({
    ...accum,
    [pet.type]: pet.type in accum ? [...accum[pet.type], pet] : [pet]
  }), {} as PetMapping);

  return petMapping;
};

export {
  getPetsMapping
};
