import styles from "./Usuario.module.css";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import React from "react";
import {Evento} from "@types";
import {useRouter} from "next/router";
import {motion} from "framer-motion";

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
    const router = useRouter();
    const easing = [0.6, -0.05, 0.01, 0.99];
    const fadeInUp = {
        initial: {
            y: 60,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: easing
            }
        },
    }
    return (
        <div>
            {eventos_criados.map(e => {
                // @ts-ignore
                return <motion.div variants={fadeInUp}
                                   whileHover={{scale: 1.05}}
                                   whileTap={{scale: 0.95}}
                                   className={"col-xxl-3 col-lg-4 col-md-3 col-sm-1 " + styles.eventos} key={e.id}>
                    <Card>
                        <Card.Header>
                            {e.nome}
                        </Card.Header>
                        <Card.Body>
                            <Accordion>
                                <div className={"d-flex justify-content-center "}>
                                    <CustomToggle eventKey={e.id!.toString()}/>
                                </div>

                                <Accordion.Collapse eventKey={e.id!.toString()}>
                                    <>
                                    <hr/>
                                    <Card.Body>
                                        {e.atividades.map(a =>
                                            <Row key={a.id} className={"mb-2"}>
                                                <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                                    <span className={"p-2"}>{a.nome}</span>
                                                    <Button className={"mb-2"} variant={"outline-primary"}
                                                            onClick={async () => {
                                                                await handleCertificado(a.id!);
                                                            }}>
                                                        Verificar participantes
                                                    </Button>
                                                </Col>

                                            </Row>
                                        )}
                                    </Card.Body>
                                    </>
                                </Accordion.Collapse>


                            </Accordion>

                        </Card.Body>
                        <Card.Footer>
                            <Button variant={"secondary mx-4"} onClick={async () => {
                                await handleEdit(e.id!);
                            }
                            }>
                                <FontAwesomeIcon icon={faEdit}/> Editar
                            </Button>
                            <Button variant={"danger ms-4"} onClick={async () => {
                                await handleDelete(e.id!);
                            }}>
                                <FontAwesomeIcon icon={faTrash}/> Excluir
                            </Button>
                        </Card.Footer>
                    </Card>
                </motion.div>
            })
            }
        </div>

    );
}