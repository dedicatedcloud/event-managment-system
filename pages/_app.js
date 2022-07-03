import React,{useEffect} from 'react';
import '../styles/globals.css'
import '../styles/calenderSass.scss';
import {SessionProvider} from "next-auth/react";
import LayoutWrapper from "../layouts/layoutWrapper";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NextNProgress from "nextjs-progressbar";
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {

    const { Component, emotionCache =
        clientSideEmotionCache, pageProps : { session, ...pageProps } } = props;

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
       <CacheProvider value={emotionCache}>
           <SessionProvider session={session}>
               <ThemeProvider theme={theme}>
                   <NextNProgress height={8} color={"#f08a5d"}/>
                   <LayoutWrapper {...pageProps}>
                       <Component {...pageProps}/>
                   </LayoutWrapper>
               </ThemeProvider>
           </SessionProvider>
       </CacheProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp