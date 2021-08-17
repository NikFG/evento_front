import styles from './CardCategoria.module.css';
import Image from "next/image";
import {AppProps} from 'next/app';

export interface CardProps {
    index: number;
    titulo: string;
    descricao: string;

}

export default function CardCategoria(props: CardProps) {
    return (
        <div className={"card " + styles.divCard} onClick={() => {
            alert("teste")
        }}>
            <Image src={`https://via.placeholder.com/500x400/e66?text=${props.index}`} width={500} height={400}
                   alt={"teste"}/>
            <div className="card-body">
                <h5 className="card-title">{props.titulo + props.index}</h5>
                <p className="card-text">{props.descricao}</p>
            </div>
            <div className={"card-footer"}>Data: 23/08/2021</div>
        </div>
    );
};