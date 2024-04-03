import { useState, useEffect } from 'react';
import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useApiUrl } from "@refinedev/core";

const dataset = [
  {
    forums: 21,
    month: "Jan",
  },
  {
    forums: 28,
    month: "Fev",
  },
  {
    forums: 41,
    month: "Mar",
  },
  {
    forums: 73,
    month: "Apr",
  },
  {
    forums: 99,
    month: "May",
  },
  {
    forums: 144,
    month: "June",
  },
  {
    forums: 319,
    month: "July",
  },
  {
    forums: 249,
    month: "Aug",
  },
  {
    forums: 131,
    month: "Sept",
  },
  {
    forums: 55,
    month: "Oct",
  },
  {
    forums: 48,
    month: "Nov",
  },
  {
    forums: 25,
    month: "Dec",
  },
];

const valueFormatter: (value: number | null) => string = (value) => {
  if (value === null) {
    return "N/A";
  }
  return value.toString();
};

const monthMapping: { [key: number]: string } = {
  1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
  7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
};


export default function Forums() {
  const [forumData, setForumData] = useState<{ month: string; forums: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = useApiUrl();
  const chartSetting = {
    xAxis: [
      {
        label: "months",
      },
    ],
    width: 700,
    height: 450,
  };

  useEffect(() => {
     fetch(`${API_URL}/analytics/forumsByMonth`)
      .then(response => response.json())
      .then(data => {
        setForumData(data.map((item: any) => ({
          forums: item.count,
          month: monthMapping[item.month]
        })));
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching forum data:', error));
    }, [API_URL]);
    
    console.log("-------forum data----------")
    console.log(forumData)
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>New Forums</h1>
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
            // dataset={dataset}
          dataset={forumData}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            // { dataKey: "forums", label: "Forums created", valueFormatter },
            { dataKey: 'forums', label: 'Forums created' }
          ]}
          layout="horizontal"
          {...chartSetting}
        />
        )}
      </Card>
    </main>
  );
}