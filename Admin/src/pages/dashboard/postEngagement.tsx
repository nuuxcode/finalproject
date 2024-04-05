import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from 'react';
import { useApiUrl } from "@refinedev/core";

const PostEngagement = () => {
    const API_URL = useApiUrl();
    const [postsReplied, setPostsReplied] = useState<{ postsReplied: number }>({ postsReplied: 0 });

    useEffect(() => {
      fetch(`${API_URL}/analytics/posts/percentReplied`)
        .then((response) => response.json())
        .then((data) => setPostsReplied(data));
    }, []);
    const postsNotReplied = 100 - postsReplied.postsReplied;
  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Post Engagement</h1>
      </Typography>
      <Card variant="outlined">
        <PieChart
          colors={["#20B2AA", "yellow"]}
          series={[
            {
              data: [
                { id: 0, value: postsReplied.postsReplied, label: "Replied" },
                { id: 1, value: postsNotReplied, label: "Not Replied" },
              ],
              innerRadius: 40,
              outerRadius: 88,
              paddingAngle: 4,
              cornerRadius: -3,
            },
          ]}
          width={600}
          height={400}
        />{" "}
      </Card>
    </div>
  );
};
export default PostEngagement;
