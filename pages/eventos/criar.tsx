import CriarEvento from "@components/CriarEvento";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Categoria} from "@types";


export const getStaticProps: GetStaticProps = async (context) => {
    const axios = require('axios')
    let res = await axios.get(process.env.API_SERVER + "/categorias/")
    const categorias: Categoria[] = res.data;


    return {
        props: {
            categorias
        }
    }
}
export default function CriarEventoPage({categorias}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <CriarEvento categorias={categorias}/>
    );
}