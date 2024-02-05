import { Card } from "@material-tailwind/react";
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from "react-i18next";
import { useProvider } from "../../../components/provider";
import { AppContextType } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
function AnalyseTemp() {
  const { t } = useTranslation();
  const { backendApi } = useProvider<AppContextType>();
  const [alldata, setAllData] = useState({
    Humidity: [],
    Temperature: [],
    Time: []
  });
  const { data, isLoading, error } = useQuery(['getHistory'], async () => {
    const result = await backendApi.findMany<any>("dpc-history/api/history", {
      where: {
        temperature: {
          $exists: true
        },
        humidity: {
          $exists: true
        },
        createdAt: {
          $gte: new Date().toISOString().slice(0, 10),
        },
        //   deviceId: {//to remove to see prblm
        //     $ne: {40950,40951},
        // }
        deviceId: {
          $nin: [40950, 40951]
        },
      },
      pagination: {
        perPage: 1000,
        page: 1
      }
    });
    setAllData((prevData: any) => ({
      ...prevData,
      Temperature: result.results.map((e) => parseFloat(parseFloat(e.temperature).toFixed(2))),
      Humidity: result.results.map((e) => parseFloat(parseFloat(e.humidity).toFixed(2))),
      Time: result.results.map((e) => e.date)
    }));
    console.log(result)
    return result
  });
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          reset: true,
          zoom: '<img>',
          zoomin: false,
          zoomout: false,
          pan: true,
        },
      }
    },
    series: [{
      name: t('humidity'),
      data: alldata.Humidity,
    }, {
      name: t('temperature'),
      data: alldata.Temperature,
      color: '#FF5722'
    }],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: alldata.Time/*.map(function (time) {
        return new Date(time).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " ");
      })*/,
      tickAmount: 12,
      labels: {
        format: 'HH:mm'
      }
    },
    yaxis: {
      min: 0,
      max: Math.max(...alldata.Humidity) > Math.max(...alldata.Temperature) ? Math.max(...alldata.Humidity) + 5 : Math.max(...alldata.Temperature) + 5,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        }
      }
    },
    tooltip: {
      x: {
        format: 'HH:mm:ss',
      },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    legend: {
      position: 'top',
      markers: {
        radius: 0
      },
    },
  };
  return (
    <Card className="bg-white p-2 md:col-span-full" placeholder={undefined} >
      <div className="hidden md:absolute md:flex md:h-[2rem] md:gap-2 md:p-0 md:px-3">{/*flex h-[2rem] gap-2 p-0 px-3 absolute*/}
        <span className="font-Nunito font-bold text-xl">{t('overview')}</span>
      </div>
      <div className="h-[18rem]">
        {isLoading ?
          <div className="flex justify-center items-center h-full">
            <Spinner color="purple" />
          </div>
          : data?.results?.length === 0 || error ? (
            <div className="flex justify-center items-center h-full">
              <span className=" font-extrabold text-purple-600 " >
                {t('No Data found')}
              </span>
            </div>
          ) :
            <ReactApexChart options={options} series={options.series} type="area" height={'100%'} />
        }
      </div>
    </Card >
  );
}
export default AnalyseTemp;