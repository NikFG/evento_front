import styles from "./Usuario.module.css";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import {Evento} from "@types";
import {motion} from "framer-motion";

export interface EventosParticipadosProps {
    eventos_participados: Evento[];
    CustomToggle: any;
    id_usuario: number;
    handleEnviaCertificadoEmail: (id_usuario: number) => void;
}

export default function EventosParticipados({
                                                eventos_participados,
                                                CustomToggle,
                                                id_usuario,
                                                handleEnviaCertificadoEmail
                                            }: EventosParticipadosProps) {
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
        <Accordion>
            {eventos_participados.map(e => (
                <motion.div variants={fadeInUp}
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
                                                                    await handleEnviaCertificadoEmail(a.id!);
                                                                }}>
                                                            Envia certificado
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            )}
                                        </Card.Body>
                                    </>
                                </Accordion.Collapse>
                            </Accordion>
                        </Card.Body>
                    </Card>
                </motion.div>

            ))}

        </Accordion>
    );
}