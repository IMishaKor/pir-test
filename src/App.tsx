import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from './components/404';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import AddNote from './components/Notes/AddNote';
import EditNote from './components/Notes/EditNote';
import Notes from './components/Notes/Notes';
import Registration from './components/Profile/Registration';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/notes/add" component={AddNote} />
        <Route path="/notes/edit/:noteId(\d+)" component={EditNote} />
        <Route path={['/notes', '/']} component={Notes} exact />
        <Route path={['*', '/404']} component={Page404} />
      </Switch>
    </>
  );
};

export default App;
