import styles from "./CadastroForm.module.css";
import InputMask from "react-input-mask";
import React from "react";
import {AxiosResponse} from "axios";
import {useRouter} from 'next/router'

export interface Props {
    api: string
}

export default function CadastroForm(props: Props) {
    const router = useRouter();
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [telefone, setTelefone] = React.useState("");

    async function submitForm(e: React.FormEvent) {

        e.preventDefault();
        const axios = require("axios");
        const user = {
            nome,
            email,
            cpf,
            password,
            telefone

        }

        await axios.post(`${props.api}/user/register`, user)
            .then((r: AxiosResponse) => {
                console.log(r);
                router.push("/login");
            })
            .catch(((error: any) => {
                let data = error.response.data;
                for (const [k, v] of Object.entries(data)) {
                    console.log(k)
                    console.log(v)
                }

            }))


    }

    return (
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
                        <input id="senha" type="password" className="form-control" placeholder="Digite sua senha"
                               value={password}
                               onChange={(e) => {
                                   setPassword(e.target.value);
                               }}
                               required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senhaConfirm" className={"form-label"}>Confirme sua senha</label>
                        <input id="senhaConfirm" type="password" className="form-control"
                               placeholder="Digite sua senha novamente" required/>
                    </div>

                    <div className={"row form-group " + styles.botao}>
                        <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Criar conta</button>
                    </div>
                </form>
            </div>
        </div>
    );
}