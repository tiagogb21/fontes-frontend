import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setVerify(false);
  };

  const handleCloseAndSand = () => {
    setOpen(false);
    setVerify(false);

    setProjects((projects: any) => [...projects, newProject]);
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
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            variant="standard"
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
