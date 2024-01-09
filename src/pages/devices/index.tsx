import Full from "../../assets/icons/full.svg";
import Analyse from "./analyse/index";

function DevicesPage() {
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px]">
        Realtime Event
        <button className="ml-auto mb-0.5">
          <img src={Full} alt="" />
        </button>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col ">
        <div className="grid w-full gap-3 px-4 pt-4 md:grid-cols-6 2xl:grid-cols-12 ">
          <Analyse />
        </div>
      </div>
    </div>
  );
}
export default DevicesPage;