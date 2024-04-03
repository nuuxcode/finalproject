import { Typography } from "@mui/material";
import Comments from "./comments";
import Reports from "./reports";
import Posts from "./posts";
import Tags from "./tags";
import Votes from "./votes";

export default function DashboardPage() {
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Our dashboard</h1></Typography>
        <Comments />
        <div className="flex flex-col gap-4">
       <div> <Posts /></div>
          <Reports />
          <Tags/>
          <Votes/>
        </div>
      
    </main>
  );
}
