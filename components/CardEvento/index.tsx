import styles from './CardEvento.module.css';
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import blur from '@images/blur.png'
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
    return (
        <div className={"container"} onClick={() => {
            router.push(`/eventos/${id}`)
        }}>
            <div className="justify-content-center">
                <div className={"col-lg-10 col-md-8 " + styles.eventos}>
                    <div className={"mt-2"}>
                        <div style={{margin: "5px"}}>
                            {!banner ?
                                <Image src={`https://via.placeholder.com/500x400/e66?text=${id}`} width={500}
                                       height={400} alt={"placeholder"}/> :
                                <Image src={`data:image/jpeg;base64,${banner}`} width={500} height={400}
                                       blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                                       alt={"placeholder"}
                                />
                            }
                        </div>
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
        </div>
    );
};