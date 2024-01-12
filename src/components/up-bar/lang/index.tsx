import { Menu, MenuHandler, MenuList, MenuItem, IconButton, } from "@material-tailwind/react";
import Usa from "../../../assets/icons/usa.svg";
import Fr from "../../../assets/icons/fr.svg";
import Ar from "../../../assets/icons/sa.svg";
import { useProvider } from "../../provider";
import { AppContextType } from "../../../App";
const langMap = {
  en: Usa,
  fr: Fr,
  ar: Ar
} as const;
function Notifications() {
  const { lang, setLang } = useProvider<AppContextType>()
  const langHandler = (): void => {
    window.location.reload();
  };
  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text" className="min-w-[50px]" placeholder={undefined}>
          <img src={langMap[lang]} />
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-1 min-w-[20px]" placeholder={undefined} >
        {
          Object.entries(langMap).map(([ln, src]) => (<MenuItem key={ln}
            className={`flex items-center ${lang === ln ? 'hidden' : ''}`}
            onClick={() => {
              setLang(ln as "ar" | "fr" | "en");
              langHandler();
            }} placeholder={undefined} >
            <img src={src} />
          </MenuItem>))
        }
      </MenuList>
    </Menu>
  );
}
export default Notifications;