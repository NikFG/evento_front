import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Certificado, Evento, User} from "@types";
import {parseCookies} from 'nookies';
import React from "react";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;
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
    res = await axios.get(process.env.API_SERVER + "/certificados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const certificados: Certificado[] = res.data
    return {
        props: {
            eventos_participados,
            eventos_criados,
            certificados
        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados, certificados
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Navbar/>
            <Usuario
                eventos_criados={eventos_criados}
                eventos_participados={eventos_participados}
                certificados={certificados}
            />

        </>
    );

}

