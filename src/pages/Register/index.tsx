import React, { ChangeEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { Copyright } from '../../components/Copyright';
import { createUser } from '../../services/fetch';
import useFormValidation from '../../utils/validation/formValidation/useFormValidation';
import { RegisterForm } from '../../utils/validation/formValidation/schemas/register.schema';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const initialState = {
  name: '',
  username: '',
  password: '',
}

export default function Register() {
  const [user, setUser] = useState(initialState)

  const navigate = useNavigate();

  const { validateError, handleErrorMessage } = useFormValidation<RegisterForm>(
    "register"
  )

  const handleChange = (e: ChangeEvent) => {
    const {name, value} = e.target as HTMLInputElement;
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const result = await validateError(user);

    if (result) {
      return;
    }

    const register = await createUser(
      data.get('name') as string,
      data.get('username') as string,
      data.get('password') as string,
      data.get('password-confirm') as string,
    )

    const { access_token } = register.data;

    if(!access_token) {
      return;
    }

    localStorage.setItem('token', access_token);
    localStorage.setItem('username', user.username);

    navigate('/all')
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="register-name"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Nome"
              value={ user.name }
              autoFocus
              onChange={ handleChange }
              {...handleErrorMessage("name")}
            />
            <TextField
              id="register-username"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Nome de usuário"
              onChange={handleChange}
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
              onChange={handleChange}
              {...handleErrorMessage("password")}
            />
            <TextField
              id="login-confirm-password"
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="Senha"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Já tem uma conta?
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
