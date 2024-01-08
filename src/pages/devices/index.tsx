import React, { useMemo } from "react";
import Pagination from "../../components/pagination";
import DataGrid, { Column } from "../../components/data-grid";
import { Params } from "../../utils/types";
import { useQueries } from "@tanstack/react-query";
import { useProvider } from "../../components/provider";
import { AppContextType } from "../../App";
import { twMerge } from "tailwind-merge";
import { Button } from "@material-tailwind/react";
import { ReactComponent as PlusIcon } from "../../assets//icons/plus.svg";
import Full from "../../assets/icons/full.svg";

function DevicesPage() {
  return (
    <div className="flex  h-full w-full flex-col gap-4 p-2 md:p-4 xl:p-6">
      <h6 className="mx-5 flex h-[4rem] items-center border-b-[4px] font-bold">
        Realtime events
        <button className="flex ml-auto" >
          <img src={Full} alt="Fullsize" />
        </button>
      </h6>
      <div className="ml-auto p-1">
        aaaa
      </div>
      <div className=" mx-auto flex max-h-[92rem]   max-w-[calc(2000px-20rem)] ">
        zzzz
      </div>
    </div>
  );
}

export default DevicesPage;