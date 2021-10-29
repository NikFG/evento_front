import Navbar from "@components/Navbar";
import Checkout from "@components/Checkout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Evento} from "@types";
import {ParsedUrlQuery} from "querystring";
import {parseCookies} from "nookies";

interface IParams extends ParsedUrlQuery {
    id: string
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params as IParams;
    const axios = require('axios');
    const api = process.env.API_SERVER;
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;
    let res = await axios.get(api + `/eventos/${id}`);
    const evento: Evento = res.data;
    res = await axios.get(api + `/eventos/${id}/user/atividades`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const atividades_participadas: Evento[] = res.data;
    return {
        props: {
            evento,
            api,
            atividades_participadas
        }
    }
}


export default function CheckoutPage({
                                         evento,
                                         api,
                                         atividades_participadas
                                     }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Navbar api={api} titulo={"Checkout evento"}/>
            <Checkout atividades={evento.atividades} taxa_evento={10} api={api}
                      atividades_participadas={atividades_participadas}/>
        </>
    );
}