import styles from "./Checkout.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Atividade} from "@types";

export interface RowProps {
    a: Atividade
    index: number
    handleClickAtividade: (id: number, horas: number) => void
    inAtividades: boolean
    formatTime: (miliseconds: number) => string
}

export default function RowCheckout({a, index, handleClickAtividade, inAtividades, formatTime}: RowProps) {
    // console.log(inAtividades)
    const [participar, setParticipar] = React.useState(inAtividades);
    let diferenca = diferencaHorario();

    function inverteParticipar() {
        setParticipar(!participar);
        handleClickAtividade(a.id ?? 0, diferenca);
    }


    function diferencaHorario() {
        let inicio = new Date(`01/01/2007 ${a.horario_inicio}`).getTime();
        let fim = new Date(`01/01/2007 ${a.horario_fim}`).getTime();
        return fim - inicio;

    }

    return (
        <>
            <tr className={"align-middle"}>
                <th scope={"row"}>{index + 1}</th>
                <td className={styles.atividade}>
                    <h4>{a.nome}</h4>
                    <span className={"mb-1"}>Por: {a.apresentadores.map(apr => {
                        return apr.nome
                    }).join(", ")}</span>

                    <span>Dia {a.data} de {a.horario_inicio} as {a.horario_fim}</span>
                </td>
                <td>{/*diferenca.toLocaleString("pt-br",{style: 'currency',currency:"BRL"})*/}-</td>
                <td>{formatTime(diferenca)}</td>
                <td>
                    {
                        !participar ?
                            <button className={"btn btn-outline-success " + styles.botao}
                                    onClick={() => inverteParticipar()}>
                                <FontAwesomeIcon icon={faPlusCircle} size={"lg"}/>
                            </button>
                            :
                            <button className={"btn btn-outline-danger " + styles.botao}
                                    onClick={() => inverteParticipar()}>
                                <FontAwesomeIcon icon={faTimesCircle} size={"lg"}/>
                            </button>
                    }

                </td>
            </tr>
        </>
    );
}