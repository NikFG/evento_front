import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import React from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ModeloCertificado} from "@types";
import {useRouter} from "next/router";

export interface ModeloCertificadoProps {
    modelos: ModeloCertificado[]
    CustomToggle: any
}

export default function ModeloCertificadoUser({modelos, CustomToggle}: ModeloCertificadoProps) {
    const router = useRouter();
    return (
        <>
            <Row>
                <Col sm={12} md={4} lg={4} className={"mb-3"}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                                <Button onClick={async () => {
                                    await router.push('/certificados/modelo')
                                }}>
                                    <FontAwesomeIcon icon={faPlus} className={'me-2'}/>
                                    Criar modelo de certificado
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={modelos ? 5 : 12} lg={modelos ? 3 : 12}>
                    {modelos ? modelos.map(m => {
                        return (
                            <Card key={m.id}>
                                <Card.Header>
                                    {m.titulo}
                                </Card.Header>
                                <Card.Body>
                                    <Accordion>
                                        <div className={"d-flex justify-content-center "}>
                                            <CustomToggle eventKey={m.id!.toString()}/>
                                        </div>

                                        <Accordion.Collapse eventKey={m.id!.toString()}>
                                            <>
                                                <hr/>

                                                <Card.Body>
                                                    {m.certificados ? m.certificados!.map(c =>
                                                        <Row key={c.id} className={"mb-2"}>
                                                            <Card.Title>Eventos utilizados</Card.Title>
                                                            <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                                                <span className={"p-2"}>{c.nome_evento}</span>
                                                            </Col>

                                                        </Row>
                                                    ) : <Card.Title>Sem eventos com este modelo</Card.Title>}
                                                </Card.Body>
                                            </>
                                        </Accordion.Collapse>
                                    </Accordion>

                                </Card.Body>
                            </Card>
                        )
                    }) : <h1>Sem modelos até então</h1>}
                </Col>
            </Row>
        </>
    );
}