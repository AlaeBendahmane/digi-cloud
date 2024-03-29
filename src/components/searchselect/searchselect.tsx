import { ElementRef, useEffect, useRef, useState } from "react";
import { Input } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
export type Option<T> = {
    label: string;
    value: T;
    status: string;
};
export interface SearchSelectProps<T>
    extends React.HTMLAttributes<HTMLDivElement> {
    value: T | undefined;
    disabled?: boolean;
    onValueChange?: (value: T | undefined) => void;
    valueGetter?: (option: Option<T>) => React.ReactNode;
    options: {
        label: string;
        value: T;
        status: string
    }[];
}
export default function SearchSelect<T>({
    value,
    disabled,
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
            <input
                disabled={disabled}
                placeholder={t('Select device')}
                type="text"
                className={twMerge(
                    "peer rounded-md border w-32 bg-white  p-2 enabled:shadow-sm disabled:text-center disabled:bg-white disabled:cursor-default disabled:border-none",
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
                }} />
            <ul
                className={twMerge(
                    "z-50 absolute top-full flex max-h-[8rem]   w-full translate-y-1 flex-col overflow-y-auto border  bg-white  shadow-lg",
                    !showOptions && "hidden"
                )}
                role="listbox"           >
                {filteredOptions?.length ? (
                    filteredOptions.map((option, index) => (
                        <li
                            className="border border-b-1"
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
                                <span className={option.status === "ONLINE" ? "inline-block w-full cursor-pointer px-2 py-1 bg-green-600"
                                    : option.status === "OFFLINE" ? "inline-block w-full cursor-pointer px-2 py-1 bg-red-600"
                                        : option.status === "INACTIVE" ? "inline-block w-full cursor-pointer px-2 py-1 bg-orange-600" : ""}>
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