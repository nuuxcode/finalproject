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
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>New Comments by Month</h1>
      </Typography>

      <Card variant="outlined">
        <LineChart
          xAxis={[{ scaleType: 'point', data: monthNames }]}
          series={[
            {
              data: commentsByMonth.map(item => item.count),
              area: true,
            },
          ]}
          width={600}
          height={400}
        />
      </Card>
    </div>
  );
}
