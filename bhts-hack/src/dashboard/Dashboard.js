import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import Orders from './Orders';
import Typography from '@mui/material/Typography';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {

  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '200vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container direction='column'>
                <Grid container>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row', marginBottom: 4, marginRight: 4, padding: 3, }}>
                            <Typography variant='h5' style={{ marginRight: 10 }}>
                                Hello,
                            </Typography>

                            <Typography variant='h5' color='gray'>
                                {props.user.firstName} {props.user.lastName}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container>
                {/* Was Chart Now is Recent transactions */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginRight: 4, }}>
                        <Orders user={props.user} users={props.users}/>
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 550,
                    }}
                    >
                    <Deposits user={props.user} users={props.users}/>
                    </Paper>
                </Grid>
                </Grid>
            </Grid>
          </Container>
            
        </Box>
    </ThemeProvider>
  );
}