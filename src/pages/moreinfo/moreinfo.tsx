import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AppContextType } from '../../App';
import { useProvider } from '../../components/provider';
import Loading from '../../components/Loading';
import Nodata from '../../components/nodata';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import { Card } from '@material-tailwind/react';
export default function moreinfo() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [Info, setInfoArray] = useState<any[]>([]);
    const { backendApi } = useProvider<AppContextType>();
    const { isLoading } = useQuery(['getHistory', id], async () => {
        const result = await backendApi.findMany<any>("dpc-history/api/history", {
            where: {
                deviceId: parseInt(id),
                createdAt: {
                    $gte: new Date().toISOString().slice(0, 4),
                },
            },
            pagination: {
                perPage: 20,
                page: 1
            }
        })
        setInfoArray(result.results);
        console.log(result.results)
        return result;
    })
    const data = Info.map(element => ({
        _id: element._id,
        nom: new Date(element.date).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(",", " "),
        temperature: element.temperature || 'NaN ',
        minT: 0,
        maxT: 0,
        humidity: element.humidity || 'NaN ',
        minH: 0,
        maxH: 0
    }));
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
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
                {t('More information about device : ') + id}
            </h6>
            {isLoading ? (
                <Loading />
            ) : data.length === 0 ? (
                <Nodata />
            ) : (
                <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
                    <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
                        <Card className="bg-white p-2 md:col-span-full" placeholder={undefined}>
                            <div className="flex h-[2rem] gap-2 p-1 px-3 absolute">
                                <span className="font-Nunito font-bold text-xl">{t('overview')}</span>
                            </div>
                            <div className="h-[18rem]">
                                <ReactApexChart options={options} series={options.series} type="line" height={'100%'} />
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}