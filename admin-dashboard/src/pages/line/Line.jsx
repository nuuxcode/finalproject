import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';

export default function BasicArea() {
  return (<div><Typography sx={{  color: "#FFFF00", }}>
    <h1>Number of posts by month</h1>
     </Typography >
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 6,7,8,9, 10, 11 , 12] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5, 12,9, 7,2,4],
          area: true,
        },
      ]}
      width={500}
      height={300}
    /></div>
  );
}
