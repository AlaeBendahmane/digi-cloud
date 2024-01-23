import { Card } from "@material-tailwind/react";
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from "react-i18next";
import { useProvider } from "../../../components/provider";
import { AppContextType } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
function AnalyseTemp() {
  const { t } = useTranslation();
  const [Temperature, setTemperature] = useState<number[]>([]);
  const [Humidity, setHumidity] = useState<number[]>([]);
  const [Power, setPower] = useState<number[]>([]);
  const { backendApi } = useProvider<AppContextType>();
  useQuery(['getHistory'], async () => {
    const result = await backendApi.findMany<any>("dpc-history/api/history", {
      where: {
        temperature: {
          $exists: true
        },
        humidity: {
          $exists: true
        },
        createdAt: {
          $gte: new Date().toISOString().slice(0, 4),
        }
      },
      pagination: {
        perPage: 5,
        page: 1
      }
    });
    ////////////////////////
    const temperatures: number[] = result.results.map(obj => obj.temperature);
    // Calculate the average temperature
    const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    console.log("Average Temperature:", averageTemperature);
    ///////////////////


    /*const monthlyAverages = {
      Humidity: Array(12).fill(0),
      Temperature: Array(12).fill(0)
    };
    result.results.forEach(result => {
      const date = new Date(result.date);
      const month = date.getMonth();

      monthlyAverages.Humidity[month] += result.humidity;
      monthlyAverages.Temperature[month] += result.temperature;
    });
    for (let i = 0; i < 12; i++) {
      monthlyAverages.Humidity[i] /= 12;
      monthlyAverages.Temperature[i] /= 12;
    }
    monthlyAverages.Humidity = monthlyAverages.Humidity.map(avg => parseFloat(avg.toFixed(2)));
    monthlyAverages.Temperature = monthlyAverages.Temperature.map(avg => parseFloat(avg.toFixed(2)));
    setHumidity(monthlyAverages.Humidity);
    setTemperature(monthlyAverages.Temperature);
    console.log(monthlyAverages.Humidity)
    console.log(monthlyAverages.Temperature)
    console.log(Power)
    console.log(parseInt(new Date().toISOString().slice(0, 4), 10) - 1);*/
    return result
  });
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
      zoom: {
        enabled: false,
      }
    },
    colors: ["#0D0887", "#9C179E", "#ED7953"],
    series: [
      {
        name: t('electricity'),
        data: alldata.Electricity,
      },
      {
        name: t('humidity'),
        data: alldata.Humidity
      },
      {
        name: t('temperature'),
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
      categories: [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')]
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
    noData: {
      text: t('No Data found'),
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Nunito'
      }
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
    <Card className="bg-white p-2 md:col-span-full" placeholder={undefined}>
      <div className="flex h-[2rem] gap-2 p-1 px-3 absolute">
        <span className="font-Nunito font-bold text-xl">{t('overview')}</span>
      </div>
      <div className="h-[18rem]">
        <ReactApexChart options={options} series={options.series} type="line" height={'100%'} />
      </div>
    </Card>
  );
}
export default AnalyseTemp;