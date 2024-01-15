import Analyse from "./analyse";
import { useTranslation } from "react-i18next";
import Nodata from '../../components/nodata'
function DevicesPage() {
  const data = [
    { "nom": "aaa", "temperature": 10, "minT": 0, "maxT": 0, "humidity": 0, "minH": 0, "maxH": 0 },
    { "nom": "bbb", "temperature": 15, "minT": 5, "maxT": 25, "humidity": 50, "minH": 30, "maxH": 70 },
    { "nom": "ccc", "temperature": 25, "minT": 18, "maxT": 30, "humidity": 65, "minH": 45, "maxH": 80 },
    { "nom": "ddd", "temperature": 10, "minT": -5, "maxT": 20, "humidity": 40, "minH": 20, "maxH": 60 },
    { "nom": "eee", "temperature": 20, "minT": 12, "maxT": 28, "humidity": 55, "minH": 35, "maxH": 75 },
    { "nom": "fff", "temperature": 8, "minT": 0, "maxT": 15, "humidity": 35, "minH": 15, "maxH": 50 },
    { "nom": "ggg", "temperature": 18, "minT": 8, "maxT": 25, "humidity": 45, "minH": 25, "maxH": 60 },
    { "nom": "hhh", "temperature": 30, "minT": 20, "maxT": 35, "humidity": 70, "minH": 55, "maxH": 80 },
    { "nom": "iii", "temperature": 5, "minT": -10, "maxT": 15, "humidity": 30, "minH": 10, "maxH": 40 },
    { "nom": "jjj", "temperature": 22, "minT": 15, "maxT": 28, "humidity": 60, "minH": 40, "maxH": 70 },
    { "nom": "kkk", "temperature": 15, "minT": 8, "maxT": 20, "humidity": 42, "minH": 22, "maxH": 58 },
    { "nom": "lll", "temperature": 28, "minT": 18, "maxT": 32, "humidity": 75, "minH": 50, "maxH": 85 },
    { "nom": "mmm", "temperature": 10, "minT": 0, "maxT": 18, "humidity": 38, "minH": 18, "maxH": 48 },
    { "nom": "nnn", "temperature": 24, "minT": 12, "maxT": 30, "humidity": 58, "minH": 35, "maxH": 68 }
  ];
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
        {t('realtime event')}
      </h6>
      {data.length === 0 ? (
        <Nodata />
      ) : (
        <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
          <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2"  >
            {data.map(element => (
              <Analyse key={element.nom} nom={element.nom} temperature={element.temperature} minT={element.minT} maxT={element.maxT} humidity={element.humidity} minH={element.minH} maxH={element.maxH} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default DevicesPage;