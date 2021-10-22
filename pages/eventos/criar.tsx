import CriarEvento from "@components/CriarEvento";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Categoria, TipoAtividade} from "@types";
import Navbar from "@components/Navbar";
import React from "react";


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
        },
        revalidate: 60
    }
}
export default function CriarEventoPage({
                                            categorias,
                                            tipo_atividades,
                                            api
                                        }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar api={api}/>
            <CriarEvento categorias={categorias} api={api} tipo_atividades={tipo_atividades}/>
        </>
    );
}