import Navbar from "@components/Navbar";
import GridEventos from "@components/GridEventos";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import axios from "axios";
import {Categoria, Evento} from "@types";

export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const res = await axios.get('http://localhost:8000/api/eventos');

    const eventos: Evento[] = res.data;

    return {
        props: {
            eventos,

        },
    }
}
export default function Eventos({eventos}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <Navbar/>
            <GridEventos eventos={eventos}/>
        </>
    );
}
