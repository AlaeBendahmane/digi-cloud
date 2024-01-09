import React from "react";
import { Button, ButtonGroup, Input } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import CardsDetail from "./cards-detail";
import AnalyseTemp from "./analyse-temp";
import Avrg from "./avrg";
function HomePage() {
  const [selectedView, setSelectedView] = React.useState(0);
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center  font-bold border-b-[4px]">
        Dashboard
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col ">
        <div className="grid w-full gap-3 px-4 pt-4 md:grid-cols-6 2xl:grid-cols-12 ">
          <CardsDetail />
          <AnalyseTemp />
          <Avrg />
        </div>
      </div>
    </div>
  );
}
export default HomePage;