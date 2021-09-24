import styles from "./Checkout.module.css";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Atividade, Evento} from "@types";
import RowCheckout from "@components/Checkout/RowCheckout";
// @ts-ignore
import {ToastContainer, toast} from 'react-nextjs-toast';

export interface CheckoutProps {
    taxa_evento: number
    atividades: Atividade[]
    api: string
    atividadesParticipadaProps: Atividade[]
}

export default function Checkout({taxa_evento, atividades, api, atividadesParticipadaProps}: CheckoutProps) {
    const [horasTotais, setHorasTotais] = React.useState(0);
    const [atividadesParticipadas, setAtividadesParticipadas] = React.useState(Array());

    function handleClickAtividade(id: number, horas: number) {
        if (!atividadesParticipadas.includes(id)) {
            setHorasTotais(horasTotais + horas)
            let atv = [...atividadesParticipadas, id];
            setAtividadesParticipadas(atv);

        } else {
            setHorasTotais(horasTotais - horas)
            let index = atividadesParticipadas.indexOf(id);
            setAtividadesParticipadas(atividadesParticipadas.filter((_, i) => i !== index))
        }
    }

    async function handleCompra() {
        const token = sessionStorage.getItem("USER_TOKEN");
        if (atividadesParticipadas.length > 0) {
            const axios = require('axios');
            const formData = new FormData();
            formData.append("atividades", JSON.stringify(atividadesParticipadas));
            let res = await axios.post(api + "/eventos/ingressos", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": `multipart/form-data`,
                    }
                }
            );
            if (res.status === 201) {
                await toast.notify("Ingresso adquirido!!", {
                    duration: 5,
                    type: "success",
                    title: "Sucesso!"
                });
            } else {
                console.error("Erro no envio")
            }
        } else {
            await toast.notify("Você deve selecionar pelo menos uma atividade!!", {
                duration: 5,
                type: "error",
                title: "Erro!"
            });
        }
    }

    React.useEffect(() => {
        console.log(atividadesParticipadaProps?.filter(a2 => a2.id === atividades[0].id).length > 0)
        if (atividadesParticipadaProps) {
            atividadesParticipadaProps.forEach(a => {
                let inicio = new Date("01/01/2007 " + a.horario_inicio).getHours();
                let fim = new Date("01/01/2007 " + a.horario_fim).getHours();
                handleClickAtividade(a.id ?? 0, fim - inicio)
            });
        }

    }, []);


    return (
        <>
            <ToastContainer/>

            <div className={"container-fluid"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-lg-10 col-sm-11 col-md-11"}>
                        <table className={"table table-responsive table-condensed table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>#</th>
                                <th scope="col">Atividade</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Horas atividade</th>
                                <th scope="col"/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                atividades.map((a, index) => {

                                    return <RowCheckout a={a} index={index} key={a.id}
                                                        handleClickAtividade={handleClickAtividade}
                                                        inAtividades={atividadesParticipadaProps.filter(a2 => a2.id === a.id).length > 0}/>
                                })
                            }


                            </tbody>
                        </table>
                        <hr/>
                        <div className={"d-flex bd-highlight mb-3"}>
                            <div className={"bd-highlight mx-2"}>
                                Horas totais: {horasTotais}
                            </div>
                            <div className={"ms-auto bd-highlight mx-2"}>
                                <p className={"fs-6"}>Taxa evento: R$10,00</p>
                                <p className={"fs-6"}>Subtotal: R$100,00</p>
                            </div>
                        </div>
                        <hr/>
                        <div className={"d-flex bd-highlight mb-3"}>
                            <div className={"ms-auto bd-highlight mx-2"}>
                                <button className={"btn btn-outline-danger"}>
                                    Cancelar
                                </button>
                            </div>
                            <div className={"bd-highlight mx-2"}>
                                <button className={"btn btn-outline-primary"}
                                        onClick={async () => await handleCompra()}>
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}