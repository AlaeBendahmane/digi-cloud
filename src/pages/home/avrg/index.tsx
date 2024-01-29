import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import More from "../../../assets/icons/more.svg";
import { useTranslation } from "react-i18next";
import { useProvider } from "../../../components/provider";
import { AppContextType } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
function Avrg() {
  const { t } = useTranslation();
  const [Temperature, setTemperature] = useState("0°C");
  const [Humidity, setHumidity] = useState("0%");
  const [Power, setPower] = useState("0A");
  const [Lreading, setLreading] = useState("01/19/2018 21:30");
  const { backendApi } = useProvider<AppContextType>();
  useQuery(['getAVG'], async () => {
    const result = await backendApi.findMany<any>("dpc-history/api/history", {
      where: {
        temperature: {
          $exists: true
        },
        humidity: {
          $exists: true
        },
        createdAt: {
          $gte: new Date().toISOString().slice(0, 10)
        },
      },
    });
    let t = 0;
    result.results.map((x) => {
      t = t + x.humidity
    })
    const temperatures = result.results.map(entry => entry.temperature);
    const averageTemperature = temperatures.reduce((sum, temperature) => sum + temperature, 0) / temperatures.length;
    setTemperature(averageTemperature.toFixed(2) + "°C")
    const humidities = result.results.map(entry => entry.humidity);
    const averageHumidity = humidities.reduce((sum, humidity) => sum + humidity, 0) / humidities.length;
    setHumidity(averageHumidity.toFixed(2) + "%");
    setLreading(new Date(result.results[0].date).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " "),)
    return result
  });
  return (
    <>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined}>
        <div className="flex justify-between items-center">
          <span className="font-bold font-Nunito text-xl"> {t('average temperature')}</span>
          {/*<Link to={'#'} className="flex" >
            <span className="font-light font-Roboto text-sm"> {t('more data')}</span>
            <img src={More} className="ml-1" />
  </Link>*/}
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center h-[100px]'>
            <p className='m-1 font-light font-Roboto text-sm'> {t('thershold...')} </p>
            <p className='m-1 font-medium  font-Roboto text-3xl'> {Temperature} </p>
            {/*<p className='m-1 font-light font-Roboto text-sm text-nowrap'> {t('clear on')}&lt;39.00%RH</p>*/}
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center  h-[100px] '>
            <p className='m-1 font-light font-Roboto text-sm'>  {t('last reading...')} </p>
            <p className='m-1 font-medium  font-Roboto text-xl text-center'> {Lreading} </p>{/**text-nowrap */}
            {/*<div className="flex">
              <p className='m-1 font-medium font-Roboto text-xl'>01/19/2018 </p>
              <p className='m-1 font-medium font-Roboto text-xl'>21:30</p>
  </div>*/}
          </div>
        </div>
      </Card>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined} >
        <div className="flex justify-between items-center">
          <span className="font-bold font-Nunito text-xl"> {t('average humidity')}</span>
          {/*<Link to={'#'} className="flex" >
            <span className="font-light font-Roboto text-sm"> {t('more data')}</span>
            <img src={More} className="ml-1" />
          </Link>*/}
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center  h-[100px]'>
            <p className='m-1 font-light font-Roboto text-sm'>  {t('thershold...')} </p>
            <p className='m-1 font-medium  font-Roboto text-3xl'> {Humidity} </p>
            {/*<p className='m-1 font-light font-Roboto text-sm text-nowrap'> {t('clear on')}&lt;199.00A</p>*/}
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center  h-[100px]'>
            <p className='m-1 font-light font-Roboto text-sm'>  {t('last reading...')} </p>
            <p className='m-1 font-medium  font-Roboto text-xl text-center'> {Lreading} </p>
            {/*<div className="flex">
              <p className='m-1 font-medium font-Roboto text-xl'>01/19/2018 </p>
              <p className='m-1 font-medium font-Roboto text-xl'>21:30</p>
            </div>*/}
          </div>
        </div>
      </Card>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined}>
        <div className="flex justify-between items-center">
          <span className="font-bold font-Nunito text-xl"> {t('average power')}</span>
          {/*<Link to={'#'} className="flex" >
            <span className="font-light font-Roboto text-sm"> {t('more data')}</span>
            <img src={More} className="ml-1" />
          </Link>*/}
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center  h-[100px]'>
            <p className='m-1 font-light font-Roboto text-sm'>  {t('thershold...')} </p>
            <p className='m-1 font-medium  font-Roboto text-3xl'> {Power} </p>
            {/*<p className='m-1 font-light font-Roboto text-sm text-nowrap'> {t('clear on')}&lt;199.00A</p>*/}
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center  h-[100px]'>
            <p className='m-1 font-light font-Roboto text-sm'> {t('last reading...')} </p>
            < p className='m-1 font-medium  font-Roboto text-xl text-center'>{Lreading} </p>
            {/*<div className="flex">
              <p className='m-1 font-medium font-Roboto text-xl'>01/19/2018 </p>{/*font-light font-Roboto text-sm 
            <p className='m-1 font-medium font-Roboto text-xl'>21:30</p>{/*font-light font-Roboto text-sm 
          </div>*/}
          </div>
        </div>
      </Card >
    </>
  );
}
export default Avrg;