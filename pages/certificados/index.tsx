import CertificadoComponente from "@components/Certificado";
import React from "react";
import {Button} from "react-bootstrap";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

export default function CertificadoPage() {
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
                    <CertificadoComponente/>
                </div>
                <p style={{fontSize: '9px'}} className={"ms-2"}>
                    Para verificar, utilize este codigo: IUASLISASHAKSAJHFSAKLJHFDSALKAÇASÇALHSDAÇIUASLISASHAKSAJHFSAKLJHFDSALKAÇASÇALHSDAÇIUASLISASHAKSAJHFSAKLJHFDSALKAÇASÇALHSDAÇIUASLISASHAKSAJHFSAKLJHFDSALKAÇASÇALHSDAÇ
                </p>
            </div>
            <Button onClick={async () => await printDocument()}>
                Imprimir certificado
            </Button>
        </>
    );
}