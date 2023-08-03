import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  var i = 0;
  var total = 0;
  while(i < props.user.transactions.length){
    total += props.user.transactions[i].amount
    i++;
  }

  var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    

  return (
    <React.Fragment>
      <Title>Budget </Title>
      <Typography component="p" variant="h4">
        ${props.user.budget}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      { date}
      </Typography>
      <Title>Total Amount Spent</Title>
      
      <Typography component="p" variant="h4">
       ${total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      { date }
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
