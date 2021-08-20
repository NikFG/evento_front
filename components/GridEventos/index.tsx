import styles from "./GridEventos.module.css";
import CardEvento from "@components/CardEvento";


export default function GridEventos() {
    let eventos = [
        {
            id: 1,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
        {
            id: 2,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
        {
            id: 3,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
        {
            id: 4,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
        {
            id: 5,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
        {
            id: 6,
            nome: "Evento de laravel",
            breve_descricao: "evento muito legal e chamativo",
            instituicao: "IFMG",
            categoria: "Evento",
            tipo: "minicruso"
        },
    ]
    return (
        <div className={"container-fluid " + styles.area}>
            <h3>Veja os incríveis eventos mais próximos</h3>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-md-4 col-lg-3 col-sm-1 ${styles.cartao}`} key={e.id}>
                        <CardEvento id={e.id}
                                    nome={e.nome}
                                    categoria={e.categoria}
                                    tipo={e.tipo}
                                    instituicao={e.instituicao}
                                    breve_descricao={e.breve_descricao}/>
                    </div>
                ))}
            </div>
        </div>
    );
}