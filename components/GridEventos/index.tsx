import CardEventoHome from "@components/CardEventoHome";
import styles from "./GridEventos.module.css"


export default function GridEventos() {

    let eventos = [
        {
            index: 1,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#2A9D8F"
        },
        {
            index: 2,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E9C46A"
        },
        {
            index: 3,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E76F51"
        },
        {
            index: 4,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E76F51"
        },
        {
            index: 5,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#2A9D8F"
        },

    ];
    return (
        <div className={"container-fluid "+styles.area}>
            <h3>Veja os incríveis eventos mais próximos</h3>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-md-4 col-lg-4 col-sm-1 ${styles.cartao}`} key={e.index}>
                        <CardEventoHome index={e.index} titulo={e.titulo} descricao={e.descricao}/>
                    </div>
                ))}

            </div>
        </div>
    );
}