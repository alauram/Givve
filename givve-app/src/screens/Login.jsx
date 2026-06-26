import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { C, F } from "../theme/tokens";
import { Button } from "../components/Button";
import logoGivve from "../assets/logo-coração-perfil.png";

// Transformamos o inputStyle em uma função para reagir ao erro
const getInputStyle = (hasError) => ({
    width: "100%", padding: "12px 15px", borderRadius: 12,
    border: `1px solid ${hasError ? "#DC2626" : C.border}`,
    fontSize: 13, fontFamily: F.sans,
    color: hasError ? "#DC2626" : C.ink,
    outline: "none",
    background: hasError ? "#FEF2F2" : C.white,
    boxSizing: "border-box"
});

const CREDENTIALS = {
    lucas: { senha: "123", destino: "inicio" },
    marta: { senha: "123", destino: "management" },
    rita: { senha: "123", destino: "partnerHome" },
};

export function Login({ go, showToast }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(false); // Novo estado de erro

    const handleLogin = () => {
        const cred = CREDENTIALS[usuario.trim().toLowerCase()];
        if (cred && cred.senha === senha) {
            setError(false);
            go(cred.destino);
        } else {
            // Ativa o erro visual em vez de chamar o showToast
            setError(true);
        }
    };

    return (
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 24px",
            gap: 12
        }}>
            <div style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                background: C.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px"
            }}>
                <img
                    src={logoGivve}
                    alt="Logo Givve"
                    style={{width: 52, height: 52, objectFit: "contain"}}
                />
            </div>
            <div style={{textAlign: "center", marginBottom: 18}}>
                <p style={{margin: 0, fontFamily: F.serif, fontSize: 30, color: C.green}}>Givve</p>
                <p style={{margin: "6px 0 0", fontSize: 13, color: C.soft}}>Doe itens essenciais, direto para quem
                    precisa.</p>
            </div>

            <input
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => { setUsuario(e.target.value); setError(false); }}
                style={getInputStyle(error)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setError(false); }}
                style={getInputStyle(error)}
            />

            {/* Mensagem de erro condicional */}
            {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#DC2626", marginTop: "-4px", paddingLeft: 4 }}>
                    <AlertCircle size={14} />
                    Usuário ou senha inválidos.
                </div>
            )}

            <p style={{margin: "0 0 6px", fontSize: 11, color: C.hint, textAlign: "center"}}>
                lucas → usuário · marta → ONG · rita → mercado &nbsp;(senha: 123)
            </p>

            <Button onClick={handleLogin} disabled={!usuario || !senha}>Entrar</Button>

            <div style={{display: "flex", justifyContent: "space-between", marginTop: 14}}>
                <span onClick={() => showToast("Em breve")} style={{fontSize: 12, color: C.green, cursor: "pointer"}}>Criar conta</span>
                <span onClick={() => showToast("Em breve")} style={{fontSize: 12, color: C.hint, cursor: "pointer"}}>Esqueci minha senha</span>
            </div>
        </div>
    );
}