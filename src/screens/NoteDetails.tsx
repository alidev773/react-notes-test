import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Button } from 'react-bootstrap';

import { getNoteById } from '../services/notesService';
import { INote } from '../interfaces/note.interface';

const NoteDetails: FC = (): React.ReactElement => {
  const [note, setNote] = useState<INote>({
    _id: '',
    title: '',
    body: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return navigate(-1);
    getNote(id);
  }, [id, navigate]);

  const getNote = (id: string) => {
    const note: INote | null = getNoteById(id);

    if (note === null) return;

    setNote(note);
  };

  return (
    <>
      <div className='row'>
        <div className='col'>
          <Button variant='dark' onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft />
          </Button>
        </div>
        <div className='col'>
          <p className='mb-0 text-end'>#{note._id.slice(0, 5)}</p>
        </div>
      </div>

      <div className='mt-4'>
          <h1 className='mb-3'>
                Note title: 
          </h1>
          <p>
              {note.title}
          </p>
      </div>

      <div className='mt-5'>
          <h1 className='mb-3'>
                Note Body: 
          </h1>
          <p>
              {note.body}
          </p>
      </div>
    </>
  );
};

export default NoteDetails;
