import AnalyseTemp from "./analyse-temp";
import Avrg from "./avrg";
import CardsDetail from "./cards-detail";
function HomePage() {
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        Dashboard
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 py-2.5 ">
        <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 ">
          <CardsDetail />
          <AnalyseTemp />
          <Avrg />
        </div>
      </div>
    </div>
  );
}
export default HomePage;