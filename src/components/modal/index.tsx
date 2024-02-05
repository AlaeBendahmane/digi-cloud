import { Button, Dialog, Option, Input, DialogHeader, DialogBody, Switch, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import Device from '../../assets/icons/device.svg'
import { useTranslation } from "react-i18next";
import { useProvider } from "../provider";
import { AppContextType } from "../../App";
import { useQuery } from "@tanstack/react-query";
import { Firmware, Group } from "../../utils/types";
interface DeviceDialogProps {
    open: boolean;
    handleClose: () => void;
}
const DeviceDialog: React.FC<DeviceDialogProps> = ({ open, handleClose }) => {
    const { t } = useTranslation();
    const [isChecked, setIsChecked] = useState(true)
    const [RoomsArray, setRoomsArray] = useState<Group[]>([]);
    const [FirmwareArray, setFirmwareArray] = useState<Firmware[]>([]);
    const handleSwitchChange = () => {
        setIsChecked(!isChecked)
    }
    const dismissType = {
        outsidePress: false,
        escapeKey: false
    };
    const { backendApi } = useProvider<AppContextType>();
    useQuery(['getRooms'], async () => {
        const result = await backendApi.findMany<any>("group", {
        });
        setRoomsArray(result.results);
        return result
    });
    useQuery(['getFirmware'], async () => {
        const result = await backendApi.findMany<any>("firmware", {
        });
        setFirmwareArray(result.results);
        return result
    });
    return (
        <Dialog size='md' open={open} handler={handleClose} dismiss={dismissType} className="bg-white shadow-none" placeholder={undefined} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 }, }} >
            <DialogHeader className='flex bg-red-50 h-16 p-3 font-medium' placeholder={undefined}>
                <img src={Device} alt="" className='mr-1.5' />
                {t('Add device')}
            </DialogHeader>
            <DialogBody placeholder={undefined} className='grid sm:grid-cols-1 md:grid-rows-4 gap-5 p-2'>
                <div className="w-full">
                    <Input label={t('Name')} placeholder="NXT-3" crossOrigin={undefined} />
                </div>
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label={t('Serial')} placeholder="SIS02-2MS3DJ3JJDJDJD" crossOrigin={undefined} />
                    <Input label={t('Type')} placeholder="Humidity" crossOrigin={undefined} />
                </div>
                <div className=" grid sm:grid-cols-1 sm:gap-5 md:grid-cols-3 gap-5">
                    <Select label={t('Room')} placeholder={undefined}>
                        {RoomsArray.map((element) =>
                            <Option key={element.id}>{element.name}</Option>
                        )}
                    </Select>
                    <Select label={t('Firmware versions')} placeholder={undefined}>
                        {FirmwareArray.map((element) =>
                            <Option key={element.id}>{element.name + " v:" + element.version}</Option>
                        )}
                    </Select>
                    <div className='p-2 flex gap-2 md:ml-auto'>
                        <p>{t('Device Status')}</p>
                        <Switch ripple={true} crossOrigin={undefined} color="purple" checked={isChecked} onChange={handleSwitchChange} />
                    </div>
                </div>
                <div className="w-full flex">
                    <Button placeholder={undefined} color='gray' className='w-[169px]' onClick={handleClose}>{t('Cancel')}</Button>
                    <Button placeholder={undefined} className=' w-[169px] ml-auto'>{t('Save')}</Button>
                </div>
            </DialogBody>
        </Dialog>
    )
}
export default DeviceDialog;