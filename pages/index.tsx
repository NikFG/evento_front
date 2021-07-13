import Head from 'next/head'
import Navbar from "@components/Navbar";
import MainBanner from "@components/MainBanner";


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

                </main>

                <footer>

                </footer>
            </div>
        </>
    )
}
