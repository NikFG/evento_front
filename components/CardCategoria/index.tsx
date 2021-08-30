import styles from './CardCategoria.module.css';
import {useRouter} from "next/router";
import {Categoria} from "@types";

export interface CategoriaProps {
    cor: string,
    categoria: Categoria
}


export default function CardCategoria(props: CategoriaProps) {
    const router = useRouter();
    return (
        <div className={styles.divPrincipal}>
            <div className={"card text-center " + styles.divCard} style={{backgroundColor: props.cor}} onClick={() => {

               router.push(`/eventos/categorias/${props.categoria.id}`)
            }}>
                <div className="card-body">
                    <h5 className={"card-title  " + styles.titulo}>{props.categoria.nome}</h5>

                </div>

            </div>
        </div>
    );
};