import styles from './MainBanner.module.css'
import Image from 'next/image'
import banner from '@images/imagem_hom.png'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {useRouter} from "next/router";

export default function MainBanner() {
    // const [pesquisa, setPesquisa] = React.useState("");
    // const router = useRouter();
    //
    // function handleSearch() {
    //     router.push(`/eventos/pesquisa/${encodeURIComponent(pesquisa)}`)
    // }

    return (
        <div id="home" className={styles.bannerImg}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="header-hero-content text-center">
                            <h3 className="header-sub-title wow fadeInUp mt-2"
                                data-wow-duration="1.3s" data-wow-delay="0.2s">Crie seu próximo evento conosco</h3>
                            <button className={"wow fadeInUp " + styles.mainBtn}
                                    data-wow-duration="1.3s" data-wow-delay="1.1s">Comece por aqui
                            </button>
                        </div>
                    </div>
                </div>
                {/*fim row*/}

                <div className="row">

                    <div className={"text-center " + styles.headerHeroImage}>
                        <Image src={banner} alt={'Imagem de um computador cheio de avatares de pessoas'}
                               width={650}/>
                    </div>

                </div>
            </div>
        </div>
    );
}