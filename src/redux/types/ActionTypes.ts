export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  released_date: Date;
  duration: number;
  image: string;
  actors?: [{
    name: string;
    image: string;
  }];
}

export interface Review {
  id: string;
  userId: string;
  reviewScore : number;
  description: string;
  status: boolean;
  movieId: string;
}