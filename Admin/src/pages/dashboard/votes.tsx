import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts";

const Votes = () => {
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Upvotes and Downvotes percentage</h1>
      </Typography>
      <Card variant="outlined">
        <PieChart
          colors={["#20B2AA", "yellow"]}
          series={[
            {
              data: [
                { id: 0, value: 74, label: "Upvotes" },
                { id: 1, value: 15, label: "Downvotes" },
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
export default Votes;
