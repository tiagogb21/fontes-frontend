import React, { useMemo } from 'react';
import Context from './Context';
import ContextLogin from './login/ContextLogin';

interface IProps {
  children: React.ReactNode;
}

function ContextProvider(props: IProps) {
  const { children } = props;

  const { contextLoginObj } = ContextLogin();

  const context = useMemo(() => ({
    ...contextLoginObj,
  }), [
    contextLoginObj,
  ]);

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

export default ContextProvider;
