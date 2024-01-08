import React, { useMemo } from "react";
import DataGrid, { Column } from "../../components/data-grid";
import Pagination from "../../components/pagination";
import { useQueries } from "@tanstack/react-query";

import { AppContextType } from "../../App";
import { useProvider } from "../../components/provider";
import { Params } from "../../utils/types";

function AlertPage() {
  const { backendApi } = useProvider<AppContextType>();
  const [params, setParams] = React.useState<Params>({
    where: {},
    pagination: {
      page: 1,
      perPage: 10,
    },
    include: {},
    orderBy: {},
  });

  const [alert] = useQueries({
    queries: [
      {
        queryKey: ["alerts", params],
        queryFn: () => backendApi.findMany("alert", params),
      },
    ],
  });

  const columns: Column[] = useMemo(
    () =>
      [
        {
          label: "location",
          header: "location",
          valueGetter: (row) => row.group?.location || "N/A",
          filter: {
            type: "text",
            onChange: () => {},
          },
        },
        {
          label: "site",
          header: "site",
          valueGetter: (row) => row.group?.name || "N/A",
          filter: {
            type: "select",
            // options: (dashboardData?.groups || []).map((g) => ({
            //   label: g.name,
            //   value: g.id,
            // })),
            onChange: () => {
              // setParams({
              //   ...params,
              //   where: {
              //     ...params.where,
              //     groupId: v ? parseInt(v) : undefined,
              //   },
              // });
            },
          },
        },
        {
          label: "system",
          header: "system",
          valueGetter: (row) => row.system,
          filter: {
            type: "select",
            options: [],
            // options: systems.map((s) => ({ label: s, value: s })),

            onChange: () => {
              // setParams({
              //   ...params,
              //   where: {
              //     ...params.where,
              //     system: {
              //       contains: v,
              //       mode: "insensitive",
              //     },
              //   },
              // });
            },
          },
        },
        {
          label: "model",
          header: "model",
          valueGetter: (row) => row.model || "N/A",
          filter: {
            type: "text",
            onChange: () => {
              // setParams({
              //   ...params,
              //   where: {
              //     ...params.where,
              //     model: {
              //       contains: v,
              //       mode: "insensitive",
              //     },
              //   },
              // });
            },
          },
        },
        {
          label: "name",
          header: "name",
          valueGetter: (row) => row.name,
          filter: {
            type: "text",
            onChange: () => {},
          },
        },
        {
          label: "serial",
          header: "serial",
          field: "serial",
          filter: {
            type: "text",
            onChange: () => {},
          },
        },
      ] as Column[],
    [],
  );

  return (
    <div className="flex  h-full w-full flex-col gap-4 p-2 md:p-4 xl:p-6">
      <h6 className=" mx-5 flex h-[4rem] items-center border-b-[4px] font-bold">
        Alerts
      </h6>
      <div className="ml-auto p-1">
        <Pagination
          className="flex items-center justify-center gap-4 pr-2"
          total={alert?.data?.totalResult || 0}
          value={{
            page: params.pagination?.page || 1,
            perPage: params.pagination?.perPage || 10,
          }}
          onChange={(v) => {
            console.log(v);
            setParams({
              ...params,
              pagination: v,
            });
          }}
        />
      </div>
      <div className=" mx-auto flex h-full  max-h-[92rem] max-w-[calc(2000px-20rem)] flex-1">
        <DataGrid
          error={false}
          cellMinWidth={300}
          loading={alert.isLoading}
          className="h-full w-full table-fixed text-left"
          headClassName="h-[5.5rem] text-[#697681] [&>*]:px-2"
          rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 shadow shadow-[#7f7f7f]/20"
          columns={columns}
          rows={[]}
          noData={
            <div className="flex  h-full  min-h-[50vh] flex-col items-center justify-center gap-[4rem] text-4xl">
              <img src="/not-data.svg" alt="" className="h-[20rem]" />
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

export default AlertPage;
