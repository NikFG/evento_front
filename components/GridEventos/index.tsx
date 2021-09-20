import CardEvento from "@components/CardEvento";
import styles from "./GridEventos.module.css"
import {Evento} from '@types';
import React from "react";


export interface EventoProps {
    eventos: Evento[]
}

export default function GridEventos({eventos}: EventoProps) {

    return (
        <div className={"container-fluid"}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="section-title text-center" style={{paddingBottom: "40px"}}>
                            <div className="line m-auto"/>
                            <h3 className={''}>Os maiores eventos você entra aqui!</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-4 ${styles.cartao}`} key={e.id}>
                        <CardEvento id={e.id ?? 0} nome={e.nome} descricao={e.breve_descricao}
                                    data_inicio={e.atividades[0].data} instituicao={e.instituicao?.nome ?? ""}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
