
import { Card } from '@material-tailwind/react';
import Deviceicon from '../../assets/icons/devico.svg'
import Prof from '../../assets/icons/prof.svg'
import Status from '../../assets/icons/status.svg'
import Profiledev from '../../assets/icons/profiledev.svg'
import Tenant from '../../assets/icons/tenant.svg'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppContextType } from '../../App';
import { useProvider } from '../../components/provider';
export default function leftcard(id: any) {
    const v = id.id;
    const [Device, setDevice] = useState<any>();
    const { backendApi } = useProvider<AppContextType>();
    useQuery(['getAllHistory', v], async () => {
        const devices = await backendApi.findMany<any>("device", {
            include: {
                "credential": {
                    "select": {
                        "type": true,
                        "username": true,
                        "ProtocolCredential": {
                            "select": {
                                // "attributes": true,
                                "protocol": {
                                    "select": {
                                        "name": true,
                                        "inPrefix": true,
                                        "outPrefix": true
                                    }
                                }
                            }
                        }
                    }
                },
                /*"tags": {
                    "select": {
                        "name": true
                    }
                },*/
                "tenant": {
                    "select": {
                        "name": true
                    }
                },
                "element": {
                    "select": {
                        "name": true
                    }
                },
                "deviceProfile": {
                    "select": {
                        "name": true
                    }
                },
                "firmware": {
                    "select": {
                        "name": true
                    }
                },
                "group": {
                    "select": {
                        "name": true
                    }
                },
                "attributes": {
                    "select": { "id": true, "name": true, "value": true }
                }
            },
            where: {
                "id": parseInt(v),
            }
        });
        devices.results.forEach(element => {
            setDevice(element)
        });
        return devices;
    });
    return (
        <div className='grid w-full gap-3 md:grid-cols-6 2xl:grid-cols-12 mt-2'>
            <Card className="bg-white p-2 md:col-span-full" placeholder={undefined}>
                <div className="px-3">
                    Overview
                </div>
                <div className=" flex-1 text-xs p-2 flex flex-col gap-5">
                    <div className="flex gap-2 p-3 border-b-2 flex-wrap items-center">
                        <div className="">
                            <img src={Deviceicon} alt="" width={'50px'} height={'50px'} />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="text-gray-500">
                                    <span>Device Name:</span>
                                </span>
                                <span className="font-semibold">{Device?.name || "---"}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-gray-500">Serial:</span>
                                <span className="font-semibold">{Device?.serial || "---"}</span>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <span className="text-gray-500">CreatedAt:</span>
                                <span className="font-semibold">{Device ? new Date(Device.createdAt.toString()).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true }).replace(",", " ") : ''}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 [&amp;>*]:min-h-[5rem] [&amp;>*]:flex [&amp;>*]:gap-2 [&amp;>*]:items-center [&amp;>*]:px-4">
                        <div className="flex gap-2 p-3  flex-wrap items-center">
                            <div className="">
                                <img src={Profiledev} alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-gray-500">
                                        <span>Profile:</span>
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold">{Device?.deviceProfile?.name || "---"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 p-3  flex-wrap items-center">
                            <div className="">
                                <img src={Prof} alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-gray-500">
                                        <span>UserName:</span>
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold">{Device?.credential?.username || "---"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 p-3  flex-wrap items-center">
                            <div className="">
                                <img src={Tenant} alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-gray-500">
                                        <span>Tenant:</span>
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold">{Device?.tenant?.name || "---"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 p-3  flex-wrap items-center">
                            <div className="">
                                <img src={Status} alt="" width={'50px'} height={'50px'} />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <span className="text-gray-500">
                                        <span>Status:</span>
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className={Device?.status === 'ONLINE' ? "font-semibold text-green-600" : Device?.status === 'OFFLINE' ? "font-semibold text-red-600" : "font-semibold text-orange-600"}>{Device?.status || "---"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}