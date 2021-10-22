import Head from 'next/head'
import MainBanner from "@components/MainBanner";
import GridEventos from "@components/GridEventos";
import Footer from "@components/Footer";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Evento} from "@types";
import Navbar from "@components/Navbar";
import {motion} from "framer-motion";

export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const eventosResp = await axios.get(process.env.API_SERVER + "/eventos");
    const api = process.env.API_SERVER;
    const eventos: Evento[] = eventosResp.data;

    return {
        props: {
            eventos,
            api
        },
        revalidate: 60
    }
}

export default function Home({eventos, api}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (

        <motion.div exit={{opacity: 0}}>
            <Head>
                <title>Eventos</title>
                <meta name="description" content="test"/>

            </Head>

            <main>
                <Navbar api={api}/>

                <MainBanner/>

                <GridEventos eventos={eventos}/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </motion.div>
    )
}
