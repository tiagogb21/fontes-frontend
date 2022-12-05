import React, { useEffect, useState } from "react";
import { Button } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';

import { formatedDate, getZipCodeInfo } from "../../data/functions";
import { axiosDeleteProjects } from "../../services/fetch";
import { Navigate, useNavigate } from "react-router-dom";

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

interface IProps {
  project: IProject;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectDetails = (props: IProps) => {
  const { project, setVerify } = props;

  const {
    cost,
    createdAt,
    deadline,
    done,
    id,
    title,
    updatedAt,
    username,
    zip_code,
  } = project;

  const navigate = useNavigate()

  const [location, setLocation] = useState<string | undefined>('');

  useEffect(() => {
    getZipCodeInfo(Number(zip_code)).then((data: any) => {
      setLocation(data);
    });
  })

  const handleClickDelete = async (index: string) => {
    const token = localStorage.getItem('token') as any;
    await axiosDeleteProjects(username, index, token);
    setVerify((prev) => !prev);
  }

  const handleClickUpdate = async (index: string) => {
    navigate(`/update/${index}`);
  }

  return (
    <div
      key={id}
      style={{
        border: "1px solid black",
        padding: "12px",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleClickUpdate(id)}
        >
          Atualizar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => handleClickDelete(id)}
        >
          Excluir
        </Button>
      </div>
      <h2>{title}</h2>
      <h4
        style={{
          color: "red",
        }}
      >
        {cost}
      </h4>
      <p>
        <span style={{ fontWeight: "bold" }}>Location:</span> {`${location}`}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Done:</span>{" "}
        {done.toString()}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Deadline:</span>{" "}
        {formatedDate(deadline)}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>CreatedAt:</span>{" "}
        {formatedDate(createdAt)}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>UpdatedAt:</span>{" "}
        {formatedDate(updatedAt)}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Username:</span> {username}{" "}
      </p>
    </div>
  );
};

export default ProjectDetails;
