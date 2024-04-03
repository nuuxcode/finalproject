import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {

  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  colors:["yellow"],
  width: 500,
  height: 300,
  sx: {
  
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
    
  },
};
const dataset = [
  {
    posts: 59,
   
    month: 'Jan',
  },
  {
    posts: 50,
    
    month: 'Fev',
  },
  {
    posts: 47,
  
    month: 'Mar',
  },
  {
    posts: 54,
   
    month: 'Apr',
  },
  {
    posts: 57,
 
    month: 'May',
  },
  {
    posts: 60,
   
    month: 'June',
  },
  {
    posts: 59,
   
    month: 'July',
  },
  {
    posts: 65,
  
    month: 'Aug',
  },
  {
    posts: 51,
   
    month: 'Sept',
  },
  {
    posts: 60,
  
    month: 'Oct',
  },
  {
    posts: 67,
  
    month: 'Nov',
  },
  {
    posts: 61,
    
    month: 'Dec',
  },
];


const valueFormatter: (value: number | null) => string = (value) => {
  if (value === null) {
    return "N/A"; 
  }
  return value.toString(); 
};

export default function Posts() {
  return (
    <main>
      
    <Typography sx={{ color: "#FFCA28" }}>
    <h1>Number of Posts by month</h1>
    </Typography>
    <Card variant="outlined">
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'posts', label: 'posts', valueFormatter},
       
      ]}
      {...chartSetting}
    />
    </Card>
    </main>
  );
}
