import DataTable from 'react-data-table-component';
import { useState } from "react";
import Find from '../../assets/icons/find.svg'
import Add from '../../assets/icons/add.svg'
import Prealerts from '../../assets/icons/prealerts.svg'
import Pagination from '../../components/pagination2/index';
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, } from "@material-tailwind/react";
import React from 'react';
export default function Alerts() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const customCellRendererDate = (row: { datetime: string | string[] }) => (
    <>
      <img src={Prealerts} alt="Preroom" />
      <p style={{ marginLeft: '12px' }}>
        {row.datetime}
      </p>
    </>
  );
  const customCellRendererStats = (row: { Devicestats: String | String[] }) => (
    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      {row.Devicestats}
    </span>
  );
  const columns = [
    {
      name: 'Date/Time',
      selector: (row: { datetime: string }) => row.datetime,
      sortable: true,
      cell: customCellRendererDate
    },
    {
      name: 'Device stats',
      selector: (row: { Devicestats: string }) => row.Devicestats,
      sortable: true,
      cell: customCellRendererStats
    },
    {
      name: 'Cause',
      selector: (row: { Cause: string }) => row.Cause,
      sortable: true,
    },
    {
      name: 'Room',
      selector: (row: { Room: string }) => row.Room,
      sortable: true,
    },
    {
      name: 'Serial',
      selector: (row: { Serial: string }) => row.Serial,
      sortable: true,
    },
  ];
  const data = [
    {
      datetime: '2024-01-01 12:00 PM', Devicestats: 'Online', Cause: 'Power outage', Room: 'Living Room', Serial: 'ABC123',
    },
    {
      datetime: '2024-01-02 03:30 PM', Devicestats: 'Offline', Cause: 'Network issue', Room: 'Bedroom', Serial: 'XYZ789',
    },
    {
      datetime: '2024-01-03 08:45 AM', Devicestats: 'Online', Cause: 'Software update', Room: 'Kitchen', Serial: 'DEF456',
    },
    {
      datetime: '2024-01-04 02:15 PM', Devicestats: 'Offline', Cause: 'Hardware failure', Room: 'Home Office', Serial: 'GHI789',
    },
    {
      datetime: '2024-01-05 10:30 AM', Devicestats: 'Online', Cause: 'Security breach', Room: 'Bathroom', Serial: 'JKL012',
    },
    {
      datetime: '2024-01-06 04:20 PM', Devicestats: 'Offline', Cause: 'Connection timeout', Room: 'Dining Room', Serial: 'MNO345',
    },
    {
      datetime: '2024-01-07 01:00 PM', Devicestats: 'Online', Cause: 'Temperature alert', Room: 'Guest Room', Serial: 'PQR678',
    },
    {
      datetime: '2024-01-08 09:10 AM', Devicestats: 'Offline', Cause: 'Firmware bug', Room: 'Playroom', Serial: 'STU901',
    },
    {
      datetime: '2024-01-09 05:45 PM', Devicestats: 'Online', Cause: 'User error', Room: 'Library', Serial: 'VWX234',
    },
    {
      datetime: '2024-01-10 11:30 AM', Devicestats: 'Offline', Cause: 'System overload', Room: 'Basement', Serial: 'YZA567',
    }
  ];
  const filteredData = data.filter((room) =>
    room.Serial.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const rowsPerPage = 9;
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = filteredData.slice(startIndex, endIndex);
  const customStyles = {
    headRow: {
      style: {
        paddingLeft: '65px',
        color: '#5D7285',
      },
    },
    rows: {
      style: {
        margin: '3px 10px 3px 10px',
        paddingLeft: '50px',
        color: '#030229',
        fontSize: '17px',
        backgroundColor: '#F7F7F8',
        borderBottom: 'none !important',
        width: 'auto',
      },
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        Alerts
        <div className="flex ml-auto">
          <div className="relative flex mx-2">
            <input type="text" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder="Search"
              value={searchQuery} onChange={handleSearch} />
            <img src={Find} alt="" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </div>
          <button className="rounded bg-red-600 flex px-2.5 py-1 text-white " onClick={handleOpen} >
            <img src={Add} alt="" className="mx-1.5 my-0.5" />
            ADD DEVICE
          </button>
        </div>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
        <DataTable
          columns={columns}
          data={slicedData}
          customStyles={customStyles}
          progressComponent={<Loanding />}
          noDataComponent={<Nodata />}
        />
        <Pagination
          totalRows={filteredData.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Dialog size="sm" open={open} handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-transparent shadow-none" placeholder={undefined}      >
        <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              Add device
            </Typography>
            <Typography className="-mb-2" variant="h6" placeholder={undefined}>
              Serial
            </Typography>
            <Input label="Serial" size="lg" crossOrigin={undefined} />
          </CardBody>
          <CardFooter className="pt-0" placeholder={undefined}>
            <Button variant="gradient" onClick={handleOpen} fullWidth placeholder={undefined}>
              Add
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  )
}