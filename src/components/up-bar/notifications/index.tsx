import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";

function Notifications() {
  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" placeholder={undefined}>
          <BellIcon className="h-5 w-5" />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2" placeholder={undefined}>
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2" placeholder={undefined}>
          you have a new notification
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Notifications;
