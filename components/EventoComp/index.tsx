import styles from "./EventoComp.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faMapMarkerAlt, faBullhorn, faTicketAlt, faClock} from "@fortawesome/free-solid-svg-icons";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Footer from "@components/Footer";
import Image from 'next/image';
import {Evento} from "@types";
import React from "react";
import {Fab} from 'react-tiny-fab';
import {useRouter} from "next/router";
import CarouselBootstrap from "@components/CarouselBootstrap";
import {isMobile} from 'react-device-detect';

export interface EventoProps {
    evento: Evento,
    api: string
}


export default function EventoComp({evento, api}: EventoProps) {

    const router = useRouter();
    let atividades = evento.atividades;
    const [tabs, setTabs] = React.useState(Array());
    const [tabContent, setTabContent] = React.useState(Array());

    React.useEffect(() => {
        criaTabs();
    }, []);

    function handleCompra() {
        router.push(`/eventos/${evento.id}/checkout`);
    }


    return (
        <>
            <main>
                <section id="site-header" className={''}>
                    <div className={`d-flex justify-content-center ${styles.siteHeader}`}>
                        <div className={styles.intro}>
                            <h2><FontAwesomeIcon icon={faCalendarAlt}/> 10/01/2021 - 23/01/2021</h2>
                            <h2><FontAwesomeIcon icon={faMapMarkerAlt}/> Divinópolis-MG</h2>

                            <h1>{evento.nome}</h1>

                            <p>{evento.breve_descricao}</p>

                            <button className="btn btn-primary" onClick={() => handleCompra()}>
                                Garanta já seu ingresso
                            </button>
                        </div>
                        <div className={styles.divImagem}>
                            <Image src={evento.banner!} width={2000} height={1000}
                                   className={styles.imagem}
                                   objectFit={'cover'}
                                   objectPosition={'center'}
                                   blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                                   alt={"banner do evento"}
                            />
                        </div>
                    </div>


                </section>

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
                {
                    //@ts-ignore
                    evento.imagens?.length > 0 ?
                        <section id={"imagens do evento"} className={"mt-3 mb-3"}>
                            <div className={"container"}>
                                <div className={"row"}>
                                    <h3>Imagens do evento</h3>
                                </div>
                                <div className={"row"}>
                                    {/*<CarouselCustom imagens={evento.imagens ?? []}/>*/}
                                    <CarouselBootstrap imagens={evento.imagens!}/>
                                </div>
                            </div>
                        </section> : <span/>}
                <section id={"informacoes"} className={"section text-center mt-3 mb-3"}>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <FontAwesomeIcon icon={faCalendarAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>
                                    {atividades[0].data}<br/>
                                    a
                                    <br/>{evento.atividades[evento.atividades.length - 1].data}
                                </h3>

                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>{evento.local}</h3>

                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <FontAwesomeIcon icon={faTicketAlt} size={"4x"}/>
                                <h3 className={"mt-2"}>{evento.expectativa_participantes}<br/>Ingressos</h3>

                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
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
                        onClick={() => handleCompra()}
                        style={{bottom: 24, right: 24, margin: 0}}
                        alwaysShowTitle={isMobile}
                        text={"Comprar ingresso"}

                    />
                </section>


                <div className={styles.imagem}>
                    <Image src={evento.banner!} width={1000} height={1000}
                           blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                           alt={"banner do evento"}
                    />
                </div>
            </main>
            <Footer/>
        </>
    );

    function criaTabs() {
        let tabTemp = Array();
        let tabTempContent = Array();
        let index = 0;
        let data = "";
        while (index < atividades.length) {
            const a = atividades[index];
            if (data != a.data) {
                tabTemp.push(
                    <Tab key={a.id}>
                        <div className={styles.botaoDiv}>
                            Dia {index + 1} <br/>{a.data}
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
                                            {a2.apresentadores.map(apr => {
                                                return (
                                                    <div key={apr.id}>
                                                        <div className={"container-fluid"}>
                                                            <Image src={"https://via.placeholder.com/168?text=168x168"}
                                                                   alt={"imagem de " + apr.nome} width={168}
                                                                   height={168}/>
                                                        </div>
                                                        <div className={"row mb-3"}>
                                                            Por: {apr.nome}
                                                        </div>
                                                    </div>
                                                )
                                            })}

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
            }
            data = atividades[index].data;
            index++;
        }
        setTabs(tabTemp);
        setTabContent(tabTempContent);
    }
}