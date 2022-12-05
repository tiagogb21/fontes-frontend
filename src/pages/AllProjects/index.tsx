import { useMediaQuery } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ProjectDetails from '../../components/ProjectDetails';
import { axiosGetProjects } from '../../services/fetch';

interface IProject {
  cost: number | string;
  createdAt: string;
  deadline: string;
  done: boolean | string;
  id: string;
  title: string;
  updatedAt: string;
  username: string;
  zip_code: string;
}

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [verify, setVerify] = useState<boolean>(false);

  useEffect(() => {
    const getProjects = async () => {
      const token = localStorage.getItem('token') as any;
      const username = localStorage.getItem('username') as any;
      const response = await axiosGetProjects(username, token);
      console.log(response);
      setProjects(response.data);
    }
    getProjects();
  }, [verify]);

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: matches ? '30% 30% 30%' : '',
        gap: '3vw',
      }}
    >
      {
        (projects.length > 0) &&
        projects.map((project: IProject) =>
          {
            project.cost = project.cost.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            return (
              <ProjectDetails project={project} setVerify={setVerify}/>
            )
          }
        )
      }
    </div>
  );
}

export default AllProjects;
