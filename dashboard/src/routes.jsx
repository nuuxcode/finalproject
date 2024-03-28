import * as React from 'react';

import { SignIn, SignUp } from "@/pages/auth";
export const routes = [
    {
        title: "auth pages",
        layout: "auth",
        pages: [
          {
            name: "sign in",
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            name: "sign up",
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
    ];

    export default routes;