import styles from "./Usuario.module.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useContext} from "react";
import {
    AccordionContext,
    Card,
    Container, Row,
    useAccordionButton
} from "react-bootstrap";

import {Evento, User, Certificado, Instituicao, ModeloCertificado} from "@types";
import {useRouter} from "next/router";
import {destroyCookie} from "nookies";
import Perfil from "@components/Usuario/Perfil";
import MeusEventos from "@components/Usuario/MeusEventos";
import EventosParticipados from "@components/Usuario/EventosParticipados";
import UserCertificado from "@components/Usuario/UserCertificado";
import {toast, ToastContainer} from "react-toastify";
import {AxiosError, AxiosResponse} from "axios";
import InstituicaoUser from "@components/Usuario/InstituicaoUser";
import ModeloCertificadoUser from "@components/Usuario/ModeloCertificadoUser";


export interface UsuarioProps {
    eventos_criados: Evento[]
    eventos_participados: Evento[]
    certificados: Certificado[]
    token: string
    api: string
    user: User
    instituicao: Instituicao
    modelos: ModeloCertificado[]
    roles: string[]

}


export default function Usuario({
                                    eventos_criados,
                                    eventos_participados,
                                    certificados,
                                    token,
                                    api,
                                    user,
                                    instituicao,
                                    modelos,
                                    roles
                                }: UsuarioProps) {

    const router = useRouter();


    async function handleEdit(id: number) {
        await router.push(`/eventos/editar/${id}`)
    }

    async function handleDelete(id: number) {
        const axios = require('axios');
        await axios.delete(`${api}/eventos/${id.toString()}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((r: AxiosResponse) => {
            toast.success(`Evento deletado com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.reload();
        })
            .catch((e: AxiosError) => {
                console.error({error: e.response?.data});
                toast.error(`Houve um erro ao deletar o evento, tente novamente`, {
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

    async function handleAddParticipante(email: string) {
        const axios = require('axios');
        await axios.post(`${api}/instituicao/addUsuario`, {
            email
        }, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then(async (r: AxiosResponse) => {
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
        })
            .catch(((error: any) => {
                console.error({error});
            }));
    }

    async function handleTransferencia(email: string, permanece: boolean) {
        const axios = require('axios');
        await axios.post(`${api}/instituicao/transferir`, {
            email,
            permanece
        }, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then(async (r: AxiosResponse) => {
            console.log(r);
            toast.success(`Usuário transferido com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
            .catch(((error: AxiosError) => {
                console.log({data: error.response?.data.msg});
                toast.error(error.response?.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


            }));
    }

    async function atualizarDados(id: number, nome: string, telefone: string, password?: string, password_confirmation?: string) {
        const axios = require('axios');
        await axios.post(`${api}/user/update/${id}`, {
            nome,
            telefone,
            password,
            password_confirmation
        }, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then(async (r: AxiosResponse) => {
            console.log(r);
            toast.success(`Dados atualizados com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await router.push('/usuario');
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
            }))
    }

    async function handleEditarInstituicao(nome: string, endereco: string, cidade: string) {
        const axios = require('axios');
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('endereco', endereco);
        formData.append('cidade', cidade);
        await axios.post(`${api}/instituicao/update/${instituicao.id}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            }).then(async (r: AxiosResponse) => {
            toast.success(`Dados atualizados com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await router.push('/usuario');
        }).catch(((error: any) => {
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
        }));
    }

    async function handleEnviaCertificadoEmail(id: number) {
        const axios = require('axios');
        await axios.post(`${api}/certificados/${id}/gerarByAtividade`, null, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then(async (r: AxiosResponse) => {
            toast.success(`Certificado enviado com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }).catch(((error: any) => {
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
        }));
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
            <Container>
                <Row>
                    <Tabs selectedTabClassName={styles.tabSelecionada}>
                        <TabList>
                            <Tab>
                                <Card className={styles.tab}>
                                    Perfil
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
                            {roles.includes("associado") || roles.includes('super-admin') &&
                                <>
                                    <Tab>
                                        <Card className={styles.tab}>
                                            Meus eventos
                                        </Card>
                                    </Tab>

                                    <Tab>
                                        <Card className={styles.tab}>
                                            Modelos de certificado
                                        </Card>
                                    </Tab>
                                </>}
                            {roles.includes("admin") || roles.includes('super-admin') &&
                                <Tab>
                                    <Card className={styles.tab}>
                                        Instituição
                                    </Card>
                                </Tab>}

                        </TabList>

                        {/*Perfil*/}
                        <TabPanel>
                            <Perfil logout={logout} user={user!} atualizarDados={atualizarDados}/>
                        </TabPanel>


                        {/*Eventos participados*/}
                        <TabPanel>
                            <EventosParticipados eventos_participados={eventos_participados}
                                                 CustomToggle={CustomToggle}
                                                 id_usuario={user?.id}
                                                 handleEnviaCertificadoEmail={handleEnviaCertificadoEmail}/>
                        </TabPanel>

                        {/*Certificados*/}
                        <TabPanel>
                            <UserCertificado imprimir={imprimir} certificados={certificados}/>
                        </TabPanel>
                        {roles.includes("associado") || roles.includes('super-admin') &&
                            <>
                                {/*Meus eventos*/}
                                <TabPanel>
                                    <MeusEventos eventos_criados={eventos_criados} handleDelete={handleDelete}
                                                 CustomToggle={CustomToggle} handleCertificado={handleCertificado}
                                                 handleEdit={handleEdit} handleModelo={handleModelo}/>
                                </TabPanel>


                                <TabPanel>
                                    <ModeloCertificadoUser modelos={modelos} CustomToggle={CustomToggle}/>
                                </TabPanel>

                            </>}

                        {roles.includes("admin") || roles.includes('super-admin') &&
                            <TabPanel>
                                <InstituicaoUser instituicao={instituicao} handleAddParticipante={handleAddParticipante}
                                                 handleEditarInstituicao={handleEditarInstituicao}
                                                 handleTransferencia={handleTransferencia}/>
                            </TabPanel>}
                    </Tabs>
                </Row>
            </Container>

        </>
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
            className={"accordion-button " + (isCurrentEventKey ? "" : "collapsed ") + styles.botaoExpand}
            onClick={decoratedOnClick}
        >
            <span className={"mx-2"}>{isCurrentEventKey ? "Recolher" : "Expandir"}</span>
        </button>

    );
}

