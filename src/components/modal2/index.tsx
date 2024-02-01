import { Button, Dialog, Option, Input, DialogHeader, DialogBody, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import Device from '../../assets/icons/device.svg'
import { useTranslation } from "react-i18next";
import { useProvider } from "../provider";
import { TypeDevice } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";
import { AppContextType } from "../../App";

interface DeviceDialogProps {
    open: boolean;
    handleClose: () => void;
    data: boolean;
}
const DeviceDialog: React.FC<DeviceDialogProps> = ({ open, handleClose, data }) => {
    const { t } = useTranslation();
    const [types, setTypes] = useState<TypeDevice[]>([]);
    const { backendApi } = useProvider<AppContextType>();
    useQuery(['getTypes'], async () => {
        const result = await backendApi.findMany<any>("deviceType", {
        });
        setTypes(result.results);
        return result
    });
    const dismissType = {
        outsidePress: false,
        escapeKey: false
    };
    const handleSave = () => {
        console.log(data)
    }
    return (
        <Dialog size='sm' open={open} handler={handleClose} dismiss={dismissType} className="bg-white shadow-none" placeholder={undefined} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 }, }} >
            <DialogHeader className='flex bg-red-50 h-16 p-3 font-medium' placeholder={undefined}>
                <img src={Device} alt="" className='mr-1.5' />
                {t('Add room')}
            </DialogHeader>
            <DialogBody placeholder={undefined} className='grid sm:grid-cols-1 md:grid-rows-4 gap-5 p-3'>
                <div className="w-full">
                    <Input label={t('Name')} placeholder="Room0001" crossOrigin={undefined} size="md" />
                </div>
                <div className=" grid sm:grid-cols-1 sm:gap-5 md:grid-cols-3 gap-5">
                    <Select label={t('Type')} placeholder={undefined}>
                        {types.map((element) =>
                            <Option key={element.id}>{element.name.toUpperCase()}</Option>
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