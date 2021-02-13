import Sidebar from "parts/Sidebar";
import React, {useEffect} from "react";

export const Transactions = () => {
    useEffect(() => {
        window.scroll(0,0)
    },[])

    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <main className="flex-1">
                <div className="px-16">
                    <section className="flex flex-col mt-8">
                        <h1 className="text-4xl text-gray-900 font-medium">
                            Transactions
                        </h1>
                        <p className="text-lg text-gray-600">
                            Keep on track what you've invested
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};
