import { FC, useEffect, useState } from 'react';
import { Modal, Button,  } from 'react-bootstrap';

import { INote, IDeleteModalProps } from '../../interfaces/note.interface';

const DeleteModal: FC<IDeleteModalProps> = ({
  show,
  note,
  onClose,
  onDeleteNote,
}) => {
  const [deletedNote, setDeletedNote] = useState<INote>({
    _id: '',
    title: '',
    body: '',
  });

  useEffect(() => {
    if (note === null) return;
    setDeletedNote(note);
  }, [note]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure you want to delete #{deletedNote._id.slice(0, 5)}?
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            onDeleteNote(deletedNote._id);
            onClose();
          }}
        >
          Delete
        </Button>
        <Button variant='secondary' onClick={onClose}>
          Discard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
