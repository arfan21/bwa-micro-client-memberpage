import React from "react";
import ContentLoader from "react-content-loader";

export const LoadingMyClass = () => {
    const LoaderTitle = () => (
        <ContentLoader className="flex flex-col mt-8 w-full">
            <rect x="0" y="10" rx="1" ry="1" width="200" height="30" />
            <rect x="0" y="55" rx="1" ry="1" width="400" height="25" />
        </ContentLoader>
    );

    const LoaderItem = () => (
        <ContentLoader className="flex flex-col -mt-16 w-full" height={300}>
            <rect x="0" y="22" rx="1" ry="1" width="256" height="160" />
            <rect x="0" y="190" rx="1" ry="1" width="210" height="20" />
            <rect x="0" y="215" rx="1" ry="1" width="110" height="20" />
            <rect x="290" y="22" rx="1" ry="1" width="256" height="160" />
            <rect x="290" y="190" rx="1" ry="1" width="210" height="20" />
            <rect x="290" y="215" rx="1" ry="1" width="110" height="20" />
            <rect x={290 * 2} y="22" rx="1" ry="1" width="256" height="160" />
            <rect x={290 * 2} y="190" rx="1" ry="1" width="210" height="20" />
            <rect x={290 * 2} y="215" rx="1" ry="1" width="110" height="20" />
        </ContentLoader>
    );

    return (
        <>
            <LoaderTitle />
            <LoaderItem />
        </>
    );
};
