import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Editor from './Editor';
import { Alert } from '../helpers/notifications';

const Main = () => (
  <BrowserRouter>
  <div>
    <Route path="/todos/:id?" component={Editor} />
    <Alert stack={ { limit: 3 } } />
  </div>
  </BrowserRouter>
);

export default Main