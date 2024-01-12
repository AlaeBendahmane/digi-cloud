import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";
import Routes from "../../routes";
import { useTranslation } from "react-i18next";

interface Props {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}
function SideBar(props: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { openSideBar, setOpenSideBar } = props;
  return (
    <div className="fixed bottom-2 left-2 top-[4rem]  z-[500] flex  ">
      <div className="flex !w-14 flex-col items-center justify-end gap-2 rounded  bg-purple-500  py-4">
        <Popover placement="right-start">
          <PopoverHandler>
            <Button
              onClick={() => {
                setOpenSideBar(!openSideBar);
              }}
              color="yellow"
              variant="text"
              className={`mb-auto flex 
               aspect-square w-10  items-center justify-center  !p-0 ${""}`} placeholder={undefined}            >
              <img src="/more-aps.svg" className="h-6 w-6 stroke-white" />
            </Button>
          </PopoverHandler>
          <PopoverContent className="z-[500]" placeholder={undefined}>
            <div className="grid grid-cols-3 gap-2 [&>*]:aspect-square [&>*]:h-16  "></div>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
          color="yellow"
          variant="filled"
          className={`flex aspect-square w-10 items-center justify-center  !p-0 ${""}`} placeholder={undefined}        >
          <HomeIcon className="w-6" />
        </Button>
      </div>
      <div
        className={twMerge(
          "blur-content transation-[width] h-full rounded bg-white/30  shadow-lg duration-300",
          !openSideBar ? "w-0 overflow-hidden" : "w-[16rem]",
        )}
      >
        <span className="mx-2 flex h-[4rem] items-center border-b-2 px-3 text-[16px] font-bold text-[#3F4570]">
          {t('menu')}
        </span>

        <div className="flex flex-col  gap-2 p-2 ">
          {Routes.map((link, index: number) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  navigate(link.path);
                }}
                variant={location.pathname === link.path ? "filled" : "text"}
                className={twMerge(
                  "flex min-w-[15rem] items-center gap-4 text-black [&>svg]:stroke-black",
                  location.pathname === link.path &&
                  "pointer-events-none text-white [&>svg]:stroke-white"
                )} placeholder={undefined}              >
                {link.icon}

                <div className="name">{t(link.name)}</div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
