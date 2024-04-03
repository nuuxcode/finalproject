
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    forums: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    forums: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    forums: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    forums: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    forums: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    forums: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    forums: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    forums: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    forums: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    forums: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    forums: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
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
