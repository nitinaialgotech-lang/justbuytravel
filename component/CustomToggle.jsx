import { forwardRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const CustomToggle = forwardRef(({ children, onClick, show }, ref) => (
    <button
        ref={ref}
        className="bg-color-green border-0 flex items-center gap-1"
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        {show ? <FaChevronUp /> : <FaChevronDown />}
    </button>
));
