import styles from "./CardEvento.module.css";
import Image from "next/image";
import {useRouter} from 'next/router';

export interface EventoProps {
    id?: number,
    nome: string,
    breve_descricao: string,
    instituicao: string,
    categoria?: string,
    tipo: string,
}

export default function CardEvento(props: EventoProps) {
    const router = useRouter();
    return (
        <div className={"card " + styles.divCard} onClick={() => {
           router.push(`/eventos/${props.id}`)
        }}>
            <div className={"card-header"}><h5 className="card-title">{props.nome}</h5></div>
            <Image src={`https://via.placeholder.com/500x400/e66?text=${props.id}`} width={500} height={400}
                   alt={"teste"}/>
            <div className={""}>
                <ul className={"list-group list-group-flush"}>
                    <li className={"list-group-item"}><p className="card-text">{props.breve_descricao}</p></li>
                    <li className={"list-group-item"}><p className={"card-text"}>{props.categoria} - {props.tipo}</p>
                    </li>
                </ul>

            </div>

            <div className={"card-footer"}>Data: 23/08/2021</div>
        </div>
    );
}