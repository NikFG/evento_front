import Navbar from "@components/Navbar";
import GeraCertificado from "@components/GeraCertificado";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Atividade} from "@types";
import {ParsedUrlQuery} from "querystring";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + "/atividades/");
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

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams;
    const axios = require('axios');
    const res = await axios.get(process.env.API_SERVER + `/atividades/${id}`);
    const atividade: Atividade = res.data;
    const api = process.env.API_SERVER;
    return {
        props: {
            atividade,
            api
        },
        revalidate: 10
    }
}


export default function GeraCertificadoPage({atividade, api}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar/>
            {
                atividade.users?.length > 0 ?
                    <GeraCertificado atividade={atividade} api={api}/> :
                    <h2>Não há participantes para esta atividade</h2>
            }

        </>
    );
}