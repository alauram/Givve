import { useState } from "react";
import { C, F, brl } from "../theme/tokens";
import { needsByOng } from "../data/needs";
import { TopBar } from "../components/TopBar";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { Stepper } from "../components/Stepper";



export function EscolherItem({ ong, initialItem, setCart, go }) {
  const needs = needsByOng(ong);
  const [qtd, setQtd] = useState(() =>
    Object.fromEntries(needs.map((n) => [n.item, n.item === initialItem ? 1 : 0])));

  const inc = (item, d) => setQtd((s) => ({ ...s, [item]: Math.max(0, (s[item] || 0) + d) }));
  const subtotal = needs.reduce((s, n) => s + (qtd[n.item] || 0) * n.preco, 0);

  const continuar = () => {
    const selecionados = needs
      .filter((n) => qtd[n.item] > 0)
      .map((n) => ({ nome: n.item, qtd: qtd[n.item], preco: n.preco }));
    setCart(selecionados);
    go("a5");
  };

  return (
    <>
      <TopBar title="Escolher item" onBack={() => go("buscar")} center />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <Label>Necessidades de {ong}</Label>
        {needs.map((n) => (
          <div key={n.item} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 10, display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: C.ink }}>{n.item}</p>
              <p style={{ margin: "2px 0 0", fontFamily: F.mono, fontSize: 11, color: C.label }}>{brl(n.preco)}</p>
            </div>
            <Stepper value={qtd[n.item] || 0} onDec={() => inc(n.item, -1)} onInc={() => inc(n.item, 1)} />
          </div>
        ))}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px dashed ${C.line}`, paddingTop: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: C.soft }}>Subtotal</span>
          <span style={{ fontFamily: F.serif, fontSize: 18, color: C.dark }}>{brl(subtotal)}</span>
        </div>
        <Button onClick={continuar} disabled={subtotal === 0}>Continuar</Button>
      </div>
    </>
  );
}
