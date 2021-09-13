// import styles from "./EventosCriados.module.evento.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faArrowRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Evento} from "@types";

export interface Props {
    evento: Evento
}

export default function EventoCriado(props: Props) {
    const [expandido, setExpandido] = React.useState(false);

    function handleEdit(id: number | undefined) {

    }

    function handleDelete(id: number | undefined) {

    }

    return (
        <>
            <div key={props.evento.id} className={"row my-3"}>
                <div className={"col-md-8 my-2"}>

                    <a className="" type="button"
                       data-bs-toggle="collapse"
                       data-bs-target={"#eventoCollapse" + props.evento.id}
                       aria-expanded="false"
                       onClick={() => {
                           setExpandido(!expandido);
                       }
                       }
                       aria-controls={"eventoCollapse" + props.evento.id}>
                                        <span className={"mx-2"}>
                                            {!expandido ? <FontAwesomeIcon icon={faArrowRight}/> :
                                                <FontAwesomeIcon icon={faArrowDown}/>}
                                        </span>
                        {props.evento.nome}
                    </a>
                </div>
                <div className={"col-md-4"}>
                    <button className={"btn btn-outline-secondary mx-2"} onClick={() => {
                        handleEdit(props.evento.id)
                    }}><FontAwesomeIcon icon={faEdit}/></button>
                    <button className={"btn btn-outline-danger mx-2"}><FontAwesomeIcon icon={faTrash} onClick={() => {
                        handleDelete(props.evento.id)
                    }}
                    /></button>
                </div>


                <div className="collapse multi-collapse mt-3"
                     id={"eventoCollapse" + props.evento.id}>
                    <div className="card card-body">
                        {props.evento.atividades.length > 0 ?
                            props.evento.atividades.map(a => {
                                return <span key={a.id}>{a.nome}</span>
                            })
                            :
                            <span>Ainda há atividades cadastradas</span>}
                    </div>
                </div>
            </div>


        </>
    );
}