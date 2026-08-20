import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import { RootLayout } from "@/layouts";
import { LandingPage } from "@/pages";

/**
 * Single-page site: everything renders on "/" as in-page sections (see
 * src/config/sections.ts). The catch-all keeps old bookmarks like /about
 * working by rendering the same page. The hash in the URL, if any, is what
 * scrolls the visitor to the right section.
 */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <LandingPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
