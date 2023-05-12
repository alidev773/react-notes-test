import { FC, useEffect, useState } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';

import { INote, IUpdateModalProps } from '../../interfaces/note.interface';

const UpdateModal: FC<IUpdateModalProps> = ({
  show,
  note,
  onClose,
  onNoteUpdate,
}) => {
  const [updatedNote, setUpdatedNote] = useState<INote>({
    _id: '',
    title: '',
    body: '',
  });

  useEffect(() => {
    if (note === null) return;
    setUpdatedNote(note);
  }, [note]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update #{updatedNote._id.slice(0, 5)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FloatingLabel label='Title'>
          <Form.Control
            onChange={(event) => {
              const newVal = event.currentTarget.value;
              setUpdatedNote({
                ...updatedNote,
                title: newVal,
              });
            }}
            value={updatedNote.title}
            type='text'
            placeholder='Enter your note title'
          />
        </FloatingLabel>
        <FloatingLabel label='Body' className='mb-3 note-link'>
          <Form.Control
            onChange={(event) => {
              const newVal = event.currentTarget.value;
              setUpdatedNote({
                ...updatedNote,
                body: newVal,
              });
            }}
            value={updatedNote.body}
            as='textarea'
            placeholder='Enter your note body'
            style={{ height: '100px' }}
          />
        </FloatingLabel>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            onNoteUpdate(updatedNote);
            onClose();
          }}
        >
          Update
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
