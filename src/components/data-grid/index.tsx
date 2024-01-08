/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from "react";
import { TfiLayoutColumn3Alt as SelectColumnsIcon } from "react-icons/tfi";
import Provider, { useProvider } from "../provider";
import { JsonObject } from "../../utils/types";
import { strTake, stringify } from "../../utils/function";
import Popover from "../popover";
import {
  Checkbox,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";

type TextFilter = {
  type: "text" | "date";
  onChange: (value: string) => void;
};

type Option = {
  value: any;
  label: string | number;
};

type SelectFilter = {
  type: "select";
  options: Option[];
  onChange: (value: any) => void;
};

interface RowSelectAction {
  type: "edit" | "delete";
  row: JsonObject;
}

export type Column<T = any> = {
  header: string | React.ReactNode;
  field?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  label: string;
  show?: boolean;
  filter?: TextFilter | SelectFilter;
  valueGetter?: (params: T) => React.ReactNode;
};

// extends props from table element
interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: Record<string, any>[];
  columns: Column[];
  className?: string;
  style?: React.CSSProperties;
  noData?: React.ReactNode;
  headClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  rowClassName?: string;
  action?: (row: any) => React.ReactNode;
  hideAction?: boolean;
  onRowSelect?: (params: RowSelectAction) => void;
  loading?: boolean;
  error?: boolean;
  cellMinWidth?: number;
}

type DataGridContext = DataGridProps & {
  filterdColumns: Column[];
  restColumns: Column[];
  max: number;
};

