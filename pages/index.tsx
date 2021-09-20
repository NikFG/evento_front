import Head from 'next/head'
import MainBanner from "@components/MainBanner";
import CarouselCustom from "@components/CarouselCustom";
import GridEventos from "@components/GridEventos";
import Footer from "@components/Footer";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Evento, Categoria} from "@types";
import Navbar from "@components/Navbar";

export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const eventosResp = await axios.get(process.env.API_SERVER + "/eventos");
    const categoriasResp = await axios.get(process.env.API_SERVER + "/categorias")
    const api = process.env.API_SERVER;
    const eventos: Evento[] = eventosResp.data;
    const categorias: Categoria[] = categoriasResp.data

    return {
        props: {
            eventos,
            categorias,
            api
        },
    }
}

export default function Home({eventos, categorias, api}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <div>
                <Head>
                    <title>Eventos</title>
                    <meta name="description" content="test"/>

                </Head>

                <main>
                    <Navbar api={api}/>

                    <MainBanner/>

                    <CarouselCustom categorias={categorias}/>

                    <GridEventos eventos={eventos}/>
                </main>

                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}
