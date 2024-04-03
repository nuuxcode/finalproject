import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from 'react';
import { useApiUrl } from "@refinedev/core";

const Verifications = () => {
  const API_URL = useApiUrl();
const [verificationCounts, setVerificationCounts] = useState({ verified: 0, pending: 0 });

  useEffect(() => {
    fetch(`${API_URL}/analytics/users/verified`)
      .then((response) => response.json())
      .then((data) => setVerificationCounts(data));
  }, []);

  return (
    <div>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>User Verifications</h1>
      </Typography>
      <Card variant="outlined">
        <PieChart
          colors={["yellow", "red"]}
          series={[
            {
              data: [
              //   { id: 0, value: 10, label: "Verified" },
              //   { id: 1, value: 15, label: "Pending" },
              // ],
              { id: 0, value: verificationCounts.verified, label: "Verified" },
              { id: 1, value: verificationCounts.pending, label: "Pending" },
            ],
              innerRadius: 30,
              outerRadius: 77,
              paddingAngle: 4,
              cornerRadius: -3,
            },
          ]}
          width={500}
          height={450}
        />{" "}
      </Card>
    </div>
  );
};
export default Verifications;
