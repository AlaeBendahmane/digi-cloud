import DataTable from 'react-data-table-component';
import { useState } from "react";
import Find from '../../assets/icons/find.svg'
import Add from '../../assets/icons/add.svg'
import Prealerts from '../../assets/icons/prealerts.svg'
import Pagination from '../../components/pagination2/index';
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import Device from '../../assets/icons/device.svg'
import { Button, Dialog, Card, CardFooter, Typography, Input, CardBody, CardHeader, DialogHeader, DialogBody } from "@material-tailwind/react";
import React from 'react';
import { useTranslation } from 'react-i18next';
export default function Alerts() {
  const { t } = useTranslation();
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
      <p className='ml-3 text-nowrap font-semibold text-lg'>
        {row.datetime}
      </p>
    </>
  );
  const customCellRendererStats = (row: { Devicestats: String | String[] }) => (
    <span className="uppercase bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      {t(`DEVICE_${row.Devicestats}`)}
    </span>
  );
  const columns = [
    {
      name: t('Date/Time'),
      selector: (row: { datetime: string }) => row.datetime,
      sortable: true,
      cell: customCellRendererDate,
      width: '250px'
    },
    {
      name: t('Device stats'),
      selector: (row: { Devicestats: string }) => row.Devicestats,
      sortable: true,
      cell: customCellRendererStats
    },
    {
      name: t('Cause'),
      selector: (row: { Cause: string }) => row.Cause,
      sortable: true,
    },
    {
      name: t('Room'),
      selector: (row: { Room: string }) => row.Room,
      sortable: true,
    },
    {
      name: t('Serial'),
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
        paddingLeft: '10px',
        color: '#5D7285',
      },
    },
    rows: {
      style: {
        margin: '3px 10px 3px 10px',
        paddingLeft: 'auto',
        fontFamily: 'Nunito',
        fontSize: '17px',
        fontWeight: 600,
        textWrap: 'nowrap',
        backgroundColor: '#F7F7F8',
        borderBottom: 'none !important',
        width: 'auto',
      },
    }
  };
  const dismissType = {
    outsidePress: false,
    escapeKey: false
  };
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        {t('Alerts')}
        <div className="flex ml-auto">
          <div className="relative flex mx-2">
            <input type="text" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder={t('Search')}
              value={searchQuery} onChange={handleSearch} />
            <img src={Find} alt="" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </div>
          <button className="rounded bg-red-600 flex px-2.5 py-1 text-white " onClick={handleOpen} >
            <img src={Add} alt="" className="mx-1.5 my-0.5" />
            {t('ADD DEVICE')}
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
          {...(filteredData.length === 0 ? {} : {
            fixedHeader: true,
            fixedHeaderScrollHeight: "calc(100vh - 175px)"
          })}
        />
        <Pagination
          totalRows={filteredData.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      {/*<Dialog size='lg' open={open} handler={handleOpen} dismiss={dismissType}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-transparent shadow-none" placeholder={undefined}>
        <Card className="mx-auto w-full max-w-[24rem]"  placeholder={undefined}>
          <DialogHeader placeholder={undefined}>Its a simple dialog.</DialogHeader>
          <DialogBody placeholder={undefined} >
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <Typography variant="h4" color="blue-gray" className='flex bg-red-50 h-16 p-3 font-medium ' placeholder={undefined}>
            <img src={Device} alt="" className='mr-1.5' />
            {t('Add device')}
          </Typography>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography className="-mb-2" variant="h6" placeholder={undefined}>
              {t('Name')}
            </Typography>
            <input type="email" placeholder='NXT-3' className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            <input type="email" placeholder='NXT-3' className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />

          </CardBody>
          <CardFooter className="pt-0" placeholder={undefined}>
            <Button variant="gradient" onClick={handleOpen} fullWidth placeholder={undefined}>
              {t('Add')}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>*/}
    </div>
  )
}