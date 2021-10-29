import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Evento} from "@types";
import Navbar from "@components/Navbar";
import GridEventos from "@components/GridEventos";
import {ParsedUrlQuery} from "querystring";


interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + `/eventos/categorias/${id}`);

    const eventos: Evento[] = res.data;

    return {
        props: {
            eventos,
        },
        revalidate: 60
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + '/categorias');
    const data = res.data;
    const paths = data.map((e: any) => {
        return {
            params: {id: e.id.toString()}
        }
    });
    return {
        paths,
        fallback: 'blocking'
    }
}

export default function EventoCategoriaPage({eventos}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar titulo={"Categorias evento"}/>
            <GridEventos eventos={eventos}/>
        </>
    );
}