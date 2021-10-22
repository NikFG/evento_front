import styles from "./Certificado.module.css";
import Image from "next/image";
import banner from '@images/banner_aux.jpg'
import {Row, Col} from "react-bootstrap";


export interface CertificadoProps {
    titulo: string
    logo: string | undefined
    assinaturas: string
    background: string | undefined
}

export default function CertificadoComponente({titulo, logo, assinaturas, background}: CertificadoProps) {


    return (
        <>
            <div className={styles.main}>
                <div className={styles.imgTexto}>
                    <Row className={styles.logo}>
                        {logo ?
                            <Image src={logo} height={100} width={900} alt={"logo"}/>
                            :
                            <div style={{height: "100px", width: "100%", border: "1px solid black"}}>Cabeçalho</div>
                        }
                    </Row>
                    <div className={"row " + styles.titulo}>
                        {titulo}
                    </div>
                    <div className={"row mt-2 " + styles.certificado}>
                        CERTIFICADO
                    </div>
                    <div className={"row mt-2 " + styles.divTexto}>
                        <p className={styles.texto}>Certifico que <span
                            className={styles.negrito}>NOME_ALUNO</span> participou com êxito da atividade <span
                            className={styles.negrito}>NOME_ATIVIDADE</span> realizada
                            em XX/XX/XXX durante o evento NOME_EVENTO com
                            a carga horário total de XX hora(s)</p>
                    </div>
                    <div className={"row mt-2 " + styles.cidade}>
                        Cidade, XX de mês de XXXX.
                    </div>
                    <Row className={styles.assinaturasRow}>
                        {Array.from({length: parseInt(assinaturas)}).map((_, i) => {

                            return <>
                                {
                                    parseInt(assinaturas) === 1 ? <div className={"col-4"}/>
                                        : parseInt(assinaturas) === 2 ? <div className={"col-2"}/>
                                            : <div className={"col-1"} style={{marginLeft: "-10px"}}/>
                                }

                                <div className={"col-3"}>
                                    <div className={"row " + styles.assinatura}>
                                        a
                                    </div>
                                    <div className={"row"}>
                                        NOME_PESSOA
                                    </div>
                                    <div className={"row " + styles.cargo}>
                                        CARGO
                                    </div>
                                </div>

                            </>
                        })}
                    </Row>
                </div>

                <div className={styles.imgFundo}>

                    <Image
                        src={background ? background : banner}
                        alt={'banner'}
                        objectFit={'cover'}
                        objectPosition={'center'}
                        height={700}
                        width={1123}
                    />
                </div>
            </div>
        </>
    );
}