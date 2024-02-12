import Upload from '../../assets/icons/upload.svg';
import UploadIcon from '../../assets/icons/uploadico.svg';
import Recycle from '../../assets/icons/recycle.svg';
import Adddevblack from '../../assets/icons/adddevblack.svg';
import Sav from '../../assets/icons/sav.svg';
import Plan from '../../assets/icons/plan.svg'
import Draw from '../../assets/icons/draw.svg'
import Modal from '../../components/modal2/index';
import { Button } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, DragEvent, useState } from 'react';
import { FeatureGroup, ImageOverlay, MapContainer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw";
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useQuery } from '@tanstack/react-query';
import { AppContextType } from '../../App';
import { useProvider } from '../../components/provider';
import SearchSelect from '../../components/searchselect/searchselect';
import { toast } from 'react-toastify';
import "leaflet-draw/dist/leaflet.draw.css";
export default function Index() {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [data2, setData2] = useState({
        polygons: {} as { [id: string]: any[] },
        polylines: {} as { [id: string]: any[] },
        circlemarkers: {} as { [id: string]: any[] }
    });
    const { t } = useTranslation();
    const [dragging, setDragging] = useState(false);
    const [arrdevices, setarrdevices] = useState<number[]>([]);
    const [room, setRoom] = useState(Object);
    const [isVisible, setisVisible] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<{ file: File; name: string }[]>([]);
    const [ImageURL, setImageURL] = useState<string>("");
    const [canadd, setCanadd] = useState<boolean>(true);
    const { backendApi } = useProvider<AppContextType>();
    const { data } = useQuery(['getHistory'], async () => {
        const devices = await backendApi.findMany<any>("device", {
            select: {
                id: true,
                name: true,
            }
        });
        return devices.results;
    });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [markers, setMarkers] = useState<{ lat: number; lng: number; device: number }[]>([]);
    const markerIcon = new Icon({
        iconUrl: Adddevblack,
        iconSize: [42, 42],
        tooltipAnchor: [42, 42],
        shadowSize: [20, 20],
    });
    const deleteMarker = (index: number) => {
        setMarkers((prevMarkers) => {
            const newMarkers = [...prevMarkers];
            newMarkers.splice(index, 1);
            return newMarkers;
        });
    };
    const addMarker = (lat: number, lng: number, device: any) => {
        const newMarker = { lat, lng, device };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };
    const handleSingleClick = (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng;
        addMarker(lat, lng, undefined);
    };
    const updateMarkerDevice = (index: number, newDevice: any) => {
        setMarkers((prevMarkers) => {
            const updatedMarkers = [...prevMarkers];
            updatedMarkers[index] = { ...updatedMarkers[index], device: newDevice };
            return updatedMarkers;
        });
        setarrdevices((prevArrDevices) => {
            const newArrDevices = [...prevArrDevices];
            newArrDevices[index] = newDevice;
            return newArrDevices;
        });
    };
    const handleDeviceSelection = (index: number, selectedDevice: any) => {
        updateMarkerDevice(index, selectedDevice);
    };
    const AddMarkerToClick = () => {
        useMapEvents({
            dblclick: handleSingleClick,
        });
        return null;
    };
    const handleBrowseClick = () => {
        document.getElementById('fileInput')?.click();
    };
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (canadd) {
            if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                const validFiles = newFiles.filter(file => file.type === "image/png" || file.type === "image/jpeg");
                if (validFiles.length > 0) {
                    setDroppedFiles(prevFiles => [...prevFiles, ...validFiles.map(file => ({ file, name: file.name }))]);
                    setCanadd(false)
                } else {
                    toast.error('No supported files selected');
                }
            }
        } else {
            toast.error('You can use only one image');
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
        if (canadd) {
            if (e.dataTransfer.files.length === 1) {
                const newFiles = Array.from(e.dataTransfer.files);
                const validFiles = newFiles.filter(file => file.type === "image/png" || file.type === "image/jpeg");
                if (validFiles.length > 0) {
                    setDroppedFiles(prevFiles => [...prevFiles, ...validFiles.map(file => ({ file, name: file.name }))]);
                    setCanadd(false)
                } else {
                    toast.error('No supported files dropped');
                }
            } else {
                toast.error('You can use only one image');
            }
        } else {
            toast.error('You can use only one image');
        }
    };
    const delfromarray = () => {
        setDroppedFiles([])
        setMarkers([])
        setCanadd(true)
        setImageURL("");
        const el = document.getElementById('fileInput');
        (el as HTMLInputElement).value = ""
    };
    const show = (index: number) => {
        if (droppedFiles[index]) {
            const imageUrl = URL.createObjectURL(droppedFiles[index].file);
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                setDimensions({ width: width, height: height });
                setImageURL(imageUrl);
            };
        } else {
            setImageURL("");
        }
    };
    const saveData = () => {
        if (droppedFiles.length === 1) {
            if (markers.length > 0) {
                for (let index = 0; index < markers.length; index++) {
                    if (markers[index].device == undefined) {
                        toast.error("Check devices");
                        return;
                    }
                }
                const file = droppedFiles[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        if (e && e.target) {
                            const base64String = (e.target.result as string)?.split(',')[1];
                            const room = {
                                file: base64String,
                                devices: markers,
                                draw: data2,
                                bounds: dimensions,
                                arrdevices: arrdevices
                            };
                            setRoom(room)
                            handleOpenDialog()
                        }
                    };
                    reader.readAsDataURL(file.file);
                }
            } else {
                toast.error("Room need devices");
            }
        } else {
            toast.error('Pick image');
        }
    };
    const _onCreate = (e: any) => {
        if (e.layerType === "polygon") {
            data2.polygons[e.layer._leaflet_id] = e.layer._latlngs
        } else if (e.layerType === "polyline") {
            data2.polylines[e.layer._leaflet_id] = e.layer._latlngs
        } else if (e.layerType === "circlemarker") {
            data2.circlemarkers[e.layer._leaflet_id] = e.layer._latlng
        }
        setData2(data2)
    }
    const _onEdite = (e: any) => {
        const editedLayers = e.layers._layers;
        for (const leafletId in editedLayers) {
            if (editedLayers.hasOwnProperty(leafletId)) {
                const editedItem = editedLayers[leafletId];
                if (data2.polygons[leafletId]) {
                    data2.polygons[leafletId] = editedItem._latlngs;
                } else if (data2.polylines[leafletId]) {
                    data2.polylines[leafletId] = editedItem._latlngs;
                } else if (data2.circlemarkers[leafletId]) {
                    data2.circlemarkers[leafletId] = editedItem._latlng;
                }
            }
        }
        setData2(data2)
    };
    const _onDelete = (e: any) => {
        const deletedLayers = e.layers._layers;
        for (const leafletId in deletedLayers) {
            if (deletedLayers.hasOwnProperty(leafletId)) {
                if (data2.polygons[leafletId]) {
                    delete data2.polygons[leafletId];
                } else if (data2.polylines[leafletId]) {
                    delete data2.polylines[leafletId];
                } else if (data2.circlemarkers[leafletId]) {
                    delete data2.circlemarkers[leafletId];
                }
            }
        }
        setData2(data2)
    };
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
                                onDrop={handleDrop}>
                                <img src={UploadIcon} alt="" />
                                <span className="mt-2 font-bold text-sm text-center ">
                                    <span className=''> {t('Drag & drop files or ')}</span>
                                    <span className="text-purple-400 underline cursor-pointer" onClick={handleBrowseClick}>
                                        {t('Browse')}
                                        <input type="file" name="" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} accept="image/png, image/jpeg" />
                                    </span>
                                </span>
                                <p className="text-sm font-light text-gray-400 text-center">
                                    {t('Supported formats')}: JPEG, PNG
                                </p>
                            </div>
                        </div>
                        <div className="p-3 overflow-y-auto overflow-x-hidden h-[calc(635px-20rem)] border-b-2 border-gray-500 md:border-0">
                            {droppedFiles.map(({ file, name }, index) => (
                                <div key={index} className="flex   rounded-lg border-2 border-gray-500 mb-1 h-[50px]" >
                                    <div className='flex w-[calc(100%-25px)] p-3 pr-0 cursor-pointer' onClick={() => show(index)}>
                                        <img src={URL.createObjectURL(file)} className='max-w-10 max-h-7' alt="" />
                                        <p className="text-sm  text-gray-500 ml-2 text-nowrap overflow-hidden text-ellipsis">{name}</p>
                                    </div>
                                    <div className='ml-auto'>
                                        <button className="py-3 px-1" onClick={delfromarray}>
                                            <img src={Recycle} className="w-5 h-5" alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex h-12 p-3 bg-red-50 rounded-tr-lg w-auto">
                            <img src={Plan} width={20} height={20} />
                            <p className="text-red-900 ml-2">{t('Plan')}</p>
                        </div>
                        <div className="flex m-3 flex-col sm:flex-row gap-2">
                            <div className="grid md:grid-cols-2 gap-3 ">
                                <Button className="flex items-center gap-3 text-sm font-medium h-[41px] md:mt-0" color="gray" placeholder={undefined} onClick={() => { ImageURL != '' ? setisVisible(!isVisible) : toast.error('Pick image') }}>
                                    {isVisible ? (
                                        <>
                                            <img src={Draw} alt="" />
                                            {t('Edit a room')}
                                        </>
                                    ) : (
                                        <>
                                            <img src={Draw} alt="" />
                                            {t('Draw a room')}
                                        </>
                                    )}
                                </Button>
                            </div>
                            <Button className="flex items-center gap-3 text-sm font-medium h-[41px] md:mt-0 md:ml-auto" placeholder={undefined} disabled={isVisible} onClick={saveData}>
                                <img src={Sav} alt="" />
                                {t('SAVE ROOM')}
                            </Button>
                        </div>
                        <div className="bg-white w-auto m-2 h-[calc(635px-10rem)] border-2 border-gray-500 rounded-md overflow-hidden" id='drawcomponent' >
                            <div className='w-full h-full' >
                                {ImageURL != '' ? (
                                    <MapContainer id='mappp' center={[65, 300]} zoom={1} zoomControl={true} doubleClickZoom={false} attributionControl={false} scrollWheelZoom={true} className="h-full w-full " style={{ backgroundColor: 'white', objectFit: 'cover' }}>
                                        <FeatureGroup>
                                            <EditControl
                                                position="topright"
                                                onCreated={_onCreate}
                                                onEdited={_onEdite}
                                                onDeleted={_onDelete}
                                                edit={{
                                                    remove: isVisible,
                                                    edit: isVisible ? {} : (false),
                                                }}
                                                draw={
                                                    {
                                                        rectangle: false,
                                                        circle: false,
                                                        circlemarker: isVisible,
                                                        marker: false,
                                                        polyline: isVisible,
                                                        polygon: isVisible,
                                                    }
                                                }
                                            />
                                        </FeatureGroup>
                                        <ImageOverlay
                                            url={ImageURL}
                                            bounds={[[0, 0], [dimensions.width, dimensions.height]]}
                                        />
                                        {markers.map((marker, index) => (
                                            <Marker key={index} position={[marker.lat, marker.lng]} icon={markerIcon}>
                                                <Popup closeButton={false} autoClose={false} closeOnClick={true} closeOnEscapeKey={true} minWidth={400}>
                                                    <div className='grid md:grid-cols-2 gap-2'>
                                                        <SearchSelect
                                                            value={marker.device}
                                                            onValueChange={(val) => handleDeviceSelection(index, val)}
                                                            options={(data || []).map((e) => {
                                                                return {
                                                                    label: e.name + '',
                                                                    value: e.id
                                                                };
                                                            })}
                                                        />
                                                        <button
                                                            className="select-none rounded-lg bg-gradient-to-tr from-purple-600 to-purple-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-nowrap"
                                                            type="button" onClick={() => deleteMarker(index)} >
                                                            {t('Delete device')}
                                                        </button>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                        <AddMarkerToClick />
                                    </MapContainer>
                                ) : ('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={openDialog} handleClose={handleCloseDialog} data={room} />
        </div >
    );
}