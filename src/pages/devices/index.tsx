import Analyse from "./analyse";
import { useTranslation } from "react-i18next";
import Nodata from '../../components/nodata'
import { useProvider } from "../../components/provider";
import { useQuery } from "@tanstack/react-query";
import { AppContextType } from "../../App";
import { useState } from "react";
import Loading from "../../components/Loading";
function DevicesPage() {
  const { t } = useTranslation();
  const { backendApi } = useProvider<AppContextType>();
  const [historyArray, setHistoryArray] = useState<any[]>([]);
  const { isLoading } = useQuery(['getHistory'], async () => {
    const result = await backendApi.findMany<any>("dpc-history/api/history", {
      /* where: {
         createdAt: {
           $gte: new Date().toISOString().slice(0, 16),
           // $sort: { createdAt: -1 }
         },
       },*/
      /*include: {
        temperature: true
      },*/
    });
    setHistoryArray(result.results);
    console.log(result.results)
    console.log("date:" + new Date().toISOString())
    return result;
  });
  const data = historyArray.map(element => ({
    _id: element._id,
    nom: element.deviceId + " " + element.date,
    temperature: element.temperature || 'NaN ',
    minT: 0 || 'NaN ',
    maxT: 0 || 'NaN ',
    humidity: element.humidity || 'NaN ',
    minH: 0 || 'NaN ',
    maxH: 0 || 'NaN '
  }));
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
        {t('realtime event')}
      </h6>
      {isLoading ? (
        <Loading />
      ) : data.length === 0 ? (
        <Nodata />
      ) : (
        <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
          <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
            {data.map(element => (
              <Analyse key={element._id} nom={element.nom} temperature={element.temperature} minT={element.minT} maxT={element.maxT} humidity={element.humidity} minH={element.minH} maxH={element.maxH} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DevicesPage;