import Link from "next/link";
import style from './Navbar.module.css';
import React from "react";
import {parseCookies, setCookie} from "nookies";
import {User} from "@types";
import {decrypt} from '@utils';
import Image from "next/image";
import {AxiosResponse} from "axios";
import {encrypt} from "@utils";

export default function Navbar() {
    // window.onscroll()

    const [nome, setNome] = React.useState("");
    React.useEffect(() => {

        let user_data = sessionStorage.getItem("USER_DATA")

        if (user_data) {
            const user: User = JSON.parse(user_data)
            setNome(user.nome)
        } else {
            const login = localStorage.getItem("USER_LOGIN");
            if (login) {
                const {email, password} = decrypt(login);
                const axios = require("axios");
                const user = {
                    email,
                    password
                }
                axios.post(`${process.env.API_SERVER}/user/login`, user).then((value: AxiosResponse) => {
                    sessionStorage.setItem("USER_TOKEN", value.data.access_token)
                    let usuario_criptografado = encrypt(user)
                    const user_logado: User = value.data.user;
                    sessionStorage.setItem("USER_DATA", JSON.stringify(user_logado))
                    localStorage.setItem("USER_LOGIN", usuario_criptografado)
                    setCookie(null, 'USER_TOKEN', value.data.access_token, {
                        path: '/',
                        maxAge: 3600,
                        sameSite: 'strict'
                    });
                    setNome(user_logado.nome);
                })
                    .catch((error: any) => {
                        console.error(error)
                    });
                console.log(email)
            }
        }


    }, [])
    return (

        <nav className={"navbar navbar-light navbar-expand-lg " + style.navbarCustom}>
            <div className="container-fluid">
                <Link href='/'>
                    <a className={"navbar-brand"} href={""}>e-ventos</a>
                </Link>

                <div className="d-flex flex-row bd-highlight">
                    <Link href={'/eventos'}>
                        <a className={'p-2 bd-highlight ' + style.linkCustom}>Eventos</a>
                    </Link>
                    <Link href={'/eventos/criar'}>
                        <a className={'btn p-2 bd-highlight ' + style.btnBranco}>Criar evento</a>
                    </Link>
                    {nome === "" ?
                        <Link href={'/login'}>
                            <a className={'p-2 bd-highlight ' + style.linkCustom}>Login</a>
                        </Link> :
                        <div className={"mx-3 " + style.userName}>

                            <Link href={'/usuario'}>
                                <div>
                                    <Image className={""}
                                           src={`https://avatars.dicebear.com/api/initials/${nome}.svg?radius=50`}
                                           alt={"usuario"}
                                           width={35} height={35}/>
                                    <a className={' ' + style.linkCustom}>{nome}</a>
                                </div>
                            </Link>

                        </div>}

                </div>


            </div>
        </nav>
    );
}