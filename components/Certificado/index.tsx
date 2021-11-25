import styles from "./Certificado.module.css";
import Image from "next/image";
import banner from '@images/banner_aux.jpg'
import {Row, Col} from "react-bootstrap";


export interface CertificadoProps {
    logo: string | undefined
    background: string | undefined
    assinatura: string | undefined
    nome_assinatura: string
    cargo_assinatura: string
}

export default function CertificadoComponente({
                                                  logo,
                                                  background,
                                                  assinatura,
                                                  nome_assinatura,
                                                  cargo_assinatura
                                              }: CertificadoProps) {


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
                        <div className={"col-5"}/>
                        <div className={"col-3"}>
                            <Row className={styles.assinatura}>
                                {assinatura ?
                                    <Image src={assinatura} width={50} height={50} objectFit={"fill"} alt={"assinatura"}/>
                                    : <div>Assinatura</div>
                                }
                            </Row>
                            <Row className={""}>
                                {nome_assinatura}
                            </Row>
                            <Row className={styles.cargo}>
                                {cargo_assinatura}
                            </Row>
                        </div>
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