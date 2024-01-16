import { ReactComponent as DashBoardIcon } from "./assets/icons/dashboard.svg";
import { ReactComponent as ListIcon } from "./assets/icons/list.svg";

const Routes: {
  name: string;
  path: string;
  icon?: JSX.Element;
}[] = [
    {
      name: "dashboard",
      path: "/",
      icon: <DashBoardIcon />,
    },
    {
      name: "realtime events",
      path: "/realtime",
      icon: <ListIcon />,
    },
    {
      name: "rooms",
      path: "/rooms",
      icon: <ListIcon />,
    },
    {
      name: "alerts",
      path: "/alerts",
      icon: <ListIcon />,
    },
    {
      name: "maps",
      path: "/maps",
      icon: <ListIcon />,
    },
    {
      name: "contacts",
      path: "/contacts",
      icon: <ListIcon />,
    },
  ];

export default Routes;