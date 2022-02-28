import '../styles.css';
import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'animate.css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import {AppProps} from "next/app";
import 'react-vertical-timeline-component/style.min.css';
import 'react-tabs/style/react-tabs.css';
import "react-multi-carousel/lib/styles.css";
import {AnimatePresence} from "framer-motion";
import Router from 'next/router';
import NProgress from 'nprogress';
import {useStore} from '../store'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

config.autoAddCss = false

NProgress.configure({showSpinner: true, spinnerSelector: "#nprogress-spinner"});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}: AppProps) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    });
    return (
        <Provider store={store}>
            <PersistGate loading={<div>loading</div>} persistor={persistor}>
                <AnimatePresence exitBeforeEnter>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link href={"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"}
                              rel="stylesheet"
                              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                              crossOrigin="anonymous"/>
                        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                        <script src={"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"}
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossOrigin="anonymous"/>
                        <title>e-ventos</title>

                    </Head>
                    <Component {...pageProps}/>
                </AnimatePresence>
            </PersistGate>
        </Provider>
    )

}

export default MyApp;


