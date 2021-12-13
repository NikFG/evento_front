import styles from "./Usuario.module.css";
import {Button, Col, Row} from "react-bootstrap";
import React from "react";
import {Certificado} from "@types";

export interface UserCertificadoProps {
    imprimir: (id: number) => void;
    certificados: Certificado[];
}

export default function UserCertificado({imprimir, certificados}: UserCertificadoProps) {
    return (
        <>
            {certificados ? certificados.map(c => {
                return <Row key={c.id} className={"mb-3"}>
                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                        {c.descricao}
                    </Col>
                    <Col sm={"auto"} md={"auto"} lg={"auto"}>
                        <Button onClick={async () => {
                            await imprimir(c.id)
                        }}>
                            Enviar por email
                        </Button>

                    </Col>

                </Row>
            }) : <h1>Sem certificados até então</h1>}
        </>
    );
}