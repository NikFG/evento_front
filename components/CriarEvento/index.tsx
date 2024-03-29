import styles from "./CriarEvento.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';
import React from "react";
import {Atividade, Categoria, Evento, TipoAtividade} from "@types";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import Image from "next/image";
import teste from '@images/banner_aux.jpg'
import {useSelector} from "react-redux";
import {verificaToken} from "utils";
import {parseCookies} from "nookies";
import DatePicker, {registerLocale} from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import {format, parse} from "date-fns";
import {storage} from "../../firebase/initFirebase";
import {ref, uploadBytes, getDownloadURL, UploadResult} from 'firebase/storage';

registerLocale("pt-BR", ptBR);

interface CategoriaProps {
    categorias: Categoria[],
    tipo_atividades: TipoAtividade[],
    api: string,
    evento_edit?: Evento
}

export default function CriarEvento({categorias, tipo_atividades, api, evento_edit}: CategoriaProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);


    const [nomeEvento, setNomeEvento] = React.useState("");
    const [catSelecionada, setCatSelecionada] = React.useState<{ label: string, value: number }>();
    const [breveEvento, setBreveEvento] = React.useState("");
    const [local, setLocal] = React.useState("");
    const [descricaoEvento, setDescricaoEvento] = React.useState("");
    const [outrasImagens, setOutrasImagens] = React.useState<FileList>();
    const [banner, setBanner] = React.useState<File | null>();
    const [bannerPreview, setBannerPreview] = React.useState<string>();
    const [imagensPreview, setImagensPreview] = React.useState<Array<File> | null>();


    //certificados
    const [atividades, setAtividades] = React.useState<Atividade[]>([]);
    const [idAtividade, setIdAtividade] = React.useState(0);
    const [nomeAtividade, setNomeAtividade] = React.useState("");
    const [data, setData] = React.useState<Date | null>();
    const [inicio, setInicio] = React.useState<Date | null>();
    const [fim, setFim] = React.useState<Date | null>();
    const [tipo, setTipo] = React.useState<{ value: number, label: string } | null>(null);
    const [descricaoAtividade, setDescricaoAtividade] = React.useState("");
    const [localAtividade, setLocalAtividade] = React.useState("");
    const [apresentadoresNome, setApresentadoresNome] = React.useState<Array<string>>([""]);
    const [apresentadoresEmail, setApresentadoresEmail] = React.useState<Array<string>>([""]);
    const [urlAtividade, setUrlAtividade] = React.useState("");
    let token = useSelector((state: any) => state.token);
    const user_criptografado = useSelector((state: any) => state.user_criptografado);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            let evento: Evento = {
                breve_descricao: breveEvento,
                descricao: descricaoEvento,
                expectativa_participantes: 0,
                link_evento: "",
                local,
                nome: nomeEvento,
                tipo: "",
                atividades,
                categoria_id: catSelecionada?.value,
                id: evento_edit ? evento_edit.id : undefined

            }
            const axios = require('axios')
            const formData = new FormData();

            for (const [k, v] of Object.entries(evento)) {
                if (k == "atividades") {
                    for (const [ka, va] of Object.entries(v)) {
                        // @ts-ignore
                        for (const [kAtv, vAtv] of Object.entries(va)) {
                            if (kAtv == "apresentadores") {
                                // @ts-ignore
                                for (const [kAp, vAp] of Object.entries(vAtv)) {
                                    // @ts-ignore
                                    for (const [kApNome, vApNome] of Object.entries(vAp)) {
                                        // @ts-ignore
                                        formData.append(`atividades[${ka}][${kAtv}][${kAp}][${kApNome}]`, vApNome);
                                    }
                                }
                            } else {
                                // @ts-ignore
                                formData.append(`atividades[${ka}][${kAtv}]`, vAtv);
                            }
                        }
                    }
                } else {
                    formData.append(k, v);
                }
            }

            /*   if (outrasImagens) {
                   Array.from(outrasImagens).forEach(i => {
                       formData.append("imagem[]", i);
                   });
               }
               if (banner)
                   formData.append("banner", banner)*/

            let url = `${api}/eventos/store`;
            if (evento_edit) {
                url = `${api}/eventos/update/${evento.id}`
            }

            const isValid: boolean = await verificaToken(api, token, user_criptografado);

            if (!isValid) {
                const cookies = parseCookies(null, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: 'strict',
                    secure: true

                })
                token = cookies.USER_TOKEN;
            }

            await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": `multipart/form-data`,
                }
            }).then(async (r: AxiosResponse) => {
                if (r.status === 200) {
                    const id = r.data.id;
                    await uploadFirebaseBanner(id, banner!, 'banner');
                    if (outrasImagens && outrasImagens.length > 0)
                        await uploadFirebaseImagens(id, outrasImagens, 'outras');
                    await router.push('/');
                }
            }).catch((err: AxiosError) => {
                console.error({erro: err.response?.data})
                if (err.response?.status !== 403 && err.response?.status !== 500) {

                    for (const [_, v] of Object.entries(err.response?.data.message)) {
                        toast.error(`${v}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                } else {
                    toast.error(`${err.response?.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            });
        } catch
            (err) {
            toast.error(`${err}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function uploadFirebaseBanner(evento_id: number, banner: File, tipo: string) {
        const imageRef = ref(storage, `eventos/${evento_id}/${tipo}/${banner.name}`);
        const url = await uploadBytes(imageRef, banner).then(async (snapshot: UploadResult) => {
            return await getDownloadURL(snapshot.ref).then((url: string) => {
                return url;
            }).catch((err: Error) => {
                console.error({err})
                return null;
            });
        });
        if (url) {
            const axios = require('axios');
            await axios.post(`${api}/eventos/${evento_id}/uploadImagens`, {
                imagens: [{
                    url,
                    nome: banner.name,
                    tipo
                }]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((r: AxiosResponse) => {
                if (r.status === 200) {
                    console.log({r})
                }
            }).catch((err: AxiosError) => {
                console.error({erro: err.response?.data})
                if (err.response?.status !== 403 && err.response?.status !== 500) {

                    for (const [_, v] of Object.entries(err.response?.data.message)) {
                        toast.error(`${v}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                } else {
                    toast.error(`${err.response?.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            });
        }
    }

    async function uploadFirebaseImagens(evento_id: number, imagens: FileList, tipo: string) {
        let urlList = [];
        for (const i of Array.from(imagens)) {
            const imageRef = ref(storage, `eventos/${evento_id}/${tipo}/${i.name}`);
            const url = await uploadBytes(imageRef, i).then(async (snapshot: UploadResult) => {
                return getDownloadURL(snapshot.ref).then((url: string) => {
                    return url;
                }).catch((err: any) => {
                    console.error({err})
                    return null;
                })
            }).catch((err: any) => {
                console.error({err})
                return null;
            });
            if (url)
                urlList.push({
                    url,
                    nome: i.name,
                    tipo
                });
        }
        if (urlList.length > 0) {
            const axios = require('axios');

            await axios.post(`${api}/eventos/${evento_id}/uploadImagens`, {
                imagens: [...urlList]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((r: AxiosResponse) => {
                if (r.status === 201) {
                    toast.success(`${r.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch((err: AxiosError) => {
                console.error({erro: err.response?.data})
                if (err.response?.status !== 403 && err.response?.status !== 500) {

                    for (const [_, v] of Object.entries(err.response?.data.message)) {
                        toast.error(`${v}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                } else {
                    toast.error(`${err.response?.data.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            });
        }


    }

    function limpaDados() {
        setNomeAtividade("")
        setIdAtividade(0)
        setData(null)
        setInicio(null)
        setFim(null)
        setTipo({value: 0, label: ""})
        setDescricaoAtividade("")
        setLocalAtividade("");
        setApresentadoresNome([""]);
        setApresentadoresEmail([""]);
        setUrlAtividade("");
    }

    function handleAtividadeSubmit() {
        let a: Atividade;
        const dataFormatada = data ? format(data, "dd/MM/yyyy") : "";
        const inicioFormatado = inicio ? format(inicio, "HH:mm") : "";
        const fimFormatado = fim ? format(fim, "HH:mm") : "";
        if (idAtividade != 0) {

            a = {
                id: idAtividade,
                nome: nomeAtividade,
                descricao: descricaoAtividade,
                horario_inicio: inicioFormatado,
                horario_fim: fimFormatado,
                imagem: "",
                link_transmissao: "",
                local: localAtividade,
                tipo_atividade_id: tipo?.value ?? 0,
                "data": dataFormatada,
                url: urlAtividade,
                apresentadores: apresentadoresNome.map((nome, i) => {
                    return {
                        nome,
                        email: apresentadoresEmail[i]
                    }
                })
            }
            let atividades_temp = atividades.find((atv) => atv.id == idAtividade);
            if (atividades_temp) {
                let temp_id = atividades.indexOf(atividades_temp)
                atividades_temp = a
                atividades[temp_id] = atividades_temp;
                setAtividades(atividades);
            }

        } else {
            let temp_index = 1
            if (atividades.length > 0) {
                temp_index = (atividades[atividades.length - 1].id ?? 0) + 1
            }
            a = {
                id: temp_index,
                nome: nomeAtividade,
                descricao: descricaoAtividade,
                horario_inicio: inicioFormatado,
                horario_fim: fimFormatado,
                imagem: "",
                link_transmissao: "",
                local: localAtividade,
                tipo_atividade_id: tipo?.value ?? 0,
                "data": dataFormatada,
                url: urlAtividade,
                apresentadores: apresentadoresNome.map((nome, i) => {
                    return {
                        nome,
                        email: apresentadoresEmail[i]
                    }
                })
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


    function deletaAtividade(id: number) {
        if (id) {
            let index = atividades.indexOf(atividades.find(a => a.id == id) as Atividade)
            setAtividades(atividades.filter((_, i) => i !== index))
        }
    }

    function removeImagem(id: number) {
        //remove item from outrasimagens
        let novasImagens = Array.from(outrasImagens!).filter((_, i) => i != id);
        let list = new DataTransfer();
        novasImagens.forEach(i => list.items.add(i));
        setOutrasImagens(list.files);
    }

    React.useEffect(() => {
        if (evento_edit && bannerPreview == null) {
            setBreveEvento(evento_edit.breve_descricao);
            setDescricaoEvento(evento_edit.descricao);
            setLocal(evento_edit.local);
            setNomeEvento(evento_edit.nome);
            setAtividades(evento_edit.atividades);
            let cat = categorias.find((c) => {
                return c.id == evento_edit.categoria_id;

            });
            setCatSelecionada({value: (cat?.id) ?? 0, label: cat?.nome ?? ""});
            if (evento_edit.imagens && evento_edit.imagens.length > 0) {
                evento_edit.imagens.filter((i) => i.tipo_imagem_id === 1).forEach((i) => {
                    setBannerPreview(i.imagem);
                });


            }
        }
        if (banner) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(banner)
        } else {
            // @ts-ignore
            setBannerPreview(null);
        }

        if (outrasImagens) {
            const array = Array.from(outrasImagens);
            setImagensPreview(array);
        }
    }, [categorias, evento_edit, banner, bannerPreview, outrasImagens]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={"colored"}
                style={{width: "500px", maxWidth: "1000px", whiteSpace: "pre-line"}}
            />
            <div className={styles.outer}>
                <form method={"POST"} onSubmit={handleSubmit}>
                    <div className={"mt-3 " + styles.inner}>

                        {/*<h3>Criar um novo evento</h3>*/}

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

                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor={"breve_descricao"} className={"form-label"}>Descreva brevemente seu
                                evento</label>
                            <input id="breve_descricao" type="text" className="form-control" max={100}
                                   placeholder=""
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
                            <textarea className="form-control" id="descricao" rows={4}
                                      value={descricaoEvento}
                                      onChange={(e) => {
                                          setDescricaoEvento(e.target.value);
                                      }}
                            />
                        </div>


                    </div>
                    {/*Modal de atividade*/}
                    <div className={"mt-3 " + styles.inner}>
                        <h3>Cadastro de atividades</h3>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <button className={"btn mb-2"} data-bs-toggle="modal"
                                        data-bs-target="#modal-atividade"
                                        disabled={isLoading}
                                        type={"button"}>
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

                                            {/*Corpo do modal*/}
                                            <div className="modal-body">
                                                <div className={"form-group"}>
                                                    <label htmlFor={'nomeAtividade'} className={'form-label'}>Nome
                                                        atividade</label>
                                                    <input className={"form-control mb-3"}
                                                           id={'nomeAtividade'}
                                                           value={nomeAtividade}
                                                           placeholder={"Nome da atividade"}
                                                           onChange={(e) => {
                                                               setNomeAtividade(e.target.value)
                                                           }}/>
                                                    <div className="input-group mb-3">
                                                        <label htmlFor={'dataAtividade'}
                                                               className={'form-label'}>Data</label>
                                                        <DatePicker onChange={(date) => {
                                                            setData(date)
                                                        }}
                                                                    id={'dataAtividade'}
                                                                    className={"form-control"}
                                                                    placeholderText={"Data"}
                                                                    locale={ptBR}
                                                                    selected={data}
                                                                    minDate={new Date()}
                                                                    maxDate={new Date(2030, 12, 31)}
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    dropdownMode="select"
                                                                    dateFormat="dd/MM/yyyy"
                                                                    isClearable={true}
                                                        />
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <label htmlFor={'horaInicio'} className={'form-label'}>Horário
                                                            início</label>
                                                        <DatePicker onChange={(date) => {
                                                            setInicio(date)
                                                        }}
                                                                    id={'horaInicio'}
                                                                    className={"form-control"}
                                                                    placeholderText={"Horário início"}
                                                                    locale={ptBR}
                                                                    selected={inicio}
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={15}
                                                                    dateFormat="HH:mm"
                                                                    timeCaption="Horário"
                                                                    isClearable={true}/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <label htmlFor={'horaFim'} className={'form-label'}>Horário
                                                            fim</label>
                                                        <DatePicker onChange={(date) => {
                                                            setFim(date)
                                                        }}
                                                                    id={'horaFim'}
                                                                    className={"form-control"}
                                                                    placeholderText={"Horário fim"}
                                                                    locale={ptBR}
                                                                    selected={fim}
                                                                    showTimeSelect
                                                                    showTimeSelectOnly
                                                                    timeIntervals={15}
                                                                    dateFormat="HH:mm"
                                                                    timeCaption="Horário"
                                                                    isClearable={true}/>
                                                    </div>
                                                    <label htmlFor={'tipoAtividade'} className={'form-label'}>Tipo de
                                                        atividade</label>
                                                    <Select
                                                        className={"mb-3"}
                                                        name={"tipoAtividade"}
                                                        id={"tipoAtividade"}
                                                        value={tipo}
                                                        onChange={(e: any) => setTipo(e)}
                                                        options={tipoSelect}
                                                        isClearable={true}
                                                        placeholder={"Escolha o tipo de atividade"}
                                                    />
                                                </div>

                                                <div className={'form-group'}>
                                                    <label htmlFor={'local'} className={'form-label'}>Local</label>
                                                    <input className={"form-control mb-3"} type={"text"} id={'local'}
                                                           placeholder={"Local da atividade"}
                                                           value={localAtividade} onChange={(e) => {
                                                        setLocalAtividade(e.target.value)
                                                    }}/>
                                                </div>
                                                <div className={'form-group'}>
                                                    <label htmlFor={'local'} className={'form-label'}>Link da
                                                        atividade</label>
                                                    <input className={"form-control mb-3"} type={"text"} id={'local'}
                                                           placeholder={"Link da atividade"}
                                                           value={urlAtividade} onChange={(e) => {
                                                        setUrlAtividade(e.target.value);
                                                    }}/>
                                                </div>
                                                {apresentadoresNome.map((a, i) => {
                                                    return (
                                                        <>
                                                            <Row key={i}>
                                                                <Col lg={12} md={12} sm={12}>
                                                                    <label className={'form-label'}>Nome
                                                                        apresentador {i + 1}</label>
                                                                    <input
                                                                        className={"form-control mb-3"}
                                                                        type={"text"}
                                                                        placeholder={`Nome`}
                                                                        value={apresentadoresNome[i]}
                                                                        onChange={(e) => {
                                                                            setApresentadoresNome(apresentadoresNome.map((a, j) => {
                                                                                if (i === j) {
                                                                                    return e.target.value
                                                                                } else {
                                                                                    return a
                                                                                }
                                                                            }))
                                                                        }}/>
                                                                </Col>

                                                            </Row>
                                                            <Row key={i}>
                                                                <Col lg={12} md={12} sm={12}>
                                                                    <label className={'form-label'}>Email
                                                                        apresentador {i + 1}</label>
                                                                    <input
                                                                        className={"form-control mb-3"}
                                                                        type={"text"}
                                                                        placeholder={`Email`}
                                                                        value={apresentadoresEmail[i]}
                                                                        onChange={(e) => {
                                                                            setApresentadoresEmail(apresentadoresEmail.map((a, j) => {
                                                                                if (i === j) {
                                                                                    return e.target.value
                                                                                } else {
                                                                                    return a
                                                                                }
                                                                            }))
                                                                        }}/>
                                                                </Col>
                                                            </Row>
                                                            <div className={"d-flex justify-content-center mb-3"}>
                                                                <Button variant={'danger'} onClick={() => {
                                                                    setApresentadoresNome(apresentadoresNome.filter((a, j) => {
                                                                        return i !== j
                                                                    }));
                                                                    setApresentadoresEmail(apresentadoresEmail.filter((a, j) => {
                                                                        return i !== j
                                                                    }));
                                                                }
                                                                }>
                                                                    <FontAwesomeIcon icon={faTrash}
                                                                                     className={"me-1"}/> Exluir
                                                                    apresentador
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )
                                                })}

                                                <hr/>
                                                <div className={"d-flex justify-content-center mb-3"}>
                                                    <Button onClick={() => {
                                                        setApresentadoresNome([...apresentadoresNome, ''])
                                                        setApresentadoresEmail([...apresentadoresEmail, ''])
                                                    }}>
                                                        <FontAwesomeIcon icon={faPlus}
                                                                         className={"me-1"}/> Adicionar novo
                                                        apresentador
                                                    </Button>
                                                </div>

                                                <textarea className="form-control mb-3" id="descricao_atividade"
                                                          placeholder={'Descrição da atividade'}
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
                                                type={"button"}
                                                data-bs-target="#modal-atividade"
                                                onClick={() => {
                                                    setNomeAtividade(a.nome);
                                                    setDescricaoAtividade(a.descricao ?? "");
                                                    setData(a.data ? parse(a.data, 'dd/MM/yyyy', new Date()) : null);
                                                    let ta = tipo_atividades.find((t) => {
                                                        return t.id === a.tipo_atividade_id;
                                                    });
                                                    setTipo({value: ta?.id ?? 0, label: ta?.nome ?? ""});
                                                    setInicio(a.horario_inicio ? parse(a.horario_inicio, 'HH:mm', new Date()) : null);
                                                    setFim(a.horario_fim ? parse(a.horario_fim, 'HH:mm', new Date()) : null);
                                                    setIdAtividade(a.id ?? 0)
                                                    setApresentadoresNome(a.apresentadores.map((ap) => ap.nome));
                                                    setApresentadoresEmail(a.apresentadores.map((ap) => ap.email));
                                                    setLocalAtividade(a.local)
                                                }}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </button>
                                    </div>
                                    <div className={"col-1"}>
                                        <button className={"btn btn-outline-danger"} type={"button"}
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
                            <input className="form-control" type="file" id="formFile" onChange={e => {
                                setBanner(e.target.files?.[0]);
                            }}/>
                            <Row>
                                {banner ?

                                    <Image src={bannerPreview ? bannerPreview : teste}
                                           objectFit={'cover'}
                                           objectPosition={'center'}
                                           className={"mt-2 ms-4"}
                                           height={400}
                                           width={400}
                                           alt={'banner'}/>
                                    : evento_edit &&
                                    <Image src={evento_edit.banner!}
                                           objectFit={'cover'}
                                           objectPosition={'center'}
                                           className={"mt-2 ms-4"}
                                           height={400}
                                           width={400}
                                           alt={'banner'}/>}
                            </Row>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Selecione as demais imagens
                                para
                                exibição</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple accept="image/*"
                                   onChange={(e) => {
                                       if (e.target.files) {
                                           if (outrasImagens) {
                                               // @ts-ignore
                                               setOutrasImagens([...outrasImagens, ...e.target.files]);
                                           } else {
                                               // @ts-ignore
                                               setOutrasImagens([...e.target.files]);
                                           }
                                       }
                                   }}/>
                        </div>
                        <Row>
                            {imagensPreview ? imagensPreview.map((i, index) => {
                                return (
                                    <Col lg={'4'} md={'6'} sm={'12'} key={index}>
                                        <div className={'align-items-center mb-3'} style={{textAlign: "center"}}>
                                            <Image src={URL.createObjectURL(i)} objectFit={'cover'}
                                                   objectPosition={'center'}
                                                   className={"mt-2 ms-4"}
                                                   height={400}
                                                   width={400}
                                                   alt={'imagem ' + index}/>
                                            <Button onClick={() => removeImagem(index)}
                                                    variant={'danger'}>Remover</Button>
                                        </div>
                                    </Col>

                                )
                                //TODO: melhorar a remoção de imagens editadas
                            }) : evento_edit?.imagens && evento_edit.imagens.map((i, index) => {
                                    if (i.tipo_imagem_id !== 1)
                                        return (

                                            <Col lg={'4'} md={'6'} sm={'12'} key={index}>
                                                <div className={'align-items-center mb-3'} style={{textAlign: "center"}}>
                                                    <Image src={i.imagem} objectFit={'cover'}
                                                           objectPosition={'center'}
                                                           className={"mt-2 ms-4"}
                                                           height={400}
                                                           width={400}
                                                           alt={'imagem ' + index}/>
                                                    {/*<Button variant={'danger'}>Remover</Button>*/}
                                                </div>
                                            </Col>
                                        )
                                }
                            )
                            }
                        </Row>
                    </div>

                    <div className={"mt-3 " + styles.inner}>
                        <div className={"row form-group " + styles.botao}>
                            <button type="submit" className="btn btn-outline-primary btn-lg btn-block"
                                    disabled={isLoading}>
                                {isLoading ?
                                    <Spinner animation={"border"} role={"status"}>
                                        <span className="visually-hidden">Carregando...</span>
                                    </Spinner> :
                                    "Confirmar"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
