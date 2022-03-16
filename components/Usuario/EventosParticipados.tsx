import styles from "./Usuario.module.css";
import {Accordion, Button, Card, Col, Row, Spinner} from "react-bootstrap";
import React from "react";
import {Evento} from "@types";
import {motion} from "framer-motion";
import {faTimesCircle, faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface EventosParticipadosProps {
    eventos_participados: Evento[];
    CustomToggle: any;
    id_usuario: number;
    handleDownloadCertificado: (id_usuario: number) => void;
    isLoading: boolean;
}

export default function EventosParticipados({
                                                eventos_participados,
                                                CustomToggle,
                                                id_usuario,
                                                handleDownloadCertificado,
                                                isLoading
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
            {eventos_participados && eventos_participados.length > 0 ? eventos_participados.map(e => (
                <motion.div variants={fadeInUp}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className={"col-xxl-3 col-lg-4 col-md-3 col-sm-12 " + styles.eventos} key={e.id}>
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
                                    {/*Criar campo verificação de certificados count com boolean*/}
                                    <>
                                        <hr/>
                                        <Card.Body>
                                            {e.atividades.map(a =>
                                                <Row key={a.id} className={"mb-2"}>

                                                    <span className={"p-2"}>{a.nome}</span>

                                                    <Col sm={"auto"} md={"auto"} lg={"auto"}>

                                                        {(a.certificados && a.certificados.length > 0) ?
                                                            <Button className={"mb-2"} variant={"outline-primary"}
                                                                    onClick={async () => {
                                                                        await handleDownloadCertificado(a.certificados![0].id);
                                                                    }} disabled={isLoading}>
                                                                {isLoading ?
                                                                    <Spinner animation={"border"} role={"status"}>
                                                                    <span
                                                                        className="visually-hidden">Carregando...</span>
                                                                    </Spinner> :
                                                                    <span>
                                                                        <FontAwesomeIcon icon={faDownload}
                                                                                         className={'me-2'}/>
                                                                        Baixar certificado
                                                                    </span>}
                                                            </Button> :
                                                            <Button style={{"cursor": 'default'}} variant={'secondary'}>
                                                                <FontAwesomeIcon icon={faTimesCircle}
                                                                                 className={'me-2'}/>
                                                                Certificado indisponível
                                                            </Button>}
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

            )) : <h1>Ainda não há participação em eventos</h1>}

        </Accordion>
    );
}