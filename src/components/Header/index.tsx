import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import { AppBar } from "../../helpers/Header";
import { Box, Button, useMediaQuery } from "@mui/material";

interface IProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

const Header = (props: IProps) => {
  const { open, handleDrawerOpen } = props;
  const [verify, setVerify] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setVerify(true);
      setUsername(username);
      return;
    }
    localStorage.clear();
    setVerify(false);
  }, []);

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Projetos
          </Typography>
          {verify && (
            <div
              style={{
                width: matches? "40%" : "55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "3vw",
              }}
            >
              <p
                style={{
                  overflow: "hidden",
                }}
              >{`Bem vindo, ${username}`} </p>
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => {
                  localStorage.clear();
                  setVerify(false);
                }}
              >
                Sair
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
