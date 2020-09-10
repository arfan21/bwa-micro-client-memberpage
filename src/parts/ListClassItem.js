import React from "react";

import { ReactComponent as IconPlay } from "assets/images/icon-play.svg";
import { Link } from "react-router-dom";

export const ListClassItem = ({ data }) => {
    return (
        <div className="w-1/4 px-4 ">
            <div className="item relative">
                <figure className="item-image">
                    <IconPlay></IconPlay>
                    <img src={data?.thumbnail ?? ""} alt={data?.name ?? ""} />
                </figure>
                <div className="item-meta">
                    <h4 className="text-lg text-gray-900">
                        {data?.name ?? ""}
                    </h4>
                    <h5 className="text-lg text-gray-500">
                        {data?.level ?? ""}
                    </h5>
                </div>
                <Link
                    to={`/courses/${data?.id}`}
                    className="link-wrapped"
                ></Link>
            </div>
        </div>
    );
};
