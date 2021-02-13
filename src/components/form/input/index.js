import React from "react";

import propTypes from "prop-types";

export const Input = ({
    value,
    errors,
    name,
    onChange,
    placeholder,
    labelName,
    inputType,
}) => {
    return (
        <div className="flex flex-col mb-4">
            {labelName && (
                <label
                    htmlFor={name}
                    className={[
                        "text-lg mb-2",
                        errors ? "text-red-500" : "text-gray-900",
                    ].join(" ")}
                >
                    {labelName}
                </label>
            )}

            <input
                name={name}
                type={inputType}
                className={[
                    "bg-white focus:outline-none border px-6 py-3 w-1/2 w-full",
                    errors
                        ? "focus:border-red-500 border-red-500 text-red-500"
                        : "focus:border-teal-500 border-gray-600 text-gray-600",
                ].join(" ")}
                placeholder={placeholder ?? "Please change placeholder"}
                value={value}
                onChange={onChange}
            />
            {errors && <span className="text-red-500">{errors}</span>}
        </div>
    );
};

Input.propTypes = {
    value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    errors: propTypes.string,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    labelName: propTypes.string,
    inputType: propTypes.oneOf(["text", "email", "password"]).isRequired,
};
