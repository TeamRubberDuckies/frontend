import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Title from '../dashboard/Title';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const calculateSavings = user => {
    if (user.budget === 0) { return 0; }

    const expenses = user.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

    const savings = user.budget - expenses;

    return savings / user.budget;
};

export default function Leaderboard(props) {

    const [loading, setLoading] = React.useState(false);

    const [tablePage, setTablePage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.users.length < 8 ? props.users.length : 8);

    const onPageChange = (_, page) => setTablePage(page);

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        // calculate percentage saved for each user 
        const savingsUsers = props.users.map(u => ({ ...u, percentageSaved: calculateSavings(u) }));

        // sort users bsed on percentage saved
        setRows(savingsUsers.sort((u1, u2) => u2.percentageSaved - u1.percentageSaved));
    }, [props.users]);

    React.useEffect(() => {
        setRowsPerPage(props.users.length < 8 ? props.users.length : 8);
    }, [props.users.length]);

    const refresh = () => {
        setLoading(true);
        axios.post('https://api.mittaldev.com/bhts-dev/login', {
            pass: 'dev-886FX2e2',
            user: {
                username: props.user.username,
                password: props.user.password,
            }
        }).then(function (response) {
            props.setUser(response.data.users.find(u => u.username === props.user.username));
            props.setUsers(response.data.users);
            setLoading(false);
        })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
                alert(error.response.data.message);
            });
    };

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
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Grid container direction='row'>
                                    <Grid item xs={6}>
                                        <Title>Leaderboard</Title>
                                    </Grid>
                                    <Grid item xs={6} container justifyContent="flex-end">
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label="refresh"
                                            onClick={refresh}
                                            sx={{
                                                marginRight: '36px',
                                            }}
                                        >
                                            {
                                                loading &&
                                                <Typography fontSize={15}>Loading... </Typography>
                                            }
                                            <RefreshIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Position</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Budget</TableCell>
                                            <TableCell align="right">Percent Saved</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(
                                            tablePage * rowsPerPage,
                                            tablePage * rowsPerPage + rowsPerPage,
                                        ).map((row, index) => (
                                            <TableRow key={row.username}>
                                                <TableCell><strong>{index + 1}.</strong></TableCell>
                                                <TableCell>{row.firstName} {row.lastName}</TableCell>
                                                <TableCell>${row.budget.toFixed(2)}</TableCell>
                                                <TableCell align="right">{Math.floor(row.percentageSaved * 100)}%</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination count={props.users.length} rowsPerPage={rowsPerPage} page={tablePage} onPageChange={onPageChange} rowsPerPageOptions={[]} />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
        </ThemeProvider>
    );
}
