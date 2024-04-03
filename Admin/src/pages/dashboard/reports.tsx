import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts";

const Reports = () => {
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Liked and repported posts</h1>
      </Typography>
      <Card variant="outlined">
        <PieChart
          colors={["red", "yellow"]}
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Reports" },
                { id: 1, value: 15, label: "Likes" },
              ],
              innerRadius: 30,
              outerRadius: 77,
              paddingAngle: 4,
              cornerRadius: -3,
            },
          ]}
          width={500}
          height={400}
        />{" "}
      </Card>
    </div>
  );
};
export default Reports;
