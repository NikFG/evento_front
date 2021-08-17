import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './CarouselCustom.module.css'
import CardCategoria from "@components/CardCategoria";


export default function CarouselCustom() {
    let categorias = [
        {
            index: 1,
            titulo: "Palestra",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#2A9D8F"
        },
        {
            index: 2,
            titulo: "Mesa redonda",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E9C46A"
        },
        {
            index: 3,
            titulo: "Discussão",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E76F51"
        },
        {
            index: 4,
            titulo: "Minicurso",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#E76F51"
        },
        {
            index: 5,
            titulo: "Next level",
            descricao: "Longa descrição teste teste teste teste",
            cor: "#2A9D8F"
        },

    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 3000},
            items: 5,
            slidesToSlide: 2
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
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
        <div className={"container-fluid " + styles.area}>
            <h3>Explore nossas categorias</h3>
            <div className={styles.linha}>

                <Carousel
                    swipeable={true}
                    draggable={false}
                    arrows={true}
                    // showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlay={true}
                    keyBoardControl={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    itemClass="carousel-item-padding-40-px">
                    {categorias.map(e =>
                        (<CardCategoria
                            key={e.index}
                            index={e.index}
                            titulo={e.titulo}
                            descricao={e.descricao}
                            cor={e.cor}/>)
                    )}


                </Carousel>
            </div>
        </div>
    );
}