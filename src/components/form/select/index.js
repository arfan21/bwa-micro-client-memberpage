import React from "react";
import propTypes from "prop-types";
import { useState } from "react";
import { useRef } from "react";
import { Children } from "react";
import { useEffect } from "react";

export const Select = ({
    labelName,
    id,
    name,
    value,
    className,
    children,
    onClick,
    fallBackText,
}) => {
    const [Toggle, setToggle] = useState(() => false);

    const selectWrapper = useRef(null);
    const items = Children.toArray(children);

    const toggleSelect = () => {
        setToggle(() => !Toggle);
    };

    const clickOutside = (e) => {
        if (selectWrapper && !selectWrapper.current.contains(e.target))
            setToggle(() => false);
    };

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside);
        return () => {
            window.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    const selected = items.find((item) => item.props.value === value);

    return (
        <div className="flex flex-col mb-4">
            {labelName && (
                <label htmlFor="" className="show text-lg mb-2 text-gray-900">
                    {labelName}
                </label>
            )}
            <div
                className="relative"
                ref={selectWrapper}
                onClick={toggleSelect}
            >
                <div
                    className={[
                        "flex justify-between cursor-pointer bg-white focus:outline-none transition-all duration-200 border px-4 py-3 w-full",
                        Toggle ? "border-teal-500" : "border-gray-600",
                        className,
                    ].join(" ")}
                >
                    <span className={value === "" ? "text-gray-500" : ""}>
                        {selected?.props.children ?? fallBackText}
                    </span>
                    <div className="transition-all duration-200 border-gray-400 border-b-2 border-r-2 transform rotate-45 translate-y-1 w-2 h-2"></div>
                </div>
                <div
                    className={[
                        "absolute left-0 bg-white border border-gray-600 py-3 w-full",
                        Toggle ? "" : "hidden",
                    ].join(" ")}
                >
                    {items.map((item, i) => {
                        return (
                            <div
                                className="cursor-pointer px-4 py-1 bg-white hover:bg-gray-400 transition-all duration-200"
                                onClick={() =>
                                    onClick({
                                        target: {
                                            name: name,
                                            value: item.props.value,
                                        },
                                    })
                                }
                                key={i}
                            >
                                {item.props.children}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

Select.propTypes = {
    labelName: propTypes.string,
    id: propTypes.string,
    name: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    className: propTypes.string,
    onClick: propTypes.func.isRequired,
    fallBackText: propTypes.string,
};
