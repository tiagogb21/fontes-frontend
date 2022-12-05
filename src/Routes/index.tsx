import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';

import Loading from '../components/Loading';
import Login from '../pages/Login';
import Project from '../pages/Project';
import Register from '../pages/Register';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AllProjects from '../pages/AllProjects';
import UpdateProject from '../pages/UpdateProject';
import { initialProject } from '../data/constants';

const Router: React.FC = () => {
  const { isLoading, user } = useAuth0();

  console.log(user)

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Routes>
      <Route path="/update/:id" element={<UpdateProject />} />
      <Route path="/all" element={<AllProjects />} />
      <Route path="/new" element={<Project />} />
      <Route path='/' element={<ProtectedRoute/>}>
        <Route path='/' element={<Project/>}/>
      </Route>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default Router;
