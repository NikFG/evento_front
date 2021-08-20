import styles from './CardEventoHome.module.css';
import Image from "next/image";
import {useRouter} from "next/router";

export interface EventoProps {
    id: number;
    titulo: string;
    descricao: string;
}


export default function CardEventoHome(props: EventoProps) {
    const router = useRouter();
    return (
        <div className={"card " + styles.divCard} onClick={() => {
            router.push(`/eventos/${props.id}`)
        }}>
            <div className={"card-header"}><h5 className="card-title">{props.titulo + props.id}</h5></div>
            <Image src={`https://via.placeholder.com/500x400/e66?text=${props.id}`} width={500} height={400}
                   alt={"teste"}/>
            <div className="card-body">

                <p className="card-text">{props.descricao}</p>
            </div>
            <div className={"card-footer"}>Data: 23/08/2021</div>
        </div>
    );
};