import { Copy } from "lucide-react";
import { C, F, brl } from "../theme/tokens";
import { PIX } from "../data/needs";
import { TopBar } from "../components/TopBar";
import { Label } from "../components/Label";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { QrCode } from "../components/QrCode";


export function Pagamento({ go, market, ong, cart, showToast }) {
  const total = cart.reduce((s, i) => s + i.qtd * i.preco, 0);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(PIX); } catch (e) {}
    showToast("Código copiado!");
  };

  return (
    <>
      <TopBar title="Pagamento" onBack={() => go("a5")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <Card style={{ padding: "14px 15px", marginBottom: 16 }}>
          <Label style={{ marginBottom: 10 }}>Resumo</Label>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: C.soft }}>Para</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.ink }}>{ong}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: C.soft }}>Comprar em</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.ink }}>{market.nome}</span>
          </div>
          <div style={{ borderTop: `1px dashed ${C.line}`, paddingTop: 10 }}>
            {cart.map((i) => (
              <div key={i.nome} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: C.ink }}>{i.nome} ×{i.qtd}</span>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.soft }}>{brl(i.qtd * i.preco)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 18, textAlign: "center", marginBottom: 16 }}>
          <Label>Pague com Pix</Label>
          <div style={{ display: "inline-block", padding: 10, background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 12 }}>
            <QrCode size={132} />
          </div>
          <p style={{ fontSize: 12, color: C.soft, margin: "0 0 12px" }}>
            Abra o app do seu banco e leia o QR, ou use o código.
          </p>
          <button onClick={copiar} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.greenTint, color: C.green, border: "none", borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 500, fontFamily: F.sans, cursor: "pointer" }}>
            <Copy size={16} /> Copiar código Pix
          </button>
        </Card>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px 12px" }}>
          <span style={{ fontSize: 13, color: C.soft }}>Total</span>
          <span style={{ fontFamily: F.serif, fontSize: 18, color: C.dark }}>{brl(total)}</span>
        </div>
        <Button onClick={() => go("a7")}>Confirmar pagamento</Button>
      </div>
    </>
  );
}
