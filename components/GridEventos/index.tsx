import styles from "./GridEventos.module.css";
import CardEvento from "@components/CardEvento";
import {Evento, Instituicao, User} from "@types";

export interface EventoProps {
    eventos: Evento[]
}

export default function GridEventos(props: EventoProps) {
    return (
        <div className={"container-fluid " + styles.area}>
            <h3>Veja os incríveis eventos mais próximos</h3>
            <div className={"row"}>
                {props.eventos.map(e => (
                    <div className={`col-md-4 col-lg-3 col-sm-1 ${styles.cartao}`} key={e.id}>
                        <CardEvento id={e.id}
                                    nome={e.nome}
                                    categoria={e.categoria.nome}
                                    tipo={e.tipo}
                                    breve_descricao={e.breve_descricao}
                                    instituicao={"123"}/>
                    </div>
                ))}
            </div>
        </div>
    );
}