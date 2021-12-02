import styles from "./GeraCertificado.module.css";
import {Col, Row, Container, Form, Button} from "react-bootstrap";
import React, {ChangeEvent, FormEvent} from "react";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useRouter} from "next/router";
import {Apresentador, Atividade, ModeloCertificado, User} from "@types";
import {AxiosResponse} from "axios";
import {toast, ToastContainer} from "react-toastify";
import Select from "react-select";
import {parseCookies} from "nookies";
import Link from "next/link";

export interface GeraCertificadoProps {
    api: string
    apresentadores: Apresentador[]
    participantes: User[]
    modelos: ModeloCertificado[]
}

export default function GeraCertificado({apresentadores, participantes, api, modelos}: GeraCertificadoProps) {
    const [participantesSelecionados, setParticipantesSelecionados] = React.useState<Array<string>>([...participantes.map(p => p.id.toString())]);
    const [apresentadoresSelecionados, setApresentadoresSelecionados] = React.useState<Array<string>>([...apresentadores.map(a => a.id!.toString())]);
    const [modelo, setModelo] = React.useState<{ label: string, value: string } | null>();
    const router = useRouter();

    async function handleSubmit() {

        const id = router.query.id;
        const axios = require('axios');
        const formData = new FormData();
        formData.append('participantes', JSON.stringify(participantesSelecionados));
        formData.append('apresentadores', JSON.stringify(apresentadoresSelecionados));
        formData.append('modelo', modelo!.value);
        const {USER_TOKEN} = parseCookies();
        await axios.post(`${api}/certificados/atividade/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${USER_TOKEN}`
            }
        }).then(async (res: AxiosResponse<any>) => {
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

    function handleChangeParticipantes(e: ChangeEvent<HTMLInputElement>) {
        if (apresentadoresSelecionados.includes(e.target.value)) {
            let index = apresentadoresSelecionados.indexOf(e.target.value);
            setApresentadoresSelecionados(apresentadoresSelecionados.filter((_, i) => i !== index))
        } else {
            let a = [...apresentadoresSelecionados, e.target.value];
            setApresentadoresSelecionados(a);
        }
    }

    function handleChangeApresentadores(e: ChangeEvent<HTMLInputElement>) {
        if (participantesSelecionados.includes(e.target.value)) {
            let index = participantesSelecionados.indexOf(e.target.value);
            setParticipantesSelecionados(participantesSelecionados.filter((_, i) => i !== index))
        } else {
            let p = [...participantesSelecionados, e.target.value];
            setParticipantesSelecionados(p);
        }
    }

    const modelosSelect = modelos.map(i => {
        return {label: i.titulo, value: i.id.toString()}
    });


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
            <div className={styles.outer}>
                <div className={styles.inner}>
                    <Container>
                        <Row className={'mt-2'}>
                            <Col>
                                <h1>Selecione o modelo:</h1>
                            </Col>
                        </Row>
                        <Row className={'mt-2'}>
                            <Col>
                                <Select
                                    name={"modelo"}
                                    id={"modelo"}
                                    placeholder={"Modelo"}
                                    aria-placeholder={"Modelo"}
                                    value={modelo}
                                    isClearable={true}
                                    onChange={(e) => {
                                        setModelo(e);
                                    }}

                                    options={modelosSelect}
                                />
                            </Col>
                            <Col>
                                <Link href={`/certificados/modelo`}>
                                    <a className={'btn btn-outline-primary'}>Novo modelo</a>
                                </Link>
                            </Col>
                        </Row>

                        <Row className={'mt-4'}>
                            <Col>
                                <h1>Selecione os participantes:</h1>
                            </Col>
                        </Row>
                        <Row className={"mt-2"}>
                            <Col>

                                {participantes.map((u) => {
                                    return <div className="form-check" key={u.id}>
                                        <FormCheckInput value={u.id} onChange={handleChangeParticipantes} checked={true}/>
                                        <FormCheckLabel>
                                            Participante - {u.nome}
                                        </FormCheckLabel>
                                        <hr/>
                                    </div>
                                })}
                                {apresentadores.map((u) => {
                                    return <div className="form-check" key={u.id}>
                                        <FormCheckInput value={u.id} onChange={handleChangeApresentadores} checked={true}/>
                                        <FormCheckLabel>
                                            Apresentador - {u.nome}
                                        </FormCheckLabel>
                                        <hr/>
                                    </div>
                                })}
                                <Col sm={"auto"} md={"auto"} lg={"auto"} className={"mt-2"}>
                                    <Button onClick={() => handleSubmit()}>
                                        Confirmar
                                    </Button>
                                </Col>

                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>

        </>
    );
}