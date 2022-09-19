import React from 'react';
import '../styles/globals.css'
import '../styles/calenderSass.scss';
import {SessionProvider} from "next-auth/react";
import LayoutWrapper from "../layouts/layoutWrapper";
import { ThemeProvider, createTheme } from '@mui/material';
import NextNProgress from "nextjs-progressbar";
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';

// Client-side cache shared for the whole session
// of the user in the browser.

/*const clientSideEmotionCache = createEmotionCache();*/
function MyApp({ Component, pageProps : { session, ...pageProps } }) {

    /*const { Component, emotionCache =
        clientSideEmotionCache, pageProps : { session, ...pageProps } } = props;*/

    //TODO: need to change the visuals for the admin pages, so buttons and colors matche the rest of the site
    const theme = createTheme({
        palette : {
            primary : {
                main : "#ed733c", //#f08a5d
                light: "#f08758",
            },
            secondary : {
                main : "#ffffff"
            },
        },
    });
    /*<CacheProvider value={emotionCache}>

    </CacheProvider>*/
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

/*MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};*/

export default MyApp
