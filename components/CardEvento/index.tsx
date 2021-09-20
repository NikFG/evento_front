import styles from './CardEvento.module.css';
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";

export interface EventoProps {
    id: number,
    nome: string,
    descricao: string,
    data_inicio: string,
    instituicao: string,
    // categoria?: string,
}


export default function CardEvento({id, nome, descricao, data_inicio, instituicao}: EventoProps) {
    const router = useRouter();
    return (
        <div className={"container"} onClick={() => {
            router.push(`/eventos/${id}`)
        }}>
            <div className="justify-content-center">
                <div className={"col-lg-10 col-md-8 " + styles.eventos}>
                    <div className={"mt-2"}>
                        <div style={{margin: "5px"}}>
                            <Image src={`https://via.placeholder.com/500x400/e66?text=${id}`} width={500}
                                   height={400} alt={"placeholder"}/>
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