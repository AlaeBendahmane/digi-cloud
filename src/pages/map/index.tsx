import { useTranslation } from 'react-i18next';
import Upload from '../../assets/icons/upload.svg'
import Plan from '../../assets/icons/plan.svg'
import Recycle from '../../assets/icons/recycle.svg'
import UploadIcon from '../../assets/icons/uploadico.svg'
import Imagecomp from '../../assets/icons/imagecomp.svg'
import Adddev from '../../assets/icons/adddev.svg'
import Draw from '../../assets/icons/draw.svg'
import Sav from '../../assets/icons/sav.svg'
import { Button } from '@material-tailwind/react';
export default function index() {
    const { t } = useTranslation();
    return (
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex h-[4rem] items-center font-bold border-b-[4px] min-h-14">
                {t('Map')}
            </h6>
            <div className="mx-auto mb-[2rem] flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
                <div className="grid grid-cols-4 rounded-lg bg-white border-2 border-gray-500">
                    <div className='border-r-2 border-gray-500'>
                        <div className='flex h-12 p-3 bg-red-50 rounded-tl-lg'>
                            <img src={Upload} width={20} height={20} />
                            <p className='text-red-900 ml-2'>
                                {t('Upload')}
                            </p>
                        </div>
                        <div className='p-6 border-b-2 border-gray-500'>
                            <div className='flex flex-col items-center justify-center rounded-md bg-gray-200  h-[190px] border-dashed border-2 border-gray-400'>
                                <img src={UploadIcon} alt="" />
                                <span className="mt-2 font-bold text-lg">{t('Drag & drop files or Browse')}</span>
                                <p className='text-sm font-light text-gray-400'>{t('Supported formates')}: JPEG, PNG</p>
                            </div>
                        </div>
                        <div className='p-3 overflow-y-scroll overflow-x-hidden h-[calc(635px-20rem)]'>
                            <div className='h-[50px] rounded-lg border-2 border-gray-500 mb-1 flex p-3'>
                                <img src={Imagecomp} />
                                <p className='text-sm text-gray-500 ml-2'>image1.png</p>
                                <img src={Recycle} className='ml-auto w-5 h-5' />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='flex h-12 p-3 bg-red-50 rounded-tr-lg '>
                            <img src={Plan} width={20} height={20} />
                            <p className='text-red-900 ml-2'>
                                {t('Plan')}
                            </p>
                        </div>
                        <div className='flex m-3'>
                            <div className='flex space-x-1'>
                                <Button className="flex items-center gap-3 text-sm font-medium h-[41px]" color='gray' placeholder={undefined}>
                                    <img src={Adddev} alt="" />
                                    {t('Add devices')}
                                </Button>
                                <Button className="flex items-center gap-3 text-sm font-medium h-[41px]" color='gray' placeholder={undefined}>
                                    <img src={Draw} alt="" />
                                    {t('Draw a room')}
                                </Button>
                            </div>
                            <Button className="flex items-center gap-3 text-sm font-medium h-[41px] ml-auto" placeholder={undefined}>
                                <img src={Sav} alt="" />
                                {t('SAVE ROOM')}
                            </Button>
                        </div>
                        <div className='bg-yellow-500 h-auto w-auto m-2'>
                            draw
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}