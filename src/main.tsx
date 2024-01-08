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
        path: "/users",
        element: <UserPage />,
      },
      /*{
        path: "/logs",
        element: <LogsPage />,
      },*/
      {
        path: "/rooms",
        element: <RoomesPage />,
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
  </React.StrictMode>,
);
