
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
const chartSetting = {
  xAxis: [
    {
      label: 'months',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    
    forums: 21,
    month: 'Jan',
  },
  {
   
    forums: 28,
    month: 'Fev',
  },
  {
    
    forums: 41,
    month: 'Mar',
  },
  {
    
    forums: 73,
    month: 'Apr',
  },
 {
    forums: 99,
    month: 'May',
  },
  {
   
    forums: 144,
    month: 'June',
  },
  {
 
    forums: 319,
    month: 'July',
  },
  {
    forums: 249,
    month: 'Aug',
  },
  {
    
    forums: 131,
    month: 'Sept',
  },
  {
  
    forums: 55,
    month: 'Oct',
  },
  {
  
    forums: 48,
    month: 'Nov',
  },
  {
   
    forums: 25,
    month: 'Dec',
  },
];

const valueFormatter: (value: number | null) => string = (value) => {
    if (value === null) {
      return "N/A"; 
    }
    return value.toString(); 
  };
  

export default function Forums() {
  return (
    <main>

    <Typography sx={{ color: "#FFCA28" }}>
    <h1>Number of Formus created by month</h1>
    </Typography>
    <Card variant="outlined">
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'forums', label: 'Forums created', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
    </Card>
    </main>
  );
}
