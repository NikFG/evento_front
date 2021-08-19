import styles from "./CadastroForm.module.css";
import InputMask from "react-input-mask";

export default function CadastroForm() {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <form>
                    <h3>Cadastro</h3>
                    <div className="form-group mb-3">
                        <label htmlFor={"nome"} className={"form-label"}>Nome completo</label>
                        <input id="nome" type="text" className="form-control" placeholder="Digite seu nome" required/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor={"email"} className={"form-label"}>Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Digite seu email" required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor={"cpf"} className={"form-label"}>CPF</label>
                        <InputMask id="cpf" className="form-control" placeholder="Digite seu cpf"
                                   mask={"999.999.999-99"} required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor={"telefone"} className={"form-label"}>Telefone</label>
                        <InputMask id="telefone" placeholder="Digite seu telefone" className={"form-control"}
                                   mask={"(99) 99999-9999"} required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senha" className={"form-label"}>Senha</label>
                        <input id="senha" type="password" className="form-control" placeholder="Digite sua senha" required/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senhaConfirm" className={"form-label"}>Confirme sua senha</label>
                        <input id="senhaConfirm" type="password" className="form-control"
                               placeholder="Digite sua senha novamente" required/>
                    </div>

                    <div className={"row form-group " + styles.botao}>
                        <button type="submit" className="btn btn-outline-primary btn-lg btn-block">Criar conta</button>
                    </div>

                </form>
            </div>
        </div>
    );
}