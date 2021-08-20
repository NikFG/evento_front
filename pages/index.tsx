import Head from 'next/head'
import Navbar from "@components/Navbar";
import MainBanner from "@components/MainBanner";
import CarouselCustom from "@components/CarouselCustom";
import GridEventosHome from "@components/GridEventosHome";
import Footer from "@components/Footer";


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

                    <GridEventosHome/>
                </main>

                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}
