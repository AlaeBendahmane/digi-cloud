import { useTranslation } from 'react-i18next';
import Upload from '../../assets/icons/upload.svg';
import UploadIcon from '../../assets/icons/uploadico.svg';
import Recycle from '../../assets/icons/recycle.svg';
import Adddev from '../../assets/icons/adddev.svg';
import Draw from '../../assets/icons/draw.svg';
import Sav from '../../assets/icons/sav.svg';
import { Button, Spinner } from '@material-tailwind/react';
import Plan from '../../assets/icons/plan.svg'
import DrawerTop from '../../components/drawer/index'
import { ChangeEvent, DragEvent, useState } from 'react';
export default function Index() {
    const { t } = useTranslation();
    const [dragging, setDragging] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<{ file: File; name: string }[]>([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const handleBrowseClick = () => {
        document.getElementById('fileInput')?.click();
    };
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const validFiles = newFiles.filter(file => file.type === "image/png" || file.type === "image/jpeg");
            if (validFiles.length > 0) {
                setDroppedFiles(prevFiles => [...prevFiles, ...validFiles.map(file => ({ file, name: file.name }))]);
            } else {
                alert('No supported files selected');
            }
        }
    };
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };
    const handleDragLeave = () => {
        setDragging(false);
    };
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            const validFiles = newFiles.filter(file => file.type === "image/png" || file.type === "image/jpeg");
            if (validFiles.length > 0) {
                setDroppedFiles(prevFiles => [...prevFiles, ...validFiles.map(file => ({ file, name: file.name }))]);
            } else {
                alert('No supported files dropped');
            }
        }
    };
    const delfromarray = (index: number) => {
        setDroppedFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };
    const show = (index: number) => {
        const drawComponent = document.getElementById('drawcomponent');
        if (drawComponent && droppedFiles[index]) {
            const imageUrl = URL.createObjectURL(droppedFiles[index].file);
            drawComponent.style.backgroundImage = `url(${imageUrl})`;
            drawComponent.style.backgroundSize = '100% 100%';
            drawComponent.style.backgroundPosition = 'center';
        }
    };
    console.log(droppedFiles)
    return (
        <div className="flex flex-col h-full w-full">
            <h6 className="mx-5 flex items-center font-bold border-b-4 min-h-14">
                {t('Map')}
            </h6>
            <div className="mx-auto mb-2 flex max-h-80rem w-full max-w-[calc(2000px-20rem)] flex-col px-5 mt-2 rounded">
                <div className="overflow-hidden grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4  rounded-lg bg-white border-2 border-gray-500">
                    <div className="md:border-r-2 md:border-gray-500">
                        <div className="flex h-12 p-3 bg-red-50 rounded-tl-lg w-auto">
                            <img src={Upload} width={20} height={20} />
                            <p className="text-red-900 ml-2">{t('Upload')}</p>
                        </div>
                        <div className='p-6 border-b-2 border-gray-500 '>
                            <div
                                className={`flex flex-col items-center justify-center rounded-md bg-gray-200  h-[190px] border-dashed border-2 border-gray-400 ${dragging ? 'border-blue-500' : ''}`}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <img src={UploadIcon} alt="" />
                                <span className="mt-2 font-bold text-sm ">
                                    <span className=''> {t('Drag & drop files or ')}</span>
                                    <span className="text-purple-400 underline cursor-pointer" onClick={handleBrowseClick}>
                                        {t('Browse')}
                                        <input type="file" name="" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} accept="image/png, image/jpeg" multiple />
                                    </span>
                                </span>
                                <p className="text-sm font-light text-gray-400">
                                    {t('Supported formats')}: JPEG, PNG
                                </p>
                            </div>
                        </div>
                        <div className="p-3 overflow-y-scroll overflow-x-hidden h-[calc(635px-20rem)] border-b-2 border-gray-500 md:border-0">
                            {droppedFiles.length === 0 ?
                                (
                                    <div className="flex justify-center items-center h-full">
                                        <Spinner color="purple" />
                                    </div>
                                )
                                : (
                                    <>
                                        {droppedFiles.map(({ file, name }, index) => (
                                            <div key={index} className="h-[50px] rounded-lg border-2 border-gray-500 mb-1 flex p-3 cursor-pointer" onClick={() => show(index)}>
                                                <img src={URL.createObjectURL(file)} alt="" />
                                                <p className="text-sm text-gray-500 ml-2 text-nowrap overflow-hidden text-ellipsis">{name}</p>
                                                <button className="ml-auto" onClick={() => delfromarray(index)}>
                                                    <img src={Recycle} className="w-5 h-5" alt="" />
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex h-12 p-3 bg-red-50 rounded-tr-lg w-auto">
                            <img src={Plan} width={20} height={20} />
                            <p className="text-red-900 ml-2">{t('Plan')}</p>
                        </div>
                        <div className="flex m-3 flex-col sm:flex-row gap-2">
                            <div className="flex md:space-x-1 flex-col  sm:flex-row gap-1">
                                <Button onClick={() => setDrawerOpen(true)}
                                    className="flex items-center gap-3 text-sm font-medium h-[41px]" color="gray" placeholder={undefined} >
                                    <img src={Adddev} alt="" />
                                    {t('Add devices')}
                                </Button>
                                <Button className="flex items-center gap-3 text-sm font-medium h-[41px] md:mt-0" color="gray" placeholder={undefined} >
                                    <img src={Draw} alt="" />
                                    {t('Draw a room')}
                                </Button>
                            </div>
                            <Button className="flex items-center gap-3 text-sm font-medium h-[41px] md:mt-0 md:ml-auto" placeholder={undefined} >
                                <img src={Sav} alt="" />
                                {t('SAVE ROOM')}
                            </Button>
                        </div>
                        <div className="bg-white w-auto m-2  h-[calc(635px-10rem)] border-2 border-gray-500 rounded-md" id='drawcomponent'></div>
                    </div>
                </div>
            </div>
            <DrawerTop isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
        </div >
    );
}