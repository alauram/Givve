import { useState } from "react";
import { C, F } from "../theme/tokens";
import { Button } from "../components/Button";

const inputStyle = {
  width: "100%", padding: "12px 15px", borderRadius: 12,
  border: `1px solid ${C.border}`, fontSize: 13, fontFamily: F.sans, color: C.ink,
  outline: "none", background: C.white,
};

const CREDENTIALS = {
  lucas: { senha: "123", destino: "buscar" },
  marta: { senha: "123", destino: "management" },
  rita: { senha: "123", destino: "partnerHome" },
};

export function Login({ go, showToast }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    const cred = CREDENTIALS[usuario.trim().toLowerCase()];
    if (cred && cred.senha === senha) {
      go(cred.destino);
    } else {
      showToast("Usuário ou senha inválidos");
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px", gap: 12 }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <p style={{ margin: 0, fontFamily: F.serif, fontSize: 30, color: C.green }}>givve</p>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: C.soft }}>Doe itens essenciais, direto para quem precisa.</p>
      </div>

      <input
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={inputStyle}
      />
      <p style={{ margin: "0 0 6px", fontSize: 11, color: C.hint, textAlign: "center" }}>
        lucas → usuário · marta → ONG · rita → mercado &nbsp;(senha: 123)
      </p>

      <Button onClick={handleLogin} disabled={!usuario || !senha}>Entrar</Button>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
        <span onClick={() => showToast("Em breve")} style={{ fontSize: 12, color: C.green, cursor: "pointer" }}>Criar conta</span>
        <span onClick={() => showToast("Em breve")} style={{ fontSize: 12, color: C.hint, cursor: "pointer" }}>Esqueci minha senha</span>
      </div>
    </div>
  );
}
