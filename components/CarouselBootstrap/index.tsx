import styles from "./CarouselBootstrap.module.css";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import React from "react";
import {Imagem} from "@types";


export interface CarouselProps {
    imagens: Imagem[]
}

export default function CarouselBootstrap({imagens}: CarouselProps) {

    return (
        <div className={styles.area}>
            <Carousel controls={true} fade={true} slide={true} touch={true} interval={3000} pause={'hover'}
                      nextIcon={<div style={{backgroundColor: '#000', opacity: '0.9'}}>
                          <span aria-hidden='true' className='carousel-control-next-icon'/>
                      </div>}
                      prevIcon={<div style={{backgroundColor: '#000', opacity: '0.9'}}>
                          <span aria-hidden='true' className='carousel-control-prev-icon'/>
                      </div>}
            >
                {imagens.map((i, index) => {
                    return <Carousel.Item key={index}>
                        <Image src={i.imagem} width={1600} height={800}
                               blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                               alt={"Imagem do evento"}/>
                    </Carousel.Item>
                })}
            </Carousel>
        </div>
    );
}