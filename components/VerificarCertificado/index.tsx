import styles from "./VerificaCertificado.module.css";
import {toast, ToastContainer} from "react-toastify";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {Spinner} from "react-bootstrap";
import Link from "next/link";
import React from "react";
import {AxiosError, AxiosResponse} from "axios";

export interface VerificaCertificadoProps {
    api: string;

}

export default function VerificaCertificado({api}: VerificaCertificadoProps) {
    const [codigo, setCodigo] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log({codigo});
        setIsLoading(true);
        const axios = require("axios");
        const response = await axios.post(`${api}/certificados/verificar`, {
            codigo
        }).then((res: AxiosResponse) => {
            return true;
        }).catch((err: AxiosError) => {
            return false;
        });
        if (response) {
            toast.success("Certificado é válido!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("Certificado inválido!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsLoading(false);
    }

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
                        <h3>Verifica Certificado</h3>
                        <div className="form-group mb-3">
                            <label htmlFor={"codigo"} className={"form-label"}>Código verificação</label>
                            <input id="codigo" type="text" className="form-control"
                                   placeholder="Digite o código de verificação"
                                   value={codigo}
                                   onChange={(e) => {
                                       setCodigo(e.target.value)
                                   }}
                                   required
                            />
                        </div>


                        {/*<div className={'d-flex justify-content-center'}>
                            <HCaptcha
                                id="test"
                                size="invisible"
                                ref={hcaptchaRef}
                                sitekey={sitekey}
                                onVerify={onHCaptchaChange}
                            />
                        </div>*/}
                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block"
                                    disabled={isLoading}>{isLoading ?
                                <Spinner animation={"border"} role={"status"}><span
                                    className="visually-hidden">Carregando...</span></Spinner>
                                : "Confirmar"}

                            </button>


                        </div>
                        <div className={"row mt-2"}>
                            <div className={"col-2"}>
                                <p className={"text-start"}>
                                    <Link href={"/"}>
                                        <a>Voltar</a>
                                    </Link>
                                </p></div>
                        </div>


                    </form>
                </div>
            </div>
        </>
    );
}