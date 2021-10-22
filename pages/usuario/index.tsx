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
    const api = process.env.API_SERVER;
    let res = await axios.get(api + "/eventos/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_participados: Evento[] = res.data;
    res = await axios.get(api + "/eventos/criados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_criados: Evento[] = res.data;
    res = await axios.get(api + "/certificados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const certificados: Certificado[] = res.data
    return {
        props: {
            eventos_participados,
            eventos_criados,
            certificados,
            api
        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados, certificados, api
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Navbar api={api}/>
            <Usuario
                eventos_criados={eventos_criados}
                eventos_participados={eventos_participados}
                certificados={certificados}
            />

        </>
    );

}

