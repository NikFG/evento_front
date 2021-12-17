import styles from "./Usuario.module.css";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import React from "react";
import {Certificado} from "@types";

export interface UserCertificadoProps {
    imprimir: (id: number) => void;
    certificados: Certificado[];
    isLoading: boolean;
}

export default function UserCertificado({imprimir, certificados, isLoading}: UserCertificadoProps) {
    return (
        <>
            {certificados && certificados.length > 0 ? certificados.map(c => {
                return <Row key={c.id} className={"mb-3"}>
                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                        {c.descricao}
                    </Col>
                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                        <Button onClick={async () => {
                            await imprimir(c.id);
                        }}>
                            {isLoading ?
                                <Spinner animation={"border"} role={"status"}>
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner> :
                                "Enviar por email"}
                        </Button>

                    </Col>

                </Row>
            }) : <h1>Sem certificados até então</h1>}
        </>
    );
}