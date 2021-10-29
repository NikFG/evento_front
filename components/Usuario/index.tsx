import styles from "./Usuario.module.css";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import React, {useContext} from "react";
import {
    Accordion, AccordionContext,
    Button,
    Card,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    ListGroup,
    ListGroupItem, Row, useAccordionButton
} from "react-bootstrap";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons/faCheckCircle";
import {faGithub, faTwitter, faFacebook, faInstagram, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import InputMask from "react-input-mask";
import Image from "next/image";
import {Evento, User, Certificado} from "@types";
import {useRouter} from "next/router";
import ReactTooltip from 'react-tooltip';


export interface UsuarioProps {
    eventos_criados: Evento[]
    eventos_participados: Evento[]
    certificados: Certificado[]

}


export default function Usuario({eventos_criados, eventos_participados, certificados}: UsuarioProps) {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [user, setUser] = React.useState<User>();
    const router = useRouter();

    // const [instance, updateInstance] = usePDF({document: <CertificadoComponente/>});

    async function handleEdit(id: number | undefined) {
        await router.push(`/eventos/editar/${id}`)
    }

    function handleDelete(id: number | undefined) {

    }

    async function handleCertificado(id: number | undefined) {
        if (id) {
            await router.push(`/certificados/atividade/${id}`)
        }
    }

async function imprimir(id: number) {
       await router.push(`/certificados/imprimir/${id}`)

}


    React.useEffect(() => {
        const aux: User = JSON.parse(sessionStorage.getItem('USER_DATA') ?? "");
        setUser(aux);
        setNome(aux.nome);
        setEmail(aux.email);
        setTelefone(aux.telefone);

    }, []);

    return (
        <Container>
            <Tabs selectedTabClassName={styles.tabSelecionada}>
                <TabList>
                    <Tab>
                        <Card className={styles.tab}>
                            Perfil
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>

                            Meus eventos
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>

                            Eventos participados
                        </Card>
                    </Tab>
                    <Tab>
                        <Card className={styles.tab}>
                            Certificados
                        </Card>
                    </Tab>
                </TabList>

                {/*Meus dados*/}
                <TabPanel>
                    <Row>
                        <Col sm={12} md={4} lg={4} className={"mb-3"}>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <Image
                                            src={`https://avatars.dicebear.com/api/initials/${user?.nome}.svg?radius=50`}
                                            alt={"usuario"} className={'rounded-circle'}
                                            width={150} height={150}/>
                                        <div className={"mt-3"}>
                                            <h4>{user?.nome}</h4>
                                            <p className="text-secondary mb-1">{user?.email}</p>
                                            <p className="text-muted font-size-sm">{user?.telefone}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className={"mt-3"}>
                                <ListGroup variant={"flush"}>
                                    <ListGroupItem
                                        className={"d-flex justify-content-between align-items-center flex-wrap"}>
                                        <h6 className={"mb-0"}>
                                            <FontAwesomeIcon icon={faGoogle} className={"mx-1 "}/>
                                            Google
                                        </h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        className={"d-flex justify-content-between align-items-center flex-wrap"}>
                                        <h6 className={"mb-0"}>
                                            <FontAwesomeIcon icon={faGithub} className={"mx-1"}/>
                                            Github
                                        </h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        className={"d-flex justify-content-between align-items-center flex-wrap"}>
                                        <h6 className={"mb-0"}>
                                            <FontAwesomeIcon icon={faFacebook} className={"mx-1"} color={"#4267B2"}/>
                                            Facebook
                                        </h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        className={"d-flex justify-content-between align-items-center flex-wrap"}>
                                        <h6 className={"mb-0"}>
                                            <FontAwesomeIcon icon={faInstagram}
                                                             className={"mx-1 "}/>
                                            Instagram
                                        </h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </ListGroupItem>
                                    <ListGroupItem
                                        className={"d-flex justify-content-between align-items-center flex-wrap"}>
                                        <h6 className={"mb-0"}>
                                            <FontAwesomeIcon icon={faTwitter} className={"mx-1"} color={"#1DA1F2"}/>
                                            Twitter
                                        </h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>


                        <Col sm={12} md={7} lg={7}>
                            <Card className={"mb-3"}>
                                <Card.Body>
                                    <Form>

                                        <FormGroup className={"mb-3"} controlId={"nome"}>
                                            <FormLabel>Nome completo</FormLabel>
                                            <FormControl type={"text"} value={nome}
                                                         onChange={(e) => {
                                                             setNome(e.target.value)
                                                         }}/>
                                        </FormGroup>

                                        <FormGroup className={"mb-3"} controlId={"email"}>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl type={"email"} value={email}
                                                         onChange={(e) => {
                                                             setEmail(e.target.value)
                                                         }}/>
                                        </FormGroup>

                                        <FormGroup className={"mb-3"} controlId={"telefone"}>
                                            <FormLabel>Telefone</FormLabel>
                                            <InputMask id="telefone" className={"form-control"}
                                                       value={telefone} onChange={(e) => {
                                                setTelefone(e.target.value)
                                            }}
                                                       mask={"(99) 99999-9999"}/>
                                        </FormGroup>

                                        <FormGroup className={"mb-3"} controlId={"senha"}>
                                            <FormLabel>Nova senha</FormLabel>
                                            <FormControl type={"password"} value={senha}
                                                         onChange={(e) => {
                                                             setSenha(e.target.value)
                                                         }}/>
                                        </FormGroup>

                                        <FormGroup className={"mb-3"} controlId={"confirmaSenha"}>
                                            <FormLabel>Confirme a nova senha</FormLabel>
                                            <FormControl type={"password"} value={senha}
                                                         onChange={(e) => {
                                                             setSenha(e.target.value)
                                                         }}/>
                                        </FormGroup>
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <Button variant={"primary"}>Modificar</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </TabPanel>

                {/*Meus eventos*/}
                <TabPanel>
                    <Accordion>
                        {eventos_criados.map(e => {
                            return <Card className={"mb-3"} key={e.id}>
                                <Card.Header style={{background: "transparent", paddingBottom: "0"}}>
                                    <div className={"d-flex flex-row bd-highlight"}>
                                        <div className={"bd-highlight p-2"}>
                                            {e.nome}
                                        </div>
                                        <div className={"bd-highlight ms-1 p-2"}>
                                            <Button variant={"outline-secondary"} onClick={async () => {
                                                await handleEdit(e.id);
                                            }
                                            }>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                        </div>
                                        <div className={"bd-highlight ms-2 p-2"}>
                                            <Button variant={"outline-danger"} onClick={async () => {
                                                await handleDelete(e.id);
                                            }}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </div>
                                        <div className={"ms-auto bd-highlight flex-shrink"}>
                                            <CustomToggle eventKey={e.id}/>

                                        </div>
                                    </div>
                                </Card.Header>
                                {/* @ts-ignore*/}
                                <Accordion.Collapse eventKey={e.id ?? ""}>
                                    <Card.Body>

                                        {e.atividades.map(a =>
                                            <Row key={a.id} className={"mb-2"}>
                                                <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                                    <span className={"p-2"}>{a.nome}</span>
                                                </Col>
                                                <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                                    <Button className={"p-2 mb-2"} variant={"outline-primary"}
                                                            onClick={async () => {
                                                                await handleCertificado(a.id);
                                                            }}>
                                                        Verificar participantes
                                                    </Button>
                                                </Col>
                                                <hr className={"mt-1"}/>
                                            </Row>
                                        )}

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}

                    </Accordion>
                </TabPanel>

                {/*Eventos participados*/}
                <TabPanel>
                    <Accordion>
                        {eventos_participados.map(e => {
                            return <Card className={"mb-3"} key={e.id}>
                                <Card.Header style={{background: "transparent", paddingBottom: "0"}}>
                                    <div className={"d-flex flex-row bd-highlight"}>
                                        <div className={"bd-highlight p-2"}>
                                            {e.nome}
                                        </div>

                                        <div className={"ms-auto bd-highlight flex-shrink"}>
                                            <CustomToggle eventKey={e.id}/>

                                        </div>
                                    </div>
                                </Card.Header>
                                {/* @ts-ignore*/}
                                <Accordion.Collapse eventKey={e.id ?? ""}>
                                    <Card.Body>

                                        {e.atividades.map(a => {
                                                let u = a.users?.find((u) => {
                                                    return u.id === 2
                                                });

                                                return <Row key={a.id} className={"mb-2"}>
                                                    <Col>
                                                        <span>{a.nome}</span>
                                                        <ReactTooltip id='global' aria-haspopup='true' effect="solid"
                                                                      type={"info"}>
                                                            Certificado gerado

                                                        </ReactTooltip>
                                                        {
                                                            u?.pivot?.participou === 1 ?
                                                                <a data-tip={a.id} data-for='global' className={"ms-2"}>
                                                                    <FontAwesomeIcon icon={faCheckCircle} color={"green"}/>
                                                                </a> : <span/>

                                                        }
                                                        <hr/>
                                                    </Col>

                                                </Row>
                                            }
                                        )}

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}

                    </Accordion>
                </TabPanel>

                {/*Certificados*/}
                <TabPanel>

                    <hr/>
                    {certificados.map(c => {
                        return <Row key={c.id} className={"mb-3"}>
                            <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                {c.descricao}
                            </Col>
                            <Col sm={"auto"} md={"auto"} lg={"auto"}>
                                <Button onClick={async () => await imprimir(c.id)}>
                                    Imprimir certificado
                                </Button>

                            </Col>

                        </Row>
                    })}

                </TabPanel>
            </Tabs>

        </Container>

    );
}

function CustomToggle({children, eventKey, callback}: any) {
    const {activeEventKey} = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            className={"accordion-button  " + (isCurrentEventKey ? "" : "collapsed ") + styles.botaoExpand}
            onClick={decoratedOnClick}
        />

    );
}

