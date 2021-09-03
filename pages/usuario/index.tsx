import Navbar from "@components/Navbar";
import Usuario from "@components/Usuario";
import {GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, NextPage} from "next";
import {Evento, User} from "@types";
import nookies, {parseCookies} from 'nookies';
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;
    console.log(token);
    const res = await axios.get(process.env.API_SERVER + "/user/atividades", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const eventos: Evento[] = res.data
    return {
        props: {
            eventos
        }
    }
}

export default function UsuarioPage ({eventos}: InferGetServerSidePropsType<typeof getServerSideProps>)  {
    return (
        <>
            <Navbar/>
            <Usuario eventos={eventos}/>
        </>
    );

}

