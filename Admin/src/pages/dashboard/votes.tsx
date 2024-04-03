import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
 
  { label: 'Downvotes', value: 200 },
  { label: 'Upvotes', value: 278 },

];

export default function Votes() {
  return (
    <main>
    <Typography sx={{ color: "#FFCA28" }}>
    <h1>Upvotes and Downvotes percentage</h1>
    </Typography>
    <Card variant="outlined">
    <PieChart
     colors={[ "yellow", "#FFCA28"]}
      series={[
      
        {
          startAngle: -90,
          endAngle: 90,
          data,
        },
      ]}
      height={300}
    />
</Card>
    </main>
  );
}
