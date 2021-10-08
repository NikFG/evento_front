import styles from "./ModeloCertificado.module.css";
import CertificadoComponente from "@components/Certificado";
import React from "react";
import {Container, FormControl, FormGroup, FormLabel, Row, Col} from "react-bootstrap";
import InputMask from "react-input-mask";

export default function ModeloCertificado() {
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
        if(background){

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
    return (
        <Container>
            <Row className={"mb-3"}>

                <Col sm={"12"} md={6} lg={4}>
                    <FormGroup className={"mb-3"} controlId={"titulo"}>
                        <FormLabel>Título</FormLabel>
                        <FormControl value={titulo} onChange={(e) => {
                            setTitulo(e.target.value)
                        }}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"} controlId={"assinaturas"}>
                        <FormLabel htmlFor={"assinatura"}>Assinaturas</FormLabel>
                        <InputMask id={"assinatura"} className={"form-control"} value={assinatura} onChange={(e) => {
                            setAssinatura(e.target.value)
                        }} mask={'9'}/>
                    </FormGroup>

                    <FormGroup className={"mb-3"}>
                        <FormLabel htmlFor={"logo"}>Logo</FormLabel>
                        <input className="form-control" type="file" id="logo" onChange={e => {
                            setLogo(e.target.files?.[0]);
                        }}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"} controlId={"imagem"}>
                        <FormLabel htmlFor={"background"}>Imagem de fundo</FormLabel>
                        <input className="form-control" type="file" id="background" onChange={e => {
                            setBackground(e.target.files?.[0]);
                        }}/>
                    </FormGroup>
                </Col>
            </Row>
            <CertificadoComponente titulo={titulo} assinaturas={assinatura} logo={previewLogo} background={previewBackground}/>
        </Container>
    );
}