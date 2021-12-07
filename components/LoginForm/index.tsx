import styles from "./LoginForm.module.css"
import Link from "next/link";
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {User} from "@types";
import {encrypt} from "@utils";
import nookies, {setCookie} from 'nookies';
import React from "react";
import {toast, ToastContainer} from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export interface LoginProps {
    api: string
    sitekey: string
    hcaptcha_secret: string
}

export default function LoginForm({api, sitekey, hcaptcha_secret}: LoginProps) {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const hcaptchaRef = React.useRef<HCaptcha>(null);

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
            sessionStorage.setItem("USER_TOKEN", value.data.access_token)
            let usuario_criptografado = encrypt(user)
            const user_logado: User = value.data.user;
            const roles = value.data.roles;

            sessionStorage.setItem("USER_DATA", JSON.stringify(user_logado))
            localStorage.setItem("USER_LOGIN", usuario_criptografado)

            setCookie(null, "USER_ROLES", JSON.stringify(roles), {
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
            await toast.success(`Login realizado com sucesso!`, {
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
            .catch((error: any) => {
                console.error(error.response.data.error);
                toast.error(`${error.response.data.error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const onHCaptchaChange = async (captcha: string) => {
        if (!captcha) {
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
                throw new Error(error.message)
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
            // Reset the hCaptcha when the request has failed or succeeeded
            // so that it can be executed again if user submits another email.
            // setEmail("");
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
                        <h3>Log in</h3>
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
                            <input id="senha" type="password" className="form-control" placeholder="Digite sua senha"
                                   value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                                   required
                            />
                            <p className="text-end">
                                Esqueceu sua <a href="#">senha?</a>
                            </p>
                        </div>

                        <div className="form-group">
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="lembrar" name="lembrar"/>
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
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Entrar</button>


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