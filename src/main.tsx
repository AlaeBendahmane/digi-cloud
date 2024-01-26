import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/index.tsx";
import DevicesPage from "./pages/devices/index.tsx";
import NotFoundPage from "./pages/not-found/index.tsx";
import { ThemeProvider } from "@material-tailwind/react";
import AlertPage from "./pages/alerts/index.tsx";
import UserPage from "./pages/users/index.tsx";
//import LogsPage from "./pages/logs/index.tsx";
import RoomesPage from "./pages/rooms/index.tsx";
import MapsPage from "./pages/map/index.tsx";
import MoreInfo from "./pages/moreinfo/moreinfo.tsx";
import Detail from "./pages/detail/index.tsx";

import i18n from './hook/i18n.tsx';
import { I18nextProvider } from 'react-i18next';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/realtime",
        element: <DevicesPage />,
      },
      {
        path: "/alerts",
        element: <AlertPage />,
      },
      {
        path: "/contacts",
        element: <UserPage />,
      },
      {
        path: "/rooms",
        element: <RoomesPage />,
      },
      {
        path: "/maps",
        element: <MapsPage />,
      },
      {
        path: "/stats/:id",
        element: <MoreInfo />,
      },
      {
        path: "/rooms/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider
        value={{
          button: {
            defaultProps: {
              variant: "gradient",
              color: "purple",
            },
          },
          input: {
            defaultProps: {
              color: "purple",
            },
          },
          select: {
            defaultProps: {
              color: "purple",
            },
          },
          checkbox: {
            defaultProps: {
              color: "purple",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
//console.warn = () => { };
//console.log = () => { };
//console.error = () => { };