import { Navbar } from "@material-tailwind/react";
import Notifications from "./notifications";
import ProfileMenu from "./profile-menu";
import ToggleFullScreen from "./toggle-full-screen";
import Logo from '../../assets/icons/logo.svg'
import Lang from "./lang";
import { Link } from "react-router-dom";
function Upbar() {
  return (
    <div className="fixed z-[500] top-0 left-0 right-0 ">
      <Navbar className="mx-auto !h-14 max-w-[100%] p-2 lg:px-4 rounded-none" placeholder={undefined}>
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Link to={'#'}>
            <img src={Logo} alt="" className="h-10" />
          </Link>
          <div className="mx-auto"></div>
          <div className="space-x-1 mr-1">
            <Lang />
            {/*<Notifications />*/}
            <ToggleFullScreen />
          </div>
          <ProfileMenu />
        </div>
      </Navbar>
    </div>
  );
}
export default Upbar;