import styles from "./Navbar.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faBars} from "@fortawesome/free-solid-svg-icons";
import {User} from "@types";
import {AxiosResponse} from "axios";
import {setCookie} from "nookies";
import {decrypt, encrypt} from "utils";
import Link from "next/link";
import Image from "next/image";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";

export interface Props {
    api?: string
    titulo: string
}

export default function Navbar({api, titulo}: Props) {
    const [click, setClick] = React.useState(false);
    const [button, setButton] = React.useState(true);
    const [navbar, setNavbar] = React.useState(false);
    const [nome, setNome] = React.useState("");

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    React.useEffect(() => {
        window.addEventListener('resize', showButton);
        window.addEventListener('scroll', changeBackground);
        showButton();
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
                axios.post(`${api}/user/login`, user).then((value: AxiosResponse) => {
                    sessionStorage.setItem("USER_TOKEN", value.data.access_token)
                    const user_logado: User = value.data.user;
                    // const user_criptografado: string = encrypt(user_logado)
                    const roles = value.data.roles;
                    sessionStorage.setItem("USER_DATA", JSON.stringify(user_logado))
                    localStorage.setItem("USER_LOGIN", login)

                    setCookie(null,"USER_ROLES", JSON.stringify(roles),{
                        path: '/',
                        maxAge: 3600,
                        sameSite: 'strict',
                        secure: true
                    });
                    setCookie(null, 'USER_TOKEN', value.data.access_token, {
                        path: '/',
                        maxAge: 3600,
                        sameSite: 'strict',
                        secure: true
                    });
                    setNome(user_logado.nome);
                })
                    .catch((error: any) => {
                        console.error(error)
                    });
            }
        }
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNavbar(true)
        } else {
            setNavbar(false);
        }
    }

    return (
        <>
            <nav className={navbar ? styles.navbarActive : styles.navbar}>
                <div className={styles.navbarContainer}>
                    <div className={styles.divLogo}>

                            <span className={styles.navbarLogo}>
                                <Link href={'/'}>
                                    <a className={styles.navLogoHome}>
                                    <FontAwesomeIcon className={"me-3"} icon={faCheckCircle}/>
                                        </a>
                                </Link>
                                {titulo}
                            </span>

                    </div>

                    <div className={styles.menuIcon} onClick={handleClick}>
                        <FontAwesomeIcon icon={click ? faTimes : faBars}/>
                    </div>
                    <ul className={click ? styles.navMenuActive : styles.navMenu}>
                        <li className={styles.navItem}>
                            <Link href={"/"}>
                                <a className={styles.navLinks} onClick={closeMobileMenu}>
                                    Home
                                </a>
                            </Link>

                        </li>
                        <li className={styles.navItem}>
                            <Link href={"/eventos"}>
                                <a className={styles.navLinks} onClick={closeMobileMenu}>
                                    Eventos
                                </a>
                            </Link>

                        </li>
                        <li className={styles.navItem}>
                            <Link href={"/eventos/criar"}>
                                <a
                                    className={styles.navLinks}
                                    onClick={closeMobileMenu}>
                                    Criar evento
                                </a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            {nome ? <Link href={"/usuario"}>
                                    <a className={styles.navLinks}>
                                        <Image
                                            src={`https://avatars.dicebear.com/api/initials/${nome}.svg?radius=50`}
                                            alt={"usuario"}
                                            width={35} height={35}/>
                                        <span style={{marginLeft: "5px"}}>{nome}</span>
                                    </a>
                                </Link>
                                : <Link href={"/login"}>

                                    <a
                                        className={styles.navLinks}
                                        onClick={closeMobileMenu}>
                                        Login
                                    </a>
                                </Link>}
                        </li>

                        <li>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}