import Analyse from "./analyse";
import { useTranslation } from "react-i18next";
function DevicesPage() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
        {t('realtime event')}
      </h6>
      <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content"  >
        <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2"  >
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
          <Analyse />
        </div>
      </div>
    </div>
  );
}
export default DevicesPage;