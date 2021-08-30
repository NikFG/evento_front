import styles from "./LoginForm.module.css"
import Link from "next/link";
import {useRouter} from "next/router";
import {AxiosResponse} from "axios";
import {User} from "@types";


export default function LoginForm() {
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const axios = require("axios");
        const user = {
            "email": e.target.email.value,
            "password": e.target.senha.value
        }
        await axios.post("http://localhost:8000/api/user/login", user).then((value: AxiosResponse) => {
            // console.log(value)
            localStorage.setItem("USER_TOKEN", value.data.access_token)
            const user_logado: User = value.data.user
            console.log(user_logado);
            // router.push("/")
        })
            .catch((error: any) => {
                console.error(error)
            });
    }

    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <form method={"POST"} onSubmit={handleSubmit}>
                    <h3>Log in</h3>
                    <div className="form-group mb-3">
                        <label htmlFor={"email"} className={"form-label"}>Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Digite seu email"/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senha" className={"form-label"}>Senha</label>
                        <input id="senha" type="password" className="form-control" placeholder="Digite sua senha"/>
                        <p className="text-end">
                            Esqueceu sua <a href="#">senha?</a>
                        </p>
                    </div>

                    <div className="form-group">
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="lembrar" name="lembrar"/>
                            <label htmlFor="lembrar"
                                   className={"custom-control-label " + styles.unselectable}>Lembrar</label>
                        </div>
                    </div>
                    <div className={"row form-group " + styles.botao}>
                        <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Entrar</button>


                    </div>
                    <div className={"row mt-2"}>
                        <div className={"col-2"}>
                            <p className={"text-start"}>
                                <Link href={"/"}>
                                    <a>Voltar</a>
                                </Link>
                            </p></div>

                        <div className={"col-10"}>
                            <p className={"text-end"}>
                                <Link href={"/cadastro"}>

                                    <a>Criar conta</a>

                                </Link>
                            </p>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
}