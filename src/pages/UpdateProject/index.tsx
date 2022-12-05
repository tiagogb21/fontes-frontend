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
import {
  axiosGetProjects,
  axiosUpdateProject,
  axiosUpdateProjectsToDone,
} from "../../services/fetch";
import { useLocation } from "react-router-dom";
import useFormValidation from "../../utils/validation/formValidation/useFormValidation";
import { RegisterFormProject } from "../../utils/validation/formValidation/schemas/project.schema";
import { IProject } from "../../interfaces/project.interface";

const username = localStorage.getItem("username") as string;
const token = localStorage.getItem("token") as string;

const UpdateProject = () => {
  const [project, setProject] = useState<IProject | any>();
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyUpdate, setVerifyUpdate] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProjects = async () => {
      const username = localStorage.getItem("username") as string;
      const token = localStorage.getItem("token") as string;
      const result = await axiosGetProjects(username, token);
      const filterProject = result.data.filter(
        (project: any) => project.id === id
      )[0];
      setProject({
        ...filterProject,
        zipCode: filterProject.zip_code,
      });
    };
    getProjects();
  }, []);

  const { validateError, handleErrorMessage } =
    useFormValidation<RegisterFormProject>("project");

  const handleClickUpdate = async (index: string) => {
    if (!project) return;

    const result = await validateError(project);

    if (!result) {
      return;
    }

    setVerifyUpdate(true);

    const updateProject = await axiosUpdateProject(username, index, token, project);

    if (updateProject.status !== 200) {
      setVerifyUpdate(false);
      return;
    }

    setVerifyUpdate(true);

    console.log(updateProject)
  };

  const handleClickDone = async () => {
    const result = await axiosUpdateProjectsToDone(username, id, token);
    if (result.status !== 200) {
      alert("Erro ao atualizar projeto");
    }
    setVerifyButton(true);
  };

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
          {project && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell key={project?.title}>
                <TextField
                  margin="dense"
                  name="title"
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      title: e.target.value,
                    })
                  }}
                  {...handleErrorMessage("title")}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <TextField
                  margin="dense"
                  name="zip_code"
                  type="text"
                  value={project.zipCode}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      zipCode: e.target.value,
                    })
                  }}
                  {...handleErrorMessage("zipCode")}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  margin="dense"
                  type="number"
                  name="cost"
                  value={project.cost}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      cost: +e.target.value,
                    })
                    console.log(project);
                  }}
                  {...handleErrorMessage("title")}
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  name="deadline"
                  type="date"
                  value={project.deadline}
                  onChange={(e) => {
                    console.log(new Date(project.deadline).toISOString().split("T")[0])
                    setProject({
                      ...project,
                      deadline: e.target.value,
                    });
                  }}
                  {...handleErrorMessage("deadline")}
                />
              </TableCell>
              <TableCell align="center">
                {verifyButton ? (
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
                )}
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
          )}
        </TableBody>
      </Table>
      <p>Clique no botão 'false' para atualizar o estado DONE para 'true'</p>
      {verifyButton && (
        <p style={{ color: "blue", fontWeight: "bold" }}>
          Projeto atualizado com sucesso! Done atualizado para true.
        </p>
      )}
      <p>Caso queira atualizar os dados, clique no botão 'atualizar'</p>
      {
        verifyUpdate && (
        <p style={{ color: "blue", fontWeight: "bold" }}>
          Projeto atualizado com sucesso!
        </p>
        )
      }
    </TableContainer>
  );
};

export default UpdateProject;
