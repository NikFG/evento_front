import Link from "next/link";
import style from './Navbar.module.css';
import React from "react";
import {parseCookies} from "nookies";
import {User} from "@types";
import {decrypt} from '@utils';
import Image from "next/image";

export default function Navbar() {


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
                //fazer login
                console.log(email)
            }
        }


    }, [])
    return (

        <nav className={"navbar navbar-light navbar-expand-lg " + style.navbarCustom}>
            <div className="container-fluid">
                <Link href='/'>
                    <a className={"navbar-brand"}>Even4</a>
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