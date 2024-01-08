import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import More from "../../../assets/icons/more.svg";
function Avrg() {
  return (
    <>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined} style={{ fontFamily: 'Roboto' }}>
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: 'Nunito !important' }} className="font-bold">Average Temperature</span>
          <Link to={'#'} className="flex" >
            <span className="font-light">More data</span>
            <img src={More} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Thershold... </p>
            <p className='m-1 font-medium'> &gt;40.00%R </p>
            <p className='m-1 font-light'>Clear on  &lt; 39.00%RH</p>
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Last Reading... </p>
            <p className='m-1 font-medium'> 11.83%RH </p>
            <div className="flex">
              <p className='m-1 font-light'>0119/2018 </p>
              <p className='m-1 font-light'>21:30</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined} style={{ fontFamily: 'Roboto' }}>
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: 'Nunito !important' }} className="font-bold">Average Humidity</span>
          <Link to={'#'} className="flex" >
            <span className="font-light">More data</span>
            <img src={More} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Thershold... </p>
            <p className='m-1 font-medium'> &gt;200.00A </p>
            <p className='m-1 font-light'>Clear on &lt; 199.00A</p>
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Last Reading... </p>
            <p className='m-1 font-medium'> 123.00A </p>
            <div className="flex">
              <p className='m-1 font-light'>0119/2018 </p>
              <p className='m-1 font-light'>21:30</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="min-h-[10rem] bg-white p-[1rem] md:col-span-3 2xl:col-span-4 mb-2" placeholder={undefined} style={{ fontFamily: 'Roboto' }}>
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: 'Nunito !important' }} className="font-bold">Average Power</span>
          <Link to={'#'} className="flex" >
            <span className="font-light">More data</span>
            <img src={More} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className='bg-gray-200 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Thershold... </p>
            <p className='m-1 font-medium'> &gt;80.00 C </p>
            <p className='m-1 font-light'>Clear on &lt; 199.00A</p>
          </div>
          <div className='bg-red-100 rounded-sm flex flex-col justify-center items-center '>
            <p className='m-1 font-light'> Last Reading... </p>
            <p className='m-1 font-medium'> 68.36 C </p>
            <div className="flex">
              <p className='m-1 font-light'>0119/2018 </p>
              <p className='m-1 font-light'>21:30</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
export default Avrg;