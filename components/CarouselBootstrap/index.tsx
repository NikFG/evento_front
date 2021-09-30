import styles from "./CarouselBootstrap.module.css";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import React from "react";


export interface CarouselProps {
    imagens: string[]
}

export default function CarouselBootstrap({imagens}: CarouselProps) {

    return (
        <div className={styles.area}>
            <Carousel controls={true} fade={true} slide={true} touch={true}>
                {imagens.map((i, index) => {
                    return <Carousel.Item key={index}>
                        <Image src={`data:image/jpeg;base64,${i}`} width={1600} height={800}
                               blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}
                               alt={"Imagem do evento"}/>
                    </Carousel.Item>
                })}
            </Carousel>
        </div>
    );
}