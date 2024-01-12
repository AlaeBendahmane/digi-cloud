import { Card } from "@material-tailwind/react";
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from "react-i18next";
function AnalyseTemp() {
  const { t } = useTranslation();

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
        data: alldata.Electricity
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