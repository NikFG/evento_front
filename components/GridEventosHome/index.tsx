import CardEventoHome from "@components/CardEventoHome";
import styles from "./GridEventosHome.module.css"
import {Evento} from '@types';


export interface EventoProps {
    eventos: Evento[]
}

export default function GridEventosHome(props: EventoProps) {
    const eventos = props.eventos;

    return (
        <div className={"container-fluid " + styles.area}>
            <h3>Veja os incríveis eventos mais próximos</h3>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-md-4 col-lg-3 col-sm-1 ${styles.cartao}`} key={e.id}>
                        <CardEventoHome id={e.id ?? 0} titulo={e.nome} descricao={e.breve_descricao}
                                        data_inicio={e.atividades[0].data}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
