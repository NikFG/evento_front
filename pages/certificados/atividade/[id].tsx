import Navbar from "@components/Navbar";
import GeraCertificado from "@components/GeraCertificado";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Apresentador, Atividade, ModeloCertificado, User} from "@types";
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
    const api = process.env.API_SERVER;
    const axios = require('axios');
    let res = await axios.get(`${api}/atividades/participantes/${id}`);

    const participantes: User[] = res.data.participantes;
    const apresentadores: Apresentador[] = res.data.apresentadores;
    const instituicao = res.data.instituicao;
    res = await axios.get(`${api}/modelos/instituicao/${instituicao}`);
    const modelos: ModeloCertificado = res.data;
    return {
        props: {
            participantes,
            apresentadores,
            api,
            modelos
        },
        revalidate: 10
    }
}


export default function GeraCertificadoPage({participantes,
                                                apresentadores, api, modelos}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar titulo={"Gerar certificado"}/>
            {
                participantes.length > 0 ?
                    <GeraCertificado participantes={participantes} apresentadores={apresentadores} api={api} modelos={modelos}/> :
                    <h2>Não há participantes para esta atividade</h2>
            }

        </>
    );
}