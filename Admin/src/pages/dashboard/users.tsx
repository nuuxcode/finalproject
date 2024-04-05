import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from 'react';
import { useApiUrl } from "@refinedev/core";
import { TableData } from './types'; 

export default function Users() {
  const [usersByMonth, setUsersByMonth] = useState<TableData[]>([]);
  const API_URL = useApiUrl();

   useEffect(() => {
     fetch(`${API_URL}/analytics/usersByMonth`)
      .then((response) => response.json() as Promise<TableData[]>)
      .then((data) => {
        setUsersByMonth(data);
      });
    }, [API_URL]);
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>User Registrations</h1>
      </Typography>
      <Card variant="outlined">
        <LineChart
          xAxis={[{ scaleType: 'point', data: monthNames }]}
          series={[
            {
              color: "#FFCA28",
              data: usersByMonth.map(item => item.count),
              showMark: ({ index }) => index % 2 === 0,
            },
          ]}
          width={600}
          height={450}
        />
      </Card>
    </main>
  );
}
