import styles from "./Usuario.module.css";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import React from "react";
import {Evento} from "@types";

export interface MeusEventosProps {
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    eventos_criados: Evento[];
    CustomToggle: any;
    handleModelo: () => void;
    handleCertificado: (id: number) => void;
}

export default function MeusEventos({
                                        handleDelete,
                                        handleEdit,
                                        eventos_criados,
                                        CustomToggle,
                                        handleModelo,
                                        handleCertificado
                                    }: MeusEventosProps) {
    return (
        <Accordion>
            {eventos_criados.map(e => {
                return <Card className={"mb-3"} key={e.id}>
                    <Card.Header style={{background: "transparent", paddingBottom: "0"}}>
                        <div className={"d-flex flex-row bd-highlight"}>
                            <div className={"bd-highlight p-2"}>
                                {e.nome}
                            </div>
                            <div className={"bd-highlight ms-1 p-2"}>
                                <Button variant={"outline-secondary"} onClick={async () => {
                                    await handleEdit(e.id!);
                                }
                                }>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                            </div>
                            <div className={"bd-highlight ms-2 p-2"}>
                                <Button variant={"outline-danger"} onClick={async () => {
                                    await handleDelete(e.id!);
                                }}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                            <div className={"bd-highlight ms-1 p-2"}>
                                <Button variant={"primary"} onClick={async () => {
                                    await handleModelo();
                                }
                                }>
                                    Criar modelo
                                </Button>
                            </div>

                            <div className={"ms-auto bd-highlight flex-shrink"}>
                                <CustomToggle eventKey={e.id}/>

                            </div>
                        </div>
                    </Card.Header>
                    {/* @ts-ignore*/}
                    <Accordion.Collapse eventKey={e.id ?? ""}>
                        <Card.Body>

                            {e.atividades.map(a =>
                                <Row key={a.id} className={"mb-2"}>
                                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                        <span className={"p-2"}>{a.nome}</span>
                                    </Col>
                                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                        <Button className={"p-2 mb-2"} variant={"outline-primary"}
                                                onClick={async () => {
                                                    await handleCertificado(a.id!);
                                                }}>
                                            Verificar participantes
                                        </Button>
                                    </Col>
                                    <hr className={"mt-1"}/>
                                </Row>
                            )}

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            })}

        </Accordion>
    );
}