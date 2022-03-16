import styles from "./GeraCertificado.module.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import React, {ChangeEvent} from "react";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import {useRouter} from "next/router";
import {Apresentador, ModeloCertificado, User} from "@types";
import {AxiosResponse} from "axios";
import {toast, ToastContainer} from "react-toastify";
import Select from "react-select";
import Link from "next/link";
import {getDownloadURL, ref, uploadBytes, UploadResult} from "firebase/storage";
import {storage} from "../../firebase/initFirebase";
import {useSelector} from "react-redux";

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
    let token = useSelector((state: any) => state.token);

    async function handleSubmit() {

        const id = router.query.id;
        const axios = require('axios');
        const formData = new FormData();
        formData.append('participantes', JSON.stringify(participantesSelecionados));
        formData.append('apresentadores', JSON.stringify(apresentadoresSelecionados));
        formData.append('modelo', modelo!.value);

        await axios.post(`${api}/certificados/atividade/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res: AxiosResponse<any>) => {
            const lista = res.data;
            const url = lista.forEach((l: any) => {
                const pdfRef = ref(storage, `certificados/${l.id}/arquivo.pdf`);
                const pdfFile = new File([b64toBlob(l.pdf,'application/pdf',512)], 'Arquivo.pdf', {type: 'application/pdf'});

                return uploadBytes(pdfRef, pdfFile).then(async (snapshot: UploadResult) => {
                    return await getDownloadURL(snapshot.ref).then((url: string) => {
                        return url;
                    }).catch((err: Error) => {
                        console.error({err})
                        return null;
                    });
                });
            });
            console.log({url})
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

    function b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }

    function handleChangeApresentadores(e: ChangeEvent<HTMLInputElement>) {

        if (apresentadoresSelecionados.includes(e.target.value)) {
            let index = apresentadoresSelecionados.indexOf(e.target.value);
            setApresentadoresSelecionados(apresentadoresSelecionados.filter((_, i) => i !== index))
        } else {
            let a = [...apresentadoresSelecionados, e.target.value];
            console.log({a});
            setApresentadoresSelecionados(a);
        }
    }

    function handleChangeParticipantes(e: ChangeEvent<HTMLInputElement>) {
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
                                        <FormCheckInput value={u.id} onChange={handleChangeParticipantes}
                                                        defaultChecked={true}/>
                                        <FormCheckLabel>
                                            Participante - {u.nome}
                                        </FormCheckLabel>
                                        <hr/>
                                    </div>
                                })}
                                {apresentadores.map((u) => {
                                    return <div className="form-check" key={u.id}>
                                        <FormCheckInput value={u.id} onChange={handleChangeApresentadores}
                                                        defaultChecked={true}/>
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