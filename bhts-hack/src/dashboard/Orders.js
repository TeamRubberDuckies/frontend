import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data

function createData( id, date, Purchase, amount) {
  
  return { id, date, Purchase, amount };
}




function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {

  console.log(props);
 console.log(props.user.firstName);
  console.log(props.user.transactions.length);
   var i;
   let len = props.user.transactions.length;
   console.log(len)
   if(len < 10){
     i = 0
   }
   else{
    i = props.user.transactions.length -10;
  }
  let count = 0;
  // console.log(props.user.transactions[i].timestamp)
   const rows = [  ];

  while(i < props.user.transactions.length){
    rows [count] = createData(
      count,
      props.user.transactions[i].timestamp,
      props.user.transactions[i].purchase,
      props.user.transactions[i].amount,
    )  
    i++;
    count++;
  }

  // const rows = [
  //   createData(
  //     count,
  //     props.user.transactions[count].timestamp,
  //     props.user.transactions[count].purchase,
  //     props.user.transactions[count].amount,

  //   )
  // ];

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      {/* <Table size="small"> */}
        <Table size='LARGE'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Purchase</TableCell>
            {/* <TableCell>Ship To</TableCell> */}
            {/* <TableCell>Payment Method</TableCell> */}
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.Purchase}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell> */}
              {/* <TableCell>{row.paymentMethod}</TableCell> */}
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
