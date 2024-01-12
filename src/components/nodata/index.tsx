import { useTranslation } from "react-i18next";
import Notdata from "../../assets/icons/not-data.svg";
export default function index() {
    const { t } = useTranslation();
    return (
        <div className="flex  h-full  min-h-[50vh] flex-col items-center justify-center gap-[4rem] text-4xl mt-20">
            <img src={Notdata} alt="" className="h-[25rem]" />
            <span className=" font-extrabold text-purple-600 " >
                {t('No Data found')}
            </span>
        </div>
    )
}