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
  bullets?: string[];  // optional bullet list rendered after paragraphs
}

export interface JournalEntry {
  issue: number;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  project: string;
  author?: string;  // who narrates this entry (e.g. 'Nourin', 'Jarvis')
  tags: string[];
  tldr: string;
  sections: JournalSection[];
  recipes: Recipe[];
}
