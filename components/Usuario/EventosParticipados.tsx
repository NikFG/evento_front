import styles from "./Usuario.module.css";
import {Accordion, Card, Col, Row} from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import React from "react";
import {Evento} from "@types";

export interface EventosParticipadosProps {
    eventos_participados: Evento[];
    CustomToggle: any;
    id_usuario: number;
}

export default function EventosParticipados({eventos_participados, CustomToggle, id_usuario}: EventosParticipadosProps) {
    return (
        <Accordion>
            {eventos_participados.map(e => {
                return <Card className={"mb-3"} key={e.id}>
                    <Card.Header style={{background: "transparent", paddingBottom: "0"}}>
                        <div className={"d-flex flex-row bd-highlight"}>
                            <div className={"bd-highlight p-2"}>
                                {e.nome}
                            </div>

                            <div className={"ms-auto bd-highlight flex-shrink"}>
                                <CustomToggle eventKey={e.id}/>

                            </div>
                        </div>
                    </Card.Header>
                    {/* @ts-ignore*/}
                    <Accordion.Collapse eventKey={e.id ?? ""}>
                        <Card.Body>

                            {e.atividades.map(a => {
                                    let u = a.users?.find((u) => {
                                        return u.id === id_usuario
                                    });

                                    return <Row key={a.id} className={"mb-2"}>
                                        <Col>
                                            <span>{a.nome}</span>
                                            <ReactTooltip id='global' aria-haspopup='true' effect="solid"
                                                          type={"info"}>
                                                Certificado gerado

                                            </ReactTooltip>
                                            {
                                                u?.pivot?.participou === 1 ?
                                                    <a data-tip={a.id} data-for='global' className={"ms-2"}>
                                                        <FontAwesomeIcon icon={faCheckCircle}
                                                                         color={"green"}/>
                                                    </a> : <span/>

                                            }
                                            <hr/>
                                        </Col>

                                    </Row>
                                }
                            )}

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            })}

        </Accordion>
    );
}