import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Certificado, Evento, Instituicao, ModeloCertificado, User} from "@types";
import {parseCookies} from 'nookies';
import React from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useSelector} from "react-redux";
import {verificaToken} from "utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context, {
        path: '/',
        maxAge: 3600,
        sameSite: 'strict',
        secure: true

    })


    const token = cookies.USER_TOKEN;
    const api = process.env.API_SERVER;

    let res = await axios.get(api + "/eventos/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_participados: Evento[] = res.data;


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
    const user: User = res.data.user;

    res = await axios.get(api + "/eventos/criados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res: AxiosResponse) => {
        return res;
    }).catch((e: AxiosError) => {
        if (e.response!.status === 403) {
            return [];
        }
        throw e;
    });
    const eventos_criados: Evento[] = res.data ?? null;

    res = await axios.get(`${api}/instituicao/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res: AxiosResponse) => {
        return res;
    }).catch((e: AxiosError) => {
        if (e.response!.status === 403) {
            return [];
        }
        throw e;
    });
    const instituicao: Instituicao = res.data ?? null;
    console.log({instituicao: res.data});

    res = await axios.get(`${api}/modelos`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res: AxiosResponse) => {
        return res;
    }).catch((e: AxiosError) => {
        if (e.response!.status === 403) {
            return [];
        }
        throw e;
    });
    const modelos: ModeloCertificado[] = res.data ?? null;

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

        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados, certificados, api, token, user, instituicao, modelos
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const user_criptografado = useSelector((state: any) => state.user_criptografado);

    verificaToken(api, token, user_criptografado);
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

            />
        </>
    );

}

