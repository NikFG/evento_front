import styles from "./ModeloCertificado.module.css";
import CertificadoComponente from "@components/Certificado";
import React, {FormEvent} from "react";
import {FormControl, FormGroup, FormLabel, Row, Col, Form, Button, Spinner} from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";
import {useRouter} from "next/router";
import {AxiosError} from "axios";

export interface ModeloCertificadoProps {
    api: string
    token: string
}

export default function ModeloCertificado({api, token}: ModeloCertificadoProps) {
    const router = useRouter();
    const [logo, setLogo] = React.useState<File>();
    const [previewLogo, setPreviewLogo] = React.useState<string>();

    const [background, setBackground] = React.useState<File>();
    const [previewBackground, setPreviewBackground] = React.useState<string>();

    const [assinatura, setAssinatura] = React.useState<File>();
    const [previewAssinatura, setPreviewAssinatura] = React.useState<string>();

    const [nomeAssinatura, setNomeAssinatura] = React.useState("");
    const [cargoAssinatura, setCargoAssinatura] = React.useState("");
    const [titulo, setTitulo] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        if (logo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewLogo(reader.result as string);
            };
            reader.readAsDataURL(logo)
        } else {
            // @ts-ignore
            setPreviewLogo(null);
        }

        if (background) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewBackground(reader.result as string);
            };
            reader.readAsDataURL(background)
        } else {
            // @ts-ignore
            setPreviewBackground(null);
        }

        if (assinatura) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAssinatura(reader.result as string);
            };
            reader.readAsDataURL(assinatura)
        } else {
            // @ts-ignore
            setPreviewAssinatura(null);
        }

    }, [logo, background, assinatura])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const axios = require('axios');
        const formData = new FormData();
        formData.append('nome_assinatura', nomeAssinatura);
        formData.append('cargo_assinatura', cargoAssinatura);
        formData.append('titulo', titulo);
        if (background) {
            formData.append('imagem_fundo', background);
        }
        if (logo) {
            formData.append('logo', logo);
        }
        if (assinatura) {
            formData.append('assinatura', assinatura);
        }
        await axios.post(`${api}/modelos/store`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `multipart/form-data`,
            }
        }).then(async () => {
            await toast.success("Modelo criado!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await router.back();
        }).catch((err: AxiosError) => {
            for (const v of Object.values(err.response!.data)) {
                console.log(v);
                toast.error(`${v}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).finally(() => {
            setIsLoading(false);
        });

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
            <div className={styles.outer}>
                <Form method={"POST"} onSubmit={handleSubmit}>
                    <div className={"mt-3 " + styles.inner}>
                        <Row className={"mb-3"}>
                            <FormGroup className={'mb-3'}>
                                <FormLabel htmlFor={"titulo"}>Título</FormLabel>
                                <FormControl
                                    id={"titulo"}
                                    type={"text"}
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                    required={true}/>
                            </FormGroup>

                            <FormGroup className={"mb-3"}>
                                <FormLabel htmlFor={"logo"}>Logo</FormLabel>
                                <input className="form-control" type="file" id="logo" onChange={e => {
                                    setLogo(e.target.files?.[0]);
                                }}/>
                            </FormGroup>

                            <FormGroup className={"mb-3"}>
                                <FormLabel htmlFor={"background"}>Imagem de fundo</FormLabel>
                                <input className="form-control" type="file" id="background" onChange={e => {
                                    setBackground(e.target.files?.[0]);
                                }}/>
                            </FormGroup>

                            <FormGroup className={"mb-3"}>
                                <FormLabel htmlFor={"background"}>Imagem assinatura</FormLabel>
                                <input className="form-control" type="file" id="assinatura" onChange={e => {
                                    setAssinatura(e.target.files?.[0]);
                                }}/>
                            </FormGroup>
                            <Col lg={5} md={7} sm={12}>
                                <FormGroup className={"mb-3"}>
                                    <FormLabel htmlFor={"background"}>Nome assinatura</FormLabel>
                                    <input className="form-control" type="text" id="nome_assinatura"
                                           value={nomeAssinatura}
                                           onChange={e => {
                                               setNomeAssinatura(e.target.value);
                                           }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={5} md={7} sm={12}>
                                <FormGroup className={"mb-3"}>
                                    <FormLabel htmlFor={"background"}>Cargo assinatura</FormLabel>
                                    <input className="form-control" type="text" id="cargo_assinatura"
                                           value={cargoAssinatura} onChange={e => {
                                        setCargoAssinatura(e.target.value);
                                    }}/>
                                </FormGroup>
                            </Col>

                        </Row>


                        <Button type={"submit"}>
                            {isLoading ?
                                <Spinner animation={"border"} role={"status"}>
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner> : "Confirmar"}
                        </Button>
                    </div>
                </Form>
                <div className={"d-flex align-items-center mt-3 " + styles.previewCertificado}>
                    <p className={styles.previewCertificadoTexto}>Pré visualização do certificado</p>
                </div>
                <div className={"d-flex align-items-center mt-3 mb-3 " + styles.certificado}>


                    <CertificadoComponente
                        logo={previewLogo}
                        assinatura={previewAssinatura}
                        background={previewBackground}
                        nome_assinatura={nomeAssinatura}
                        cargo_assinatura={cargoAssinatura}
                    />
                </div>
            </div>
        </>
    );
}