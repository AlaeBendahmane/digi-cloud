import Notdata from "../../assets/icons/not-data.svg";
export default function index() {
    return (
        <div className="flex  h-full  min-h-[50vh] flex-col items-center justify-center gap-[4rem] text-4xl mt-20">
            <img src={Notdata} alt="" className="h-[25rem]" />
            <span className=" font-extrabold text-purple-600 " >
                No Data found
            </span>
        </div>
    )
}