import styles from "./Usuario.module.css";
import {TabList, Tabs, Tab, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import {Atividade, Evento, User} from "@types";
import InputMask from "react-input-mask";
import React from "react";

export interface UsuarioProps {
    eventos: Evento[];

}

export default function Usuario(props: UsuarioProps) {
    const eventos = props.eventos;
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");

    function handleCertificado() {

    }

    React.useEffect(() => {
        let usuario: User = JSON.parse(sessionStorage.getItem("USER_DATA") as string);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setTelefone(usuario.telefone);
    }, []);

    return (
        <div className={"container-fluid d-flex justify-content-center"}>
            <div className={"row mt-3"}>
                <div className={""}>
                    <Tabs>
                        <TabList>
                            <Tab>Meus dados</Tab>
                            <Tab>Meus eventos</Tab>
                            <Tab>Eventos participados</Tab>
                            <Tab>Certificados</Tab>
                        </TabList>

                        {/*Meus dados*/}
                        <TabPanel>
                            <div className="form-group mb-3">
                                <label htmlFor={"nome"} className={"form-label"}>Nome completo</label>
                                <input id="nome" type="text" className="form-control" placeholder="Digite seu nome"
                                       defaultValue={nome}
                                       value={nome} onChange={(e) => {
                                    setNome(e.target.value)
                                }}
                                       required/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor={"email"} className={"form-label"}>Email</label>
                                <input id="email" type="email" className="form-control" placeholder="Digite seu email"
                                       value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                       required/>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor={"telefone"} className={"form-label"}>Telefone</label>
                                <InputMask id="telefone" placeholder="Digite seu telefone" className={"form-control"}
                                           value={telefone} onChange={(e) => {
                                    setTelefone(e.target.value)
                                }}
                                           mask={"(99) 99999-9999"} required/>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="senha" className={"form-label"}>Senha</label>
                                <input id="senha" type="password" className="form-control"
                                       placeholder="Digite sua senha"
                                       required/>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="senhaConfirm" className={"form-label"}>Confirme sua senha</label>
                                <input id="senhaConfirm" type="password" className="form-control"
                                       placeholder="Digite sua senha novamente" required/>
                            </div>

                            <div className={"row form-group " + styles.botao}>
                                <button type="submit" className="btn btn-outline-primary btn-lg btn-block">
                                    Modificar dados
                                </button>
                            </div>
                        </TabPanel>

                        {/*Meus eventos*/}
                        <TabPanel>
                            teste
                        </TabPanel>

                        {/*Eventos participados*/}
                        <TabPanel>
                            {/*criar collpase*/}
                            {
                                eventos.map(e => {
                                    return (
                                        <div key={e.id}>
                                            <h3>{e.nome}</h3>
                                            <div>
                                                {

                                                    e.atividades?.map(a => {
                                                        return (

                                                            <div className={"my-3"} key={a.id}>
                                                                <span>{a.nome}</span>
                                                                {a.pivot?.participou == 1 ?
                                                                    <button className={"btn btn-primary mx-2"}
                                                                            onClick={() => handleCertificado()}>
                                                                        Gerar certificado
                                                                    </button> :
                                                                    <span className={"mx-2"}>Você ainda não participou do evento para possuir certificado</span>}

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <hr/>
                                        </div>
                                    );
                                })
                            }
                        </TabPanel>

                        {/*Certificados*/}
                        <TabPanel>
                            teste
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}