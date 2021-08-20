import styles from "./Evento.module.css";
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


export default function Evento(props: number) {
    let evento = {
        id: props,
        nome: "Evento laravel",
        descricao: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget finibus risus, at egestas libero. Integer id lacus eget libero tempus tempor. Nullam et pharetra metus. Vestibulum et ultricies purus. Mauris et purus neque. Vestibulum non quam egestas nulla pulvinar dapibus in sit amet urna. Nunc at dapibus augue. Quisque aliquam, quam sit amet sollicitudin tristique, quam augue ullamcorper metus, non molestie nulla augue ac mauris. Mauris eget tellus vel nisl vehicula accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc quis elit ac urna vulputate ullamcorper aliquet vitae lorem. Cras at gravida orci.\n" +
            "\n" +
            "Cras eget iaculis ligula. Duis bibendum pretium ligula pulvinar consequat. Aliquam urna sapien, dictum eu mollis nec, hendrerit eget orci. Aliquam imperdiet luctus tellus non commodo. Vestibulum sagittis porttitor metus vel ultrices. Suspendisse laoreet sagittis est vitae semper. Pellentesque sapien magna, semper non aliquam vitae, viverra tristique ante. Maecenas velit lorem, volutpat sed consectetur ut, dapibus a nisl. Cras tristique ac dolor ac malesuada. Vivamus id tempus lectus, vitae pellentesque libero. Nam mattis pulvinar rhoncus. Cras sit amet facilisis diam. Sed porttitor lorem ac tempor cursus. ",
        expectativa: 100,
        link: "http://1lalalal.com.br",
        local: "teste",
        instituicao: "IFMG",
        breve_descricao: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget finibus risus.",
    };
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
                            <Tab>Dia 1</Tab>
                            <Tab>Dia 2</Tab>
                        </TabList>
                        <TabPanel>
                            <VerticalTimeline layout={"1-column-left"}>
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
                            <VerticalTimeline layout={"1-column-left"}>
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