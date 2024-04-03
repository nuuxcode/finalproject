import { Typography } from "@mui/material";
import Comments from "./comments";
import Reports from "./reports";
import Posts from "./posts";

export default function DashboardPage() {
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Our dashboard</h1>
        <Comments />
        <div className="flex flex-col gap-4">
        <Posts />
          <Reports />
        </div>
      </Typography>
    </main>
  );
}
