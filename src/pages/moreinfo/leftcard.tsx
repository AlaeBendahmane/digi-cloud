import ReactApexChart from 'react-apexcharts';
import { Card, Spinner } from '@material-tailwind/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { AppContextType } from '../../App';
import { useProvider } from '../../components/provider';
export default function leftcard(id: any) {
    const { t } = useTranslation();
    const { backendApi/*, idSelected */ } = useProvider<AppContextType>();
    const [alldata, setAllData] = useState({
        Humidity: [],
        Temperature: [],
        Time: []
    });
    const { isLoading } = useQuery(['getHistory', id], async () => {
        const result = await backendApi.findMany<any>("dpc-history/api/history", {
            where: {
                deviceId: parseInt(id.id ?? '0'),
                createdAt: {
                    $gte: new Date().toISOString().slice(0, 4),
                },
            },
            pagination: {
                perPage: 500,
                page: 1
            }
        })
        setAllData((prevData: any) => ({
            ...prevData,
            Humidity: result.results.map((e) => typeof e.humidity === 'number' && !isNaN(e.humidity) ? parseFloat(parseFloat(e.humidity).toFixed(2)) : undefined).filter((humidity) => humidity !== undefined),
            Temperature: result.results.map((e) => { const temperature = typeof e.temperature === 'number' && !isNaN(e.temperature) ? parseFloat(e.temperature.toFixed(2)) : (typeof e.t_dht === 'number' && !isNaN(e.t_dht) ? parseFloat(e.t_dht.toFixed(2)) : undefined); return temperature; }).filter((temperature) => temperature !== undefined),
            Time: result.results.map((e) => e.date)
        }));
        return result;
    })
    const serieshumidity: ApexAxisChartSeries = [{
        name: t('humidity'),
        data: alldata.Humidity,
    }];
    const seriestemperature: ApexAxisChartSeries = [{
        name: t('temperature'),
        data: alldata.Temperature,
        color: '#faab00'
    }];
    const options: ApexCharts.ApexOptions = {
        chart: {
            height: 350,
            type: 'area',
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
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: alldata.Time,
            tickAmount: 12,
            labels: {
                format: 'HH:mm'
            }
        },
        tooltip: {
            x: {
                format: 'HH:mm:ss',
            },
        },
        legend: {
            position: 'top',
            markers: {
                radius: 0
            },
        },
    };
    return (
        <div className='grid  col-span-2 grid-rows-2'>
            <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
                <Card className="bg-white p-2 md:col-span-full" placeholder={undefined}>
                    {isLoading ?
                        <div className="flex justify-center items-center h-full">
                            <Spinner color='purple' />
                        </div>
                        : alldata.Humidity.length === 0 ? (
                            <div className='flex items-center justify-center h-56 '>
                                <span className=" font-extrabold text-purple-600 " >
                                    {t('No Data found')}
                                </span>
                            </div>
                        ) : (<div>
                            <div className="flex h-[2rem] gap-2 p-0 px-3 absolute">
                                <span className="font-Nunito font-bold text-xl">{t('humidity')}</span>
                            </div>
                            <ReactApexChart options={options} series={serieshumidity} type="area" height={250} />
                        </div>)}
                </Card>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
                <Card className="bg-white p-2 md:col-span-full" placeholder={undefined}>
                    {isLoading ?
                        <div className="flex justify-center items-center h-full">
                            <Spinner color='purple' />
                        </div>
                        : alldata.Temperature.length === 0 ? (
                            <div className='flex items-center justify-center h-56 '>
                                <span className=" font-extrabold text-purple-600 " >
                                    {t('No Data found')}
                                </span>
                            </div>
                        ) : (<div className="">
                            <div className="flex h-[2rem] gap-2 p-0 px-3 absolute">
                                <span className="font-Nunito font-bold text-xl">{t('temperature')}</span>
                            </div>
                            <ReactApexChart options={options} series={seriestemperature} type="area" height={250} />
                        </div>)}
                </Card>
            </div>
        </div>
    )
}
