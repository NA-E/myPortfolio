export interface Recipe {
  name: string;
  problem: string;
  solution: string;
  why: string;
  snippet?: string;
}

export interface JournalSection {
  heading: string;
  paragraphs: string[];
}

export interface JournalEntry {
  issue: number;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  project: string;
  tags: string[];
  tldr: string;
  sections: JournalSection[];
  recipes: Recipe[];
}
