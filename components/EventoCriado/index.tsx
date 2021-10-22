// import styles from "./EventosCriados.module.evento.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faArrowRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Evento} from "@types";
import {useRouter} from "next/router";

export interface Props {
    evento: Evento
}

export default function EventoCriado({evento}: Props) {

    function handleEdit(id: number | undefined) {

    }

    function handleDelete(id: number | undefined) {

    }

    return (
        <>


        </>
    );
}