import styles from "./TimeLine.module.css";
import {VerticalTimelineElement} from 'react-vertical-timeline-component';
import {ChangeEvent} from "react";

export interface TimeLineProps {
    id: number
    descricao: string,
    nome: string
    autor: string,
    horarioInicial: string,
    horarioFinal: string,
    instituicao: string
    handleCheckBox: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function TimeLine(props: TimeLineProps) {
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{background: '#00A6A6', color: '#fff'}}

            date={`${props.horarioInicial} - ${props.horarioFinal}`}
            iconStyle={{background: '#BBDEF0', color: '#fff'}}
            icon={<input className={"form-check-input " + styles.iconStyle} type={"checkbox"}
                         onChange={props.handleCheckBox} value={props.id}/>}
        >
            <h3 className="vertical-timeline-element-title mb-2">{props.nome}</h3>
            <h2 style={{color: 'white'}}>Apresentador: {props.autor}</h2>
            <h2 style={{color: 'white'}}>Instituição: {props.instituicao}</h2>
            <p>
                {props.descricao}
            </p>
        </VerticalTimelineElement>
    );
}