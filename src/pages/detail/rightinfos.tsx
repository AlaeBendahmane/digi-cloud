import { Card } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
interface RightInfosProps {
    name: string;
    type: string;
    devices: string | number;
    createdAt: string | Date;
}
const RightInfos: React.FC<RightInfosProps> = ({ name, type, devices, createdAt }) => {
    const { t } = useTranslation();
    return (
        <Card className="w-full mt-2 bg-white p-2 h-72" placeholder={undefined}>
            {t('Overview')}
            <div className="space-y-1 mt-1">
                <div className="flex flex-col gap-1 overflow-y-auto  max-h-[calc(100vh-290px)]" id=":r32:-form-item" aria-describedby=":r32:-form-item-description" aria-invalid="false">
                    <div className="flex gap-2 items-center border border-gray-400/50 rounded-md p-2">
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-[95px] border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={t('Name')}
                            disabled
                        />
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-full border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={name}
                            disabled
                        />
                    </div>
                    <div className="flex gap-2 items-center border border-gray-400/50 rounded-md p-2">
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-[95px] border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={t('Type')}
                            disabled
                        />
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-full border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={type}
                            disabled
                        />
                    </div>
                    <div className="flex gap-2 items-center border border-gray-400/50 rounded-md p-2">
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-[95px] border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={t('Devices')}
                            disabled
                        />
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-full border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={devices}
                            disabled
                        />
                    </div>
                    <div className="flex gap-2 items-center border border-gray-400/50 rounded-md p-2">
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-[95px] border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={t('Created At')}
                            disabled
                        />
                        <input
                            className="flex h-10 bg-white dark:bg-slate-800 w-full border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-default"
                            value={new Date(createdAt).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " ")}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default RightInfos;