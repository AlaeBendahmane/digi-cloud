import { Card } from "@material-tailwind/react";
import React, { useState } from "react";
import Online from '../../../assets/icons/online.svg'
import Offline from '../../../assets/icons/offline.svg'
import HomeDashboard from "../../../assets/icons/rooms.svg";
import AlertComponent from "../../../assets/icons/alerts.svg";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useProvider } from "../../../components/provider";
import { AppContextType } from "../../../App";
function CardsDetail() {
  const { t } = useTranslation();
  const [Active, setCountActive] = useState(0);
  const [Inactive, setCountInaactive] = useState(0);
  const [Rooms, setCountRooms] = useState(0);
  const { backendApi } = useProvider<AppContextType>();
  useQuery(['getGroup'], async () => {
    const result = await backendApi.findMany<any>("group");
    setCountRooms(result.totalResult);
    return result.totalResult
  });
  useQuery(['getOnOffDevices'], async () => {
    const result = await backendApi.dashboard<any>("dashboard");
    setCountInaactive(result.offlineDeviceCount)
    setCountActive(result.onlineDeviceCount)
    return result
  });
  return (
    <React.Fragment>
      <Card className="min-h-16 items-center p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full w-full" >
          <img src={Online} />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">{Active}</span>
            <span className="text-sm font-normal">{t('online devices')}</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={Offline} />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">{Inactive}</span>
            <span className="text-sm font-normal">{t('offline devices')}</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={HomeDashboard} />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">{Rooms}</span>
            <span className="text-sm font-normal">{t('total rooms')}</span>
          </div>
        </div>
      </Card>
      <Card className="min-h-16 p-4 md:col-span-3 font-Nunito" placeholder={undefined}>
        <div className="flex h-full  w-full ">
          <img src={AlertComponent} />
          <div className="flex flex-col items-stretch gap-0 my-1 ml-3">
            <span className="text-2xl font-extrabold">0</span>
            <span className="text-sm font-normal">{t('alerts')}</span>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}
export default CardsDetail;