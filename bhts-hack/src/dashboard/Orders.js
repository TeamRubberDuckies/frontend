import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Title from './Title';

// Generate Order Data


export default function Orders(props) {

    const [tablePage, setTablePage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.user.transactions.length < 8 ? props.user.transactions.length : 8);

    const onPageChange = (_, page) => setTablePage(page);

    const rows = props.user.transactions.slice().reverse();

    React.useEffect(() => {
        setRowsPerPage(props.user.transactions.length < 8 ? props.user.transactions.length : 8);
    }, [props.user.transactions.length]);

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Purchase</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(
        tablePage * rowsPerPage,
        tablePage * rowsPerPage + rowsPerPage,
      ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{(new Date(row.timestamp)).toLocaleString()}</TableCell>
              <TableCell>{row.purchase}</TableCell>
              <TableCell align="right">{`$${row.amount.toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TableRow>
            <TablePagination count={props.user.transactions.length} rowsPerPage={rowsPerPage} page={tablePage} onPageChange={onPageChange} rowsPerPageOptions={[]} />
        </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}
