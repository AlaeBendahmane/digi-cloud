import { Menu, MenuHandler, MenuList, MenuItem, IconButton, } from "@material-tailwind/react";
import Usa from "../../../assets/icons/usa.svg";
import Fr from "../../../assets/icons/fr.svg";
import Ar from "../../../assets/icons/sa.svg";
import { useState } from "react";
function Notifications() {
  const [selectedItem, setSelectedItem] = useState<string>(Usa);
  const handleMenuItemClick = (item: string) => {
    setSelectedItem((prevItem: string) => (prevItem === item ? Usa : item));
  };
  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" className="min-w-[50px]" placeholder={undefined}>
          {selectedItem ? <img src={selectedItem} /> : <span>Select an item</span>}
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-1 min-w-[20px]" placeholder={undefined}>
        <MenuItem
          className={`flex items-center ${selectedItem === Usa ? 'hidden' : ''}`}
          onClick={() => handleMenuItemClick(Usa)} placeholder={undefined} >
          <img src={Usa} />
        </MenuItem>
        <MenuItem
          className={`flex items-center ${selectedItem === Fr ? 'hidden' : ''}`}
          onClick={() => handleMenuItemClick(Fr)} placeholder={undefined} >
          <img src={Fr} />
        </MenuItem>
        <MenuItem
          className={`flex items-center ${selectedItem === Ar ? 'hidden' : ''}`}
          onClick={() => handleMenuItemClick(Ar)} placeholder={undefined} >
          <img src={Ar} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
export default Notifications;