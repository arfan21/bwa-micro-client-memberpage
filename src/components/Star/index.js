import React from "react";

import propTypes from "prop-types";

import IconStar from "public/images/icon-star.svg";

export default function Star({ className, value, height, width }) {
    const star = [];
    let leftPos = 0;

    for (let i = 0; i < 5 && i < value; i++) {
        leftPos = leftPos + width;
        star.push(
            <div
                className="star"
                key={`star-${i}`}
                style={{ left: i * width, height: height, width: width }}
            ></div>
        );
    }

    const starPlaceholder = [];
    for (let i = 0; i < 5; i++) {
        starPlaceholder.push(
            <div
                className="star placeholder"
                key={`starPlaceholder-${i}`}
                style={{ left: i * width, height: height, width: width }}
            ></div>
        );
    }

    return (
        <>
            <div
                className={["stars", className].join(" ")}
                style={{ height: height }}
            >
                {starPlaceholder}
                {star}
            </div>
            <IconStar></IconStar>
        </>
    );
}

Star.propTypes = {
    className: propTypes.string,
    value: propTypes.number,
    width: propTypes.number,
    height: propTypes.number,
};
