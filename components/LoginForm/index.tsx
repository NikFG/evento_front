import styles from "./LoginForm.module.css"
import Link from "next/link";
import {useRouter} from "next/router";
import axios, {AxiosError, AxiosResponse} from "axios";
import {User} from "@types";
import {encrypt} from "@utils";
import React from "react";
import {toast, ToastContainer} from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {useDispatch} from "react-redux";
import {lembrar, login} from "../../store";
import 'regenerator-runtime/runtime';
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {setCookie} from "nookies";

export interface LoginProps {
    api: string
    sitekey: string
    hcaptcha_secret: string
}

export default function LoginForm({api, sitekey}: LoginProps) {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isLembrar, setIsLembrar] = React.useState(false);


    const hcaptchaRef = React.useRef<HCaptcha>(null);
    const dispatch = useDispatch();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        hcaptchaRef.current!.execute();
    }

    async function handleLogin() {
        const axios = require("axios");
        const user = {
            email,
            password
        }
        await axios.post(`${api}/user/login`, user).then(async (value: AxiosResponse) => {

            let usuario_criptografado = encrypt(user)
            const user_logado: User = value.data.user;
            const roles = value.data.roles;
            const token = value.data.access_token;
            if (isLembrar) {
                setCookie(null, "USER_DATA", usuario_criptografado, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                    sameSite: "strict"
                });

                setCookie(null, "USER_TOKEN", token, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                    sameSite: "strict"
                });

                setCookie(null, "USER_ROLES", roles, {
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                    sameSite: "strict"
                });
            } else {
                setCookie(null, "USER_DATA", usuario_criptografado, {
                    maxAge: 0,
                    path: "/",
                    sameSite: "strict"
                });

                setCookie(null, "USER_TOKEN", token, {
                    maxAge: 0,
                    path: "/",
                    sameSite: "strict"
                });

                setCookie(null, "USER_ROLES", roles, {
                    maxAge: 0,
                    path: "/",
                    sameSite: "strict"
                });
            }
            dispatch(login(user_logado, roles, token));
            dispatch(lembrar(usuario_criptografado));

            toast.success(`Login realizado com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await router.push("/");
        })
            .catch((error: AxiosError) => {
                console.error(error.response?.data);
                for (const [_, v] of Object.entries(error.response?.data)) {
                    toast.error(`${v}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    }

    const onHCaptchaChange = async (captcha: string) => {
        setIsLoading(true);
        if (!captcha) {
            setIsLoading(false);
            return;
        }
        try {
            console.log({captcha});
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({email, captcha}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                await handleLogin();
            } else {
                const error = await response.json();
                new Error(error.message)
            }
        } catch (error: any) {
            toast.error(`${error?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"colored"}
                style={{width: "500px", maxWidth: "1000px", whiteSpace: "pre-line"}}/>
            <div className={styles.outer}>
                <div className={styles.inner}>
                    <form method={"POST"} onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <div className="form-group mb-3">
                            <label htmlFor={"email"} className={"form-label"}>Email</label>
                            <input id="email" type="email" className="form-control" placeholder="Digite seu email"
                                   value={email}
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                   }}
                                   required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="senha" className={"form-label"}>Senha</label>
                            <div className={'input-group'}>
                                <input id="senha" type={isVisible ? "text" : "password"} className="form-control"
                                       placeholder="Digite sua senha"
                                       value={password}
                                       onChange={(e) => {
                                           setPassword(e.target.value)
                                       }}
                                       required
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => {
                                        setIsVisible(!isVisible);
                                    }}>
                                        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye}/>
                                    </button>
                                </div>
                            </div>

                            <p className="text-end">
                                Esqueceu sua <a href="#">senha?</a>
                            </p>
                        </div>


                        <div className="form-group">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="lembrar" name="lembrar"
                                       onChange={e => {
                                           setIsLembrar(e.target.checked)
                                       }}/>
                                <label htmlFor="lembrar"
                                       className={"custom-control-label " + styles.unselectable}>Lembrar</label>
                            </div>
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <HCaptcha
                                id="test"
                                size="invisible"
                                ref={hcaptchaRef}
                                sitekey={sitekey}
                                onVerify={onHCaptchaChange}
                            />
                        </div>
                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block"
                                    disabled={isLoading}>{isLoading ?
                                <Spinner animation={"border"} role={"status"}><span
                                    className="visually-hidden">Carregando...</span></Spinner>
                                : "Entrar"}

                            </button>


                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col-2"}>
                                <p className={"text-start"}>
                                    <Link href={"/"}>
                                        <a>Voltar</a>
                                    </Link>
                                </p></div>

                            <div className={"col-10"}>
                                <p className={"text-end"}>
                                    <Link href={"/cadastro"}>
                                        <a>Criar conta</a>

                                    </Link>
                                </p>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
}