import React from 'react';
import Navbar from "../components/navbar";
import {useSession} from "next-auth/react";
import Footer from "../components/footer";
import Head from "next/head";

const UserLayout = ({children}) => {

    const { data: session, status } = useSession();

    return (
        <div style={{ overflowX : "hidden" }}>
            <Head>
                <title>W&Decor Event Management</title>
                <link rel="icon" type="image/x-icon" href="/assets/favicon.png"/>
            </Head>
            <Navbar session={session} status={status}/>
            {children}
            <Footer/>
        </div>
    );
};

export default UserLayout