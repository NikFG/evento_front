import CriarEvento from "@components/CriarEvento";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Categoria, TipoAtividade} from "@types";
import Navbar from "@components/Navbar";
import React from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";


export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios');
    const api = process.env.API_SERVER
    let res = await axios.get(api + "/categorias/")
    const categorias: Categoria[] = res.data;
    res = await axios.get(`${api}/tipoAtividades/`)
    const tipo_atividades: TipoAtividade[] = res.data;

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
    const roles = useSelector((state: any) => state.roles);
    const router = useRouter();

    if (roles && (roles.includes('admin') || roles.includes('associado') || roles.includes('super-admin'))) {
        return (
            <>
                <Navbar api={api} titulo={"Criar evento"}/>
                <CriarEvento categorias={categorias} api={api} tipo_atividades={tipo_atividades}/>
            </>
        );
    }
    router.push('/login');
    return (
        <>Carregando...</>
    )
}