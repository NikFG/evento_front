import Link from "next/link";
import {Pagination} from "react-bootstrap";
import Router, {useRouter} from "next/router";
import React from "react";

export interface Props {
    total: number;
    atual: number;
    link: string;

}

export default function Paginacao({total, atual, link}: Props) {
    const router = useRouter();

    const query = geraQuery();


    function geraQuery() {
        let url = '&';
        const urlQuery = {...router.query};
        for (const [k, v] of Object.entries(urlQuery)) {
            if (k !== 'page') {
                url += `${k}=${v}&`;
            }
        }
        url = url.slice(0, -1);
       return url;
    }


    return (
        <>
            <Pagination>
                {atual !== 1 && <li className={'page-item'}>
                    <Link href={`/${link}?page=${atual - 1}${query}`}>
                        <a className={'page-link'}>Anterior</a>
                    </Link>
                </li>}

                {Array.from(Array(total).keys()).map(i => (
                    <li className={'page-item ' + (i + 1 === atual ? 'active' : '')} key={i}>
                        <Link href={`/${link}?page=${i + 1}${query}`}>
                            <a className={'page-link'}>{i + 1}</a>
                        </Link>
                    </li>
                ))}
                {atual < total &&
                    <li className={'page-item'}>
                        <Link href={`/${link}?page=${atual + 1}${query}`}>
                            <a className={'page-link'}>Próximo</a>
                        </Link>
                    </li>
                }
            </Pagination>
        </>
    );
}