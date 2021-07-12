import Head from 'next/head'
import Navbar from "@components/Navbar";


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
                    teste
                </main>

                <footer>

                </footer>
            </div>
        </>
    )
}
