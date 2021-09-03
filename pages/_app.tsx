import '@styles/globals.css';
import type {AppProps} from 'next/app';
import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false
import Head from "next/head";


function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossOrigin="anonymous"/>
            </Head>
            <Component {...pageProps}/>
        </>
    )

}

export default MyApp;


