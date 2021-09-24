import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Evento} from "@types";
import {parseCookies} from 'nookies';
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;
    console.log(token);
    let res = await axios.get(process.env.API_SERVER + "/eventos/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_participados: Evento[] = res.data;
    res = await axios.get(process.env.API_SERVER + "/eventos/criados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_criados: Evento[] = res.data;
    return {
        props: {
            eventos_participados,
            eventos_criados,
        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Navbar/>
            <Usuario eventos_participados={eventos_participados} eventos_criados={eventos_criados}/>
        </>
    );

}

