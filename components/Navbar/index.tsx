import Link from "next/link";
import style from './Navbar.module.css';

export default function Navbar() {
    return (

        <nav className={"navbar navbar-light navbar-expand-lg " + style.navbarCustom}>
            <div className="container-fluid">
                <Link href='/'>
                    <a className="navbar-brand">Even4</a>
                </Link>

                <div className="d-flex flex-row bd-highlight">
                    <Link href={'/'}>
                        <a className={'p-2 bd-highlight ' + style.linkCustom}>Eventos</a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'btn p-2 bd-highlight ' + style.btnBranco}>Criar evento</a>
                    </Link>
                    <Link href={'/'}>
                        <a className={'p-2 bd-highlight ' + style.linkCustom}>Login</a>
                    </Link>
                </div>


            </div>
        </nav>
    );
}