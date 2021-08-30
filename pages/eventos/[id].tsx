import Navbar from "@components/Navbar";
import EventoComp from "@components/EventoComp";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import {ParsedUrlQuery} from 'querystring'
import axios from "axios";
import {Evento} from "@types";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const axios = require('axios');
    const res = await axios.get('http://localhost:8000/api/eventos');
    const data = res.data;
    const paths = data.map((e: any) => {
        return {
            params: {id: e.id.toString()}
        }
    });
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams
    const res = await axios.get(`http://localhost:8000/api/eventos/${id}`);
    const evento: Evento = res.data;
    return {
        props: {
            evento
        }
    }
}


export default function EventoPage({evento}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar/>
            <EventoComp evento={evento}/>
        </>
    );
}
