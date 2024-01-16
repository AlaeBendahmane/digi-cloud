import { useTranslation } from 'react-i18next';
import Upload from '../../assets/icons/upload.svg'
import Plan from '../../assets/icons/plan.svg'
import Layers from '../../assets/icons/layers.svg'
import UploadIcon from '../../assets/icons/uploadico.svg'

export default function index() {
    const { t } = useTranslation();
    return (
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
                {t('Map')}
            </h6>
            <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded ">
                <div className='flex rounded-md ' style={{ border: '1px solid gray' }}>
                    <div className='w-[339px] '>
                        <div className='flex h-12 p-3 bg-red-50 rounded-tl-md'>
                            <img src={Upload} width={20} height={20} />
                            <p className='text-red-900 ml-2'>
                                Upload
                            </p>
                        </div>
                        <div className='rounded-md bg-gray-200 m-3 w-[290px] h-[190px] border-dashed  border-2 border-gray-400'>
                            <img src={UploadIcon} alt="" />
                            Drag & drop files or Browse
                        </div>
                    </div>
                    <div style={{ border: '0.5px solid gray' }}></div>
                    <div className='w-[863px]'>
                        <div className='flex h-12 p-3 bg-red-50'>
                            <img src={Plan} width={20} height={20} />
                            <p className='text-red-900 ml-2'>
                                Plan
                            </p>
                        </div>
                    </div>
                    <div style={{ border: '0.5px solid gray' }}></div>
                    <div className='w-[339px] h-56'>
                        <div className='flex h-12 p-3 bg-red-50 rounded-tr-md'>
                            <img src={Layers} width={20} height={20} />
                            <p className='text-red-900 ml-2'>
                                Layers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
