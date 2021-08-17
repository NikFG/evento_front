import Head from 'next/head'
import Navbar from "@components/Navbar";
import MainBanner from "@components/MainBanner";
import CarouselCustom from "@components/CarouselCustom";
import GridEventos from "@components/GridEventos";


export default function Home() {
    return (
        <>
            <div>
                <Head>
                    <title>Eventos</title>
                    <meta name="description" content="test"/>
                </Head>

                <main>
                    <Navbar/>

                    <MainBanner/>

                    <CarouselCustom/>

                    <GridEventos/>
                </main>

                <footer>

                </footer>
            </div>
        </>
    )
}
