import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { useNavigate } from 'react-router-dom';

interface IProps {
  open: boolean;
}

const menu = [
  <FolderCopyIcon />,
  <CreateNewFolderIcon />,
]

const links = [
  'all',
  'new',
]

const ListDrawer = (props: IProps) => {
  const {open} = props;

  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent, target: string) => {
    navigate(target);
  }

  return (
    <List>
      {["Todos os Projetos", "Criar Projeto"].map((text, index) => (
        <ListItem
          key={text}
          disablePadding sx={{ display: "block" }}
          onClick={ (e: React.MouseEvent) => handleClick(e, links[index]) }
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {
                menu[index]
              }
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListDrawer;
