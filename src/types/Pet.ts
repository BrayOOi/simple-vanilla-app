interface Pet {
  adaptability: number;
  maintenance: number;
  type: 'dog' | 'cat' | 'bird';
  image: string;

  breed?: string;
  species?: string;
}

export default Pet;