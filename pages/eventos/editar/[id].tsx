import CriarEvento from "@components/CriarEvento";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {Categoria, Evento, TipoAtividade} from "@types";

import {ParsedUrlQuery} from "querystring";
import {parseCookies} from "nookies";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params as IParams
    const axios = require('axios');
    const api = process.env.API_SERVER
    let res = await axios.get(api + "/categorias/")
    const categorias: Categoria[] = res.data;
    res = await axios.get(`${api}/tipoAtividades/`)
    const tipo_atividades: TipoAtividade[] = res.data;
    res = await axios.get(`${api}/eventos/${id}`)
    const evento: Evento = res.data;

    return {
        props: {
            categorias,
            tipo_atividades,
            api,
            evento,
        },
        revalidate: 120
    }
}
export const getStaticPaths: GetStaticPaths = async (context) => {

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
        fallback: 'blocking'
    }
}
export default function EditarEventoPage({
                                             categorias,
                                             tipo_atividades,
                                             api, evento, token
                                         }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <CriarEvento categorias={categorias} api={api} tipo_atividades={tipo_atividades} evento_edit={evento}/>
    );
}