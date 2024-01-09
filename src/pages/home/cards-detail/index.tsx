import { Card } from "@material-tailwind/react";
import React from "react";
import { ReactComponent as NbrDevice } from "../../../assets/icons/nbr-device.svg";
import { ReactComponent as HomeDashboard } from "../../../assets/icons/home-dashbord.svg";
import { ReactComponent as AlertComponent } from "../../../assets/icons/alerts.svg";
function CardsDetail() {
  return (
    <React.Fragment>
      <Card className="min-h-16 items-center p-4 md:col-span-3">
        <div className="flex h-full w-full" >
          <NbrDevice className="fill-[#3FBC58]" />
          <div className="flex flex-col items-stretch gap-1 ml-3">
            <span className="text-4xl">179</span>
            <span>Online Devices</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3">
        <div className="flex h-full  w-full ">
          <NbrDevice className="fill-[#5D7285]" />
          <div className="flex flex-col items-stretch gap-1 ml-3">
            <span className="text-4xl">179</span>
            <span>Offline Devices</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3">
        <div className="flex h-full  w-full ">
          <HomeDashboard className="fill-[#9C179E]" />
          <div className="flex flex-col items-stretch gap-1 ml-3">
            <span className="text-4xl">179</span>
            <span>Total Rooms</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3">
        <div className="flex h-full  w-full ">
          <AlertComponent />
          <div className="flex flex-col items-stretch gap-1 ml-3">
            <span className="text-4xl">179</span>
            <span>Alerts</span>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default CardsDetail;
