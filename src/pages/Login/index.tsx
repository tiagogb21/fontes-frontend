import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Copyright } from '../../components/Copyright';
import useFormValidation from '../../utils/validation/formValidation/useFormValidation';
import { RegisterForm } from '../../utils/validation/formValidation/schemas/register.schema';
import { loginUser } from '../../services/fetch';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const initialState = {
  username: '',
  password: '',
}

export default function Login() {
  const [user, setUser] = useState(initialState);
  const [verifyLogin, setVerifyLogin] = useState(false);

  const { validateError, handleErrorMessage } = useFormValidation<RegisterForm>(
    "register"
  )

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent) => {
    const {name, value} = e.target as HTMLInputElement;
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVerifyLogin(false);

    const data = new FormData(event.currentTarget);

    const result = await validateError(user);

    if (result) {
      return;
    }

    const login = await loginUser(
      data.get('username') as string,
      data.get('password') as string,
    )

    const { access_token } = login;

    if(!access_token) {
      setVerifyLogin(true);
      return;
    }

    localStorage.setItem('token', access_token);
    localStorage.setItem('username', user.username);

    console.log(1)

    navigate('/all')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          {
              verifyLogin && (
                <Grid container>
                  <Grid item xs>
                    <Typography variant="body2" color="error">
                      Usuário ou senha inválidos
                    </Typography>
                  </Grid>
                </Grid>
              )
            }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="login-username"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Nome de usuário"
              autoFocus
              value={ user.username }
              onChange={ handleChange }
              {...handleErrorMessage("username")}
            />
            <TextField
              id="login-password"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              value={ user.password }
              onChange={ handleChange }
              {...handleErrorMessage("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
