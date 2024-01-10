import { Menu, MenuHandler, MenuList, MenuItem, IconButton, } from "@material-tailwind/react";
import World from "../../../assets/icons/world.svg";
import Usa from "../../../assets/icons/usa.svg";
import Fr from "../../../assets/icons/fr.svg";
import Ar from "../../../assets/icons/sa.svg";
function Notifications() {
  return (
    <Menu >
      <MenuHandler >
        <IconButton variant="text" placeholder={undefined}>
          <img src={World} />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-1 min-w-[20px]" placeholder={undefined}>
        <MenuItem className="flex items-center" placeholder={undefined}>
          <img src={Usa} />
        </MenuItem>
        <MenuItem className="flex items-center " placeholder={undefined}>
          <img src={Fr} />
        </MenuItem>
        <MenuItem className="flex items-center" placeholder={undefined}>
          <img src={Ar} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
export default Notifications;