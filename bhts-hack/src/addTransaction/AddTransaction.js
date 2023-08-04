import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddTransaction(props) {
    const [success, setSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(`Sending addTransaction request.`);

    axios.post('https://api.mittaldev.com/bhts-dev/addTransaction', {
        pass: 'dev-886FX2e2',
        user: {
            username: props.user.username,
            password: props.user.password,
        },
        transaction: {
            amount: Number(data.get('amount')),
            purchase: data.get('purchase')
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
            <ShoppingCartOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Transaction
          </Typography>
          <Typography textAlign='center'>
            Add a transaction when you've spent on something unnecessary, like a movie ticket.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount Spent"
              name="amount"
              type='number'
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="purchase"
              label="Item Purchased"
              name="purchase"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Transaction
            </Button>
            {
                success &&
                <Typography color='green' textAlign='center'>
                    Transaction Added!
                </Typography>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}