import styles from "./InstituicaoForm.module.css";
import InputMask from "react-input-mask";
import React from "react";
import {Instituicao} from "@types";
import {AxiosResponse} from "axios";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";

export interface Props {
    api: string,
}

export default function InstituicaoForm(props: Props) {
    const router = useRouter();
    const [nome, setNome] = React.useState("");
    const [cnpj, setCnpj] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [logo, setLogo] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [cidade, setCidade] = React.useState("");

    async function submitForm(e: React.FormEvent) {
        e.preventDefault();
        const token = sessionStorage.getItem("USER_TOKEN");
        const axios = require('axios');
        /*        let instituicao: Instituicao = {
                    cnpj,
                    endereco,
                    latitude: "",
                    longitude: "",
                    logo,
                    nome
                }*/
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("logo", logo);
        formData.append("cnpj", cnpj);
        formData.append("endereco", endereco);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("cidade",cidade);
        await axios.post(`${props.api}/instituicao/store`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `multipart/form-data`,
            }
        }).then(async (e: AxiosResponse) => {
            toast.success(`Instituição cadastrada com sucesso!`, {
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
            .catch(((error: any) => {
                // let data = error.response.data;
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

            }))
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
                        <h3>Cadastro de instituição</h3>
                        <div className="form-group mb-3">
                            <label htmlFor={"nome"} className={"form-label"}>Nome</label>
                            <input id="nome" type="text" className="form-control" placeholder="Digite seu nome"
                                   value={nome}
                                   onChange={e => {
                                       setNome(e.target.value);
                                   }}
                                   required/>
                        </div>


                        <div className="form-group mb-3">
                            <label htmlFor={"cnpj"} className={"form-label"}>CNPJ</label>
                            <InputMask id="cnpj" className="form-control" placeholder="Digite seu CNPJ"
                                       mask={"99.999.999/9999-99"}
                                       value={cnpj}
                                       onChange={(e) => {
                                           setCnpj(e.target.value);
                                       }}
                                       required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor={"endereco"} className={"form-label"}>Endereço</label>
                            <input id="endereco" type="text" className="form-control" placeholder="Endereço"
                                   value={endereco}
                                   onChange={(e) => {
                                       setEndereco(e.target.value);
                                   }}
                                   required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor={"cidade"} className={"form-label"}>Endereço</label>
                            <input id="cidade" type="text" className="form-control" placeholder="Cidade"
                                   value={cidade}
                                   onChange={(e) => {
                                       setCidade(e.target.value);
                                   }}
                                   required/>
                        </div>


                        {/**
                         TODO
                         Criar para logo e latitude longitude com maps
                         */}

                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Confirmar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}