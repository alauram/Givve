import { ChevronRight, Store } from "lucide-react";
import { C, F } from "../theme/tokens";
import { MERCADOS } from "../data/needs";
import { TopBar } from "../components/TopBar";
import { Label } from "../components/Label";
import { Card } from "../components/Card";
import mapaImg from "../assets/mapa.png";


export function Fornecedores({ go, setMarket, ong }) {
  return (
    <>
      <TopBar title="Onde comprar" onBack={() => go("a4")} center />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <p style={{ fontSize: 13, color: C.soft, margin: "0 0 14px", lineHeight: 1.5 }}>
          Escolha um mercado parceiro. Sua doação vai direto para a <b style={{ color: C.green }}>{ong}</b>.
        </p>

        <style>{`
          @keyframes gvPulse {
            0% { transform: translate(-50%, -50%) scale(0.9); box-shadow: 0 0 0 0 rgba(178, 58, 46, 0.5); }
            70% { transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 0 8px rgba(178, 58, 46, 0); }
            100% { transform: translate(-50%, -50%) scale(0.9); box-shadow: 0 0 0 0 rgba(178, 58, 46, 0); }
          }
        `}</style>

        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "600 / 299",
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
          marginBottom: 18
        }}>
          <img src={mapaImg} alt="Mapa de fornecedores" style={{ width: "100%", height: "100%", display: "block" }} />


          <button
            onClick={() => { setMarket(MERCADOS.find(m => m.id === 3)); go("a6"); }}
            style={{
              position: "absolute",
              left: "26.3%",
              top: "68.6%",
              width: 36,
              height: 36,
              transform: "translate(-50%, -50%)",
              background: "rgba(178, 58, 46, 0.15)",
              border: `2px solid ${C.danger}`,
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              outline: "none",
              animation: "gvPulse 2s infinite ease-in-out"
            }}
            title="Almeida Mercados"
          />

          {}
          <button
            onClick={() => { setMarket(MERCADOS.find(m => m.id === 2)); go("a6"); }}
            style={{
              position: "absolute",
              left: "60.0%",
              top: "12.0%",
              width: 36,
              height: 36,
              transform: "translate(-50%, -50%)",
              background: "rgba(178, 58, 46, 0.15)",
              border: `2px solid ${C.danger}`,
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              outline: "none",
              animation: "gvPulse 2s infinite ease-in-out"
            }}
            title="Stock Atacadista"
          />

          {}
          <button
            onClick={() => { setMarket(MERCADOS.find(m => m.id === 1)); go("a6"); }}
            style={{
              position: "absolute",
              left: "64.7%",
              top: "74.9%",
              width: 36,
              height: 36,
              transform: "translate(-50%, -50%)",
              background: "rgba(178, 58, 46, 0.15)",
              border: `2px solid ${C.danger}`,
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              outline: "none",
              animation: "gvPulse 2s infinite ease-in-out"
            }}
            title="Atacadão"
          />
        </div>

        <Label>Mercados próximos</Label>
        {MERCADOS.map((m) => (
          <Card key={m.id} onClick={() => { setMarket(m); go("a6"); }}
            style={{ padding: "12px 13px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.greenTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Store size={22} color={C.green} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: C.ink }}>{m.nome}</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: C.soft }}>{m.end}</p>
            </div>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.label }}>{m.dist}</span>
            <ChevronRight size={18} color={C.iconOff} />
          </Card>
        ))}
      </div>
    </>
  );
}
