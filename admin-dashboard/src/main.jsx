import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import Team from './pages/team/Team';
import App from './App';
import Bar from './pages/bar/Bar';
import Pie from './pages/pie/Pie';
import Line from './pages/line/Line';
import Users from './pages/contact/users';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      
      <Route index element={<Dashboard />} />
      <Route path='team' element={<Team />} />
      <Route path='users' element={<Users />} />


      <Route path='bar' element={<Bar />} />
      <Route path='pie' element={<Pie />} />
      <Route path='line' element={<Line />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
