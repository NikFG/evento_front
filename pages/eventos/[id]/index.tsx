import Navbar from "@components/Navbar";
import EventoComp from "@components/EventoComp";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {Evento} from "@types";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    console.log('STATIC PATHS');
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + "/eventos/");
    const data = res.data;
    const paths = data.map((e: any) => {
        return {
            params: {id: e.id.toString()}
        }
    });
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    console.log('STATIC PROPS');
    const {id} = context.params as IParams;
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + `/eventos/${id}`);
    const evento: Evento = res.data;
    const api = process.env.API_SERVER;
    return {
        props: {
            evento,
            api
        },
        revalidate: 60
    }
}


export default function EventoPage({evento, api}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar api={api} titulo={'Evento'}/>
            {evento ? <EventoComp evento={evento} api={api}/> : <h1>Erro</h1>}

        </>
    );
}
