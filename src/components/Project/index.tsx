import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormDialog from '../FormDialog';
import { Box } from '@mui/material';
import { IProject } from '../../interfaces/project.interface';
import { axiosDeleteProjects } from '../../services/fetch';

export default function Project() {
  const [verify, setVerify] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [newProject, setNewProject] = useState<IProject>({
    title: '',
    zipCode: '',
    cost: 0,
    deadline: '',
    username: '',
  });

  const handleClick = () => {
    setVerify(true)

  };

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<NoteAddIcon />}
          onClick={ handleClick }
        >
          Criar Novo Projeto
        </Button>
      </Box>
      <FormDialog
        verify={verify}
        setVerify={setVerify}
        newProject={newProject}
        setNewProject={setNewProject}
        setProjects={setProjects}
      />
      <Table
        aria-label="simple table"
        style={{ width: '100%' }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: 'bold',
              }}
            >
              Title
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
              }}
              align="center"
            >
              Zip Code
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
              }}
              align="center"
            >
              Cost
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
              }}
              align="center"
            >
              Deadline
            </TableCell>
            <TableCell
              style={{
                fontWeight: 'bold',
              }}
              align="center"
            >
              Done
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            projects.length > 0 &&
            projects.map((project: IProject, index) => (
              <TableRow
                key={project.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {project.zipCode}
                </TableCell>
                <TableCell align="center">{project.cost}</TableCell>
                <TableCell align="center">{project.deadline}</TableCell>
                <TableCell align="center">false</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
