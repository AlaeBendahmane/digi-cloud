import { Drawer, Typography, IconButton, Card } from '@material-tailwind/react';
import X from '../../assets/icons/x.svg'
import { useTranslation } from 'react-i18next';
interface Props {
    isOpen: boolean;
    onClose: () => void;
}
export default function index({ isOpen, onClose }: Props) {
    const { t } = useTranslation();
    return (
        <Drawer placement="top" open={isOpen} onClose={onClose} className="p-4 shadow-none" placeholder={undefined} size={180} onMouseLeave={onClose}>
            <div className="flex items-center justify-between mb-0.5">
                <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                    {t('Devices')}
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={onClose} placeholder={undefined}> <img src={X} alt="" /> </IconButton>
            </div>
            <div color="gray" className="flex items-center space-x-1 p-2 font-normal h-fit overflow-x-auto overflow-y-hidden" >
                {Array.from({ length: 200 }).map((_, index) => (
                    <Card key={index} className="w-20 h-20 p-2 flex items-center justify-center bg-red-300 cursor-grab text-nowrap" placeholder={undefined}>
                        <Typography color="blue-gray" placeholder={undefined}>
                            Dev {index}
                        </Typography>
                    </Card>
                ))}
            </div>
        </Drawer>
    )
}