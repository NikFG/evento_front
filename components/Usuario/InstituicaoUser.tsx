import styles from "./Usuario.module.css";
import {Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row, Spinner} from "react-bootstrap";
import Image from "next/image";
import React from "react";
import {Instituicao, User} from "@types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus} from "@fortawesome/free-solid-svg-icons/faMinus";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {confirmAlert} from 'react-confirm-alert';

export interface InstituicaoUserProps {
    instituicao: Instituicao;
    associados: User[];
    handleAddAssociado: (email: string) => Promise<User>;
    handleRemoveAssociado: (email: string) => Promise<User>;
    handleTransferencia: (email: string, permanece: boolean) => void;
    handleEditarInstituicao: (nome: string, endereco: string, cidade: string) => void;
    isLoading: boolean;
}

export default function InstituicaoUser({
                                            instituicao,
                                            associados,
                                            handleAddAssociado,
                                            handleRemoveAssociado,
                                            handleEditarInstituicao,
                                            handleTransferencia,
                                            isLoading
                                        }: InstituicaoUserProps) {
    const [email, setEmail] = React.useState("");
    const [emailRemover, setEmailRemover] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [cidade, setCidade] = React.useState("");
    const [emailTransferencia, setEmailTransferencia] = React.useState("");
    const [permanece, setPermanece] = React.useState<boolean | undefined>(undefined);
    const [associadosFiltrados, setAssociadosFiltrados] = React.useState<{ id: number, nome: string, email: string }[]>([]);
    React.useEffect(() => {
        setNome(instituicao.nome);
        setEndereco(instituicao.endereco);
        setCidade(instituicao.cidade);
        setAssociadosFiltrados(associados.map(associado => ({
            id: associado.id,
            nome: associado.nome,
            email: associado.email
        })));

    }, [instituicao.cidade, instituicao.endereco, instituicao.nome, associados]);

    return (
        <>
            <Row>
                <Col sm={12} md={4} lg={4} className={"mb-3"}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                                <Image
                                    src={`https://avatars.dicebear.com/api/initials/${instituicao.nome}.svg?radius=50`}
                                    alt={"usuario"} className={'rounded-circle'}
                                    width={150} height={150}/>
                                <div className={"mt-3"}>
                                    <h4>{instituicao.nome}</h4>
                                    <p className="text-secondary mb-1">{instituicao.endereco}</p>
                                    {/*<p className="text-muted font-size-sm">{instituicao.administrador}</p>*/}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <hr/>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    Associados
                                </Card.Header>
                                <Card.Body>
                                    {associadosFiltrados.length > 0 ?
                                        associadosFiltrados.map(a => {
                                            return (
                                                <div className={"mb-2 " + styles.instituicaoAssociados} key={a.id}>
                                                    {a.nome} - {a.email}
                                                    <hr/>
                                                </div>
                                            )
                                        })
                                        : <p>Nenhum associado</p>}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} md={7} lg={7}>
                    <Card className={"mb-3"}>
                        <Card.Header><span>Editar dados da instituição</span></Card.Header>
                        <Card.Body>
                            <FormGroup className={"mb-3"} controlId={"email"}>
                                <FormLabel>Nome</FormLabel>
                                <FormControl type={"text"} value={nome}
                                             onChange={(e) => {
                                                 setNome(e.target.value)
                                             }}/>
                            </FormGroup>
                            <FormGroup className={"mb-3"} controlId={"email"}>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl type={"text"} value={endereco}
                                             onChange={(e) => {
                                                 setEndereco(e.target.value)
                                             }}/>
                            </FormGroup>
                            <FormGroup className={"mb-3"} controlId={"email"}>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl type={"text"} value={cidade}
                                             onChange={(e) => {
                                                 setCidade(e.target.value)
                                             }}/>
                            </FormGroup>
                            <Button variant={'primary'} onClick={async () => {
                                await handleEditarInstituicao(nome, endereco, cidade);
                            }} disabled={isLoading}> {isLoading ?
                                <Spinner animation={"border"} role={"status"}>
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner> : "Editar"}
                            </Button>

                        </Card.Body>
                    </Card>
                    <Card className={"mb-3"}>
                        <Card.Body>
                            <Form>
                                <FormGroup className={"mb-3"} controlId={"email"}>
                                    <FormLabel>Adicionar associado</FormLabel>
                                    <FormControl type={"email"} value={email}
                                                 onChange={(e) => {
                                                     setEmail(e.target.value)
                                                 }}/>
                                </FormGroup>
                                <Button variant={'primary'} onClick={async () => {
                                    const user = await handleAddAssociado(email);
                                    if (user) {
                                        setAssociadosFiltrados([...associadosFiltrados, {
                                            id: user.id,
                                            nome: user.nome,
                                            email: user.email
                                        }])
                                    }
                                    setEmail('');
                                }}>
                                    {isLoading ?
                                        <Spinner animation={"border"} role={"status"}>
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner> :
                                        <span><FontAwesomeIcon icon={faPlus} className={'me-2'}/>Adicionar</span>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className={"mb-3"}>
                        <Card.Body>
                            <Form>
                                <FormGroup className={"mb-3"} controlId={"email"}>
                                    <FormLabel>Remover associado</FormLabel>
                                    <FormControl type={"email"} value={emailRemover}
                                                 onChange={(e) => {
                                                     setEmailRemover(e.target.value)
                                                 }}/>
                                </FormGroup>
                                <Button variant={'primary'} onClick={async () => {
                                    const user = await handleRemoveAssociado(emailRemover);
                                    if (user) {
                                        setAssociadosFiltrados(associadosFiltrados.filter(associado => associado.id !== user.id))
                                    }
                                    setEmailRemover('');
                                }}>
                                    {isLoading ?
                                        <Spinner animation={"border"} role={"status"}>
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner> :
                                        <span><FontAwesomeIcon icon={faMinus} className={'me-2'}/>Remover</span>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className={"mb-3"}>
                        <Card.Body>
                            <Form>
                                <FormGroup className={"mb-3"} controlId={"emailTransf"}>
                                    <FormLabel>Transferir administração</FormLabel>
                                    <FormControl type={"email"} value={emailTransferencia}
                                                 onChange={(e) => {
                                                     setEmailTransferencia(e.target.value)
                                                 }}/>
                                </FormGroup>
                                <Button variant={'primary'} onClick={async () => {
                                    confirmAlert({
                                        closeOnEscape: true,
                                        closeOnClickOutside: true,
                                        title: 'Confirmar transferência',
                                        message: `Deseja realmente transferir a administração para ${emailTransferencia}?`,

                                        onClickOutside: () => {
                                            setPermanece(undefined)
                                        },
                                        onKeypressEscape: () => {
                                            setPermanece(undefined)
                                        },
                                        buttons: [
                                            {
                                                label: 'Sim',
                                                onClick: async () => {
                                                    setPermanece(true)
                                                }
                                            },
                                            {
                                                label: 'Não',
                                                onClick: () => {
                                                    setPermanece(undefined)
                                                    return;
                                                }
                                            }
                                        ],
                                        //@ts-ignore
                                        afterClose: () => {
                                            if (permanece) {
                                                confirmAlert({
                                                    closeOnEscape: false,
                                                    closeOnClickOutside: false,
                                                    title: 'Confirmar saída',
                                                    message: 'Você continuará na instituição?',
                                                    buttons: [
                                                        {
                                                            label: 'Sim',
                                                            onClick: async () => {
                                                                await handleTransferencia(emailTransferencia, true);
                                                            }
                                                        },
                                                        {
                                                            label: 'Não',
                                                            onClick: async () => {
                                                                await handleTransferencia(emailTransferencia, false);
                                                            }
                                                        }
                                                    ],
                                                    //@ts-ignore
                                                    afterClose: () => {
                                                        setEmailTransferencia("");
                                                        setPermanece(undefined);
                                                    }
                                                })
                                            }
                                        },
                                    });

                                }} disabled={isLoading}>
                                    {isLoading ?
                                        <Spinner animation={"border"} role={"status"}>
                                            <span className="visually-hidden">Carregando...</span>
                                        </Spinner> :
                                        <span><FontAwesomeIcon icon={faPlus} className={'me-2'}/> Transferir</span>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    );
}