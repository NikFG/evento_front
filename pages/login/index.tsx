import Navbar from "@components/Navbar";
import LoginForm from "@components/LoginForm";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const hcaptcha_secret = process.env.HCAPTCHA_SECRET
    const api = process.env.API_SERVER
    const hcaptcha_key = process.env.HCAPTCHA_KEY
    return {
        props: {
            hcaptcha_secret,
            api,
            hcaptcha_key
        }
    }
}

export default function Login({hcaptcha_secret, api, hcaptcha_key}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <LoginForm hcaptcha_secret={hcaptcha_secret} api={api} sitekey={hcaptcha_key}/>
        </>

    );
}