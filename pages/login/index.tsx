import Navbar from "@components/Navbar";
import LoginForm from "@components/LoginForm";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const secret = process.env.SECRET_KEY
    const api = process.env.API_SERVER
    return {
        props: {
            secret,
            api
        }
    }
}

export default function Login({secret,api}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <LoginForm secret={secret} api={api}/>
        </>

    );
}