import styles from "./EventoComp.module.css";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import teste from "@images/teste.jpg";
import CardEvento from "@components/CardEvento";
import TimeLine from "@components/TimeLine";
import Footer from "@components/Footer";
import {Atividade, Evento} from "@types";

export interface EventoProps {
    evento: Evento
}

export default function EventoComp(props: EventoProps) {
    let evento: Evento = props.evento[0]
    let atividades: Atividade[] = evento.atividades
    console.log(atividades);


    return (
        <div className={"container-fluid"}>
            <div className={"row mt-3"}>
                <div className={"col-lg-3 col-sm-1 col-md-2"}></div>
                <div className={"col-lg-6 col-md-8 col-sm-12"}>
                    <Image src={teste}/>
                </div>

            </div>
            <div className="container">
                <div>
                    <h1 className="">{evento.nome}</h1>
                    <div><FontAwesomeIcon icon={faCalendarAlt} className={"mx-2"}/>12 - 15 Out 2021
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={"mx-2"}/>New York, USA
                    </div>
                    <div>{evento.breve_descricao}
                    </div>
                    <div>
                        <a className="btn btn-primary btn-lg"
                           href="" target="_blank" rel="noreferrer">Garanta seu ingresso</a></div>
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
                    <Tabs>
                        <TabList>
                            <Tab>Dia {atividades[0].data}</Tab>
                            {atividades.map(a => {
                                let aux = 1;
                                let data = atividades[aux].data;
                                if (data != a.data) {
                                    return <Tab key={a.id}>Dia {a.data}</Tab>;
                                }
                                aux++;
                            })}
                        </TabList>

                        <TabPanel>
                            <VerticalTimeline layout={"1-column"}>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                            </VerticalTimeline>
                        </TabPanel>
                        <TabPanel>
                            <VerticalTimeline layout={"1-column"}>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                                <TimeLine descricao={"descrição da atividade"} autor={"Nikollas Ferreira Gonçcalves"}
                                          horarioInicial={"09:30"} horarioFinal={"10:30"}
                                          instituicao={"IFMG - Campus Formiga"}/>
                            </VerticalTimeline>
                        </TabPanel>
                    </Tabs>

                </div>

            </section>
            <footer>
                <Footer/>
            </footer>
        </div>

    );
}