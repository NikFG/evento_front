import Head from 'next/head'
import Navbar from "@components/Navbar";
import MainBanner from "@components/MainBanner";
import CarouselCustom from "@components/CarouselCustom";
import GridEventosHome from "@components/GridEventosHome";
import Footer from "@components/Footer";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Evento, Categoria} from "@types";


export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const eventosResp = await axios.get(process.env.API_SERVER + "/eventos");
    const categoriasResp = await axios.get(process.env.API_SERVER + "/categorias")
    const eventos: Evento[] = eventosResp.data;
    const categorias: Categoria[] = categoriasResp.data
    return {
        props: {
            eventos,
            categorias,
        },
    }
}

export default function Home({eventos, categorias, secret}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <div>
                <Head>
                    <title>Eventos</title>
                    <meta name="description" content="test"/>
                </Head>

                <main>
                    <Navbar/>

                    <MainBanner/>

                    <CarouselCustom categorias={categorias}/>

                    <GridEventosHome eventos={eventos}/>
                </main>

                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}
