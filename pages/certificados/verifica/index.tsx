import VerificaCertificado from "@components/VerificarCertificado";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const api = process.env.API_SERVER
    return {
        props: {
            api
        }
    }
}

export default function VerificaCertificadoPage({api}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <VerificaCertificado api={api}/>
        </>
    );
}