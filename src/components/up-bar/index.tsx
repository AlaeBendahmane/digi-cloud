import { Navbar } from "@material-tailwind/react";
import Notifications from "./notifications";
import ProfileMenu from "./profile-menu";
import ToggleFullScreen from "./toggle-full-screen";
import Logo from '../../assets/unused/dup/logo.svg'
import Lang from "./lang";

function Upbar() {
  return (
    <div className="fixed z-[500] top-0 left-0 right-0 ">
      <Navbar className="mx-auto !h-14 max-w-[100%] p-2 lg:px-4 rounded-none" placeholder={undefined}>
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <img src={Logo} alt="" className="h-10" />{/*"/logo.svg" */}
          <div className=" mx-auto "></div>
          <Lang />
          <Notifications />
          <ToggleFullScreen />
          {/*<ProfileMenu />*/}
        </div>
      </Navbar>
    </div>
  );
}
export default Upbar;