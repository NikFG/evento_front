import '@styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type {AppProps} from 'next/app';
import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false


function MyApp({Component, pageProps}: AppProps) {

    return <Component {...pageProps}/>

}
export default MyApp;


