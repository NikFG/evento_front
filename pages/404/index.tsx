import styles from "./Custom404.module.css";
import Link from "next/link";
import React from "react";

export default function Custom404() {
    const [mousePosition, setMousePosition] = React.useState({
        yAxis: 0,
        xAxis: 0
    });
    const [mouseY, setMouseY] = React.useState(0);
    const [mouseX, setMouseX] = React.useState(0);
    const [pageY, setPageY] = React.useState(0);
    const [pageX, setPageX] = React.useState(0);

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    React.useEffect(() => {
        let {width, height} = getWindowDimensions();
        setPageY(height);
        setPageX(width);

    }, []);


    return (
        <div className={"container-fluid " + styles.main}  onMouseMove={e => {
            setMouseY(e.pageY);
            let yAxis = (pageY / 2 - mouseY) / pageY * 300;

            setMouseX(e.pageX / -pageX);
            let xAxis = -mouseX * 100 - 100;
            setMousePosition({
                yAxis,
                xAxis
            });

        }}>
            <div className={styles.box}  onMouseMove={e => {
                setMouseY(e.pageY);
                let yAxis = (pageY / 2 - mouseY) / pageY * 300;

                setMouseX(e.pageX / -pageX);
                let xAxis = -mouseX * 100 - 100;
                setMousePosition({
                    yAxis,
                    xAxis
                });

            }}>
                <div className={styles.boxGhost}>
                    <div className={styles.symbol}/>
                    <div className={styles.symbol}/>
                    <div className={styles.symbol}/>
                    <div className={styles.symbol}/>
                    <div className={styles.symbol}/>
                    <div className={styles.symbol}/>

                    <div className={styles.boxGhostContainer}>
                        <div className={styles.boxGhostEyes}
                             style={{'transform': `translate(${mousePosition.xAxis}%, -${mousePosition.yAxis}%`}}>
                            <div className={styles.boxEyeLeft}/>
                            <div className={styles.boxEyeRight}/>
                        </div>
                        <div className={styles.boxGhostBottom}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
                    <div className={styles.boxGhostShadow}/>
                </div>

                <div className={styles.boxDescription}>
                    <div className={styles.boxDescriptionContainer}>
                        <div className={styles.boxDescriptionTitle}>Ops! Erro 404</div>
                        <div className={styles.boxDescriptionText}>
                            Parece que não encontramos a página que você procura.
                        </div>
                    </div>

                    <Link href={'/'}>
                        <a className={styles.boxButton}>Voltar</a>
                    </Link>

                </div>

            </div>
        </div>
    );
}