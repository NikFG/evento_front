import styles from "./TimeLine.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export interface TimeLineProps {
    descricao: string,
    autor: string,
    horarioInicial: string,
    horarioFinal: string,
    instituicao: string
}

export default function TimeLine(props: TimeLineProps) {
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
            contentArrowStyle={{borderRight: '7px solid  rgb(33, 150, 243)'}}
            date={`${props.horarioInicial} - ${props.horarioFinal}`}
            iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
            icon={<FontAwesomeIcon icon={faMapMarkerAlt}/>}
        >
            <h3 className="vertical-timeline-element-title">{props.autor}</h3>
            <h4 className="vertical-timeline-element-subtitle">{props.instituicao}</h4>
            <p>
                {props.descricao}
            </p>
        </VerticalTimelineElement>
    );
}