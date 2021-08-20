import CardEventoHome from "@components/CardEventoHome";
import styles from "./GridEventosHome.module.css"


export default function GridEventosHome() {

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
        {
            index: 6,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E76F51"
        },
        {
            index: 7,
            titulo: "Título",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E9C46A"
        },

    ];
    return (
        <div className={"container-fluid " + styles.area}>
            <h3>Veja os incríveis eventos mais próximos</h3>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-md-4 col-lg-3 col-sm-1 ${styles.cartao}`} key={e.index}>
                        <CardEventoHome id={e.index} titulo={e.titulo} descricao={e.descricao}/>
                    </div>
                ))}
            </div>
        </div>
    );
}