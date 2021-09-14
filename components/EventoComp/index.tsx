import styles from "./EventoComp.module.css";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import teste from "@images/teste.jpg";
import TimeLine from "@components/TimeLine";
import Footer from "@components/Footer";
import {Atividade, Evento} from "@types";
import React, {ChangeEvent} from "react";
// @ts-ignore
import {toast, ToastContainer} from 'react-nextjs-toast';

export interface EventoProps {
    evento: Evento,
    api:string
}

export default function EventoComp(props: EventoProps) {
    let evento: Evento = props.evento
    let atividades: Atividade[] = evento.atividades
    const [atvSelecionadas, setAtvSelecionadas] = React.useState(Array());

    async function handleCompra() {
        if (atvSelecionadas.length == 0) {
            toast.notify('Você deve selecionar pelo menos uma atividade', {
                title: "Erro!!",
                duration: 5,
                type: "error"
            });
        } else {
            const axios = require('axios');
            const token = sessionStorage.getItem("USER_TOKEN");
            const formData = new FormData();
            formData.append("atividades", JSON.stringify(atvSelecionadas));
            let res = await axios.post(`${props.api}/eventos/ingressos`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": `multipart/form-data`,
                }
            });
            console.log(res.data);
            if (res.status === 201) {
                toast.notify('Você está inscrito nas atividades selecionadas', {
                    title: "",
                    duration: 5,
                    type: "success"
                });
            } else {
                toast.notify('Tente novamente', {
                    title: "Erro!!",
                    duration: 5,
                    type: "error"
                });
            }
        }

    }

    function handleCheckBox(e: ChangeEvent<HTMLInputElement>) {

        let newArray = [...atvSelecionadas, e.target.value];
        if (atvSelecionadas.includes(e.target.value)) {
            newArray = newArray.filter(day => day !== e.target.value);
        }
        setAtvSelecionadas(newArray);

    }

    return (
        <div className={"container-fluid"}>
            <div className={"row mt-3"}>
                <div className={"col-lg-3 col-sm-1 col-md-2"}/>
                <div className={"col-lg-6 col-md-8 col-sm-12"}>
                    <Image src={teste} alt={"imagem teste"}/>
                </div>

            </div>
            <div className="container">
                <div>
                    <h1 className="">{evento.nome}</h1>
                    <div><FontAwesomeIcon icon={faCalendarAlt}
                                          className={"mx-2"}/>{evento.atividades[0].data} - {evento.atividades[evento.atividades.length - 1].data}
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={"mx-2"}/>{evento.local}
                    </div>
                    <div>{evento.breve_descricao}
                    </div>
                </div>

            </div>
            <div className="container">
                <hr/>
            </div>
            <section className="about-section section theme-bg-light">
                <div className={"container"}>
                    <h3 className={"section-heading text-center mb-3 mt-3"}>Sobre o evento</h3>
                    <div className={"section-intro single-col-max mx-auto mb-4 " + styles.justificar}>
                        {evento.descricao}
                    </div>
                </div>
            </section>
            <div className="container">
                <hr/>
            </div>
            <section className={"schedule-section section"}>
                <div className={"container"}>
                    <h3 className="section-heading text-center mb-5">Programação</h3>
                    {
                        atividades.map(a => {
                            let aux = 0;
                            let data = atividades[aux].data;
                            if (data != a.data || aux == 0) {
                                return <div key={a.id}>

                                    <h3 className={"mb-3"}>Dia {a.data}</h3>

                                    <div className={"col-12"}>
                                        <TimeLine
                                            id={a.id ?? 0}
                                            descricao={a.descricao}
                                            autor={"teste"}
                                            nome={a.nome}
                                            horarioInicial={a.horario_inicio}
                                            horarioFinal={a.horario_fim}
                                            instituicao={"teste"}
                                            handleCheckBox={handleCheckBox}/>
                                    </div>


                                    <hr className={"mt-3 mb-3"}/>
                                </div>;
                            }
                            aux++;
                        })
                    }
                    <button onClick={() => handleCompra()} className="btn btn-primary btn-lg">
                        Garanta seu ingresso
                    </button>
                </div>
            </section>
            <hr/>
            <ToastContainer align={"left"} position={"bottom"}/>

            <footer>
                <Footer/>
            </footer>
        </div>

    );
}