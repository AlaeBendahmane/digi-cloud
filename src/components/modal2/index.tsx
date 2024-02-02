import { Button, Dialog, Option, Input, DialogHeader, DialogBody, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import Device from '../../assets/icons/device.svg'
import { useTranslation } from "react-i18next";
import { useProvider } from "../provider";
import { TypeDevice } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";
import { AppContextType } from "../../App";
import { toast } from "react-toastify";
interface DeviceDialogProps {
    open: boolean;
    handleClose: () => void;
    data: Object;
}
const DeviceDialog: React.FC<DeviceDialogProps> = ({ open, handleClose, data }) => {
    const { t } = useTranslation();
    const [types, setTypes] = useState<TypeDevice[]>([]);
    const { backendApi } = useProvider<AppContextType>();
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const handleTypeChange = (value: string | undefined) => {
        setSelectedType(value);
    };
    const [roomName, setRoomName] = useState('');
    useQuery(['getTypes'], async () => {
        const result = await backendApi.findMany<any>("deviceType");
        setTypes(result.results);
        return result
    });
    const dismissType = {
        outsidePress: false,
        escapeKey: false
    };
    const handleSave = () => {
        if (roomName == '' || selectedType == '') {
            toast.error("Provide a name and type, as both fields must be filled in.")
        } else {
            const roomupdated = {
                name: roomName,
                type: selectedType,
                data: data,
            };
            setRoomName('')
            setSelectedType(undefined)
            console.log(roomupdated)
        }
    }
    return (
        <Dialog size='md' open={open} handler={handleClose} dismiss={dismissType} className="bg-white shadow-none" placeholder={undefined} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 }, }} >
            <DialogHeader className='flex bg-red-50 h-16 p-3 font-medium' placeholder={undefined}>
                <img src={Device} alt="" className='mr-1.5' />
                {t('Add room')}
            </DialogHeader>
            <DialogBody placeholder={undefined} className='grid sm:grid-cols-1 md:grid-rows-2 gap-2 p-1.5'>
                <div className="grid sm:grid-cols-1 sm:gap-2 md:grid-cols-2 gap-2">
                    <div className="w-full">
                        <Input label={t('Name')} placeholder="Room0001" crossOrigin={undefined} size="md" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                    </div>
                    <Select label={t('Type')} placeholder={undefined} onChange={(value) => handleTypeChange(value)} value={selectedType}>
                        {types.map((element) =>
                            <Option key={element.id} value={element.id.toString()}>{element.name.toUpperCase()}</Option>
                        )}
                    </Select>
                </div>
                <div className="w-full flex">
                    <Button placeholder={undefined} color='gray' className='w-[169px]' onClick={handleClose}>{t('Cancel')}</Button>
                    <Button placeholder={undefined} className=' w-[169px] ml-auto' onClick={handleSave}>{t('Save')}</Button>
                </div>
            </DialogBody>
        </Dialog>
    )
}
export default DeviceDialog;