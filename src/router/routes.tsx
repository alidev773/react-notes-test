import Home from '../screens/Home';
import NoteDetails from '../screens/NoteDetails';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/note/:id',
    element: <NoteDetails />,
  },
];