function Row({ row }: { row: JsonObject }) {
  const { filterdColumns, restColumns, max, ...props } =
    useProvider<DataGridContext>();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <tr className={props.rowClassName} onClick={() => setOpen(!open)}>
        {filterdColumns.map((column, index) => {
          const value = column.valueGetter ? (
            column.valueGetter(row)
          ) : (
            <span>{stringify(row[column.field || ""]) || "- - -"} </span>
          );
          return (
            <td key={index} className={column.className} style={column.style}>
              {value}
            </td>
          );
        })}
        {!props.hideAction && <td>{props.action && props.action(row)}</td>}
      </tr>
      {restColumns.length > 0 && (
        <tr>
          <td colSpan={filterdColumns.length + (!props.hideAction ? 1 : 0)}>
            <div
              style={{
                maxHeight: open ? restColumns.length * 40 : 0,
                padding: open ? "0.5rem 0.5rem " : "0 0.5rem",
                overflow: "hidden",
              }}
              className="bg-light  dark:bg-primary-dark  grid grid-cols-2 gap-x-2 gap-y-3 px-2 transition-[padding,max-height] duration-300 ease-in-out sm:px-3 md:px-4"
            >
              {restColumns.map((column, index) => (
                <React.Fragment key={index}>
                  <span
                    style={{
                      color: "#7f7f7f",
                      fontWeight: 600,
                    }}
                  >
                    {column.header}
                  </span>
                  <span>
                    {column.valueGetter ? (
                      column.valueGetter(row)
                    ) : (
                      <span>
                        {stringify(row[column.field || ""]) || "- - -"}{" "}
                      </span>
                    )}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const DataGrid = ({ cellMinWidth = 200, ...props }: DataGridProps) => {
  const [selectedColumns, setSelectedColumns] = React.useState(
    props.columns.filter((column) => column.show !== false),
  );

  useEffect(() => {
    setSelectedColumns(props.columns);
  }, [props.columns]);

  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const max = useMemo(() => {
    if (innerWidth < 480) return 1;
    if (innerWidth < 640) return 2;
    return Math.floor(innerWidth / cellMinWidth);
  }, [innerWidth]);

  const filterdColumns = useMemo(() => {
    return selectedColumns
      .filter((column) => column.show !== false)
      .slice(0, max);
  }, [selectedColumns, max]);

  const restColumns = useMemo(() => {
    return selectedColumns.filter((column) => column.show !== false).slice(max);
  }, [selectedColumns, max]);

  return (
    <Provider
      value={{
        ...props,
        filterdColumns,
        restColumns,
        max,
      }}
    >
      <div className="h-full w-full ">
        <table className={props.className}>
          <thead className="capitalize">
            <tr className={props.headClassName} style={props.headerStyle}>
              {filterdColumns.map((column, index) => (
                <th
                  key={index}
                  className={column.className}
                  style={{
                    width: column.width,
                    ...column.style,
                  }}
                >
                  <div className="flex h-full flex-col justify-evenly gap-2 [&>*]:capitalize ">
                    <div>{column.header}</div>
                    {column.filter && column.filter.type === "text" && (
                      <Input
                        label="Search"
                        // placeholder={"search" || "search..."}
                        onChange={(e) => {
                          column.filter?.onChange(e.target.value);
                        }}
                      />
                    )}
                    {column.filter && column.filter.type === "date" && (
                      <Input
                        // placeholder="Search..."
                        label="Search"
                        onChange={(e) => {
                          column.filter?.onChange(e.target.value);
                        }}
                      />
                    )}
                    {column.filter && column.filter.type === "select" && (
                      <Select
                        className="w-full"
                        label="Select"
                        onChange={(e) => {
                          console.log(e);

                          // column.filter?.onChange(e.target.value);
                        }}
                      >
                        <Option value="">All</Option>
                        {(column?.filter?.options || [])?.map(
                          (option, index) => (
                            <Option key={index} value={option.value}>
                              {option.label}
                            </Option>
                          ),
                        )}
                      </Select>
                    )}
                  </div>
                </th>
              ))}
              {!props.hideAction && (
                <th className="w-[3rem]">
                  <Popover>
                    <div className=" rounded-full p-2 transition-colors hover:bg-black/5 active:bg-black/10 ">
                      <SelectColumnsIcon />
                    </div>
                    <div className="blur-background bg-light  dark:bg-dark dark:text-light  mr-[9rem]  w-[11.5rem] rounded bg-white p-4 shadow-lg xl:bg-transparent">
                      <div className="flex h-[2rem] w-full items-center gap-4">
                        <Checkbox
                          id={`column-all`}
                          checked={
                            selectedColumns.filter(
                              (column) => column.show !== false,
                            ).length === selectedColumns.length
                          }
                          onChange={(e) => {
                            if (!e.target.value) return;
                            const newColumns = selectedColumns.map((column) => {
                              return {
                                ...column,
                                show: true,
                              };
                            });
                            setSelectedColumns(newColumns);
                          }}
                        />
                        <label
                          className="pointer capitalize"
                          htmlFor={`column-all`}
                        >
                          {"all" || "all"}
                        </label>
                      </div>
                      {selectedColumns.map((column, index) => (
                        <div
                          key={index}
                          className="flex  h-[2rem] w-full items-center gap-4"
                        >
                          <Checkbox
                            id={`column-${index}`}
                            checked={column.show !== false}
                            onChange={(e) => {
                              if (
                                selectedColumns.filter(
                                  (column) => column.show !== false,
                                ).length === 1 &&
                                !e.target.checked
                              )
                                return;
                              const newColumns = selectedColumns.map(
                                (column, i) => {
                                  if (i === index) {
                                    return {
                                      ...column,
                                      show: e.target.checked,
                                    };
                                  }
                                  return column;
                                },
                              );
                              setSelectedColumns(newColumns);
                            }}
                          />
                          <label
                            className="pointer"
                            htmlFor={`column-${index}`}
                          >
                            {strTake(column.label, 15)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Popover>
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`${props.bodyClassName} `} style={props.bodyStyle}>
            {props.error && (
              <tr>
                <td colSpan={filterdColumns.length + 1}>
                  <div className="flex flex-col items-center gap-4 py-4">
                    <img
                      src="/data-grid-error.svg"
                      className="h-[50vh] min-h-[20rem] w-1/2"
                    />
                    <div className="text-center">
                      <b>Something went wrong!</b>
                      <div className="text-sm">
                        Please try again after sometime
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!props.error && props.loading && (
              <tr>
                <td
                  colSpan={filterdColumns.length + (props.hideAction ? 0 : 1)}
                >
                  <div className="  flex  min-h-[20rem] flex-col items-center justify-center gap-4 py-4 md:min-h-[30rem]">
                    <Spinner
                      color="purple"
                      className="h-[5rem] w-[5rem] text-4xl"
                    />
                    <div className="text-center">
                      <b>Loading...</b>
                      <div className="text-sm">
                        Please wait while we load the data
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!props.error &&
              !props.loading &&
              props.rows.map((row, index) => <Row key={index} row={row} />)}
            {!props.error && !props.loading && props.rows.length === 0 && (
              <tr>
                <td
                  colSpan={filterdColumns.length + (props.hideAction ? 0 : 1)}
                >
                  {props.noData || (
                    <div className="flex flex-col items-center gap-4 py-4">
                      <img
                        src="/data-grid-nodata.svg"
                        className="h-[50vh] min-h-[20rem] w-1/2"
                      />
                      <div className="text-center capitalize">
                        <b>
                          {"no data found" || "No data found for this table"}
                        </b>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Provider>
  );
};

export default DataGrid;
