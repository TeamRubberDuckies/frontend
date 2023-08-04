import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Budget(props) {
    const [success, setSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(`Sending setBudget request. User: ${JSON.stringify(props.user)}`);

    axios.post('https://api.mittaldev.com/bhts-dev/updateBudget', {
        pass: 'dev-886FX2e2',
        user: {
            username: props.user.username,
            password: props.user.password,
            budget: Number(data.get('budget')) 
        }
    }).then(function (response) {
        console.log(response.data.user); //response.data contains user
        props.setUser(response.data.user);
        setSuccess(true);
      })
      .catch(function (error) {
        console.error(error);
        setSuccess(false);
        alert(error.response.data.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PaidOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set Budget
          </Typography>
          <Typography textAlign='center'>
          This is how much money you are willing to save or spend.<br /><br />Your budget is currently ${props.user.budget.toFixed(2)}.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="budget"
              label="Budget"
              name="budget"
              autoComplete="budget"
              type='number'
              autoFocus
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set Your Budget
            </Button>
            {
                success &&
                <Typography color='green' textAlign='center'>
                    Budget Changed!
                </Typography>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}