import Navbar from "@components/Navbar";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Evento} from "@types";
import GridEventos from "@components/GridEventos";

export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + '/eventos');

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
