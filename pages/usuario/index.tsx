import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Certificado, Evento, Instituicao, ModeloCertificado, User} from "@types";
import {parseCookies} from 'nookies';
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict',
        secure: true

    })
    const token = cookies.USER_TOKEN;
    const roles = JSON.parse(cookies.USER_ROLES);
    console.log({roles});
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
    const certificados: Certificado[] = res.data;
    res = await axios.get(api + "/user/fromToken", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const user: User = res.data;
    res = await axios.get(`${api}/instituicao/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const instituicao: Instituicao = res.data;
    res = await axios.get(`${api}/modelos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const modelos: ModeloCertificado[] = res.data;
    return {
        props: {
            eventos_participados,
            eventos_criados,
            certificados,
            api,
            token,
            user,
            instituicao,
            modelos,
            roles

        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados, certificados, api, token, user, instituicao, modelos, roles
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Navbar api={api} titulo={"Página de usuário"}/>
            <Usuario
                eventos_criados={eventos_criados}
                eventos_participados={eventos_participados}
                certificados={certificados}
                token={token}
                api={api}
                user={user}
                instituicao={instituicao}
                modelos={modelos}
                roles={roles}
            />
        </>
    );

}

