import React from "react";
import Sidebar from "parts/Sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Settings = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const DETAILS = useSelector((state) => state.users);
    return (
        <div className="flex">
            <Sidebar></Sidebar>
        </div>
    );
};
