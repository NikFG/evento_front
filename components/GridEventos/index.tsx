import CardEvento from "@components/CardEvento";
import styles from "./GridEventos.module.css"
import {Categoria, Evento, Instituicao} from '@types';
import React from "react";
import Pesquisa from "@components/Pesquisa";
import {useRouter} from "next/router";
import {Col, Container, Row} from "react-bootstrap";
import {motion} from "framer-motion";

export interface EventoProps {
    eventos: Evento[]
    categorias?: Categoria[]
    instituicoes?: Instituicao[]
    pesquisa?: boolean
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}
export default function GridEventos({eventos, categorias, instituicoes, pesquisa = false}: EventoProps) {
    const router = useRouter();


    return (
        <Container fluid={true}>
            {pesquisa === true ?
                <Pesquisa count={eventos.length} categorias={categorias ?? []}
                          instituicoes={instituicoes ?? []}/> : <span/>}
            <Container className="mt-2">
                <Row className="row justify-content-center">
                    <div className="col-10">
                        <div className="section-title text-center" style={{paddingBottom: "40px"}}>
                            <div className="line m-auto"/>
                            <h3 className={''}>Os maiores eventos você encontra aqui!</h3>
                        </div>
                    </div>
                </Row>
            </Container>

            <motion.div variants={stagger}
                        className={'row me-2'}>
                {eventos.map(e => (
                    <Col sm={'12'} md={'6'} lg={'4'} xl={'4'} xxl={'3'} className={styles.cartao} key={e.id}>
                        <CardEvento id={e.id ?? 0} nome={e.nome} descricao={e.breve_descricao}
                                    data_inicio={e.atividades[0].data} instituicao={e.instituicao?.nome ?? ""}
                                    banner={e.banner}/>
                    </Col>
                ))}
            </motion.div>
        </Container>
    );
}
