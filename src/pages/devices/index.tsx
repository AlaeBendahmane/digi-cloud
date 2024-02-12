import Analyse from "./analyse";
import { useTranslation } from "react-i18next";
import Nodata from '../../components/nodata'
import { useProvider } from "../../components/provider";
import { useQuery } from "@tanstack/react-query";
import { AppContextType } from "../../App";
import { useState } from "react";
import Loading from "../../components/Loading";
interface Device {
  id: number;
  name: string;
  lastTelemetries: {
    name: string;
    value: number;
  }[];
}
function DevicesPage() {
  const { t } = useTranslation();
  const { backendApi } = useProvider<AppContextType>();
  const [historyArray, setHistoryArray] = useState<Device[]>([]);
  const { isLoading } = useQuery(['getHistory'], async () => {
    const devices = await backendApi.findMany<any>("device", {
      select: {
        id: true,
        name: true,
        lastTelemetries: true,
      },
      where: {
        lastTelemetries: {
          some: {
            OR: [
              {
                name: '"t_dht"',
              },
              {
                name: 'humidity',
              },
            ],
          },
        },
      },
    });
    setHistoryArray(devices.results);
    return devices;
  });
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        {t('realtime event')}
      </h6>
      {isLoading ? (
        <Loading />
      ) : historyArray?.length === 0 ? (
        <Nodata />
      ) : (
        <div className="mx-auto flex h-full max-h-[80rem] w-full max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
          <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
            {historyArray.map((element) => (
              <Analyse
                key={element.id}
                id={element.id}
                nom={element.name}
                temperature={getTelemetryValue(element, 'temperature') || getTelemetryValue(element, 't_dht')}
                humidity={getTelemetryValue(element, 'humidity')}
                calledfrom={"RealTime"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function getTelemetryValue(device: Device, telemetryName: string): number | undefined {
  const telemetry = device.lastTelemetries.find((t) => t.name === telemetryName);
  return telemetry ? telemetry.value : undefined;
}
export default DevicesPage;