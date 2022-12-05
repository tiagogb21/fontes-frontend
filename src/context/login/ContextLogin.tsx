import { useState } from 'react';

const ContextLogin = () => {

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const contextLoginObj = {
    user,
    setUser,
  };

  return { contextLoginObj };
};

export default ContextLogin;
