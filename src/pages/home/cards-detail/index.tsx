import { Card } from "@material-tailwind/react";
import React from "react";
import Online from '../../../assets/icons/online.svg'
import Offline from '../../../assets/icons/offline.svg'
import HomeDashboard from "../../../assets/icons/rooms.svg";
import AlertComponent from "../../../assets/icons/alerts.svg";
function CardsDetail() {
  return (
    <React.Fragment>
      <Card className="min-h-16 items-center p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full w-full" >
          <img src={Online} alt="" />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">179</span>
            <span className="text-sm font-normal">Online Devices</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={Offline} alt="" />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">179</span>
            <span className="text-sm font-normal">Offline Devices</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={HomeDashboard} alt="" />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">179</span>
            <span className="text-sm font-normal">Total Rooms</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={AlertComponent} alt="" />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">179</span>
            <span className="text-sm font-normal">Alerts</span>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default CardsDetail;
