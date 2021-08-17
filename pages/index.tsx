import Head from 'next/head'
import Navbar from "@components/Navbar";
import MainBanner from "@components/MainBanner";
import CarouselCustom from "@components/CarouselCustom";


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
                    <h3>Explore nossas categorias</h3>
                    <CarouselCustom/>
                </main>

                <footer>

                </footer>
            </div>
        </>
    )
}
