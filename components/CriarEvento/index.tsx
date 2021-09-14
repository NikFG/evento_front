import styles from "./CriarEvento.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faEdit, faTrash, faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@components/Navbar";
import Select from 'react-select';
import React from "react";
import {Atividade, Categoria, Evento, TipoAtividade} from "@types";
import {AxiosResponse} from "axios";

interface CategoriaProps {
    categorias: Categoria[],
    tipo_atividades: TipoAtividade[],
    api: string
}

export default function CriarEvento({categorias, tipo_atividades, api}: CategoriaProps) {
    const [nomeEvento, setNomeEvento] = React.useState("");
    const [catSelecionada, setCatSelecionada] = React.useState({label: "", value: ""});
    const [breveEvento, setBreveEvento] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [descricaoEvento, setDescricaoEvento] = React.useState("");

    //atividades
    const [atividades, setAtividades] = React.useState<Atividade[]>([]);
    const [idAtividade, setIdAtividade] = React.useState(0);
    const [nomeAtividade, setNomeAtividade] = React.useState("");
    const [data, setData] = React.useState("");
    const [inicio, setInicio] = React.useState("");
    const [fim, setFim] = React.useState("");
    const [apresentador, setApresentador] = React.useState("");
    const [tipo, setTipo] = React.useState({value: 0});
    const [descricaoAtividade, setDescricaoAtividade] = React.useState("");

    //TODO
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let evento: Evento = {
            breve_descricao: breveEvento,
            descricao: descricaoEvento,
            expectativa_participantes: 0,
            link_evento: "",
            local,
            nome: nomeEvento,
            tipo: "",
            atividades

        }
        console.log(evento)
        const axios = require('axios')
        const formData = new FormData();
        for (const [k, v] of Object.entries(evento)) {
            if (k == "atividades") {
                formData.append(k, JSON.stringify(v))
            } else
                formData.append(k, v)
        }
        axios.post(`${api}/eventos/store`, formData, {
            headers: {
                "Content-Type": `multipart/form-data`,//; boundary=${formData._boundary}`,
            }
        }).then((r: AxiosResponse) => {
            console.log(r.data)
        }).catch((err: any) => {
            console.log(err)
        });

    }

    function limpaDados() {
        setNomeAtividade("")
        setIdAtividade(0)
        setData("")
        setInicio("")
        setFim("")
        setTipo({value: 0})
        setApresentador("")
        setDescricaoAtividade("")
    }

    function handleAtividadeSubmit() {
        let a: Atividade;
        if (idAtividade != 0) {
            a = {
                id: idAtividade,
                nome: nomeAtividade,
                descricao: descricaoAtividade,
                horario_fim: fim,
                horario_inicio: inicio,
                imagem: "",
                link_transmissao: "",
                local: "",
                tipo_atividade: tipo.value,
                data
            }
            let atividades_temp = atividades.find((atv) => atv.id == idAtividade);
            if (atividades_temp) {
                let temp_id = atividades.indexOf(atividades_temp)
                atividades_temp.nome = nomeAtividade;
                atividades[temp_id] = atividades_temp;
                setAtividades(atividades);
            }

        } else {
            let temp_index = 1
            if (atividades.length > 0) {
                temp_index = (atividades[atividades.length - 1].id ?? 0) + 1
            }
            // console.log("[TEMP_INDEX]" + temp_index)
            a = {
                id: temp_index,
                nome: nomeAtividade,
                descricao: descricaoAtividade,
                horario_fim: fim,
                horario_inicio: inicio,
                imagem: "",
                link_transmissao: "",
                local: "",
                tipo_atividade: tipo.value,
                data
            }
            setAtividades(atividades => [...atividades, a]);
        }
        limpaDados();

    }

    const categoriasSelect = categorias.map((c) => {
        return {value: c.id, label: c.nome}
    })

    const tipoSelect = tipo_atividades.map((ta) => {
        return {value: ta.id, label: ta.nome}
    });
    console.log(tipoSelect);


    function handleChange(selectedOption: any) {
        setCatSelecionada(selectedOption);
    }

    function deletaAtividade(id: number) {


        if (id) {
            let index = atividades.indexOf(atividades.find(a => a.id == id) as Atividade)
            setAtividades(atividades.filter((_, i) => i !== index))

        }
    }

    return (
        <>
            <Navbar/>

            <div className={styles.outer}>
                <form method={"POST"} onSubmit={handleSubmit}>
                    <div className={"mt-3 " + styles.inner}>

                        <h3>Criar um novo evento</h3>

                        <div className="form-group mb-3">
                            <label htmlFor={"nome"} className={"form-label"}>Nome do evento</label>
                            <input id="nome" type="text" className="form-control" max={100}
                                   placeholder="Digite o nome para seu evento"
                                   value={nomeEvento}
                                   onChange={(e) => {
                                       setNomeEvento(e.target.value)
                                   }}
                            />
                        </div>
                        <div className={"form-group mb-3"}>
                            <label htmlFor={"categoria"} className={"form-label"}>Selecione a categoria do
                                evento</label>
                            <Select
                                name={"categoria"}
                                id={"categoria"}
                                placeholder={"Selecione aqui"}
                                value={catSelecionada}
                                onChange={(e) => {
                                    if (e)
                                        setCatSelecionada(e)
                                }}
                                // @ts-ignore
                                options={categoriasSelect}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={"breve_descricao"} className={"form-label"}>Descreva brevemente seu
                                evento</label>
                            <input id="breve_descricao" type="text" className="form-control" max={100}
                                   placeholder="" required
                                   value={breveEvento}
                                   onChange={(e) => {
                                       setBreveEvento(e.target.value);
                                   }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={"local"} className={"form-label"}>Local de realização do evento</label>
                            <input id="local" type="text" className="form-control" max={100}
                                   placeholder=""
                                   value={local}
                                   onChange={(e) => {
                                       setLocal(e.target.value);
                                   }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descricao" className="form-label">Descreva seu evento</label>
                            <textarea className="form-control" id="descricao" rows={4} required
                                      value={descricaoEvento}
                                      onChange={(e) => {
                                          setDescricaoEvento(e.target.value);
                                      }}
                            />
                        </div>


                    </div>
                    <div className={"mt-3 " + styles.inner}>
                        <h3>Cadastro de atividades</h3>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <button className={"btn mb-2"} data-bs-toggle="modal" data-bs-target="#modal-atividade">
                                    <FontAwesomeIcon icon={faPlusCircle}/> Adicionar atividade
                                </button>
                                <div className="modal fade" id="modal-atividade" tabIndex={-1}
                                     aria-labelledby="modalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Cadastrar nova atividade</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close" onClick={() => limpaDados()}/>
                                            </div>

                                            <div className="modal-body">
                                                <div className={"form-group"}>
                                                    <input className={"form-control mb-3"} value={nomeAtividade}
                                                           onChange={(e) => {
                                                               setNomeAtividade(e.target.value)
                                                           }}/>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"
                                                              id="basic-addon1"><FontAwesomeIcon
                                                            icon={faCalendar}/></span>
                                                        <input className={"form-control"}
                                                               placeholder={"Escolha a data"} type={"date"}
                                                               value={data}
                                                               onChange={(e => {
                                                                   setData(e.target.value)
                                                               })}/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"
                                                              id="basic-addon1"><FontAwesomeIcon
                                                            icon={faClock}/></span>
                                                        <input className={"form-control"}
                                                               placeholder={"Escolha o horário"} type={"time"}
                                                               value={inicio}
                                                               onChange={(e => {
                                                                   setInicio(e.target.value)
                                                               })}/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"
                                                              id="basic-addon1"><FontAwesomeIcon
                                                            icon={faClock}/></span>
                                                        <input className={"form-control"}
                                                               placeholder={"Escolha o horário"} type={"time"}
                                                               value={fim}
                                                               onChange={(e => {
                                                                   setFim(e.target.value)
                                                               })}/>
                                                    </div>
                                                    <Select
                                                        className={"mb-3"}
                                                        name={"tipoAtividade"}
                                                        id={"tipoAtividade"}
                                                        placeholder={"Selecione aqui"}
                                                        value={tipo}
                                                        onChange={(e: any) => setTipo(e)}
                                                        options={tipoSelect}
                                                    />
                                                </div>
                                                <input className={"form-control mb-3"} type={"email"}
                                                       placeholder={"Apresentador"}
                                                       value={apresentador} onChange={(e) => {
                                                    setApresentador(e.target.value)
                                                }}/>
                                                <textarea className="form-control mb-3" id="descricao_atividade"
                                                          rows={4}
                                                          value={descricaoAtividade}
                                                          onChange={(e) => setDescricaoAtividade(e.target.value)}/>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal" onClick={() => limpaDados()}>
                                                    Fechar
                                                </button>
                                                <button type="button" className="btn btn-primary"
                                                        onClick={() => handleAtividadeSubmit()}
                                                        data-bs-dismiss={"modal"}>
                                                    Salvar
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                            {atividades.map(a => (
                                <div key={a.id} className={"row mb-3"}>
                                    <div className={"col-9"}>
                                        {a.nome}
                                    </div>
                                    <div className={"col-1 mx-2"}>
                                        <button className={"btn btn-outline-secondary"} data-bs-toggle="modal"
                                                data-bs-target="#modal-atividade"
                                                onClick={() => {
                                                    setNomeAtividade(a.nome)
                                                    setDescricaoAtividade(a.descricao)
                                                    setData(a.data)
                                                    setTipo(tipo);
                                                    setInicio(a.horario_inicio);
                                                    setFim(a.horario_fim);
                                                    setIdAtividade(a.id ?? 0)
                                                }}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </button>
                                    </div>
                                    <div className={"col-1"}>
                                        <button className={"btn btn-outline-danger"}
                                                onClick={() => deletaAtividade(a.id ?? 0)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </button>
                                    </div>
                                    <hr className={"my-1"}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={"mt-3 " + styles.inner}>
                        <h3>Cadastro de imagens</h3>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Coloque a imagem de banner</label>
                            <input className="form-control" type="file" id="formFile"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Selecione as demais imagens para
                                exibição</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple/>
                        </div>
                    </div>

                    <div className={"mt-3 " + styles.inner}>
                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Confirmar
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
