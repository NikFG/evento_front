import Navbar from "@components/Navbar";
import LoginForm from "@components/LoginForm";
import {GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticProps: GetStaticProps = async (context) => {
    const secret = process.env.SECRET_KEY
    return {
        props: {
            secret
        }
    }
}
export default function Login({secret}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            <LoginForm secret={secret}/>
        </>

    );
}