import CriarEvento from "@components/CriarEvento";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Categoria, TipoAtividade} from "@types";


export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const api = process.env.API_SERVER
    let res = await axios.get(api + "/categorias/")
    const categorias: Categoria[] = res.data;
    res = await axios.get(`${api}/tipoAtividades/`)
    const tipo_atividades: TipoAtividade[] = res.data;
    console.log(tipo_atividades)
    return {
        props: {
            categorias,
            tipo_atividades,
            api
        }
    }
}
export default function CriarEventoPage({
                                            categorias,
                                            tipo_atividades,
                                            api
                                        }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <CriarEvento categorias={categorias} api={api} tipo_atividades={tipo_atividades}/>
    );
}