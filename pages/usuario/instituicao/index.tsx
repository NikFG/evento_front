import Navbar from "@components/Navbar";
import InstituicaoForm from "@components/InstituicaoForm";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const api = process.env.API_SERVER;

    return {
        props: {api}
    }
}

export default function InstituicaoPage({api}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Navbar titulo={""}/>
            <InstituicaoForm api={api}/>
        </>
    );
}