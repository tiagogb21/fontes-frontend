import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosCreateProject, axiosDeleteProjects } from "../../services/fetch";
import useFormValidation from "../../utils/validation/formValidation/useFormValidation";
import { RegisterFormProject } from "../../utils/validation/formValidation/schemas/project.schema";

interface INewProject {
  title: string;
  zipCode: string;
  cost: number;
  deadline: string;
  username: string;
}

interface IProps {
  verify: boolean;
  setVerify: (verify: boolean) => void;
  newProject: INewProject;
  setNewProject: (newProject: INewProject) => void;
  setProjects: (projects: any) => void;
}

export default function FormDialog(props: IProps) {
  let { verify, setVerify, newProject, setNewProject, setProjects } = props;

  const token = localStorage.getItem('token') as any;
  const username = localStorage.getItem('username') as any;

  const [open, setOpen] = useState(false);

  const handleClose = async () => {
    setOpen(false);
    setVerify(false);
  };

  const { validateError, handleErrorMessage } = useFormValidation<RegisterFormProject>(
    "project"
  )

  const handleCloseAndSand = async () => {
    const result = await validateError(newProject);

    if (!result) {
      return;
    }

    if(!newProject.deadline) return;

    newProject.deadline = (new Date(newProject.deadline)).toISOString().replace('T', 'T ');

    const createProject = await axiosCreateProject(username, token, newProject);

    if(createProject?.message?.includes('4')) {
      return;
    }

    setProjects((projects: any) => [...projects, newProject]);

    console.log(createProject)

    setOpen(false);
    setVerify(false);
  };

  useEffect(() => {
    if (verify) {
      setOpen(true);
    }
  }, [verify]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para criar um projeto, por favor, preencha o formulário abaixo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Título"
            type="text"
            fullWidth
            value={ newProject.title }
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            variant="standard"
            {...handleErrorMessage("title")}
          />
          <TextField
            margin="dense"
            id="zip_code"
            label="CEP"
            type="text"
            fullWidth
            value={newProject.zipCode}
            onChange={(e) => setNewProject({ ...newProject, zipCode: e.target.value })}
            variant="standard"
            {...handleErrorMessage("zipCode")}
          />
          <TextField
            margin="dense"
            id="cost"
            label="Custo"
            type="number"
            fullWidth
            value={newProject.cost}
            onChange={(e) => setNewProject({ ...newProject, cost: +e.target.value })}
            variant="standard"
            {...handleErrorMessage("cost")}
          />
          <p>Vencimento</p>
          <TextField
            margin="dense"
            id="deadline"
            type="date"
            fullWidth
            value={newProject.deadline}
            onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
            variant="standard"
            {...handleErrorMessage("deadline")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCloseAndSand}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
