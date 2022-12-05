import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { axiosGetProjects, axiosUpdateProject, axiosUpdateProjectsToDone } from "../../services/fetch";
import { useLocation } from "react-router-dom";

const username = localStorage.getItem("username") as string;
const token = localStorage.getItem("token") as string;

interface IProject {
  id: string;
  title: string;
  zipCode: string;
  cost: number;
  deadline: string;
  username: string;
}

const UpdateProject = () => {
  const [project, setProject]= useState<IProject>();
  const [ verifyButton, setVerifyButton ] = useState(false);
  const [projectUpdate, setProjectUpdate] = useState<IProject>();

  const location = useLocation();
  const id = location.pathname.split('/')[2]

  useEffect(() => {
    const getProjects = async () => {
      const username = localStorage.getItem("username") as string;
      const token = localStorage.getItem("token") as string;
      const result = await axiosGetProjects(username, token);
      const filterProject = result.data.filter((project: IProject) => project.id === id);
      console.log(...filterProject)
      setProject(filterProject[0]);
    };
    getProjects();
  }, [])

  const handleClickUpdate = async (index: string) => {
    return await axiosUpdateProject(username, index, token, project);
  };

  const handleClickDone = async () => {
    console.log(project);
    setVerifyButton(true);
    const result = await axiosUpdateProjectsToDone(username, id, token);
    console.log(result);
  }

  return (
    <TableContainer>
      <Table aria-label="simple table" style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
            >
              Title
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="center"
            >
              Zip Code
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="center"
            >
              Cost
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="center"
            >
              Deadline
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
              }}
              align="center"
            >
              Done
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              key={project?.title}
            >

              <TextField
                name="cost"
                value={ project?.title }
                onChange={(e) => {
                  setProjectUpdate((prev) => ({
                    ...prev,
                    title: e.target.value,
                  } as IProject));
                }}
              />
            </TableCell>
            <TableCell component="th" scope="row">
              <TextField
                name="cost"
                type="number"
                value={ project?.zipCode }
                onChange={(e) => {
                  setProjectUpdate((prev) => ({
                    ...prev,
                    zipCode: e.target.value,
                  }  as IProject));
                }}
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="cost"
                value={ project?.cost }
                onChange={(e) => {
                  setProjectUpdate((prev) => ({
                    ...prev,
                    cost: +e.target.value,
                  } as IProject));
                  console.log(project)
                }}
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                name="cost"
                type="date"
                value={ project?.deadline }
                onChange={(e) => {
                  setProjectUpdate((prev) => ({
                    ...prev,
                    title: e.target.value,
                  } as IProject));
                }}
              />
              </TableCell>
            <TableCell align="center">
              {
                verifyButton ? (
                  <Button
                    onClick={handleClickDone}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    true
                  </Button>
                ) : (
                  <Button
                    onClick={handleClickDone}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    false
                  </Button>
                )
              }
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={() => handleClickUpdate(id)}
              >
                Atualizar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>Clique no botão 'false' para atualizar o estado DONE para 'true'</p>
      {
        verifyButton && (
          <p>Projeto atualizado com sucesso!</p>
        )
      }
      <p>Caso queira atualizar os dados, clique no botão 'atualizar'</p>
    </TableContainer>
  );
};

export default UpdateProject;
