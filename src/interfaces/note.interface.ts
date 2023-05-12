export interface INote {
  _id: string;
  title: string;
  body: string;
}

export interface IUpdateModalProps {
  show: boolean;
  note: INote | null;
  onClose: () => void;
  onNoteUpdate: (updated: INote) => void;
}

export interface IDeleteModalProps {
  show: boolean;
  note: INote | null;
  onClose: () => void;
  onDeleteNote: (id: string) => void;
}

export type ICreateNote = Omit<INote, '_id'>;
