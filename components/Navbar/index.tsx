import Link from "next/link";
import style from './Navbar.module.css';
import React from "react";
import {parseCookies} from "nookies";
import {User} from "@types";

export default function Navbar() {

    const [nome, setNome] = React.useState("");
    React.useEffect(() => {
        // const user: User = JSON.parse(parseCookies().USER_DATA)
        // setNome(user.nome)
    }, [])
    return (

        <nav className={"navbar navbar-light navbar-expand-lg " + style.navbarCustom}>
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand">Even4</a>
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
                        </Link> : <span className={'p-2 bd-highlight ' + style.linkCustom}>{nome}</span>}
                </div>


            </div>
        </nav>
    );
}