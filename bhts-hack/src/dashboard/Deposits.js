import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Deposits(props) {
  var i = 0;
  var total = 0;
  while(i < props.user.transactions.length){
    total += props.user.transactions[i].amount
    i++;
  }

  const today = (new Date()).toDateString();

  return (
    <React.Fragment>
        <Typography color="text.secondary" fontSize={25} sx={{ flex: 1 }} textAlign='center'>
      { today }
      </Typography>
      <Title>Budget </Title>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        ${props.user.budget.toFixed(2)}
      </Typography>
      <Title>Total Amount Spent</Title>
      
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
       ${total.toFixed(2)}
      </Typography>

      <Title>Money Remaining</Title>
      
      <Typography component="p" variant="h4" sx={{ flex: 1 }} color={props.user.budget-total > 0 ? 'green' : 'red'}>
       ${(props.user.budget-total).toFixed(2)}
      </Typography>
    </React.Fragment>
  );
}
