import { Stack, Typography } from "@mui/material";
import Comments from "./comments";
import Verifications from "./userVerified";
import Posts from "./posts";
import Users from "./users";
import PostEngagement from "./postEngagement";
import Forums from "./forums";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

export default function DashboardPage() {
  return (
    <main>
      <Typography align="center" sx={{ color: "#FFCA28" }}>
        <h1>Dashboard</h1>
      </Typography>
      <Stack direction="row" justifyContent="space-around">
        <Users />
        <Forums />
        <Verifications />
      </Stack>
      <Stack direction="row" justifyContent="space-around">
        <Comments />
        <PostEngagement />
        <Posts />
      </Stack>
    </main>
  );
}
