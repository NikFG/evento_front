import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Certificado, Evento, Instituicao, ModeloCertificado, User} from "@types";
import React from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {verificaToken} from "utils";

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

    const axios = require('axios');
    const api = process.env.API_SERVER;
    const token = req.cookies.USER_TOKEN;
    const roles = req.cookies.USER_ROLES;
    const user_criptografado = req.cookies.USER_DATA;

    const token_valido = await verificaToken(api, token, user_criptografado);
    if (!token_valido) {
        const resp = await axios.post(`${api}/user/refresh`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((aResp: AxiosResponse) => {
            return true;
        }).catch((err: AxiosError) => {
            if (err.response?.status == 500) {
                return false;
            }
        });
        if (!resp) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                },
                props: {
                    user: undefined
                }
            }

        }
    }

    let response = await axios.get(api + "/eventos/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos_participados: Evento[] = response.data;


    response = await axios.get(api + "/certificados", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const certificados: Certificado[] = response.data;

    response = await axios.get(api + "/user/fromToken", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const user: User = response.data.user;

    response = await axios.get(api + "/eventos/criados", {
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
    const eventos_criados: Evento[] = response.data ?? null;

    response = await axios.get(`${api}/instituicao/user`, {
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
    const instituicao: Instituicao = response.data ?? null;


    response = await axios.get(`${api}/modelos`, {
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
    const modelos: ModeloCertificado[] = response.data ?? null;
    response = await axios.get(`${api}/instituicao/associados`, {
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
    const associados: User[] = response.data ?? null;


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
            associados
        }
    }
}

export default function UsuarioPage({
                                        eventos_participados,
                                        eventos_criados,
                                        certificados,
                                        api,
                                        token,
                                        user,
                                        instituicao,
                                        modelos,
                                        associados
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
                associados={associados}
            />
        </>
    );

}

