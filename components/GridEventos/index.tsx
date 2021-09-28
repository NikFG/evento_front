import CardEvento from "@components/CardEvento";
import styles from "./GridEventos.module.css"
import {Categoria, Evento, Instituicao} from '@types';
import React from "react";
import Pesquisa from "@components/Pesquisa";
import {useRouter} from "next/router";


export interface EventoProps {
    eventos: Evento[]
    categorias?: Categoria[]
    instituicoes?: Instituicao[]
}

export default function GridEventos({eventos, categorias, instituicoes}: EventoProps) {
    const router = useRouter();

    async function handleSearch(params: Array<any>) {
        let query = '';
        params.forEach(e => {
                query += e + '&';
            }
        )
        query = query.slice(0, -1);
        await router.push(`/eventos?${query}`);
    }

    return (
        <div className={"container-fluid"}>
            <Pesquisa handleSearch={handleSearch} count={eventos.length} categorias={categorias ?? []}
                      instituicoes={instituicoes ?? []}/>
            <div className="container mt-2">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="section-title text-center" style={{paddingBottom: "40px"}}>
                            <div className="line m-auto"/>
                            <h3 className={''}>Os maiores eventos você entra aqui!</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                {eventos.map(e => (
                    <div className={`col-sm-12 col-md-6 col-lg-4 ${styles.cartao}`} key={e.id}>
                        <CardEvento id={e.id ?? 0} nome={e.nome} descricao={e.breve_descricao}
                                    data_inicio={e.atividades[0].data} instituicao={e.instituicao?.nome ?? ""}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
