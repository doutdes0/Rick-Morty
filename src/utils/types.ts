type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type APIRes = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  }
  results: Character[];
}

type Params = {
  name?: string;
  status?: string;
  species?: string
}

export type { Character, APIRes, Params }