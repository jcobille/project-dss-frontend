export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Actor {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  image: string;
  moviesId: string[];
}

export interface Movie {
  id?: string;
  title: string;
  description: string;
  released_date: string;
  duration: string;
  image: string;
  cost: string;
  actors?: Actor[];
  reviews?: Review[];
}

export interface Movies {
  id?: string;
  title: string;
  description: string;
  released_date: string;
  duration: string;
  image: string;
  cost: string;
}
export interface Review {
  id: string;
  userId: string;
  reviewScore: number;
  description: string;
  status: boolean;
  movieId: string;
}
