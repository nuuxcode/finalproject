import { Typography } from "@mui/material";
import Comments from "./comments";
import Reports from "./reports";
import Posts from "./posts";
import Tags from "./tags";
import Votes from "./votes";
import Forums from "./forums";
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

export default function DashboardPage() {
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Our dashboard</h1></Typography>
        <div className="flex flex-col gap-4">
        {/* First row containing three components */}
        <div className="flex gap-4">
          <Comments />
          <Reports />
          <Posts />
        </div>
        {/* Second row containing two components */}
        <div className="flex gap-4">
          <Tags />
          <Votes />
          <Forums/>
        </div>
      </div>
      
    </main>
  );
}
