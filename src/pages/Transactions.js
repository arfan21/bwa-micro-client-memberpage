import Sidebar from "parts/Sidebar";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import formatThousand from "../helpers/formatThousand";
import { fetchOrders, messageOrder, statusOrders } from "store/actions/orders";
import orders from "constants/api/orders";
import { Loading } from "parts/Loading";
import { Congratulation } from "parts/Congratulation";
import { EmptyState } from "parts/EmptyState";

export const Transactions = () => {
    const dispatch = useDispatch();
    const ORDERS = useSelector((state) => state.orders);
    const location = useLocation();

    const params =
        location?.search.length > 0 &&
        location?.search
            ?.substring(1, location.length)
            ?.split("&")
            ?.reduce((acc, item) => {
                const [key, value] = item.split("=");
                acc[key] = value;
                return acc;
            }, {});

    useEffect(() => {
        window.scroll(0, 0);
        dispatch(statusOrders("loading"));
        orders
            .all()
            .then((res) => {
                dispatch(fetchOrders(res.data));
            })
            .catch((error) => {
                dispatch(
                    messageOrder(error?.response?.data?.message ?? "error")
                );
            });
    }, [dispatch]);
    const items = {};
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <div className="px-16">
                    {ORDERS.status === "loading" && <Loading />}
                    {ORDERS.status === "error" && ORDERS.message}
                    {ORDERS.status === "ok" && params.order_id ? (
                        <Congratulation
                            data={ORDERS.data[params.order_id.split("-")[0]]}
                        ></Congratulation>
                    ) : ORDERS.total > 0 ? (
                        <>
                            <section className="flex flex-col mt-8">
                                <h1 className="text-4xl text-gray-900 font-medium">
                                    Transactions
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Keep on track what you've invested
                                </p>
                            </section>
                            <section className="flex flex-col mt-8">
                                {Object.values(ORDERS.data)?.map?.((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex justify-start items-center -mx-4 mt-5 "
                                        >
                                            <div
                                                className="w-auto px-4"
                                                style={{ width: 150 }}
                                            >
                                                <img
                                                    src={
                                                        item?.metadata
                                                            ?.thumbnail ?? ""
                                                    }
                                                    alt={
                                                        item?.metadata?.name ??
                                                        "no image"
                                                    }
                                                />
                                            </div>
                                            <div className="w-3/12 px-4">
                                                <h6 className="text-gray-900 text-lg">
                                                    {item?.metadata?.name ??
                                                        "class name"}
                                                </h6>
                                                <p className="text-gray-600">
                                                    {item?.metadata?.level ??
                                                        "class level"}
                                                </p>
                                            </div>
                                            <div className="w-2/12 px-4">
                                                <h6 className="text-gray-900 text-lg">
                                                    Rp.
                                                    {formatThousand(
                                                        item?.metadata?.price ??
                                                            0
                                                    )}
                                                </h6>
                                            </div>
                                            <div className="w-2/12 px-4">
                                                <h6 className="text-gray-900 text-lg">
                                                    {item?.created_at ?? "-"}
                                                </h6>
                                            </div>
                                            <div className="w-3/12 px-4 flex justify-center">
                                                {item?.status === "pending" && (
                                                    <a
                                                        href={item?.snap_url}
                                                        rel="noopener noreferrer"
                                                        className="text-center bg-orange-500 hover:bg-orange-400 text-white transition-all duration-200 focus:outline-none shadow-inner px-6 py-3 mt-4 w-full"
                                                    >
                                                        Lunasi
                                                    </a>
                                                )}
                                                {item?.status === "success" && (
                                                    <Link
                                                        to={`/courses/${item?.course_id}`}
                                                        className="text-center bg-gray-250 hover:bg-gray-300 transition-all duration-200 focus:outline-none shadow-inner px-6 py-3 mt-4 w-full"
                                                    >
                                                        Lihat Kelas
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>
                        </>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </main>
        </div>
    );
};
