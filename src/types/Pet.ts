interface Pet {
  adaptability: number;
  maintenance: number;
  type: 'dog' | 'cat' | 'bird';
  image: string;

  breed?: string;
  species?: string;
}

export type PetMapping = Record<Pet["type"], Array<Pet>>;

export default Pet;