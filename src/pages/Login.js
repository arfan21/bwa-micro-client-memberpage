import React from "react";
import Header from "parts/Header";
import { useEffect } from "react";
import Footer from "parts/Footer";
import LoginForm from "parts/LoginForm";

export const Login = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <section className="container mx-auto pt-10">
                <Header onLight></Header>
            </section>
            <section className="container mx-auto pt-10">
                <LoginForm></LoginForm>
            </section>
            <section className="mt-12 bg-indigo-1000 py-12">
                <Footer></Footer>
            </section>
        </>
    );
};
