import CadastroForm from "@components/CadastroForm";
import Navbar from "@components/Navbar";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const api = process.env.API_SERVER
    return {
        props: {
            api
        }
    }
}
export default function Login({api}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar titulo={"Cadastrar"}/>
            <CadastroForm api={api}/>
        </>
    );
}