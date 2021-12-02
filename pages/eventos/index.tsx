import Navbar from "@components/Navbar";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Categoria, Evento, Instituicao} from "@types";
import GridEventos from "@components/GridEventos";
import {motion} from "framer-motion";
import {Pagination, Row} from "react-bootstrap";
import Link from "next/link";
import Paginacao from "@components/Paginacao";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const api = process.env.API_SERVER;
    const urlQuery = context.query;
    let query = '';
    for (const [k, v] of Object.entries(urlQuery)) {
        query += `${k}=${v}&`;
    }
    query = query.slice(0, -1);
    let res = await axios.get(api + '/eventos?' + query);

    const eventos: Evento[] = res.data.data;
    const pages = Math.ceil(res.data.total / res.data.per_page);
    const currentPage = res.data.current_page;

    res = await axios.get(api + "/categorias");
    const categorias: Categoria[] = res.data;

    res = await axios.get(api + "/instituicao");
    const instituicoes: Instituicao[] = res.data;

    return {
        props: {
            eventos,
            categorias,
            instituicoes,
            pages,
            currentPage
        },
    }
}
export default function Eventos({
                                    eventos,
                                    categorias,
                                    instituicoes,
                                    pages,
                                    currentPage,
                                }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <motion.div
            exit={{opacity: 0}}
            initial='initial'
            animate='animate'
        >
            <Navbar titulo={"Eventos"}/>

            <GridEventos eventos={eventos} categorias={categorias} instituicoes={instituicoes} pesquisa={true}/>
            <div className={'d-flex justify-content-center mt-2'}>
                <Paginacao atual={currentPage} link={'eventos'} total={pages}/>
            </div>
        </motion.div>
    );
}
