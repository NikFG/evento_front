import styles from "./Pesquisa.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import Select from "react-select";
import {Categoria, Instituicao} from "@types";
import Router from "next/router";
import {Col} from "react-bootstrap";


export interface PesquisaProps {
    count: number
    categorias: Categoria[]
    instituicoes: Instituicao[]
}

export default function Pesquisa({count, categorias, instituicoes}: PesquisaProps) {

    const [titulo, setTitulo] = React.useState("");
    const [catSelecionada, setCatSelecionada] = React.useState<{ label: string, value: number } | null>();
    const [dataInicio, setDataInicio] = React.useState('');
    const [dataFim, setDataFim] = React.useState('');
    const [horarioInicio, setHorarioInicio] = React.useState('');
    const [horarioFim, setHorarioFim] = React.useState('');
    const [instituicao, setInstituicao] = React.useState<{ label: string, value: number } | null>();


    const categoriasSelect = categorias.map(c => {
        return {label: c.nome, value: c.id}
    });

    const instituicoesSelect = instituicoes.map(i => {
        return {label: i.nome, value: i.id!}
    });

    return (
        <div className={"row mx-3 " + styles.pesquisaForm}>
            <div className={"row"}>
                <p className={"text-center " + styles.titulo}>Pesquise seus eventos aqui</p>
            </div>

            <div className={"row justify-content-center mb-2"}>
                <Col sm={12} md={5} lg={4} className={'mb-2'}>
                    <input className={"form-control"} value={titulo} placeholder={"Nome evento"}
                           onChange={(event => {
                               setTitulo(event.target.value)
                           })}/>
                </Col>

                <Col sm={12} md={4} lg={2} className={""}>
                    <button className={"btn btn-primary"} onClick={async () => {
                        // let params = [];
                        await Router.push({
                            pathname: '/eventos',
                            query: {
                                page: "1",
                                titulo,
                                cat: catSelecionada?.value.toString(),
                                dataInicio,
                                dataFim,
                                horarioInicio,
                                horarioFim,
                                instituicao: instituicao?.value.toString()
                            },
                        });
                    }}>
                        <FontAwesomeIcon icon={faSearch} className={'me-1'}/>Pesquisar
                    </button>
                </Col>
            </div>
            <hr/>
            <div className={styles.pesquisaAvancada}>
                <span className={styles.desc}>Pesquisa avançada</span>
                <div className={"row"}>
                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <Select
                            name={"categoria"}
                            id={"categoria"}
                            placeholder={"Categoria"}
                            aria-placeholder={"Categoria"}
                            value={catSelecionada}
                            isClearable={true}
                            onChange={(e) => {
                                setCatSelecionada(e)

                            }}

                            options={categoriasSelect}
                        />
                    </div>
                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <Select
                            name={"instituicao"}
                            id={"instituicao"}
                            placeholder={"Instituição"}
                            aria-placeholder={"Instituição"}
                            value={instituicao}
                            isClearable={true}
                            onChange={(e) => {
                                setInstituicao(e)

                            }}
                            options={instituicoesSelect}
                        />
                    </div>


                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <input name={"dataInicial"} className={"form-control"} type="date" value={dataInicio}
                               onChange={e => {
                                   setDataInicio(e.target.value)
                               }}
                        />
                    </div>

                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <input name={"dataFinal"} className={"form-control"} type={"date"} value={dataFim}
                               onChange={e => {
                                   setDataFim(e.target.value)
                               }}
                        />
                    </div>

                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <input name={"horarioFinal"} className={"form-control"} type={"time"} value={horarioFim}
                               onChange={e => {
                                   setHorarioFim(e.target.value)
                               }}
                        />
                    </div>

                    <div className={"col-sm-12 col-md-4 col-lg-3 mb-3"}>
                        <input name={"horarioInicial"} className={"form-control"} type={"time"} value={horarioInicio}
                               onChange={e => {
                                   setHorarioInicio(e.target.value)
                               }}
                        />
                    </div>
                </div>

                <div className={"row"}>
                    <div className={styles.contador}>
                        <span className={"mx-1"}>{count}</span> {count > 1 ? "resultados" : "resultado"}
                    </div>
                </div>
            </div>
        </div>
    );
}