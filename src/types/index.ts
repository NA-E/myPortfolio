export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  features: { title: string; description: string }[];
  results?: string[];
  videoUrl?: string;
  testimonial?: {
    image?: string;
    text?: string;
    name?: string;
    role?: string;
  };
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export type Theme = 'dark' | 'light';