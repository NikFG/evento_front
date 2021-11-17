import styles from "./Usuario.module.css"
import {
    Button,
    Card,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    ListGroup,
    ListGroupItem,
    Row
} from "react-bootstrap";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faGoogle, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import InputMask from "react-input-mask";
import React from "react";
import {User} from "@types";

export interface PerfilProps {
    logout: () => void
    user: User
}

export default function Perfil({logout, user}: PerfilProps) {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [senha, setSenha] = React.useState("");


    React.useEffect(() => {
        setNome(user.nome);
        setEmail(user.email);
        setTelefone(user.telefone);

    }, []);
    return (
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
                                <Button onClick={() => logout()}>Sair</Button>
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
                                <FontAwesomeIcon icon={faFacebook} className={"mx-1"}
                                                 color={"#4267B2"}/>
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
    );
}