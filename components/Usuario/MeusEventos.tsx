import styles from "./Usuario.module.css";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import React from "react";
import {Evento} from "@types";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {confirmAlert} from "react-confirm-alert";

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

    function jaOcorreu(data: string) {
        const hoje = new Date();
        const data_evento = new Date(data);

        return hoje >= data_evento;
    }


    return (
        <Row>
            {eventos_criados? eventos_criados.map(e => {
                return <motion.div variants={fadeInUp}
                                   whileHover={{scale: 1.05}}
                                   whileTap={{scale: 0.95}}
                                   className={"col-xxl-3 col-lg-4 col-md-6 col-sm-12 mb-3 " + styles.eventos}
                                   key={e.id}>
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
                            {jaOcorreu(e.atividades[0].data) ?
                                <div className={"d-flex justify-content-center "}>
                                    <Button variant={"secondary me-2"} onClick={async () => {
                                        await handleEdit(e.id!);
                                    }
                                    }>
                                        <FontAwesomeIcon icon={faEdit}/> Editar
                                    </Button>
                                    <Button variant={"danger ms-2"} onClick={async () => {
                                        confirmAlert({
                                            closeOnEscape: true,
                                            closeOnClickOutside: true,
                                            title: "Deseja mesmo apagar este evento?",
                                            message: e.participantes_count ? `Ressaltamos que o evento possui ${e.participantes_count} participante(s)` : "",
                                            buttons: [
                                                {
                                                    label: "Sim",
                                                    onClick: async () => {
                                                        await handleDelete(e.id!);

                                                    }
                                                },
                                                {
                                                    label: "Não",
                                                    onClick: () => {
                                                        return;
                                                    }
                                                }
                                            ]
                                        })


                                    }}>
                                        <FontAwesomeIcon icon={faTrash}/> Excluir
                                    </Button>
                                </div>
                                : <span>Evento em andamento ou realizado</span>}
                        </Card.Footer>
                    </Card>
                </motion.div>
            })
            : <h1>Nenhum evento criado até então</h1>}
        </Row>

    );
}