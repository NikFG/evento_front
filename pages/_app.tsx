import '@styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type {AppProps} from 'next/app';
import {config} from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false
import PersistWrapper from 'next-persist/lib/NextPersistWrapper';
import {getCookieProps} from 'next-persist'
import {makeStore} from "../store";
import {Provider} from "react-redux";

function MyApp({Component, pageProps}: AppProps) {
    const npConfig = {
        method: 'cookies',
        allowList: {
            user: ['id', 'nome', 'email', 'token'],
            reducerTwo: [],
        },
    };
    // return (
    //     <Provider store={makeStore()}>
    //         <PersistWrapper wrapperConfig={npConfig}>
    //             <Component {...pageProps} />
    //         </PersistWrapper>
    //     </Provider>
    // );
    return <Component {...pageProps}/>

}

/*
MyApp.getInitialProps = async ({ctx}: any) => {
    const cookieState = getCookieProps(ctx);
    return {
        pageProps: cookieState,
    };
}
*/

export default MyApp;


