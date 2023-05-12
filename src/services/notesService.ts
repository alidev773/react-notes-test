import { v4 as uuid } from 'uuid';
import { INote, ICreateNote } from '../interfaces/note.interface';

export const getNotes = (): INote[] => {
  const notes: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');
  return notes;
};

export const getNoteById = (id: string): INote | null => {
  const notes: INote[] = JSON.parse(localStorage.getItem('notes') || '[]');
  const note: INote | undefined = notes.find((note: INote) => note._id === id);

  return note || null;
};

const saveNotes = (notes: INote[]): void => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

export const createNote = (note: ICreateNote): INote => {
  const notes: INote[] = getNotes();

  const newNote: INote = { ...note, _id: uuid() };

  notes.push(newNote);

  saveNotes(notes);

  return newNote;
};

export const deleteNote = (id: string): INote[] => {
  const notes: INote[] = getNotes();

  const filteredNotes: INote[] = notes.filter((note: INote): boolean => {
    return note._id !== id;
  });

  saveNotes(filteredNotes);

  return filteredNotes;
};

export const updateNote = (noteToUpdate: INote): INote[] => {
  const notes: INote[] = getNotes();

  const updatedList: INote[] = notes.map((note: INote): INote => {
    if (note._id === noteToUpdate._id) {
      return noteToUpdate;
    }
    return note;
  });

  saveNotes(updatedList);

  return updatedList;
};
