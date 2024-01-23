import Pagination from "../../components/pagination2";
import DataTable from "react-data-table-component";
import Find from '../../assets/icons/find.svg'
import { useState } from "react";
import user from '../../assets/icons/user.svg'
import Loanding from '../../components/Loading'
import Nodata from '../../components/nodata'
import { useTranslation } from "react-i18next";
import { User } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";
import { useProvider } from "../../components/provider";
import { AppContextType } from "../../App";
function UserPage() {
  const { t } = useTranslation();
  const [ContactsArray, setContactsArray] = useState<User[]>([]);
  const { backendApi } = useProvider<AppContextType>();
  const rowsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [progressPending, setprogressPending] = useState(true);
  const data: { Name: string; Role: string; EmailAdrdress: string; Creationdate: string; }[] = [];
  useQuery(['getRoomsDevices', searchQuery, currentPage], async () => {
    const result = await backendApi.findMany<any>("user", {
      where: {
        OR: [
          { "email": { contains: searchQuery } },
          { "lastName": { contains: searchQuery } },
          { "firstName": { contains: searchQuery } },
        ],
      },
      orderBy: {
        "firstName": "asc"
      },
    });
    setContactsArray(result.results);
    setprogressPending(false)
    return result.results;
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const customCellRendererName = (row: { Name: string | string[] }) => (
    <>
      <img src={user} alt="Preroom" />
      <p style={{ marginLeft: '12px' }}>
        {row.Name}
      </p>
    </>
  );
  const columns = [
    {
      name: t('Name'),
      selector: (row: { Name: string }) => row.Name,
      sortable: true,
      cell: customCellRendererName
    },
    {
      name: t('Role'),
      selector: (row: { Role: string }) => row.Role,
      sortable: true,
    },
    {
      name: t('Email Adrdress'),
      selector: (row: { EmailAdrdress: string }) => row.EmailAdrdress,
      sortable: true,
    },
    {
      name: t('Creation date'),
      selector: (row: { Creationdate: string }) => row.Creationdate,
      sortable: true,
    },
  ];
  ContactsArray.forEach(element => {
    data.push({
      Name: element.firstName + " " + element.lastName,
      Role: element.role,
      EmailAdrdress: element.email,
      Creationdate: new Date(element.createdAt).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " ")
    });
  });
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = data.slice(startIndex, endIndex);
  const customStyles = {
    headRow: {
      style: {
        paddingLeft: '15px',
        color: '#5D7285',
      },
    },
    rows: {
      style: {
        margin: '3px 10px 3px 10px',
        paddingLeft: 'auto',
        color: '#030229',
        fontSize: '17px',
        fontFamily: 'Nunito',
        fontWeight: 600,
        backgroundColor: '#F7F7F8',
        borderBottom: 'none !important',
        width: 'auto',
      },
    }
  };
  return (
    <div className="flex h-full w-full flex-col">
      <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
        {t('Contacts')}
        <div className="relative flex mx-2 ml-auto">
          <input type="text" className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder={t('Search')}
            value={searchQuery} onChange={handleSearch} />
          <img src={Find} alt="" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        </div>
      </h6>
      <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded ">
        <DataTable
          columns={columns}
          data={slicedData}
          customStyles={customStyles}
          progressComponent={<Loanding />}
          progressPending={progressPending}
          noDataComponent={<Nodata />}
          {...(data.length === 0 ? {} : {
            fixedHeader: true,
            fixedHeaderScrollHeight: "calc(100vh - 175px)"
          })}
        />
        <Pagination
          totalRows={data.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default UserPage;