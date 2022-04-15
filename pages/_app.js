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
        typography : {
            fontFamily: [
                'Montserrat',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
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
