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
import {useDispatch, useSelector} from "react-redux";
import {logoutStore} from "../../store";


export interface UsuarioProps {
    eventos_criados: Evento[]
    eventos_participados: Evento[]
    certificados: Certificado[]
    token: string
    api: string
    user: User
    instituicao: Instituicao
    modelos: ModeloCertificado[]
    associados: User[]

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
                                    associados
                                }: UsuarioProps) {

    const router = useRouter();
    const roles: string[] = useSelector((state: any) => state.roles);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);


    async function handleEdit(id: number) {
        await router.push(`/eventos/editar/${id}`)
    }

    async function handleDelete(id: number) {
        setIsLoading(true)
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
            }).finally(() => {
                setIsLoading(false);
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
        setIsLoading(true);
        const axios = require('axios');
        await axios.post(`${api}/user/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        });
        sessionStorage.clear();
        localStorage.removeItem("USER_LOGIN");
        destroyCookie(null, 'USER_TOKEN');
        dispatch(logoutStore());
        await router.push('/');
    }

    async function handleAddAssociado(email: string): Promise<User> {
        setIsLoading(true);
        const axios = require('axios');
        const res = await axios.post(`${api}/instituicao/associados`, {
            email
        }, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        }).then(async (r: AxiosResponse) => {

            toast.success(`Usuário cadastrado com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return r.data;
        })
            .catch(((error: AxiosError) => {
                toast.error(`Houve um erro ao associar o usuário, tente novamente`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error(error.response?.data);
            })).finally(() => {
                setIsLoading(false);
            });
        return res ?? null;
    }

    async function handleRemoveAssociado(email: string): Promise<User> {
        const axios = require('axios');
        const res = await axios.delete(`${api}/instituicao/associados/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(async (r: AxiosResponse) => {
            toast.success(`Associado removido com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return r.data;
        })
            .catch(((error: AxiosError) => {
                toast.error(`Houve um erro ao remover o associado, tente novamente`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error(error.response?.data);
            })).finally(() => {
                setIsLoading(false);
            });
        return res ?? null;
    }

    async function handleTransferencia(email: string, permanece: boolean) {
        setIsLoading(true);
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


            })).finally(() => {
                setIsLoading(false);
            });
    }

    async function atualizarDados(id: number, nome: string, telefone: string, password?: string, password_confirmation?: string) {
        setIsLoading(true);
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
            })).finally(() => {
                setIsLoading(false);
            });
    }

    async function handleEditarInstituicao(nome: string, endereco: string, cidade: string) {
        setIsLoading(true);
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
        })).finally(() => {
            setIsLoading(false);
        });
    }

    async function handleEnviaCertificadoEmail(id: number) {
        setIsLoading(true);
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
                            {(roles.includes("associado") || roles.includes('super-admin')) &&
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
                            {(roles.includes("admin") || roles.includes('super-admin')) &&
                                <Tab>
                                    <Card className={styles.tab}>
                                        Instituição
                                    </Card>
                                </Tab>}

                        </TabList>

                        {/*Perfil*/}
                        <TabPanel>
                            <Perfil logout={logout} user={user!} atualizarDados={atualizarDados} isLoading={isLoading}/>
                        </TabPanel>


                        {/*Eventos participados*/}
                        <TabPanel>
                            <EventosParticipados eventos_participados={eventos_participados}
                                                 CustomToggle={CustomToggle}
                                                 id_usuario={user?.id}
                                                 handleEnviaCertificadoEmail={handleEnviaCertificadoEmail}
                                                 isLoading={isLoading}/>
                        </TabPanel>

                        {/*Certificados*/}
                        <TabPanel>
                            <UserCertificado imprimir={imprimir} certificados={certificados} isLoading={isLoading}/>
                        </TabPanel>
                        {(roles.includes("associado") || roles.includes('super-admin')) &&
                            <>
                                {/*Meus eventos*/}
                                <TabPanel>
                                    <MeusEventos eventos_criados={eventos_criados} handleDelete={handleDelete}
                                                 CustomToggle={CustomToggle} handleCertificado={handleCertificado}
                                                 handleEdit={handleEdit} handleModelo={handleModelo}
                                                 isLoading={isLoading}/>
                                </TabPanel>


                                <TabPanel>
                                    <ModeloCertificadoUser modelos={modelos} CustomToggle={CustomToggle}/>
                                </TabPanel>

                            </>}

                        {(roles.includes("admin") || roles.includes('super-admin')) &&
                            <TabPanel>
                                <InstituicaoUser instituicao={instituicao} associados={associados}
                                                 handleAddAssociado={handleAddAssociado}
                                                 handleRemoveAssociado={handleRemoveAssociado}
                                                 handleEditarInstituicao={handleEditarInstituicao}
                                                 handleTransferencia={handleTransferencia}

                                                 isLoading={isLoading}/>
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

