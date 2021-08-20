import {useRouter} from "next/router";
import Navbar from "@components/Navbar";
import Evento from "@components/Evento";

export default function EventoPage() {
    const router = useRouter();
    return (
        <>
            <Navbar/>
            <Evento/>
        </>
    );
}
