import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";

export default function Comments() {
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Number of posts by month</h1>
      </Typography>

      <Card variant="outlined">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5, 12, 9, 7, 2, 4],
              area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </Card>
    </div>
  );
}
