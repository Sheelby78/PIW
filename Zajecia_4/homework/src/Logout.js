import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout}>Wyloguj</button>
  );
};

export default Logout;
