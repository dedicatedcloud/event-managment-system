import React from 'react';
import '../styles/globals.css'
import '../styles/calenderSass.scss';
import {SessionProvider} from "next-auth/react";
import LayoutWrapper from "../layouts/layoutWrapper";
import { ThemeProvider, createTheme } from '@mui/material';
import NextNProgress from "nextjs-progressbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps : { session, ...pageProps } }) {


    const theme = createTheme({
        palette : {
            primary : {
                main : "#ed733c", //#f08a5d
                light: "#f08758",
            },
            secondary : {
                main : "#f6f6f6",
                light: "#ffffff",
            },
        },
    });

    return (
    <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
            <NextNProgress height={5} color={"#f08a5d"} options={{
                showSpinner: true,
                easing: 'ease',
                speed: 500,
                minimum: 0.3,
            }}/>
            <LayoutWrapper {...pageProps}>
                <Component {...pageProps}/>
            </LayoutWrapper>
        </ThemeProvider>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            limit={1}
        />
    </SessionProvider>
    )
}


export default MyApp
