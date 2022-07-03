import React,{useEffect} from 'react';
import '../styles/globals.css'
import '../styles/calenderSass.scss';
import {SessionProvider} from "next-auth/react";
import LayoutWrapper from "../layouts/layoutWrapper";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps: { session, ...pageProps }}) {

    const theme = createTheme({
        palette : {
            primary : {
                main : "#f08a5d"
            },
            secondary : {
                main : "#ffffff"
            },
        },
    });
    return (
       <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
              <NextNProgress height={8} color={"#f08a5d"}/>
              <LayoutWrapper {...pageProps}>
                  <Component {...pageProps}/>
              </LayoutWrapper>
          </ThemeProvider>
       </SessionProvider>
    )
}

export default MyApp
