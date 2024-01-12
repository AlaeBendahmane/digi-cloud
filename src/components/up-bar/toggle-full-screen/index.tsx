import { IconButton } from "@material-tailwind/react";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { toggleFullScreen } from "../../../utils/function";


function ToggleFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <IconButton
      variant="text"
      className="text-blue-900"
      onClick={() => {
        setIsFullScreen(!isFullScreen);
        toggleFullScreen();
      }} placeholder={undefined}    >
      {isFullScreen ? (
        <ArrowsPointingInIcon className="h-5 w-5" />
      ) : (
        <ArrowsPointingOutIcon className="h-5 w-5" />
      )}
    </IconButton>
  );
}

export default ToggleFullScreen;
