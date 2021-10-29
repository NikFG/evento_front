import CertificadoComponente from "@components/Certificado";
import React from "react";
import {Button} from "react-bootstrap";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {useRouter} from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType,} from "next";
import {parseCookies} from "nookies";
import {ParsedUrlQuery} from "querystring";
import {Certificado} from "@types";

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const axios = require('axios');
    const cookies = parseCookies(context)
    const token = cookies.USER_TOKEN;
    const {id} = context.query as IParams;
    console.log(`${process.env.API_SERVER}/certificados/${id}`)
    const res = await axios.get(`${process.env.API_SERVER}/certificados/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const certificado: Certificado = res.data;
    return {
        props: {
            certificado
        }
    }
}


export default function CertificadoPage({certificado}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const router = useRouter();

    async function printDocument() {
        const input = document.getElementById('divToPrint');
        let options = {
            quality: 0.95, scale: 3
        }


        await html2canvas(input as HTMLElement, options)
            .then((canvas) => {
                const imageData = canvas.toDataURL('image/jpg');
                const pdf = new jsPDF('l');
                pdf.addImage({x: 0, y: 12.5, height: 210, width: 297, imageData})
                pdf.save("download.pdf");
            });
        await router.back();
    }

    return (
        <>
            <div id={"divToPrint"} style={{
                backgroundColor: '#f5f5f5',
                width: '297mm',
                minHeight: '210mm',
                marginLeft: "0",
                marginRight: "0",

            }}>
                <div>
                    <CertificadoComponente assinaturas={''} background={''} logo={''} titulo={certificado.descricao}/>
                </div>
                <p style={{fontSize: '9px'}} className={"ms-2"}>
                    Para verificar, utilize este codigo: {certificado.codigo_verificacao}
                </p>
            </div>
            <Button onClick={async () => await printDocument()}>
                Imprimir certificado
            </Button>
        </>
    );
}