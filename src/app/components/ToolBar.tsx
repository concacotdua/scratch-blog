import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ToolbarButtonProps {
    tooltip: string;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function ToolbarButton({ tooltip, onClick, children, className = "" }: ToolbarButtonProps) {
    return (
        <Popover className="relative">
            <Popover.Button
                onClick={onClick}
                className={`px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all ${className}`}
            >
                {children}
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-sm rounded px-2 py-1 shadow-md">
                    {tooltip}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}