import { ElementRef, useEffect, useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
export type Option<T> = {
    label: string;
    value: T;
};
export interface SearchSelectProps<T>
    extends React.HTMLAttributes<HTMLDivElement> {
    value: T | undefined;
    onValueChange?: (value: T | undefined) => void;
    valueGetter?: (option: Option<T>) => React.ReactNode;
    options: {
        label: string;
        value: T;
    }[];
}
export default function SearchSelect<T>({
    value,
    onValueChange,
    valueGetter,
    options,
    className,
}: SearchSelectProps<T>) {
    const [selected, setSelected] = useState<T | undefined>(value);
    const [search, setSearch] = useState(
        options?.find((o) => o.value === value)?.label || ""
    );
    const [showOptions, setShowOptions] = useState(false);
    const containerRef = useRef<ElementRef<"div">>(null);
    const { t } = useTranslation();
    const filteredOptions = options?.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        setSelected(value);
    }, [value]);
    useEffect(() => {
        if (!showOptions) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowOptions(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showOptions]);
    return (
        <div className="relative w-full" ref={containerRef}>
            <Input
                label={t('Select device')}
                type="text"
                className={twMerge(
                    "peer rounded-md border bg-white  w-full p-2 shadow-sm",
                    className,
                    selected && "font-semibold"
                )}
                value={search}
                onChange={(e) => {
                    e.preventDefault();
                    setSelected(undefined);
                    setSearch(e.target.value);
                    onValueChange && onValueChange(undefined);
                }}
                onFocus={() => {
                    setShowOptions(true);
                }} crossOrigin={undefined} />
            <ul
                className={twMerge(
                    "z-50 absolute top-full flex max-h-[8rem]   w-full translate-y-1 flex-col overflow-y-auto border  bg-white  shadow-lg",
                    !showOptions && "hidden"
                )}
                role="listbox"           >
                {filteredOptions?.length ? (
                    filteredOptions.map((option, index) => (
                        <li
                            role="option"
                            key={index}
                            onClick={() => {
                                setSelected(option.value);
                                setSearch(option.label);
                                setShowOptions(false);
                                onValueChange && onValueChange(option.value);
                            }}                         >
                            {valueGetter ? (
                                valueGetter(option)
                            ) : (
                                <span className="inline-block w-full cursor-pointer px-2 py-1">
                                    {option.label}
                                </span>
                            )}
                        </li>
                    ))
                ) : (
                    <span className="px-2 py-1 text-center text-gray-500">
                        No options
                    </span>
                )}
            </ul>
        </div>
    );
}