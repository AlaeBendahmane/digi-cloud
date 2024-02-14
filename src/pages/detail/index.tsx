import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../components/provider';
import { AppContextType } from '../../App';
import { useState } from 'react';
import { Device, Group } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
import Nodata from '../../components/nodata';
import Analyse from '../devices/analyse';
import { Button, Card } from '@material-tailwind/react';
import Adddevblack from '../../assets/icons/adddevblack.svg';
import Draw from '../../assets/icons/drawblack.svg'
import Checkmark from '../../assets/icons/checkmark.svg'
import { CircleMarker, FeatureGroup, ImageOverlay, MapContainer, Marker, Polygon, Polyline, Popup, useMap, useMapEvents } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw";
import L, { Icon, Map, polyline } from 'leaflet';
import { toast } from 'react-toastify';
import Rightinfos from './rightinfos';
declare module 'leaflet' {
    interface Layer {
        _leaflet_id: number;
    }
}
export default function index() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [Devices, setDevicesArray] = useState<Device[]>([]);
    const [isVisible, setisVisible] = useState<boolean>(false);
    const [newDrawings, setNewDrawings] = useState({
        polygons: {} as { [id: string]: any[] },
        polylines: {} as { [id: string]: any[] },
        circlemarkers: {} as { [id: string]: any[any] }
    });
    const { backendApi } = useProvider<AppContextType>();
    const { data, isLoading } = useQuery(['getDevicesRooms', id], async () => {
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
        console.log(result.results[0])
        result.results.map((e) => setDevicesArray(e.devices))
        return result
    });
    const devices = data?.results[0]?.attributes?.Devices || [];
    const imageUrl = "data:image/png;base64," + data?.results[0]?.attributes?.File;
    const markerIcon = new Icon({
        iconUrl: Adddevblack,
        iconSize: [42, 42],
        tooltipAnchor: [42, 42],
        shadowSize: [20, 20],
    });
    const _onCreate = (e: any) => {
        const layer = e.layer;
        if (layer instanceof L.Polygon) {
            setNewDrawings(prevState => ({
                ...prevState,
                polygons: {
                    ...prevState.polygons,
                    [layer._leaflet_id]: layer.getLatLngs()
                },
            }));
        } else if (layer instanceof L.Polyline) {
            setNewDrawings(prevState => ({
                ...prevState,
                polylines: {
                    ...prevState.polylines,
                    [layer._leaflet_id]: layer.getLatLngs()
                },
            }));
        } else if (layer instanceof L.CircleMarker) {
            setNewDrawings(prevState => ({
                ...prevState,
                circlemarkers: {
                    ...prevState.circlemarkers,
                    [layer._leaflet_id]: layer.getLatLng()
                },
            }));
        }
    };
    const _onEdit = (e: any) => {
        const layer = e.layer;
        if (layer instanceof L.Polygon) {
            setNewDrawings(prevState => ({
                ...prevState,
                polygons: {
                    ...prevState.polygons,
                    [layer._leaflet_id]: layer.getLatLngs()
                },
            }));
        } else if (layer instanceof L.Polyline) {
            setNewDrawings(prevState => ({
                ...prevState,
                polylines: {
                    ...prevState.polylines,
                    [layer._leaflet_id]: layer.getLatLngs()
                },
            }));
        } else if (layer instanceof L.CircleMarker) {
            setNewDrawings(prevState => ({
                ...prevState,
                circlemarkers: {
                    ...prevState.circlemarkers,
                    [layer._leaflet_id]: layer.getLatLng()
                },
            }));
        }
    };
    const _onDelete = (e: any) => {
        const layer = e.layers._layers
        Object.entries(layer || {}).forEach(([key]: [string, unknown]) => {
            setNewDrawings(prevState => {
                const polygons = { ...prevState.polygons };
                const polylines = { ...prevState.polylines };
                const circlemarkers = { ...prevState.circlemarkers };
                delete polygons[parseInt(key)];
                delete polylines[parseInt(key)];
                delete circlemarkers[parseInt(key)];
                return { polygons, polylines, circlemarkers };
            });
        })
    };
    const _onEditStart = (e: any) => {
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
    const _ondrawStart = _onEditStart;
    const _onDeleteStart = _onEditStart;
    const savechanges = () => {
        setisVisible(!isVisible)
        if (isVisible) {
            console.log("Updated :", newDrawings)
        }
    }
    const renderdrawing = (color: string | undefined) => {
        return <>
            {Object.keys(data?.results[0]?.attributes?.Draw?.polylines || {}).map((key) => (
                <Polyline
                    key={key}
                    positions={data?.results[0]?.attributes?.Draw?.polylines[key].map(({ lat, lng }: { lat: number, lng: number }) => [lat, lng])}
                    color={color}
                    weight={4}
                />
            ))}
            {Object.keys(data?.results[0]?.attributes?.Draw?.circlemarkers || {}).map((key) => (
                <CircleMarker
                    key={key}
                    center={[data?.results[0]?.attributes?.Draw?.circlemarkers[key].lat, data?.results[0]?.attributes?.Draw?.circlemarkers[key].lng]}
                    fillOpacity={0.5}
                    color={color}
                    weight={4}
                />
            ))}
            {Object.keys(data?.results[0]?.attributes?.Draw?.polygons || {}).map((key) => (
                <Polygon
                    key={key}
                    positions={data?.results[0]?.attributes?.Draw?.polygons[key]}
                    fillOpacity={0.5}
                    color={color}
                    weight={4}
                />
            ))}
        </>
    }
    const renderdevname = (val: any) => {
        let name = '';
        data?.results[0].devices.forEach((element: Device) => {
            if (val == element.id) {
                name = element.name
            }
        });
        return name
    }
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
                                            <p>{t('Map')}</p>
                                            <Button variant="text" size='sm' className="ml-auto" color='gray' placeholder={undefined} onClick={savechanges} /*onClick={() => setisVisible(!isVisible)}*/ >
                                                <img src={isVisible ? (Checkmark) : (Draw)} alt="" />
                                            </Button>
                                        </div>
                                        <MapContainer id='mappp' center={[65, 300]} zoom={1} zoomControl={true} doubleClickZoom={false} attributionControl={false} scrollWheelZoom={true} className="h-full w-full " style={{ backgroundColor: 'white', objectFit: 'cover' }}>
                                            <ImageOverlay
                                                url={imageUrl}
                                                bounds={[[0, 0], [data.results[0].attributes?.Bounds?.width, data.results[0].attributes?.Bounds?.height]]}
                                            />
                                            {devices.map(({ lat, lng, device }: { lat: number, lng: number, device: number }) => (
                                                <Marker key={device} position={[lat, lng]} icon={markerIcon} >
                                                    <Popup closeButton={false} autoClose={false} closeOnClick={true} closeOnEscapeKey={true}>
                                                        <div className=''>
                                                            <p className='flex flex-center cursor-default'>{renderdevname(device)}</p>
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            ))}
                                            <FeatureGroup>
                                                <EditControl
                                                    position="topright"
                                                    onCreated={_onCreate}
                                                    onDrawStart={_ondrawStart}
                                                    onEdited={_onEdit}
                                                    onEditStart={_onEditStart}
                                                    onDeleted={_onDelete}
                                                    onDeleteStart={_onDeleteStart}
                                                    edit={{
                                                        remove: isVisible,
                                                        edit: isVisible ? {} : (false),
                                                    }}
                                                    draw={{
                                                        rectangle: false,
                                                        circle: false,
                                                        circlemarker: isVisible,
                                                        marker: false,
                                                        polyline: isVisible,
                                                        polygon: isVisible,
                                                    }}
                                                />
                                                {renderdrawing('#99c4ff')}
                                            </FeatureGroup>
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
                        {Devices.map(element => (
                            <Analyse key={element.id} id={element.id} nom={element.name} calledfrom={'Rooms'} status={element.status} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}