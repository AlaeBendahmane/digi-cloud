import { Select, Option } from "@material-tailwind/react";
export default function menuindex() {
    return (
        <div className="w-64">
            <Select size="md" color="gray" label="Select device" placeholder={undefined}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Option key={index}>Dev {index} </Option>
                ))}
            </Select>
        </div>
    )
}