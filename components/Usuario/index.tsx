import styles from "./Usuario.module.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useContext} from "react";
import {
    AccordionContext,
    Button,
    Card,
    Col,
    Container,
    Row, useAccordionButton
} from "react-bootstrap";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import {faGithub, faTwitter, faFacebook, faInstagram, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputMask from "react-input-mask";
import Image from "next/image";
import {Evento, User, Certificado} from "@types";
import {useRouter} from "next/router";
import ReactTooltip from 'react-tooltip';
import {destroyCookie} from "nookies";
import Perfil from "@components/Usuario/Perfil";
import MeusEventos from "@components/Usuario/MeusEventos";
import EventosParticipados from "@components/Usuario/EventosParticipados";
import UserCertificado from "@components/Usuario/UserCertificado";


export interface UsuarioProps {
    eventos_criados: Evento[]
    eventos_participados: Evento[]
    certificados: Certificado[]
    token: string
    api: string
    user: User

}


export default function Usuario({eventos_criados, eventos_participados, certificados, token, api, user}: UsuarioProps) {

    const router = useRouter();


    async function handleEdit(id: number) {
        await router.push(`/eventos/editar/${id}`)
    }

    function handleDelete(id: number | undefined) {

    }

    async function handleModelo() {
        await router.push(`/certificados/modelo`)
    }

    async function handleCertificado(id: number) {
        if (id) {
            await router.push(`/certificados/atividade/${id}`)
        }
    }

    async function imprimir(id: number) {
        const axios = require('axios');
        await axios.post(`${api}/certificados/${id}/gerar`);
    }

    async function logout() {
        const axios = require('axios');
        await axios.post(`${api}/user/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        });
        sessionStorage.clear();
        localStorage.removeItem("USER_LOGIN");
        destroyCookie(null, 'USER_TOKEN');
        await router.push('/');
    }

    return (
        <Container>
            <Tabs selectedTabClassName={styles.tabSelecionada}>
                <TabList>
                    <Tab>
                        <Card className={styles.tab}>
                            Perfil
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>

                            Meus eventos
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>

                            Eventos participados
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>
                            Certificados
                        </Card>
                    </Tab>
                </TabList>

                {/*Perfil*/}
                <TabPanel>
                    <Perfil logout={logout} user={user!}/>
                </TabPanel>

                {/*Meus eventos*/}
                <TabPanel>
                    <MeusEventos eventos_criados={eventos_criados} handleDelete={handleDelete}
                                 CustomToggle={CustomToggle} handleCertificado={handleCertificado}
                                 handleEdit={handleEdit} handleModelo={handleModelo}/>
                </TabPanel>

                {/*Eventos participados*/}
                <TabPanel>
                    <EventosParticipados eventos_participados={eventos_participados} CustomToggle={CustomToggle}
                                         id_usuario={user?.id}/>
                </TabPanel>

                {/*Certificados*/}
                <TabPanel>

                    <UserCertificado imprimir={imprimir} certificados={certificados}/>

                </TabPanel>
            </Tabs>

        </Container>

    );
}

function CustomToggle({children, eventKey, callback}: any) {
    const {activeEventKey} = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            className={"accordion-button  " + (isCurrentEventKey ? "" : "collapsed ") + styles.botaoExpand}
            onClick={decoratedOnClick}
        />

    );
}

