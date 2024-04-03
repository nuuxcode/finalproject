import Card from "@mui/material/Card";
import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Tags() {
  return (
    <main>
        <Typography sx={{ color: "#FFCA28" }}>
    <h1>Number of tags by month</h1>
    </Typography>
    <Card variant="outlined">
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
      
      series={[
        {
        color: "#FFCA28",
          data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
          showMark: ({ index }) => index % 2 === 0,
        },
      ]}
      width={500}
      height={300}
    /></Card></main>
  );
}