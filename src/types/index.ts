export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type Theme = 'dark' | 'light';