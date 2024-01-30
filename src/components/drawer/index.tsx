import { Drawer, Typography, IconButton, Card, Button, CardBody, CardFooter, CardHeader, } from '@material-tailwind/react';
import X from '../../assets/icons/x.svg'
import { useTranslation } from 'react-i18next';
interface Props {
    isOpen: boolean;
    onClose: () => void;
}
export default function index({ isOpen, onClose }: Props) {
    const { t } = useTranslation();
    return (
        <Drawer placement="top" open={isOpen} onClose={onClose} className="p-4 shadow-none" placeholder={undefined} size={200} onMouseLeave={onClose}>
            <div className="flex items-center justify-between mb-0.5">
                <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                    {t('Devices')}
                </Typography>
                <IconButton variant="text" color="blue-gray" onClick={onClose} placeholder={undefined}> <img src={X} alt="" /> </IconButton>
            </div>
            <Typography color="gray" className="flex items-center space-x-1 p-4 font-normal border-2 border-red-700 h-[calc(200px-4rem)] overflow-x-auto overflow-y-hidden" placeholder={undefined}>
                <Card className="w-20 h-20 flex items-center justify-center bg-red-300 cursor-grab" placeholder={undefined}>
                    <Typography color="blue-gray" placeholder={undefined}>
                        Dev1
                    </Typography>
                </Card>
                <Card className="w-20 h-20 flex items-center justify-center bg-red-300 cursor-grab" placeholder={undefined}>
                    <Typography color="blue-gray" placeholder={undefined}>
                        Dev1
                    </Typography>
                </Card>
            </Typography>
        </Drawer>
    )
}