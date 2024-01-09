import { useState } from "react";
import Analyse from "./analyse";
import Full from '../../assets/icons/full.svg'
function DevicesPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    const content = document.getElementById('Content');
    if (content) {
      if (!document.fullscreenElement && !document.fullscreenElement) {
        if (content.requestFullscreen) {
          content.requestFullscreen();
        } else if (content.requestFullscreen) {
          content.requestFullscreen();
        }
        content.style.backgroundColor = '#f6f8fa';
      } else {
        if (document.exitFullscreen || document.exitFullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
        Realtime Event
        <button className="ml-auto">
          <img src={Full} alt="Fullsize" onClick={toggleFullscreen} />
        </button>
      </h6>
      <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content"  >
        <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2"  >
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
        </div>
      </div>
    </div>
  );
}
export default DevicesPage;