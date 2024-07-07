export enum NoteCategory {
  PERSONAL = 'PERSONAL',
  WORK = 'WORK',
  STUDY = 'STUDY',
  OTHER = 'OTHER',
}

export interface Note {
  id?: number;
  title: string;
  content: string;
  archived: boolean;
  categories: NoteCategory[];
}
