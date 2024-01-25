import { SetStateAction, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import Preroom from '../../assets/icons/preroom.svg'
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import Find from '../../assets/icons/find.svg'
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useProvider } from "../../components/provider";
import { AppContextType } from "../../App";
import { Group } from "../../utils/types";
import { Link } from "react-router-dom";
export default function Roomespage() {
  const [RoomsArray, setRoomsArray] = useState<Group[]>([]);
  const { backendApi } = useProvider<AppContextType>();
  const [progressPending, setprogressPending] = useState(true);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(e.target.value);
  };
  const customCellRendererDevice = (row: { Name: string | string[] }) => (
    <Link to={row.Name.toString()}>
      <div className="flex" >
        <img src={Preroom} alt="Preroom" />
        <p className=" font-semibold text-lg ml-3">
          {row.Name}
        </p>
      </div>
    </Link>
  );
  const customCellRendererAlert = (row: { Alert: number | number }) => (
    <span className="bg-red-100 text-red-800  text-sm font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      {row.Alert} {t('alerts')}
    </span>
  );
  const customCellRendererNumber = (row: { Nbofdevices: number | number }) => (
    <span className=" font-semibold text-lg">
      {row.Nbofdevices}  {t('Devices')}
    </span>
  );
  const customCellRendererStats = (row: { OnlineDevices: number | number; OfflineDevices: number | number }) => (
    <div className='grid grid-flow-row auto-rows-max gap-2 '>
      <div className="grid grid-cols-2 gap-1" >
        <div className="px-0.5" style={{ backgroundColor: '#ebecee', display: 'flex', borderRadius: '10px 0px 0px 10px' }}>
          <p style={{ color: '#3FBC58' }} className="px-1  font-semibold text-sm text-nowrap">{t('Online :')}
            <span className="text-black	"> {row.OnlineDevices}</span>
          </p>
        </div>
        <div className="px-0.5" style={{ backgroundColor: '#ebecee', display: 'flex', borderRadius: '0px 10px 10px 0px' }}>
          <p className="px-1  font-semibold text-sm text-nowrap" style={{ color: '#999ca9' }}>{t('Offline :')}
            <span className="text-black	"> {row.OfflineDevices}</span>
          </p>
        </div>
      </div>
    </div >
  );
  const columns = [
    {
      name: t('Name'),
      selector: (row: { Name: string }) => row.Name,
      sortable: true,
      cell: customCellRendererDevice,
    },
    {
      name: t('Nb of devices'),
      selector: (row: { Nbofdevices: number }) => row.Nbofdevices,
      sortable: true,
      cell: customCellRendererNumber,
    },
    {
      name: t('Alert'),
      selector: (row: { Alert: number }) => row.Alert,
      sortable: true,
      cell: customCellRendererAlert,
    },
    {
      name: t('Devices stats'),
      selector: (row: { OnlineDevices: number; OfflineDevices: number }) => row.OnlineDevices + row.OfflineDevices,
      sortable: true,
      cell: customCellRendererStats,
    },
    {
      name: t('Creation date'),
      selector: (row: { Creationdate: string }) => row.Creationdate,
      sortable: true,
      width: '150px',
    },
  ];
  const data: { Name: string; Nbofdevices: number; Alert: number; OnlineDevices: number; OfflineDevices: number; Creationdate: string }[] = [];
  useQuery(['getRoomsDevices', searchQuery], async () => {
    const result = await backendApi.findMany<any>("group", {
      where: {
        name: {
          contains: searchQuery
        }
      },
      include: {
        _count: true,
        devices: true,
      },
    });
    setRoomsArray(result.results);
    setprogressPending(false)
    return result.totalResult
  });
  RoomsArray.forEach(element => {
    const onlineDevices = element.devices.filter(device => device.status === "ONLINE").length;
    const offlineDevices = element.devices.filter(device => device.status === "OFFLINE").length;
    data.push({
      Name: element.name,
      Nbofdevices: element._count.devices,
      Alert: 0,
      OnlineDevices: onlineDevices,
      OfflineDevices: offlineDevices,
      Creationdate: new Date(element.createdAt).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " ")
    });
  });
  const customStyles: TableStyles = {
    headRow: {
      style: {
        textAlign: 'center',
        paddingLeft: '10px',
        color: '#5D7285',
      },
    },
    rows: {
      style: {
        margin: '3px 10px 3px 10px',
        paddingLeft: 'auto',
        paddingRight: 'auto',
        fontFamily: 'Nunito',
        //textWrap: 'nowrap',
        backgroundColor: '#F7F7F8',
        borderBottom: 'none !important',
        width: 'auto',
      },
    },
  };
  return (
    <div className="flex h-full w-full flex-col ">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        {t('rooms')}
        <div className="relative flex mx-2 ml-auto">
          <input type="text" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder={t('Search')}
            value={searchQuery} onChange={handleSearch} />
          <img src={Find} alt="" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        </div>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          progressComponent={<Loanding />}
          progressPending={progressPending}
          noDataComponent={<Nodata />}
          {...(data.length === 0 ? {} : {
            fixedHeader: true,
            fixedHeaderScrollHeight: "calc(100vh - 160px)"
          })}
        />
      </div>
    </div>
  )
}