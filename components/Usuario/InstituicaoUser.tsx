import styles from "./Usuario.module.css";
import {Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import Image from "next/image";
import React from "react";
import {Instituicao} from "@types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

export interface InstituicaoUserProps {
    instituicao: Instituicao;
    handleAddParticipante: (email: string) => void;
    handleEditarInstituicao: (nome: string, endereco: string, cidade: string) => void;
}

export default function InstituicaoUser({
                                            instituicao,
                                            handleAddParticipante,
                                            handleEditarInstituicao
                                        }: InstituicaoUserProps) {
    const [email, setEmail] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [cidade, setCidade] = React.useState("");
    //criar para transferir admin

    React.useEffect(() => {
        setNome(instituicao.nome);
        setEndereco(instituicao.endereco);
        setCidade(instituicao.cidade);

    }, [instituicao.cidade, instituicao.endereco, instituicao.nome]);

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
                </Col>
                <Col sm={12} md={7} lg={7}>
                    <Card className={"mb-3"}>
                        <Card.Body>
                            <Form>
                                <FormGroup className={"mb-3"} controlId={"email"}>
                                    <FormLabel>Adicionar participante</FormLabel>
                                    <FormControl type={"email"} value={email}
                                                 onChange={(e) => {
                                                     setEmail(e.target.value)
                                                 }}/>
                                </FormGroup>
                                <Button variant={'primary'} onClick={async () => {
                                    await handleAddParticipante(email);
                                }}> <FontAwesomeIcon icon={faPlus} className={'me-2'}/> Adicionar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <span>Editar dados da instituição</span>
                    <Card className={"mb-3"}>
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
                            }}> Editar
                            </Button>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </>
    );
}