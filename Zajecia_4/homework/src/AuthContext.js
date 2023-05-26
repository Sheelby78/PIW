import React, { createContext, useState, useEffect } from 'react';

const data = [
    {
      name: "Tomek",
      surname: "Nowak",
      mail: "tomeknowak@mail.com",
      password: "123"
    },
    {
      name: "Jacek",
      surname: "Kowalski",
      mail: "jacekkowalski@mail.com",
      password: "123"
    },
    {
      name: "Michal",
      surname: "Polak",
      mail: "michalpolak@mail.com",
      password: "123"
    }
  ];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    
    const foundUser = data.find((user) => user.mail === email);

    if (foundUser && foundUser.password === password) {
        const loggedInUser = foundUser;
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
