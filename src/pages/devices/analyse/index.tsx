import Tempearature from "../../../assets/icons/tempearature.svg";
import Humidity from "../../../assets/icons/humidity.svg";
import { Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useProvider } from "../../../components/provider";
import { AppContextType } from "../../../App";
interface AnalyseProps {
    id: number;
    nom: string;
    temperature?: number;
    humidity?: number;
    calledfrom: string;
    status?: 'OFFLINE' | 'ONLINE' | 'INACTIVE' | undefined | any;
}
function index({ id, nom, temperature, humidity, calledfrom, status }: AnalyseProps) {
    const { setIdSelected } = useProvider<AppContextType>();
    const { t } = useTranslation();
    return (
        <Link to={'/stats/' + id.toString()} className="md:col-span-3 2xl:col-span-4 mb-2" onClick={() => { setIdSelected(id) }}>
            <Card className={calledfrom === 'RealTime' ? "min-h-[10rem] h-fit bg-white p-[1rem]" : "h-fit bg-white p-[1rem]"} placeholder={undefined} style={{ fontFamily: 'Roboto' }} >
                <div className="flex">
                    <span style={{ fontFamily: 'Nunito !important' }} className={calledfrom === "RealTime" ? "font-medium text-2xl text-red-300" : "font-medium text-2xl text-gray-800"}>{nom}</span>
                    {calledfrom == 'Rooms' ?
                        <span className={status === "OFFLINE" ? "ml-auto font-medium text-2xl text-red-600 font-Nunito" :
                            status === "ONLINE" ? "ml-auto font-medium text-2xl text-green-600 font-Nunito" :
                                status === "INACTIVE" ? "ml-auto font-medium text-2xl text-orange-600 font-Nunito" : ""}>{t(status)}</span> : ''}</div>
                {calledfrom == 'RealTime' ? <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center h-[100px] '>
                        <p className='m-1 font-light text-sm'>
                            {t('temperature')}
                        </p>
                        <div className="flex">
                            <img src={Tempearature} alt="TempearatureIcon" />
                            <p className='m-1 font-medium text-3xl'>{temperature?.toFixed(2)}C </p>
                        </div>
                        {/*<div className="flex flex-wrap sm:justify-center">
                            <p className='my-1 font-light text-sm'>{t('Min')}:{minT}C</p>
                            <img src={Circle} alt="" className='m-1' />
                            <p className='my-1 font-light text-sm'>{t('Max')}:{maxT}C</p>
    </div>*/}
                    </div>
                    <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center h-[100px]'>
                        <p className='m-1 font-light text-sm'>
                            {t('humidity')}
                        </p>
                        <div className="flex">
                            <img src={Humidity} alt="TempearatureIcon" />
                            <p className='m-1 font-medium text-3xl'>{humidity?.toFixed(2)}%</p>
                        </div>
                        {/* <div className="flex flex-wrap sm:justify-center">
                            <p className='my-1 font-light text-sm'>{t('Min')}:{minH}%</p>
                            <img src={Circle} alt="" className='m-1' />
                            <p className='my-1 font-light text-sm'>{t('Max')}:{maxH}%</p>
    </div>*/}
                    </div>
                </div> : ('')}
            </Card>
        </Link>
    )
}
export default index