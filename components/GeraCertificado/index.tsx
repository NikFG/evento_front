import styles from "./GeraCertificado.module.css";
import {Col, Row, Container, Form, Button} from "react-bootstrap";
import React, {ChangeEvent, FormEvent} from "react";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useRouter} from "next/router";
import {Atividade, User} from "@types";
import {AxiosResponse} from "axios";
import {toast, ToastContainer} from "react-toastify";

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
        await axios.post(`${api}/certificados/atividade/${id}`, formData).then(async (res: AxiosResponse<any>) => {
            await toast.success(`Participantes confirmados com sucesso!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await router.back();
        }).catch((error: any) => {
            console.error({error});
            toast.error(`${error.response.data.error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
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
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"colored"}
                style={{width: "500px", maxWidth: "1000px", whiteSpace: "pre-line"}}/>
            <Container>
                <Row className={"mt-2"}>
                    <Col>
                        <Form method={"POST"} onSubmit={handleSubmit}>
                            {atividade.users?.map(u => {
                                return <div className="form-check" key={u.id}>
                                    <FormCheckInput value={u.id} onChange={handleChange}/>
                                    <FormCheckLabel>
                                        {u.nome}
                                    </FormCheckLabel>
                                    <hr/>
                                </div>
                            })}
                            <Col sm={"auto"} md={"auto"} lg={"auto"} className={"mt-2"}>
                                <Button type={'submit'}>
                                    Confirmar
                                </Button>
                            </Col>
                        </Form>
                    </Col>

                </Row>
            </Container>
        </>
    );
}