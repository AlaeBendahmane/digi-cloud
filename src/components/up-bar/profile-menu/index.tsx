import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  import React from "react";
  import { PowerIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
  import { useProvider } from "../../provider";
  import { AppContextType } from "../../../App";
  import Avatar from "../../avatar";
  
  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, setRefreshToken, setAccessToken, setUser, authApi } =
      useProvider<AppContextType>();
  
    const handleLogout = () => {
      setRefreshToken("");
      setAccessToken("");
      setUser(null);
      authApi.logout().catch((error) => {
        console.log(error);
      });
    };
  
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
          >
            <Avatar user={user!} />
            <Typography
              color="blue-gray"
              className="w-[10rem] hidden sm:inline-block  "
            >{`${user?.firstName} ${user?.lastName}`}</Typography>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10">
            <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color="red"
              onClick={handleLogout}
            >
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
  
  export default ProfileMenu;
  