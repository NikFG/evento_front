import styles from './CardCategoria.module.css';
import {router} from "next/client";

export interface CardProps {
    index: number;
    titulo: string;
    descricao: string;
    cor: string;

}


export default function CardCategoria(props: CardProps) {
    return (
        <div className={"card text-center " + styles.divCard} style={{backgroundColor: props.cor}} onClick={() => {

        }}>
            <div className="card-body">
                <h5 className={"card-title  " + styles.titulo}>{props.titulo}</h5>

            </div>

        </div>
    );
};