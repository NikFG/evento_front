import styles from "./EventoComp.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkerAlt, faBullhorn, faTicketAlt, faClock} from "@fortawesome/free-solid-svg-icons";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Footer from "@components/Footer";
import Image from 'next/image';
import {Evento} from "@types";
import React from "react";
import {Fab, Action} from 'react-tiny-fab';

export interface EventoProps {
    evento: Evento,
    api: string
}


export default function EventoComp({evento, api}: EventoProps) {
    let atividades = evento.atividades;
    const [tabs, setTabs] = React.useState(Array());
    const [tabContent, setTabContent] = React.useState(Array());

    React.useEffect(() => {
        criaTabs();
    }, []);

    return (
        <>

            <header id="site-header" className={`${styles.siteHeader}`}>
                <div className={styles.intro}>

                    <h2><FontAwesomeIcon icon={faCalendarAlt}/> 10/01/2021 - 23/01/2021</h2>
                    <h2><FontAwesomeIcon icon={faMapMarkerAlt}/> Divinópolis-MG</h2>

                    <h1>{evento.nome}</h1>

                    <p>{evento.breve_descricao}</p>

                    <a className="btn btn-primary">Garanta já seu ingresso</a>
                </div>
            </header>
            <main>
                <section id={"sobre o evento"} className={"mt-3 mb-3"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <h3>Sobre o evento</h3>
                            <p className={styles.justificar}>
                                {evento.descricao}
                            </p>
                        </div>
                    </div>
                </section>
                <section id={"informacoes"} className={"section text-center mt-3 mb-3"}>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col-3">
                                <FontAwesomeIcon icon={faCalendarAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>
                                    {atividades[0].data}<br/>
                                    a
                                    <br/>{evento.atividades[evento.atividades.length - 1].data}
                                </h3>

                            </div>
                            <div className="col-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>{evento.local}</h3>

                            </div>
                            <div className="col-3">
                                <FontAwesomeIcon icon={faTicketAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>{evento.expectativa_participantes}<br/>Ingressos</h3>

                            </div>
                            <div className="col-3">
                                <FontAwesomeIcon icon={faBullhorn} size={"4x"}/>
                                <h3 className={"mt-2"}>
                                    {String(evento.apresentadores_count).padStart(2, '0')}<br/>Apresentadores
                                </h3>

                            </div>
                        </div>
                    </div>
                </section>

                <section id={"agenda"} className={"mt-3"}>
                    <div className={"container"}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="section-title text-center">
                                    <h2 style={{fontSize: "50px"}}>Agenda do evento</h2>
                                </div>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={styles.eventTab} style={{marginTop: "60px"}}>
                                    <Tabs selectedTabClassName={styles.botaoDivSelecionado}>
                                        <TabList>
                                            {tabs.map(t => {
                                                return t;
                                            })}
                                        </TabList>
                                        {
                                            tabContent.map(t => {
                                                return t;
                                            })
                                        }

                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section id={"fab"}>
                    <Fab
                        icon={<FontAwesomeIcon icon={faTicketAlt} size={"lg"}/>}
                        mainButtonStyles={{backgroundColor: "#00A6A6"}}
                        onClick={() => alert('FAB ROCKS!')}
                    />
                </section>
            </main>
            <Footer/>
        </>
    );

    function criaTabs() {
        let tabTemp = Array();
        let tabTempContent = Array();
        let aux = 0;
        atividades.forEach(a => {
            let data = atividades[aux].data;

            if (data != a.data || aux == 0) {

                tabTemp.push(
                    <Tab key={a.id}>
                        <div className={styles.botaoDiv}>
                            Dia {aux + 1} <br/>{a.data}
                        </div>
                    </Tab>)

                tabTempContent.push(
                    <TabPanel key={a.id}>
                        {
                            atividades.map(a2 => {
                                if (a2.data == a.data) {
                                    return <div className={"row " + styles.eventContent} key={a2.id}>
                                        <div className="col-sm-12 col-md-5 col-lg-3 mx-2"
                                             style={{marginTop: "30px"}}>
                                            <div className={"container-fluid"}>
                                                <Image src={"https://via.placeholder.com/168?text=168x168"}
                                                       alt={"teste"} width={168} height={168}/>
                                            </div>
                                            <div className={"row"}>
                                                Por: {a2.nome_apresentador}
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-7 col-lg-8 media-body"
                                             style={{marginTop: "30px"}}>
                                            <h4 className={styles.eventTitle}>{a2.nome}</h4>
                                            <p className={styles.justificar}>{a2.descricao}</p>
                                            <div className={""}>
                                                <FontAwesomeIcon icon={faClock}/> Início: {a2.horario_inicio} <br/>
                                                <FontAwesomeIcon icon={faClock}/> Fim: {a2.horario_fim} <br/>
                                                <FontAwesomeIcon icon={faMapMarkerAlt}/> {a2.local}
                                            </div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </TabPanel>
                )
                aux++;
            }

        });
        setTabs(tabTemp);
        setTabContent(tabTempContent);
    }
}