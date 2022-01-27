import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.css";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";

export default function Footer() {
    return (
        <div className="my-5">
            <footer
                className="text-center text-lg-start text-dark"
                style={{backgroundColor: "#ECEFF1"}}>
                <section
                    className={"d-flex justify-content-between p-4 text-white " + styles.barraFooter}>
                    <div className="me-5">
                        {/*<span>Get connected with us on social networks:</span>*/}
                    </div>

                    <div>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-5 col-xl-5 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">E-ventos</h6>
                                <hr
                                    className={"mb-4 mt-0 d-inline-block mx-auto " + styles.divisor}

                                />
                                <p>
                                    Comece a criar seu evento de forma rápida e fácil conosco.
                                </p>
                            </div>


                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contato</h6>
                                <hr
                                    className={"mb-4 mt-0 d-inline-block mx-auto " + styles.divisor}
                                />
                                <p><FontAwesomeIcon className="me-1" icon={faEnvelope}/> info@example.com</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    className="text-center p-3"
                    style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    {new Date().getFullYear()}
                </div>
            </footer>
        </div>

    );
}