import Navbar from "@components/Navbar";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Categoria, Evento, Instituicao} from "@types";
import GridEventos from "@components/GridEventos";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const api = process.env.API_SERVER;
    const urlQuery = context.query;
    let query = '';
    for (const [k, v] of Object.entries(urlQuery)) {
        query += `${k}=${v}&`;
    }
    query = query.slice(0, -1);
    let res = await axios.get(api + '/eventos?' + query);

    const eventos: Evento[] = res.data;



    res = await axios.get(api + "/categorias");
    const categorias: Categoria[] = res.data;

    res = await axios.get(api + "/instituicao");
    const instituicoes: Instituicao[] = res.data;

    return {
        props: {
            eventos,
            categorias,
            instituicoes,

        },
    }
}
export default function Eventos({
                                    eventos,
                                    categorias,
                                    instituicoes
                                }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Navbar/>
            <GridEventos eventos={eventos} categorias={categorias} instituicoes={instituicoes}/>
        </>
    );
}
