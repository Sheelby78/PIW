import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Logout from "./Logout";
import Login from "./Login";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <div>Zalogowany jako: {user.name} {' '} {user.surname} {' '}
            <Logout />
        </div>
      ) : (
        <div>Niezalogowany użytkownik
            <Login />
        </div>
      )}
    </nav>
  );
};

export default Navbar;