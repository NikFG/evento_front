import styles from "./Certificado.module.css";
import Image from "next/image";
import banner from '@images/banner_aux.jpg'

export default function Certificado() {
    return (
        <>
            <div className={styles.main}>


                <div className={styles.imgTexto}>
                    <div className={"row " + styles.logo}>
                        LOGO
                    </div>
                    <div className={"row " + styles.titulo}>
                        Título
                    </div>
                    <div className={"row mt-2 " + styles.certificado}>
                        CERTIFICADO
                    </div>
                    <div className={"row mt-2 " + styles.divTexto}>
                        <p className={styles.texto}>Certifico que <span
                            className={styles.negrito}>NOME_ALUNO</span> participou com êxito da atividade <span
                            className={styles.negrito}>NOME_ATIVIDADE</span>
                            ATIVIDADE realizado em XX/XX/XXX durante o evento NOME_EVENTO com
                            a carga horário total de XX hora(s)</p>
                    </div>
                    <div className={"row mt-2 " + styles.cidade}>
                        Cidade, XX de mês de XXXX.
                    </div>
                    <div className={"row " + styles.assinaturasRow}>
                        <div className={"col-2"}/>
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
                        <div className={"col-2"}/>
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
                    </div>
                </div>

                <div className={styles.imgFundo}>
                    <Image
                        src={banner}
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