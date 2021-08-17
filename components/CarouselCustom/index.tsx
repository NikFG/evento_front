import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './CarouselCustom.module.css'
import CardCategoria from "@components/CardCategoria";


export default function CarouselCustom() {
    let eventos = [
        {
            imagem: 1,
            titulo: "Titulo", descricao: "Longa descrição teste teste teste teste"
        },
        {
            imagem: 2,
            titulo: "Titulo",
            descricao: "Longa descrição teste teste teste teste"
        },
        {
            imagem: 3,
            titulo: "Titulo",
            descricao: "Longa descrição teste teste teste teste"
        },
        {
            imagem: 4,
            titulo: "Titulo",
            descricao: "Longa descrição teste teste teste teste"
        },
        {
            imagem: 5,
            titulo: "Titulo",
            descricao: "Longa descrição teste teste teste teste"
        },

    ];

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5,
            slidesToSlide: 2
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 4,
            slidesToSlide: 2
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className={styles.linha}>
            <Carousel
                swipeable={false}
                draggable={false}
                // showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlay={false}
                keyBoardControl={true}

                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                itemClass="carousel-item-padding-40-px"

            >
                {eventos.map(e =>
                    (<CardCategoria
                        key={e.imagem}
                        index={e.imagem}
                        titulo={e.titulo}
                        descricao={e.descricao}/>)
                )}


            </Carousel>
        </div>
    );
}