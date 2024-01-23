import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../components/provider';
import { AppContextType } from '../../App';
import { useState } from 'react';
import { Device } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import Nodata from '../../components/nodata';
import Analyse from '../devices/analyse';
export default function index() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [Devices, setDevicesArray] = useState<Device[]>([]);
    const { backendApi } = useProvider<AppContextType>();
    const { isLoading } = useQuery(['getDevicesRooms', id], async () => {
        const result = await backendApi.findMany<any>("group", {
            where: {
                name: {
                    contains: id
                }
            },
            include: {
                _count: true,
                devices: true,
            },
        });
        console.log(result.results)
        result.results.map((e) => setDevicesArray(e.devices))
        return result.totalResult
    });
    return (
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
                {t('All devices in : ') + id}
            </h6>
            {/*Devices.map((e) => <div>{e.serial}</div>)*/}
            {isLoading ? (
                <Loading />
            ) : Devices.length === 0 ? (
                <Nodata />
            ) : (
                <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-auto" id="Content">
                    <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2">
                        {Devices.map(element => (
                            <Analyse key={element.id} id={element.id} nom={element.name} calledfrom={'Rooms'} status={element.status} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}