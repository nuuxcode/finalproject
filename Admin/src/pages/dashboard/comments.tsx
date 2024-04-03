import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useApiUrl } from "@refinedev/core";
import { useEffect, useState } from 'react';
import { TableData } from './types'; 

export default function Comments() {
  const [commentsByMonth, setCommentsByMonth] = useState<TableData[]>([]);
  const API_URL = useApiUrl();

   useEffect(() => {
     fetch(`${API_URL}/analytics/commentsByMonth`)
      .then((response) => response.json() as Promise<TableData[]>)
      .then((data) => {
        setCommentsByMonth(data);
      });
    }, [API_URL]);
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    console.log("=============comments data ready=========")
    console.log(commentsByMonth)
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>New Comments by month</h1>
      </Typography>

      <Card variant="outlined">
        <LineChart
          xAxis={[{ scaleType: 'point', data: monthNames }]}
          series={[
            {
              data: commentsByMonth.map(item => item.count),
              // data: [2, 5.5, 2, 8.5, 1.5, 5, 12, 9, 7, 2, 4],
              area: true,
            },
          ]}
          width={700}
          height={400}
        />
      </Card>
    </div>
  );
}
