import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useApiUrl } from "@refinedev/core";
import { useState, useEffect } from 'react';

const chartSetting = {
  yAxis: [
    {
      label: "Number of Posts",
    },
  ],
  colors: ["yellow"],
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};

const monthMapping: { [key: number]: string } = {
  1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
  7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
};

const valueFormatter: (value: number | null) => string = (value) => {
  if (value === null) {
    return "N/A";
  }
  return value.toString();
};


export default function Posts() {
  const [postData, setPostData] = useState<{ month: string; posts: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = useApiUrl();

  useEffect(() => {
    fetch(`${API_URL}/analytics/postsByMonth`)
      .then(response => response.json())
      .then(data => {
        setPostData(data.map((item: any) => ({
          posts: item.count,
          month: monthMapping[item.month]
        })));
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching forum data:', error));
  }, [API_URL]);
  
console.log(postData)
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>New Posts By Month</h1>
      </Typography>
      <Card variant="outlined">
        {loading ? (
          <div>
            <Typography>Loading...</Typography>
            <BarChart
              dataset={[]}
              xAxis={[]}
              series={[]} 
              {...chartSetting}
            />
          </div>
        ) : (
          <BarChart
            dataset={postData}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: "posts", label: "posts", valueFormatter }]}
            {...chartSetting}
          />
        )}
      </Card>
    </main>
  );
}
