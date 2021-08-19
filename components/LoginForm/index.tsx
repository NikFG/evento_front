import styles from "./LoginForm.module.css"

export default function LoginForm() {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <form>
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
                            <label htmlFor="lembrar" className={"custom-control-label " + styles.unselectable}>Lembrar</label>
                        </div>
                    </div>
                    <div className={"row form-group " + styles.botao}>
                        <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Entrar</button>


                    </div>
                    <div className={"row mt-2"}>
                        <div className={"col-2"}>
                            <p className={"text-start"}>
                                <a href={""}>Voltar</a>
                            </p></div>

                        <div className={"col-10"}>
                            <p className={"text-end"}>
                                <a href={""}>Criar conta</a>
                            </p>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    );
}