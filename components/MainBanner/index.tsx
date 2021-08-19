import styles from './MainBanner.module.css'
import Image from 'next/image'
import banner from '@images/imagem_evento-removebg.png'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MainBanner() {
    return (
        <div className={'container-fluid ' + styles.main}>
            <div className={'row'}>
                <div className={'col-lg-4 col-sm-4 col-md-5'}>
                    <h1 className={styles.titulo}>
                        Explore e econtre os melhores eventos acadêmicos disponíveis
                    </h1>
                </div>
                <div className={'col-lg-3 col-sm-12 col-md-5'}>
                    <Image src={banner} alt={'Imagem de um computador cheio de avatares de pessoas'}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-lg-8 col-md-3 col-sm-1'}>

                </div>

                <div className={'col-lg-4 col-sm-12 ' + styles.barra}>
                    <div className={'row'}>
                        <div className={'col-lg-8 col-sm-6 col-md-3'}>
                            <input
                                className={styles.search}
                                // onChange={onChange}
                                // onFocus={onFocus}
                                placeholder='Pesquise eventos'
                                type='text'
                                // value={query}
                            />
                        </div>
                        <div className={'col-lg-2 col-sm-6 col-md-1'}>
                            <button className={'btn btn-primary ' + styles.botao}>
                                <FontAwesomeIcon
                                    icon={faSearch}/>
                            </button>
                        </div>

                    </div>

                </div>


            </div>

        </div>
    );
}