import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Modal, Form, Table } from 'react-bootstrap';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import UpdateModal from '../components/UpdateModal/UpdateModal';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import { INote, ICreateNote } from '../interfaces/note.interface';
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../services/notesService';

const Home: FC = (): React.ReactElement => {
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState<boolean>(false);
  const [deleteNoteItem, setDeleteNoteItem] = useState<INote | null>(null);
  const [editNoteItem, setEditNoteItem] = useState<INote | null>(null);
  const [newNote, setNewNote] = useState<ICreateNote>({
    title: '',
    body: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleCloseAddModal = () => {
    setNewNote({
      title: '',
      body: '',
    });
    setShowAddNoteModal(false);
  };
  const handleShowAddModal = () => {
    setShowAddNoteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteNoteItem(null);
  };

  const handleCloseUpdateModal = (): void => {
    setEditNoteItem(null);
  };

  const getAllNotes = () => {
    const notes: INote[] = getNotes();

    setNotesList(notes);
  };

  const addNote = () => {
    const savedNote: INote = createNote(newNote);

    setNotesList([...notesList, savedNote]);
    handleCloseAddModal();
  };

  const updateNoteItem = (updatedNote: INote): void => {
    const updatedNotes: INote[] = updateNote(updatedNote);

    setNotesList(updatedNotes);
  };

  const deleteSelectedNote = (id: string): void => {
    const newNotes: INote[] = deleteNote(id);

    setNotesList(newNotes);
  };

  return (
    <>
      <Button
        variant='dark'
        className='add-button'
        onClick={handleShowAddModal}
      >
        <div className='add-button-text'>+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label='Title'>
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  title: newVal,
                });
              }}
              type='text'
              placeholder='Enter your note title'
            />
          </FloatingLabel>
          <FloatingLabel label='Body' className='mb-3 note-link'>
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  body: newVal,
                });
              }}
              as='textarea'
              placeholder='Enter your note body'
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant='primary' onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <UpdateModal
        show={editNoteItem !== null}
        note={editNoteItem}
        onClose={handleCloseUpdateModal}
        onNoteUpdate={updateNoteItem}
      />

      <DeleteModal
        show={deleteNoteItem !== null}
        note={deleteNoteItem}
        onClose={handleCloseDeleteModal}
        onDeleteNote={deleteSelectedNote}
      />

      {notesList.length > 0 ? (
        <div className='table-container'>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>id</th>
                <th>Title</th>
                <th>Body</th>
                <th className='text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              {notesList.map(
                (
                  noteItem: INote,
                  index: number
                ): React.ReactElement<HTMLTableRowElement> => {
                  return (
                    <tr
                      key={index}
                      onClick={() => navigate(`/note/${noteItem._id}`)}
                    >
                      <td>#{noteItem._id.slice(0, 5)}</td>
                      <td>{noteItem.title}</td>
                      <td>{noteItem.body}</td>
                      <td className='text-end'>
                        <Button
                          variant='outline-primary'
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditNoteItem(noteItem);
                          }}
                        >
                          <MdModeEdit />
                        </Button>{' '}
                        <Button
                          variant='outline-danger'
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteNoteItem(noteItem);
                          }}
                        >
                          <MdDelete />
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className='not-found'>
          <h5 className='mb-0'>No Notes Found!</h5>
        </div>
      )}
    </>
  );
};

export default Home;
