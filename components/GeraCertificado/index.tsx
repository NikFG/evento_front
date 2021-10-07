import styles from "./GeraCertificado.module.css";
import {Col, Row, Container, Form, Button} from "react-bootstrap";
import React, {ChangeEvent, FormEvent} from "react";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useRouter} from "next/router";
import {Atividade, User} from "@types";

export interface GeraCertificadoProps {
    api: string
    atividade: Atividade
}

export default function GeraCertificado({atividade, api}: GeraCertificadoProps) {
    const [participantes, setParticipantes] = React.useState<Array<string>>([]);
    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(participantes);
        const id = router.query.id;
        const axios = require('axios');
        const formData = new FormData();
        formData.append('participantes', JSON.stringify(participantes));
        await axios.post(`${api}/certificados/atividade/${id}`, formData);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (participantes.includes(e.target.value)) {
            let index = participantes.indexOf(e.target.value);
            setParticipantes(participantes.filter((_, i) => i !== index))
        } else {
            let p = [...participantes, e.target.value];
            setParticipantes(p);
        }
    }

    return (
        <Container>
            <Row className={"mt-2"}>
                <Col>
                    <Form method={"POST"} onSubmit={handleSubmit}>
                        {atividade.users?.map(u => {
                            return <div className="form-check">
                                <FormCheckInput value={u.id} onChange={handleChange}/>
                                <FormCheckLabel>
                                    {u.nome}
                                </FormCheckLabel>
                                <hr/>
                            </div>
                        })}
                        {/*             <div className="form-check">
                            <FormCheckInput value={"1"} onChange={handleChange}/>
                            <FormCheckLabel>
                                Nikollas Ferreira Gonçalves
                            </FormCheckLabel>
                            <hr/>
                        </div>
                        <div className="form-check">
                            <FormCheckInput value={"2"} onChange={handleChange}/>
                            <FormCheckLabel>
                                Nikollas Ferreira Gonçalves
                            </FormCheckLabel>
                            <hr/>
                        </div>
                        <div className="form-check">
                            <FormCheckInput value={"3"} onChange={handleChange}/>
                            <FormCheckLabel>
                                Nikollas Ferreira Gonçalves
                            </FormCheckLabel>
                            <hr/>
                        </div>
                        <div className="form-check">
                            <FormCheckInput value={"4"} onChange={handleChange}/>
                            <FormCheckLabel>
                                Nikollas Ferreira Gonçalves
                            </FormCheckLabel>
                            <hr/>
                        </div>*/}

                        <Col sm={"auto"} md={"auto"} lg={"auto"} className={"mt-2"}>
                            <Button type={'submit'}>
                                Confirmar
                            </Button>
                        </Col>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
}