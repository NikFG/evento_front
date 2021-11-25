import ModeloCertificado from "@components/ModeloCertificado";
import Navbar from "@components/Navbar";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {parseCookies} from "nookies";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const api = process.env.API_SERVER;
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;

    return {
        props: {
            api,
            token
        }
    }
}

export default function ModeloCertificadoPage({api,token}: InferGetServerSidePropsType<typeof getServerSideProps>){
    return (
        <>
            <Navbar api={api} titulo={"Criar modelo certificado"}/>
            <ModeloCertificado api={api} token={token}/>
        </>
    );
}