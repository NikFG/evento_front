import styles from "./CadastroForm.module.css";
import InputMask from "react-input-mask";
import React from "react";
import {AxiosResponse} from "axios";
import {useRouter} from 'next/router'
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export interface Props {
    api: string
}

export default function CadastroForm(props: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_confirmation, setPassword_confirmation] = React.useState("");
    const [telefone, setTelefone] = React.useState("");

    async function submitForm(e: React.FormEvent) {
        e.preventDefault();

        setIsLoading(true);

        const axios = require("axios");
        const user = {
            nome,
            email,
            cpf,
            password,
            telefone,
            password_confirmation

        }

        await axios.post(`${props.api}/user/register`, user)
            .then(async (r: AxiosResponse) => {
                console.log(r);
                toast.success(`Usuário cadastrado com sucesso!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                await router.push("/login");
            })
            .catch(((error: any) => {
                for (const v of Object.values(error.response.data)) {
                    console.error(v);
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

            })).finally(() => {
                setIsLoading(false);
            });


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
                    <form method={"POST"} onSubmit={submitForm}>
                        <h3>Cadastro</h3>
                        <div className="form-group mb-3">
                            <label htmlFor={"nome"} className={"form-label"}>Nome completo</label>
                            <input id="nome" type="text" className="form-control" placeholder="Digite seu nome"
                                   value={nome}
                                   onChange={e => {
                                       setNome(e.target.value);
                                   }}
                                   required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={"email"} className={"form-label"}>Email</label>
                            <input id="email" type="email" className="form-control" placeholder="Digite seu email"
                                   value={email}
                                   onChange={(e) => {
                                       setEmail(e.target.value);
                                   }}
                                   required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor={"cpf"} className={"form-label"}>CPF</label>
                            <InputMask id="cpf" className="form-control" placeholder="Digite seu cpf"
                                       mask={"999.999.999-99"}
                                       value={cpf}
                                       onChange={(e) => {
                                           setCpf(e.target.value);
                                       }}
                                       required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor={"telefone"} className={"form-label"}>Telefone</label>
                            <InputMask id="telefone" placeholder="Digite seu telefone" className={"form-control"}
                                       mask={"(99) 99999-9999"}
                                       value={telefone}
                                       onChange={(e) => {
                                           setTelefone(e.target.value);
                                       }}
                                       required/>
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
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="senhaConfirm" className={"form-label"}>Confirme sua senha</label>
                            <div className={'input-group'}>
                                <input id="senhaConfirm" type={isVisible ? "text" : "password"} className="form-control"
                                       value={password_confirmation}
                                       onChange={(e) => {
                                           setPassword_confirmation(e.target.value);
                                       }}
                                       placeholder="Digite sua senha novamente" required
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

                        </div>

                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block"
                                    disabled={isLoading}>
                                {isLoading ?
                                    <Spinner animation={"border"} role={"status"}>
                                        <span className="visually-hidden">Carregando...</span>
                                    </Spinner> :
                                    "Criar conta"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}