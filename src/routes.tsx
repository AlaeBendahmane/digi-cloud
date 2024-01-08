import { ReactComponent as DashBoardIcon } from "./assets/icons/dashboard.svg";
// import { ReactComponent as MapIcon } from "../../../assets/icons/map.svg";
// import { ReactComponent as InfoIcon } from "../../../assets/icons/info-rounded.svg";
import { ReactComponent as ListIcon } from "./assets/icons/list.svg";
// import { ReactComponent as BoardIcon } from "../../../assets/icons/board.svg";
// import { ReactComponent as AdminIcon } from "../../../assets/icons/admin.svg";
// import { ReactComponent as SettingsIcon } from "../../../assets/icons/setting.svg";
// import { ReactComponent as SupportIcon } from "../../../assets/icons/support.svg";
// import { ReactComponent as KeyIcon } from "../../../assets/key.svg";
// import { ReactComponent as TenantIcon } from "../../../assets/tenant.svg";
// import { ReactComponent as LogIcon } from "../../../assets/log.svg";

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
      name: "Realtime events",
      path: "/realtime",
      icon: <ListIcon />,
    },
    /* {
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
       name: "users",
       path: "/users",
       icon: <ListIcon />,
     },
     {
       name: "logs",
       path: "/logs",
       icon: <ListIcon />,
     },*/
  ];

export default Routes;
