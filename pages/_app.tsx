import '../styles.css';
import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tiny-fab/dist/styles.css';
import 'react-toastify/dist/ReactToastify.css';
config.autoAddCss = false
import Head from "next/head";
import {AppProps} from "next/app";
import 'react-vertical-timeline-component/style.min.css';
import 'react-tabs/style/react-tabs.css';
import "react-multi-carousel/lib/styles.css";


function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"} rel="stylesheet"
                      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                      crossOrigin="anonymous"/>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src={"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"}
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossOrigin="anonymous"/>
                <title>e-ventos</title>

            </Head>
            <Component {...pageProps}/>
        </>
    )

}

export default MyApp;


