import styles from './CardEvento.module.css';
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {motion} from "framer-motion";

export interface EventoProps {
    id: number,
    nome: string,
    descricao: string,
    data_inicio: string,
    instituicao: string,
    banner?: string
}


export default function CardEvento({id, nome, descricao, data_inicio, instituicao, banner}: EventoProps) {
    const router = useRouter();
    const easing = [0.6, -0.05, 0.01, 0.99];
    const fadeInUp = {
        initial: {
            y: 60,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: easing
            }
        },
    }


    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className={"container"}
            onClick={() => {
                router.push(`/eventos/${id}`)
            }}>
            <div className="justify-content-center">
                <div className={"col-lg-10 col-md-8 " + styles.eventos}>
                    <div className={"mt-2"}>
                        <motion.div
                            initial={{x: 60, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{delay: 0.4}}
                            style={{margin: "5px"}}>
                            {!banner ?
                                <div style={{borderRadius: "10px", overflow: "hidden"}}>
                                    <Image src={`https://via.placeholder.com/500x400/e66?text=${id}`} width={500}
                                           height={400}
                                           alt={"placeholder"}/>
                                </div> :
                                <div style={{borderRadius: "10px", overflow: "hidden"}}>
                                    <Image src={banner} width={500} height={400}
                                           layout={'responsive'}
                                           blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                                           alt={"placeholder"}/>
                                </div>
                            }
                        </motion.div>
                    </div>
                    <div style={{margin: "10px"}}>
                        <h2>
                            {nome}
                        </h2>
                        <hr/>
                        <p className="mx-3">{descricao}</p>
                        <hr/>
                        <p className={"mx-3"}>
                            <span>Evento por: {instituicao}</span>
                        </p>
                        <p className={"mx-3"}>
                            Início: {data_inicio}
                        </p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};