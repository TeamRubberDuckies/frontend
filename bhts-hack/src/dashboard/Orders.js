import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';
import { TableFooter } from '@mui/material';

// Generate Order Data

const rowsPerPage = 8;

export default function Orders(props) {

    const [tablePage, setTablePage] = React.useState(0);

    const onPageChange = (_, page) => setTablePage(page);

    const rows = props.user.transactions.slice().reverse();

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
