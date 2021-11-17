import React from "react";

import {Atividade, Evento} from "@types";
import RowCheckout from "@components/Checkout/RowCheckout";

import {ToastContainer, toast} from 'react-toastify';
import {useRouter} from "next/router";

export interface CheckoutProps {
    taxa_evento: number
    atividades: Atividade[]
    api: string
    atividades_participadas: Atividade[]

}

export default function Checkout({taxa_evento, atividades, api, atividades_participadas}: CheckoutProps) {
    const router = useRouter()
    const [horasTotais, setHorasTotais] = React.useState<number>(0.0);
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
                await toast.success("Ingresso adquirido!!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                await router.push('/');
            } else {
                console.error("Erro no envio")
            }
        } else {
            await toast.error("Você deve selecionar pelo menos uma atividade!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    function formatTime(milliseconds: number) {
        let hours = Math.floor(milliseconds / 3600000);
        let minutes = Math.floor((milliseconds % 3600000) / 60000);
        return hours + "h " + minutes + "min";
    }

    React.useEffect(() => {
        if (atividades_participadas) {
            atividades_participadas.forEach(a => {
                let inicio = new Date(`01/01/2007 ${a.horario_inicio}`).getTime();
                let fim = new Date(`01/01/2007 ${a.horario_fim}`).getTime();
                handleClickAtividade(a.id!, (fim - inicio))
            });
        }

    }, []);


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
                style={{width: "500px", maxWidth: "1000px", whiteSpace: "pre-line"}}/>

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
                                                        inAtividades={atividades_participadas.filter(a2 => a2.id === a.id).length > 0}
                                                        formatTime={formatTime}/>
                                })
                            }


                            </tbody>
                        </table>
                        <hr/>
                        <div className={"d-flex bd-highlight mb-3"}>
                            <div className={"bd-highlight mx-2"}>
                                Horas totais: {formatTime(horasTotais)}
                            </div>
                            {/*<div className={"ms-auto bd-highlight mx-2"}>*/}
                            {/*    <p className={"fs-6"}>Taxa evento: R$10,00</p>*/}
                            {/*    <p className={"fs-6"}>Subtotal: R$100,00</p>*/}
                            {/*</div>*/}
                        </div>
                        <hr/>
                        <div className={"d-flex bd-highlight mb-3"}>
                            <div className={"ms-auto bd-highlight mx-2"}>
                                <button className={"btn btn-outline-danger"} onClick={async () => {
                                    router.back()
                                }}>
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