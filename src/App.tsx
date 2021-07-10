import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { LoadPanel } from 'devextreme-react/load-panel';

import Auth from './store/Auth';
import AuthObserver from './components/Login/AuthObserver';
import Page404 from './components/404';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import AddNote from './components/Notes/AddNote';
import EditNote from './components/Notes/EditNote';
import Notes from './components/Notes/Notes';
import Registration from './components/Profile/Registration';

const App = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    Auth.init().then(() => {
      setInit(true);
    });
  }, []);
  if (!init) {
    return (
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        position={{ of: '#employee' }}
        visible={true}
        showIndicator={true}
        shading={true}
        showPane={true}
        closeOnOutsideClick={false}
        message="Загрузка..."
      />
    );
  }
  return (
    <>
      <AuthObserver />
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
export default observer(App);
