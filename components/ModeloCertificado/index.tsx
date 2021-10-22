import styles from "./ModeloCertificado.module.css";
import CertificadoComponente from "@components/Certificado";
import React, {FormEvent} from "react";
import {Container, FormControl, FormGroup, FormLabel, Row, Col, Form, Button} from "react-bootstrap";
import InputMask from "react-input-mask";
import {ToastContainer, toast} from "react-toastify";
import {useRouter} from "next/router";

export interface ModeloCertificadoProps {
    api: string
    token: string
}

export default function ModeloCertificado({api, token}: ModeloCertificadoProps) {
    const router = useRouter();
    const [titulo, setTitulo] = React.useState("");
    const [assinatura, setAssinatura] = React.useState("0");
    const [logo, setLogo] = React.useState<File>();
    const [previewLogo, setPreviewLogo] = React.useState<string>();
    const [background, setBackground] = React.useState<File>();
    const [previewBackground, setPreviewBackground] = React.useState<string>();


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
    }, [logo, background])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const axios = require('axios');
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('numero_assinaturas', assinatura);
        if (background) {
            formData.append('imagem_fundo', background);
        }
        if (logo) {
            formData.append('logo', logo);
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
            await router.push('/');
        }).catch((err: any) => {
            for (const v of Object.values(err.response.data)) {
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
            <Container>
                <Form method={"POST"} onSubmit={handleSubmit}>
                    <Row className={"mb-3"}>
                        <Col sm={"12"} md={6} lg={4}>
                            <FormGroup className={"mb-3"} controlId={"titulo"}>
                                <FormLabel> Título</FormLabel>
                                <FormControl value={titulo} onChange={(e) => {
                                    setTitulo(e.target.value)
                                }}/>
                            </FormGroup>
                            <FormGroup className={"mb-3"}>
                                <FormLabel htmlFor={"assinatura"}>Assinaturas</FormLabel>
                                <InputMask id={"assinatura"} className={"form-control"} value={assinatura}
                                           onChange={(e) => {
                                               setAssinatura(e.target.value)
                                           }} mask={[/[0-6]/]}/>
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
                        </Col>
                    </Row>
                    <CertificadoComponente titulo={titulo} assinaturas={assinatura} logo={previewLogo}
                                           background={previewBackground}/>
                    <Button type={"submit"}>
                        Confirmar
                    </Button>
                </Form>
            </Container>
        </>
    )
        ;
}