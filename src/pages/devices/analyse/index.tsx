import Tempearature from "../../../assets/icons/tempearature.svg";
import Circle from "../../../assets/icons/circle.svg";
import Humidity from "../../../assets/icons/humidity.svg";
import { Card } from "@material-tailwind/react";

export default function index() {
    return (
        <Card className="min-h-[10rem] h-fit bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined} style={{ fontFamily: 'Roboto' }}>
            <span style={{ fontFamily: 'Nunito !important' }} className="font-bold text-red-300">DSIT-SB-1</span>
            <div className="grid grid-cols-2 gap-2 mt-3">
                <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center '>
                    <p className='m-1 font-light'>
                        Temperature
                    </p>
                    <div className="flex">
                        <img src={Tempearature} alt="TempearatureIcon" />
                        <p className='m-1 font-extrabold text-3xl'>22C </p>
                    </div>
                    <div className="flex flex-wrap sm:justify-center">
                        <p className='my-1 font-light'>Min:21.6C</p>
                        <img src={Circle} alt="" className='m-1' />
                        <p className='my-1 font-light'>Max:22.5C</p>
                    </div>
                </div>
                <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center '>
                    <p className='m-1 font-light'>
                        Humidity
                    </p>
                    <div className="flex">
                        <img src={Humidity} alt="TempearatureIcon" />
                        <p className='m-1 font-extrabold text-3xl'>27.5% </p>
                    </div>
                    <div className="flex flex-wrap sm:justify-center">
                        <p className='my-1 font-light'>Min:25.8%</p>
                        <img src={Circle} alt="" className='m-1' />
                        <p className='my-1 font-light'>Max:25.8%</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
