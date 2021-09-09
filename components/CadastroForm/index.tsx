import styles from "./CadastroForm.module.css";
import InputMask from "react-input-mask";
import React from "react";
import {AxiosResponse} from "axios";
import {useRouter} from 'next/router'

export default function CadastroForm() {
    const router = useRouter();

    async function submitForm(e: React.FormEvent) {

        e.preventDefault();
        const axios = require("axios");
        const user = {
            "nome": e.target.nome.value,
            "email": e.target.email.value,
            "cpf": e.target.cpf.value,
            "password": e.target.senha.value,
            "telefone": e.target.telefone.value
        }

        await axios.post(process.env.API_SERVER + "/user/register", user)
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
                        <input id="nome" type="text" className="form-control" placeholder="Digite seu nome" required/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor={"email"} className={"form-label"}>Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Digite seu email"
                               required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor={"cpf"} className={"form-label"}>CPF</label>
                        <InputMask id="cpf" className="form-control" placeholder="Digite seu cpf"
                                   mask={"999.999.999-99"} required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor={"telefone"} className={"form-label"}>Telefone</label>
                        <InputMask id="telefone" placeholder="Digite seu telefone" className={"form-control"}
                                   mask={"(99) 99999-9999"} required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senha" className={"form-label"}>Senha</label>
                        <input id="senha" type="password" className="form-control" placeholder="Digite sua senha"
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