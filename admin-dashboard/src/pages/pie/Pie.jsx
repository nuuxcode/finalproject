import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { PieChart } from '@mui/x-charts';


 const Pie = () => {
  return (    
 <div>
     <Typography align="center" sx={{ fontSize: "30PX", color: "#FFFF00", }}>
     Reported and liked posts
      </Typography>
<Card variant="outlined">
<PieChart
  colors={['red', 'yellow', 'green']}

  series={[
    {
      data: [
        { id: 0, value: 10, label: 'Reports' },
        { id: 1, value: 15, label: 'Likes' },
      ]
      ,innerRadius: 30,
      outerRadius: 77,
      paddingAngle: 4,
      cornerRadius: -3,
    },
  ]}
  width={500}
  height={400}
/>   </Card></div>
  )
}
export default Pie ;
