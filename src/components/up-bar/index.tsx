import { Navbar } from "@material-tailwind/react";
import Notifications from "./notifications";
import ProfileMenu from "./profile-menu";
import ToggleFullScreen from "./toggle-full-screen";
// import {ReactComponent as Logo} from "../../assets/logo.svg"

function Upbar() {
  return (
    <div className="fixed z-[500] top-0 left-0 right-0 ">
      <Navbar className="mx-auto !h-14 max-w-[100%] p-2 lg:px-4 rounded-none">
       
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          {/* <Logo className="w-40"/> */}
          <img src="/logo.svg" alt="" className="h-10" />
          <div className=" mx-auto "></div>
          <Notifications />
          <ToggleFullScreen />
          {/*<ProfileMenu />*/}
        </div>
      </Navbar>
    </div>
  );
}

export default Upbar;
