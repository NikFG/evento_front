import styles from './Custom403.module.css';
import Link from "next/link";
import React from "react";
import {Col, Row} from 'react-bootstrap';

export default function Custom403() {
    return (
        <div className={"container-fluid " + styles.main}>
            <h1 className={styles.errorMain}>Oops!</h1>
            <div className={styles.errorHeading}>403</div>
            <p>Você não tem permissão ao recurso requisitado</p>
            <div className={'d-flex justify-content-center'}>

                    <Link href={'/'}>
                        <a className={styles.boxButton}>Voltar</a>
                    </Link>

            </div>
        </div>

    )
}