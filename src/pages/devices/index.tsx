import Analyse from "./analyse";
import { useTranslation } from "react-i18next";
import Nodata from '../../components/nodata'
import { useProvider } from "../../components/provider";
import { useQuery } from "@tanstack/react-query";
import { AppContextType } from "../../App";
import { useState } from "react";
import Loading from "../../components/Loading";
interface ResultObject {
  deviceId: number;
  humidity?: number;
  temperature?: number;
}
function DevicesPage() {
  const { t } = useTranslation();
  const { backendApi } = useProvider<AppContextType>();
  const [historyArray, setHistoryArray] = useState<any[]>([]);
  const { isLoading } = useQuery(['getHistory'], async () => {
    const result = await backendApi.findMany<any>("lastTelemetry", {
      where: {
        "OR": [{ "name": "temperature" }, { "name": "humidity" }]
      }
    });
    const resultArray: ResultObject[] = [];
    result.results.forEach(obj => {
      const existingDevice = resultArray.find(item => item.deviceId === obj.deviceId);
      if (existingDevice) {
        if (obj.name === "humidity") {
          existingDevice.humidity = obj.value;
        } else if (obj.name === "temperature") {
          existingDevice.temperature = obj.value;
        }
      } else {
        const newObj: ResultObject = {
          deviceId: obj.deviceId,
          humidity: obj.name === "humidity" ? obj.value : undefined,
          temperature: obj.name === "temperature" ? obj.value : undefined
        };
        resultArray.push(newObj);
      }
    });
    setHistoryArray(resultArray)
    return result;
  });
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
        {t('realtime event')}
      </h6>
      {isLoading ? (
        <Loading />
      ) : historyArray.length === 0 ? (
        <Nodata />
      ) : (
        <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
          <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
            {historyArray.map(element => (
              <Analyse key={element.deviceId} id={element.deviceId} nom={element.deviceId} temperature={element.temperature} humidity={element.humidity} calledfrom={"RealTime"} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DevicesPage;