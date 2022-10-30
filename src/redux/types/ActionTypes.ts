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
