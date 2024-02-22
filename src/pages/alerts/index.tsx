import DataTable from 'react-data-table-component';
import { useState } from "react";
import Find from '../../assets/icons/find.svg'
import Add from '../../assets/icons/add.svg'
import Prealerts from '../../assets/icons/prealerts.svg'
import Pagination from '../../components/pagination2/index';
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import Modal from '../../components/modal'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { AppContextType } from '../../App';
import { useProvider } from '../../components/provider';
export default function Alerts() {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [progressPending, setprogressPending] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { backendApi } = useProvider<AppContextType>();
  const { data } = useQuery(['getAlerts', searchQuery], async () => {
    const result = await backendApi.findMany<any>("dpc-history/api/alerts", {
      select: {
        date: true,
        serial: true,
        type: true,
        message: true,
      },
      where: {
        acknowledged: false,
        type: {
          $exists: true
        },
        // serial: JSON.stringify({
        //   $regex: new RegExp('TUGHVXX5F673LQMM', 'i')
        // })
      },
    });
    setprogressPending(false)
    console.log(result.results)
    return result.results
  });
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
      {row.Devicestats}
    </span>
  );
  const columns = [
    {
      name: t('Date/Time'),
      selector: (row: { datetime: string }) => row.datetime,
      sortable: true,
      cell: customCellRendererDate,
      //  width:'220px'
    },
    {
      name: t('Device stats'),
      selector: (row: { Devicestats: string }) => row.Devicestats,
      sortable: true,
      cell: customCellRendererStats,
    },
    {
      name: t('Cause'),
      selector: (row: { Cause: string }) => row.Cause,
      sortable: true,
    },
    {
      name: t('Serial'),
      selector: (row: { Serial: string }) => row.Serial,
      sortable: true,
    },
  ];
  const datain: { datetime: string; Devicestats: string; Cause: any; Serial: string; }[] = [];
  data?.forEach(element => {
    datain.push({
      datetime: new Date(element.date).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true }).replace(",", " "),
      Devicestats: element.type,
      Cause: element.message,
      Serial: element.serial,
    });
  })
  const rowsPerPage = 9;
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = datain?.slice(startIndex, endIndex);
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
          <button className="rounded bg-red-600 flex px-2.5 py-1 text-white " onClick={handleOpenDialog} >
            <img src={Add} alt="" className="mx-1.5 my-0.5" />
            {t('ADD DEVICE')}
          </button>
        </div>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
        <DataTable progressPending={progressPending} columns={columns} data={slicedData} customStyles={customStyles} progressComponent={<Loanding />} noDataComponent={<Nodata />}
          {...(datain.length === 0 ? {} : { fixedHeader: true, fixedHeaderScrollHeight: "calc(100vh - 175px)" })} />
        <Pagination totalRows={datain.length} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <Modal open={openDialog} handleClose={handleCloseDialog} />
    </div>
  )
}