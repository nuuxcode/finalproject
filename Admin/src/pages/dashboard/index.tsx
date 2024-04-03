import { Stack, Typography } from "@mui/material";
import Comments from "./comments";
import Reports from "./reports";
import Posts from "./posts";
import Tags from "./tags";
import Votes from "./votes";
import Forums from "./forums";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

export default function DashboardPage() {
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Our dashboard</h1>
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Tags />
        <Forums />
        <Reports />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Comments />
        <Votes />
        <Posts />
      </Stack>
    </main>
  );
}
