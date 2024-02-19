
import Loading from '../../components/Loading';
import Nodata from '../../components/nodata';
import Rightcard from './rightcard'
import Leftcard from './leftcard'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../components/provider';
import { AppContextType } from '../../App';
import { useQuery } from '@tanstack/react-query';
const MoreInfo = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { backendApi } = useProvider<AppContextType>();
    const { data, isLoading, error } = useQuery(['getAllHistory', id], async () => {
        const device = await backendApi.findMany<any>("device", {
            select: {
                id: true
            },
            where: {
                "id": parseInt(id ?? '0'),
            }
        });
        return device;
    });
    return (
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
                {t('Stats')}  {/*t('More information about device : ') + id*/}
            </h6>
            <div className="mx-auto  flex h-full max-h-[80rem] w-full max-w-[calc(2000px-20rem)] flex-col px-5 overflow-x-hidden overflow-y-auto" id="Content">
                {isLoading ?
                    (<Loading />)
                    :
                    error || data?.results.length === 0 ? (
                        <Nodata />
                    ) : (
                        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-3 mb-3'>
                            <Leftcard id={id} />
                            <Rightcard id={id} />
                        </div>
                    )}
            </div>
        </div >
    );
}
export default MoreInfo;