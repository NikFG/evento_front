import styles from "./Pesquisa.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import Select from "react-select";
import {Categoria, Instituicao} from "@types";

export interface PesquisaProps {
    handleSearch: (params: Array<any>) => void
    count: number
    categorias: Categoria[]
    instituicoes: Instituicao[]
}

export default function Pesquisa({handleSearch, count, categorias, instituicoes}: PesquisaProps) {

    const [query, setQuery] = React.useState("");
    const [catSelecionada, setCatSelecionada] = React.useState();
    const [dataInicio, setDataInicio] = React.useState('');
    const [dataFim, setDataFim] = React.useState('');
    const [horarioInicio, setHorarioInicio] = React.useState('');
    const [horarioFim, setHorarioFim] = React.useState('');
    const [instituicao, setInstituicao] = React.useState();

    const categoriasSelect = categorias.map(c => {
        return {label: c.nome, value: c.id}
    });

    const instituicoesSelect = instituicoes.map(i => {
        return {label: i.nome, value: i.id}
    });

    return (
        <div className={"container " + styles.pesquisaForm}>
            <div className={"row"}>
                <p className={"text-center " + styles.titulo}>Pesquise seus evento aqui</p>
            </div>

            <div className={"row justify-content-center"}>
                <div className={"col-sm-9 col-md-5 col-lg-5"}>
                    <input className={"form-control"} value={query} placeholder={"Pesquise nome evento"}
                           onChange={(event => {
                               setQuery(event.target.value)
                           })}/>
                </div>
                <div className={"col-sm-12 col-md-2 col-lg-2"}>
                    <button className={"btn btn-primary"} onClick={() => {
                        let params = [];
                        if (query) {
                            params.push(`q=${query}`)
                        }
                        if (catSelecionada) {
                            // @ts-ignore
                            params.push(`cat=${catSelecionada.value}`)
                        }
                        if (dataInicio) {
                            params.push(`dataInicio=${dataInicio}`)
                        }
                        if (dataFim) {
                            params.push(`dataFim=${dataFim}`)
                        }
                        if (horarioInicio) {
                            params.push(`horarioInicio=${horarioInicio}`)
                        }
                        if (horarioFim) {
                            params.push(`horarioFim=${horarioFim}`)
                        }
                        if (instituicao) {
                            // @ts-ignore
                            params.push(`instituicao=${instituicao.value}`)
                        }
                        handleSearch(params);
                    }}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
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
                                // @ts-ignore
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
                            value={instituicao}
                            isClearable={true}
                            onChange={(e) => {
                                // @ts-ignore
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