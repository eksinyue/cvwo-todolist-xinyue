import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Editor from './Editor';


const Main = () => (
  <BrowserRouter>
  <div>
    <Route path="/todos/:id?" component={Editor} />
  </div>
  </BrowserRouter>
);

export default Main