import {
    GetServerSideProps,
    GetStaticPaths, GetStaticProps, InferGetServerSidePropsType,
    InferGetStaticPropsType,

} from "next";
import Navbar from "@components/Navbar";
import {Evento} from "@types";
import {ParsedUrlQuery} from "querystring";
import GridEventos from "@components/GridEventos";


interface IParams extends ParsedUrlQuery {
    query: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios')
    const api = process.env.API_SERVER
    const {query} = context.params as IParams
    const url = api + "/eventos/pesquisa/" + (query.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    console.log(url)
    const res = await axios.get(url);
    const eventos: Evento[] = res.data;

    return {
        props: {
            eventos
        }
    }
}

export default function PesquisaEventoPage({eventos}: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    return (
        <>
            <Navbar/>
            <GridEventos eventos={eventos}/>
        </>
    );
}