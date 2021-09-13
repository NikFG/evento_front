// import styles from "./EventoParticipado.module.evento.css";
import React from "react";
import {Evento} from "@types";

export interface Props {
    evento: Evento

}

export default function EventoParticipado(props: Props) {
    function handleCertificado() {

    }

    return (
        <>
            <h3>{props.evento.nome}</h3>

            {

                props.evento.atividades?.map(a => {
                    return (
                        <div className={"my-3 row"} key={a.id}>
                            <div className={"col-12"}>
                                <span>{a.nome}</span>
                                {a.pivot?.participou == 1 ?
                                    <button className={"btn btn-primary mx-2"}
                                            onClick={() => handleCertificado()}>
                                        Gerar certificado
                                    </button> :
                                    <span
                                        className={"mx-2"}>Você ainda não participou do evento para possuir certificado</span>}
                            </div>


                        </div>
                    )
                })
            }

            <hr/>
        </>
    );
}