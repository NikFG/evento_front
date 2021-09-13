import styles from "./Usuario.module.css";
import {TabList, Tabs, Tab, TabPanel} from "react-tabs";

import {Atividade, Evento, User} from "@types";
import InputMask from "react-input-mask";
import React from "react";
import EventoCriado from "@components/EventoCriado";
import EventoParticipado from "@components/EventoParticipado";

export interface UsuarioProps {
    eventos_participados: Evento[];
    eventos_criados: Evento[];

}

export default function Usuario(props: UsuarioProps) {
    const eventos_participados = props.eventos_participados;
    const eventos_criados = props.eventos_criados;
    console.log(eventos_criados)
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");



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
                            {eventos_criados.length == 0 ? <h3>não há eventos criados</h3> :
                                eventos_criados.map(e =>
                                    <EventoCriado evento={e} key={e.id}/>
                                )
                            }

                        </TabPanel>

                        {/*Eventos participados*/}
                        <TabPanel>
                            {/*criar collpase*/}
                            {
                                eventos_participados.map(e =>
                                    <EventoParticipado evento={e} key={e.id}/>
                                )
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