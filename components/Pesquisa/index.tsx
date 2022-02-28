import styles from "./Pesquisa.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import Select from "react-select";
import {Categoria, Instituicao} from "@types";
import Router from "next/router";
import {Col} from "react-bootstrap";
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import {format} from "date-fns";

registerLocale("pt-BR", ptBR);

export interface PesquisaProps {
    count: number
    categorias: Categoria[]
    instituicoes: Instituicao[]
}

export default function Pesquisa({count, categorias, instituicoes}: PesquisaProps) {

    const [titulo, setTitulo] = React.useState("");
    const [catSelecionada, setCatSelecionada] = React.useState<{ label: string, value: number } | null>();
    const [dataInicio, setDataInicio] = React.useState<Date | null>();
    const [dataFim, setDataFim] = React.useState<Date | null>();
    const [horarioInicio, setHorarioInicio] = React.useState<Date | null>(new Date());
    const [horarioFim, setHorarioFim] = React.useState<Date | null>();
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
                        const horarioInicioFormatado = horarioInicio ? format(horarioInicio, "HH:mm") : "";
                        const horarioFimFormatado = horarioFim ? format(horarioFim, "HH:mm") : "";
                        const dataInicioFormatada = dataInicio ? format(dataInicio, "dd/MM/yyyy") : "";
                        const dataFimFormatada = dataFim ? format(dataFim, "dd/MM/yyyy") : "";
                        await Router.push({
                            pathname: '/eventos',
                            query: {
                                page: "1",
                                titulo,
                                cat: catSelecionada?.value.toString(),
                                "dataInicio": dataInicioFormatada,
                                "dataFim": dataFimFormatada,
                                "horarioInicio": horarioInicioFormatado,
                                "horarioFim": horarioFimFormatado,
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
                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
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
                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
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


                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
                        <DatePicker startDate={new Date()} className={"form-control"} placeholderText={"Data inicial"}
                                    locale={ptBR} selected={dataInicio} dateFormat="dd/MM/yyyy" isClearable={true}
                                    clearButtonTitle={'Limpar'}
                                    onChange={e => {
                                        setDataInicio(e);
                                    }}
                        />
                    </div>

                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
                        <DatePicker startDate={new Date()} className={"form-control"} placeholderText={"Data final"}
                                    locale={ptBR} selected={dataFim} dateFormat="dd/MM/yyyy" isClearable={true}
                                    clearButtonTitle={'Limpar'}
                                    onChange={e => {
                                        setDataFim(e);
                                    }}
                        />
                    </div>


                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
                        <DatePicker
                            selected={horarioInicio}
                            className={"form-control"}
                            placeholderText={"Horário inicial"}
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            timeIntervals={15}
                            dateFormat="HH:mm"
                            timeFormat={'HH:mm'}
                            isClearable={true}
                            clearButtonTitle={'Limpar'}
                            locale={ptBR}
                            timeCaption={"Horário"}

                            onChange={e => {
                                setHorarioInicio(e);
                            }}/>

                    </div>
                    <div className={"col-sm-12 col-md-4 col-lg-2 mb-3"}>
                        <DatePicker
                            selected={horarioFim}
                            className={"form-control"}
                            placeholderText={"Horário final"}
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            timeIntervals={15}
                            dateFormat="HH:mm"
                            timeFormat={'HH:mm'}
                            isClearable={true}
                            clearButtonTitle={'Limpar'}
                            locale={ptBR}
                            timeCaption={"Horário"}
                            onChange={e => {
                                setHorarioFim(e);
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