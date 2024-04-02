import { Typography } from "@mui/material";
import Comments from "./comments";
import Repports from "./repports";

export default function DashboardPage() {
  return (
    <main>
      <Typography sx={{ color: "#FFCA28" }}>
        <h1>Our dashboard</h1>
        <Comments />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row  gap-4">
            <div className="flex flex-col gap-4 h-full md:w-2/6">
              <Comments />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  md:w-4/6">
              <Repports />
            </div>
          </div>
          <div className="flex flex-rown flex-wrap md:flex-nowrap gap-4">
            <div className="w-full md:w-2/4">
              <Comments />
            </div>
            <div className="w-full md:w-2/4">
              <Comments />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-1">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Comments />
            </div>
            <div className="col-span-1 md:col-span-3">
              <Comments />
            </div>
          </div>
        </div>
      </Typography>
    </main>
  );
}
