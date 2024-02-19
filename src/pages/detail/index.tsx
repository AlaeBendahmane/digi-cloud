import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../components/provider';
import { AppContextType } from '../../App';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import Nodata from '../../components/nodata';
import Analyse from '../devices/analyse';
import { Button, Card } from '@material-tailwind/react';
import Adddevblack from '../../assets/icons/adddevblack.svg';
import RemoveX from '../../assets/icons/x.svg'
import { CircleMarker, FeatureGroup, ImageOverlay, MapContainer, Marker, Polygon, Polyline, Popup, useMapEvents } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw";
import L, { Icon, Map } from 'leaflet';
import Rightinfos from './rightinfos';
import SearchSelect from '../../components/searchselect/searchselect';
import { toast } from 'react-toastify';
import Sav from '../../assets/icons/savblack.svg';
import { Group } from '../../utils/types';
declare module 'leaflet' {
    interface Layer {
        _leaflet_id: number;
    }
}
export default function index() {
    const { t } = useTranslation();
    const { id } = useParams();
    const markerIcon = new Icon({
        iconUrl: Adddevblack,
        iconSize: [42, 42],
        tooltipAnchor: [42, 42],
        shadowSize: [20, 20],
    });
    const { backendApi } = useProvider<AppContextType>();
    const [markers, setMarkers] = useState<{ lat: number; lng: number; device: number }[]>([]);
    const [isVisible, setisVisible] = useState<boolean>(false);
    const [arrdevices, setarrdevices] = useState<number[]>([]);
    const [newDrawings, setNewDrawings] = useState({
        polygons: {} as { [id: string]: any[] },
        polylines: {} as { [id: string]: any[] },
        circlemarkers: {} as { [id: string]: any[any] }
    });
    const { refetch: refetchDevicesRooms, data, isLoading } = useQuery(['getDevicesRooms', id], async () => {
        const result = await backendApi.findMany<any>("group", {
            where: {
                name: {
                    contains: id
                }
            },
            include: {
                _count: true,
                devices: {
                    select: {
                        "id": true,
                        "name": true,
                        "status": true
                    },
                    orderBy: {
                        "status": 'asc'
                    }
                },
            },
        });
        setMarkers(result.results[0].attributes.Devices)
        setarrdevices(result.results[0].attributes.Devices.map((e: { device: any; }) => e.device))
        setNewDrawings({
            polygons: result.results[0].attributes.Draw.polygons,
            polylines: result.results[0].attributes.Draw.polylines,
            circlemarkers: result.results[0].attributes.Draw.circlemarkers
        })
        return result
    });
    const imageUrl = "data:image/png;base64," + data?.results[0]?.attributes?.File;
    const [Alldevicesindb, setAlldevicesindb] = useState<any>([]);
    useQuery(['getdevices'], async () => {
        const devices = await backendApi.findMany<any>("device", {
            select: {
                id: true,
                name: true,
                status: true
            },
            orderBy: {
                "status": "asc"
            }
        });
        setAlldevicesindb(devices.results)
        return devices.results;
    });
    const deleteMarker = (index: number) => {
        setisVisible(true)
        setarrdevices((prevArrDevices) => {
            const newArrDevices = [...prevArrDevices];
            newArrDevices.splice(index, 1);
            return newArrDevices;
        });
        setMarkers((prevMarkers) => {
            const newMarkers = [...prevMarkers];
            newMarkers.splice(index, 1);
            return newMarkers;
        });
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
        setisVisible(true)
        updateMarkerDevice(index, selectedDevice);
    };
    const addMarker = (lat: number, lng: number, device: any) => {
        const newMarker = { lat, lng, device };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };
    const handleSingleClick = (e: { latlng: { lat: number; lng: number } }) => {
        setisVisible(true)
        const { lat, lng } = e.latlng;
        addMarker(lat, lng, undefined);
    };
    const AddMarkerToClick = () => {
        useMapEvents({
            dblclick: handleSingleClick,
        });
        return null;
    };
    const renderdrawing = (color: string | undefined) => {
        return <>
            {Object.keys(newDrawings.polylines || {}).map((key) => (
                <Polyline
                    key={key}
                    positions={newDrawings.polylines[key].map(({ lat, lng }: { lat: number, lng: number }) => [lat, lng])}
                    color={color}
                    weight={4}
                />
            ))}
            {Object.keys(newDrawings.circlemarkers || {}).map((key) => (
                <CircleMarker
                    key={key}
                    center={[newDrawings.circlemarkers[key].lat, newDrawings.circlemarkers[key].lng]}
                    fillOpacity={0.5}
                    color={color}
                    weight={4}
                />
            ))}
            {Object.keys(newDrawings.polygons || {}).map((key) => (
                <Polygon
                    key={key}
                    positions={newDrawings.polygons[key]}
                    fillOpacity={0.5}
                    color={color}
                    weight={4}
                />
            ))}
        </>
    }
    const _ondrawStart = (e: any) => {
        setisVisible(true)
        newDrawings.circlemarkers = {}
        newDrawings.polygons = {}
        newDrawings.polylines = {}
        const map: Map = e.sourceTarget._layers;
        Object.entries(map || {}).forEach(([key, layer]) => {
            if (layer instanceof L.Polygon) {
                newDrawings.polygons[key] = layer.getLatLngs()
            } else if (layer instanceof L.CircleMarker) {
                newDrawings.circlemarkers[key] = layer.getLatLng()
            } else if (layer instanceof L.Polyline) {
                newDrawings.polylines[key] = layer.getLatLngs()
            }
        });
    };
    const { refetch, isError } = useQuery(['updategroup', arrdevices, markers, newDrawings, data], async () => {
        if (arrdevices.length == 0 && markers.length == 0) {
            toast.error('Room need al teast one device')
            return;
        } else {
            for (let index = 0; index < markers.length; index++) {
                if (markers[index].device == undefined) {
                    toast.error("Check devices");
                    return;
                }
            }
            setisVisible(false)
            const result = await backendApi.update<Group>("group", data?.results[0].id, {
                attributes: {
                    "File": data?.results[0].attributes.File,
                    "Bounds": data?.results[0].attributes.Bounds,
                    "Devices": markers,
                    "Draw": newDrawings
                },
                devices: arrdevices,
            });
            if (isError) {
                toast.error("An issue occurred during the update");
            } else {
                refetchDevicesRooms()
            }
            return result
        }
    }, { enabled: false });
    const savechanges = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        await refetch();
    };
    function _onDeleted(e: any): void {
        const deletedLayers = e.layers._layers;
        for (const leafletId in deletedLayers) {
            if (deletedLayers.hasOwnProperty(leafletId)) {
                if (newDrawings.polygons[leafletId]) {
                    delete newDrawings.polygons[leafletId];
                } else if (newDrawings.polylines[leafletId]) {
                    delete newDrawings.polylines[leafletId];
                } else if (newDrawings.circlemarkers[leafletId]) {
                    delete newDrawings.circlemarkers[leafletId];
                }
            }
        }
        setNewDrawings(newDrawings)
    }
    function _onEdited(e: any): void {
        const editedLayers = e.layers._layers;
        for (const leafletId in editedLayers) {
            if (editedLayers.hasOwnProperty(leafletId)) {
                const editedItem = editedLayers[leafletId];
                if (newDrawings.polygons[leafletId]) {
                    newDrawings.polygons[leafletId] = editedItem._latlngs;
                } else if (newDrawings.polylines[leafletId]) {
                    newDrawings.polylines[leafletId] = editedItem._latlngs;
                } else if (newDrawings.circlemarkers[leafletId]) {
                    newDrawings.circlemarkers[leafletId] = editedItem._latlng;
                }
            }
        }
        setNewDrawings(newDrawings)
    }
    const _onCreate = (e: any) => {
        if (e.layerType === "polygon") {
            newDrawings.polygons[e.layer._leaflet_id] = e.layer._latlngs;
        } else if (e.layerType === "polyline") {
            newDrawings.polylines[e.layer._leaflet_id] = e.layer._latlngs;
        } else if (e.layerType === "circlemarker") {
            newDrawings.circlemarkers[e.layer._leaflet_id] = e.layer._latlng;
        }
        setNewDrawings(newDrawings);
    };
    return (
        <div className="flex h-full w-full flex-col">
            <h6 className="mx-5 flex  h-[4rem] items-center  font-bold border-b-[4px] min-h-14">
                {t('All devices in :') + id}
            </h6>
            {isLoading ? (
                <Loading />
            ) : !data ? (
                <div className='overflow-y-auto'>
                    <Nodata />
                </div>
            ) : (
                <div className="mx-auto  flex h-full max-h-[80rem] w-full  max-w-[calc(2000px-20rem)] flex-col px-5 overflow-hidden overflow-y-auto" id="Content">
                    <div className='grid md:grid-cols-4 gap-2 mb-2'>
                        <div className='md:col-span-3'>
                            <Card className="w-full mt-2 bg-white p-2 h-72" placeholder={undefined}>
                                {data.results[0].attributes && data.results[0].attributes?.File && data.results[0].attributes?.File.length > 100 ? (
                                    <>
                                        <div className='flex'>
                                            <p className='m-1'>{t('Map')}</p>
                                            <Button variant="text" size='sm' className={!isVisible ? ("ml-auto hidden") : ("ml-auto")} color='gray' placeholder={undefined} onClick={savechanges} >
                                                <img src={Sav} alt="" />
                                            </Button>
                                        </div>
                                        <MapContainer id='mappp' center={[65, 300]} zoom={1} zoomControl={true} doubleClickZoom={false} attributionControl={false} scrollWheelZoom={true} className="h-full w-full " style={{ backgroundColor: 'white', objectFit: 'cover' }}>
                                            <ImageOverlay
                                                url={imageUrl}
                                                bounds={[[0, 0], [data.results[0].attributes?.Bounds?.width, data.results[0].attributes?.Bounds?.height]]}
                                            />
                                            <FeatureGroup>
                                                <EditControl
                                                    position="topright"
                                                    onDrawStart={_ondrawStart}
                                                    onCreated={_onCreate}
                                                    onEditStart={_ondrawStart}
                                                    onEdited={_onEdited}
                                                    onDeleteStart={_ondrawStart}
                                                    onDeleted={_onDeleted}
                                                    draw={{
                                                        rectangle: false,
                                                        circle: false,
                                                        circlemarker: true,
                                                        marker: false,
                                                        polyline: true,
                                                        polygon: true,
                                                    }}
                                                />
                                                {renderdrawing('#99c4ff')}
                                            </FeatureGroup>
                                            {markers.map((marker, index) => (
                                                <Marker key={index} position={[marker.lat, marker.lng]} icon={markerIcon}>
                                                    <Popup closeButton={false} autoClose={false} closeOnClick={true} closeOnEscapeKey={true}>
                                                        <div className='flex justify-center space-x-1 '>
                                                            <SearchSelect
                                                                value={marker.device}
                                                                onValueChange={(val) => handleDeviceSelection(index, val)}
                                                                options={(Alldevicesindb || []).map((e: any) => {
                                                                    return {
                                                                        label: e.name,
                                                                        value: e.id,
                                                                        status: e.status
                                                                    };
                                                                })} />
                                                            <img src={RemoveX} alt={t('Delete device')} className='border border-purple-500 border-solid bg-purple-500 rounded-md cursor-pointer' onClick={() => deleteMarker(index)} />
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            ))}
                                            <AddMarkerToClick />
                                        </MapContainer>
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <span className=" font-extrabold text-purple-600 " >
                                            {t('No Map found')}
                                        </span>
                                    </div>
                                )}
                            </Card>
                        </div>
                        <div className=''>
                            <Rightinfos name={data.results[0].name} type={data.results[0].type} devices={data.results[0]._count.devices} createdAt={data.results[0].createdAt} />
                        </div>
                    </div>
                    <div className="grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2 md:overflow-y-auto">
                        {data.results.map((e) => e.devices.map((element: { id: number; name: string; status: any; }) => (
                            <Analyse key={element.id} id={element.id} nom={element.name} calledfrom={'Rooms'} status={element.status} />
                        )))}
                    </div>
                </div>
            )}
        </div>
    )
}