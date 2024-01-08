/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import Pagination from "../../components/pagination";
import DataGrid, { Column } from "../../components/data-grid";
import { Params } from "../../utils/types";
import { useQueries } from "@tanstack/react-query";
import { useProvider } from "../../components/provider";
import { AppContextType } from "../../App";
import { twMerge } from "tailwind-merge";
// import { Button } from "@material-tailwind/react";
// import { ReactComponent as PlusIcon } from "../../assets//icons/plus.svg";
function RoomesPage() {
  const { backendApi } = useProvider<AppContextType>();
  const [params, setParams] = React.useState<Params>({
    where: {},
    pagination: {
      page: 1,
      perPage: 10,
    },
    include: {
      devices: {
        select: {
          isOnline: true,
          _count: true,
        },
      },
    },
    orderBy: {},
  });

  const columns: Column[] = useMemo(
    () =>
      [
        {
          label: "name",
          header: "name",
          valueGetter: (row) => row.name || "N/A",
          filter: {
            type: "text",
            onChange: (v) => {
              setParams({
                ...params,
                where: {
                  ...params.where,
                  name: {
                    contains: v,
                    mode: "insensitive",
                  },
                },
              });
            },
          },
        },
        {
          label: "type",
          header: "type",
          valueGetter: (row) => row?.type || "N/A",
          filter: {
            type: "text",
            onChange: (v: string) => {
              setParams({
                ...params,
                where: {
                  ...params.where,
                  type: {
                    contains: v,
                    mode: "insensitive",
                  },
                },
              });
            },
          },
        },
        {
          label: "alerts",
          header: "alerts",
          valueGetter: (row) => {
            let count = 0;
            count =
              row?.devices?.reduce(
                (acc: number, cur: any) => acc + cur._count?.alerts || 0,
                0,
              ) || 0;
            return (
              <div className="w-[7rem] border-[2px] border-red-500  px-4 py-1 text-center text-red-500">
                {count} alert
              </div>
            );
          },
          filter: {
            type: "text",
            onChange: (v: string) => {
              console.log(v);
            },
          },
        },
        {
          label: "devices status",
          header: "devices status",
          valueGetter: (row) => {
            let count = 0;
            count =
              row?.devices?.reduce(
                (acc: number, cur: any) => (!cur.isOnline && acc + 1) || 0,
                0,
              ) || 0;
            return (
              <div className="flex w-fit gap-2 overflow-hidden rounded-3xl  [&>*]:px-4 [&>*]:py-1">
                <div className="flex  max-w-[6rem] items-center gap-2 bg-black/10  py-2 ">
                  <span className="text-green-500">Online:</span>
                  <span>1</span>
                </div>
                <div className="flex  max-w-[6rem] items-center gap-2 bg-black/10  py-2 ">
                  <span className="text-green-500">Online:</span>
                  <span>1</span>
                </div>
              </div>
            );
          },
          filter: {
            type: "text",
            onChange: (v: string) => {
              console.log(v);
            },
          },
        },
      ] as Column[],
    [],
  );

  const [groups] = useQueries({
    queries: [
      {
        queryKey: ["group", params],
        queryFn: async () => {
          return await backendApi.findMany("/group", params);
        },
      },
    ],
  });

  return (
    <div className="flex  h-full w-full flex-col gap-4 p-2 md:p-4 xl:p-6">
      <h6 className="mx-5 flex h-[4rem] items-center border-b-[4px] font-bold">
        Roomes
        {/* <Button
          className="my-1 ml-auto flex items-center gap-4 !bg-green-500 text-white"
          variant="text"
        >
          Add Device <PlusIcon className="h-5 w-5" />
        </Button> */}
      </h6>
      <div className="ml-auto p-1">
        <Pagination
          className="flex items-center justify-center gap-4 pr-2"
          total={groups.data?.totalResult || 0}
          value={{
            page: params.pagination.page,
            perPage: params.pagination.perPage,
          }}
          onChange={(v) => {
            setParams({
              ...params,
              pagination: v,
            });
          }}
        />
      </div>
      <div className=" mx-auto flex max-h-[92rem]   max-w-[calc(2000px-20rem)] ">
        <DataGrid
          error={groups.isError}
          cellMinWidth={300}
          loading={groups.isLoading}
          className="h-full w-full  table-fixed text-left"
          headClassName="h-[5.5rem] text-[#697681] [&>*]:px-2 bg-[#D5D7E1]/40"
          rowClassName="h-[4rem] [&>*]:px-2 shadow shadow-[#7f7f7f]/20 hover:bg-purple/50"
          columns={columns}
          rows={groups.data?.results || []}
          noData={
            <div className="flex  h-full min-h-[40vh] flex-col items-center justify-center gap-[4rem] text-4xl">
              <img
                src="/not-data.svg"
                alt=""
                className="h-[10rem] md:h-[20rem]"
              />
              <span
                className="
            font-extrabold
            text-purple-600
            "
              >
                No Data fond
              </span>
            </div>
          }
          action={() => <div className="flex gap-2"></div>}
        />
      </div>
    </div>
  );
}

export default RoomesPage;
