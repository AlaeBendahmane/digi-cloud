import { SetStateAction, useState } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import Preroom from '../../assets/icons/preroom.svg'
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import Find from '../../assets/icons/find.svg'

export default function Roomespage() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };
  const customCellRendererDevice = (row: { Name: string | string[] }) => (
    < >
      <img src={Preroom} alt="Preroom" />
      <p className=" font-semibold text-lg ml-3">
        {row.Name}
      </p>
    </>
  );
  const customCellRendererAlert = (row: { Alert: number | number }) => (
    <span className="bg-red-100 text-red-800  text-sm font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      {row.Alert} Alerts
    </span>
  );
  const customCellRendererNumber = (row: { Nbofdevices: number | number }) => (
    <span className=" font-semibold text-lg">
      {row.Nbofdevices}  Devices
    </span>
  );
  const customCellRendererStats = (row: { Devicesstats: number | number; Nbofdevices: number | number }) => (
    <div className='grid grid-flow-row auto-rows-max gap-2 '>
      <div className="grid grid-cols-2 gap-1" >
        <div className="px-0.5" style={{ backgroundColor: '#ebecee', display: 'flex', borderRadius: '10px 0px 0px 10px' }}>
          <p style={{ color: '#3FBC58' }} className="px-1  font-semibold text-sm text-nowrap">Online :
            <span className="text-black	"> {row.Devicesstats}</span>
          </p>
        </div>
        <div className="px-0.5" style={{ backgroundColor: '#ebecee', display: 'flex', borderRadius: '0px 10px 10px 0px' }}>
          <p className="px-1  font-semibold text-sm text-nowrap" style={{ color: '#999ca9' }}>Offline :
            <span className="text-black	"> {row.Nbofdevices - row.Devicesstats}</span>
          </p>
        </div>
      </div>
    </div >
  );
  const columns = [
    {
      name: 'Name',
      selector: (row: { Name: string }) => row.Name,
      sortable: true,
      cell: customCellRendererDevice,

    },
    {
      name: 'Nb of devices',
      selector: (row: { Nbofdevices: number }) => row.Nbofdevices,
      sortable: true,
      cell: customCellRendererNumber,
    },
    {
      name: 'Alert',
      selector: (row: { Alert: number }) => row.Alert,
      sortable: true,
      cell: customCellRendererAlert,
    },
    {
      name: 'Devices stats',
      selector: (row: { Devicesstats: number }) => row.Devicesstats,
      sortable: true,
      cell: customCellRendererStats,
    },
    {
      name: 'Creation date',
      selector: (row: { Creationdate: string }) => row.Creationdate,
      sortable: true,
      width: '150px',
    },
  ];
  const data = [
    {
      "Name": "Room Gamma", "Nbofdevices": 42, "Alert": 15, "Devicesstats": 8, "Creationdate": "2022-03-10"
    },
    {
      "Name": "Room Delta", "Nbofdevices": 30, "Alert": 10, "Devicesstats": 6, "Creationdate": "2022-04-05"
    },
    {
      "Name": "Room Epsilon", "Nbofdevices": 50, "Alert": 20, "Devicesstats": 12, "Creationdate": "2022-05-20"
    },
    {
      "Name": "Room Zeta", "Nbofdevices": 25, "Alert": 5, "Devicesstats": 4, "Creationdate": "2022-06-12"
    },
    {
      "Name": "Room Eta", "Nbofdevices": 38, "Alert": 18, "Devicesstats": 9, "Creationdate": "2022-07-08"
    },
    {
      "Name": "Room Theta", "Nbofdevices": 31, "Alert": 11, "Devicesstats": 7, "Creationdate": "2022-08-02"
    },
    {
      "Name": "Room Iota", "Nbofdevices": 30, "Alert": 22, "Devicesstats": 10, "Creationdate": "2022-09-17"
    },
    {
      "Name": "Room Kappa", "Nbofdevices": 29, "Alert": 9, "Devicesstats": 5, "Creationdate": "2022-10-05"
    },
    {
      "Name": "Room Lambda", "Nbofdevices": 35, "Alert": 12, "Devicesstats": 6, "Creationdate": "2022-11-20"
    },
    {
      "Name": "Room Mu", "Nbofdevices": 48, "Alert": 16, "Devicesstats": 9, "Creationdate": "2022-12-15"
    },
    {
      "Name": "Room Mu", "Nbofdevices": 48, "Alert": 16, "Devicesstats": 9, "Creationdate": "2022-12-15"
    },
    {
      "Name": "Room Mu", "Nbofdevices": 48, "Alert": 16, "Devicesstats": 9, "Creationdate": "2022-12-15"
    },
  ];
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
  const filteredData = data.filter((room) =>
    room.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex h-full w-full flex-col ">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        Rooms
        <div className="relative flex mx-2 ml-auto">
          <input type="text" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder="Search"
            value={searchQuery} onChange={handleSearch} />
          <img src={Find} alt="" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        </div>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          progressComponent={<Loanding />}
          noDataComponent={<Nodata />}
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 160px)"
        />
      </div>
    </div>
  )
}