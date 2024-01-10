import { Card } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import ReactApexChart from 'react-apexcharts';


function AnalyseTemp() {
  const alldata =
  {
    Electricity: [10, 20, 30, 40, 50, 60, 60, 50, 40, 30, 20, 10],
    Humidity: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
    Temperature: [60, 50, 40, 30, 20, 10, 10, 20, 30, 40, 50, 60]
  }
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      stacked: false,
      toolbar: {
        show: false
      },
      //offsetY: -20,
    },
    /*subtitle: {
        text: 'Overview',
        offsetX: 10,
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#030229',
            fontFamily: 'Nunito'
        }
    },*/
    dataLabels: {
      enabled: false
    },
    colors: ["#0D0887", "#9C179E", "#ED7953"],
    series: [
      {
        name: "Electricity",
        data: alldata.Electricity
      },
      {
        name: "Humidity",
        data: alldata.Humidity
      },
      {
        name: "Temperature",
        data: alldata.Temperature
      }
    ],
    stroke: {
      width: [2, 2, 2]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#000000",
          fontSize: '14px',
          fontWeight: 'normal',
          fontFamily: 'Assistant'
        }
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontFamily: 'Assistant',
      fontSize: '14px',
      fontWeight: 'normal',
      markers: {
        radius: 0
      },
    },
  };
  return (
    <Card className="bg-white p-2 md:col-span-full"  placeholder={undefined}>
      {/* <h3 className="font-semibold ">patients statistics</h3>
      <div className="flex-1"> */}
      <div className="flex h-[2rem] gap-2 p-1 px-3 absolute">
        <span className="font-Nunito font-bold text-xl">Overview</span>
        {/* <div className=" ml-auto flex gap-2">
          <div className="flex items-center gap-2">
            <div className="h-[1.2rem] w-[1.2rem] rounded-[100%] bg-red-500"></div>
            <span>Electricity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[1.2rem] w-[1.2rem] rounded-[100%] bg-red-500"></div>
            <span>Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[1.2rem] w-[1.2rem] rounded-[100%] bg-red-500"></div>
            <span>Temperature</span>
          </div>
        </div> */}
      </div>
      <div className="h-[22rem] ">
        <ReactApexChart options={options} series={options.series} type="line" height={'100%'} />

      </div>

      {/* </div> */}
    </Card>
  );
}

export default AnalyseTemp;