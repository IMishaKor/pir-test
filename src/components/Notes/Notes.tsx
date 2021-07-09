import { Redirect } from 'react-router-dom';
import Auth from '../../store/Auth';

const Notes = () => {
  if (!Auth.isAuth) {
    return <Redirect to="/login" />;
  }

  return <div>Notes</div>;
};

export default Notes;
