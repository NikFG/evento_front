import styles from './MainBanner.module.css'
import Image from 'next/image'
import banner from '@images/imagem_evento-removebg.png'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MainBanner() {
    return (
        <div className={'container-fluid '+styles.main}>
            <div className={'row'}>
                <div className={'col-4'}>
                    <h1 className={styles.titulo}>
                        Explore e econtre os melhores eventos acadêmicos disponíveis
                    </h1>
                </div>
                <div className={'col-3'}>
                    <Image src={banner} alt={'Imagem de um computador cheio de avatares de pessoas'}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-8'}>
                    teste teste teste
                </div>

                <div className={'col-4 ' + styles.barra}>
                    <div className={'row'}>
                        <div className={'col-8'}>
                            <input
                                className={styles.search}
                                // onChange={onChange}
                                // onFocus={onFocus}
                                placeholder='Pesquise eventos'
                                type='text'
                                // value={query}
                            />
                        </div>
                        <div className={'col-2'}>
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