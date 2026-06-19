import { useState } from "react";
import { Check, Truck, Package, CheckCircle2, Share2, X } from "lucide-react";
import { C, F } from "../theme/tokens";
import { TopBar } from "../components/TopBar";
import { Button } from "../components/Button";
import shareImg from "../assets/share.png";


export function Confirmacao({ go, ong }) {
  const [showShare, setShowShare] = useState(false);
  const passos = [
    { t: "Pagamento recebido", s: "done", d: "Agora" },
    { t: "Compra no mercado", s: "active", d: "Em andamento" },
    { t: `Entrega à ${ong}`, s: "todo", d: "Em breve" },
  ];
  return (
    <>
      <style>{`
        @keyframes gvFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gvSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

      <TopBar title="Confirmação" />
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 16px", textAlign: "center", position: "relative" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.greenTint, display: "flex", alignItems: "center", justifyContent: "center", margin: "10px auto 16px" }}>
          <CheckCircle2 size={42} color={C.success} />
        </div>
        <p style={{ fontFamily: F.serif, fontSize: 24, color: C.dark, margin: "0 0 6px" }}>Doação confirmada!</p>
        <p style={{ fontSize: 13, color: C.soft, margin: "0 0 26px", lineHeight: 1.5 }}>
          Obrigado, Lucas. Acompanhe o caminho da sua doação abaixo.
        </p>

        <div style={{ textAlign: "left", marginBottom: 28 }}>
          {passos.map((p, i) => {
            const last = i === passos.length - 1;
            const cor = p.s === "done" ? C.success : p.s === "active" ? C.amber : C.iconOff;
            return (
              <div key={i} style={{ display: "flex", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: cor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.s === "done" ? <Check size={15} color={C.white} />
                      : p.s === "active" ? <Truck size={14} color={C.white} />
                      : <Package size={14} color={C.white} />}
                  </div>
                  {!last && <div style={{ width: 2, flex: 1, minHeight: 26, background: p.s === "done" ? C.success : C.line }} />}
                </div>
                <div style={{ paddingBottom: last ? 0 : 18 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: p.s === "todo" ? C.hint : C.ink }}>{p.t}</p>
                  <p style={{ margin: "2px 0 0", fontFamily: F.mono, fontSize: 11, color: cor }}>{p.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button onClick={() => go("a8")}>Ver minhas doações</Button>
          <Button variant="ghost" onClick={() => setShowShare(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Share2 size={16} /> Compartilhar
          </Button>
        </div>
      </div>

      {showShare && (
        <div
          onClick={() => setShowShare(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-end",
            animation: "gvFadeIn 0.2s ease-out"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              position: "relative",
              animation: "gvSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              maxHeight: "90%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <img src={shareImg} alt="Card de Compartilhamento" style={{ width: "100%", height: "auto", display: "block" }} />
            
            <button
              onClick={() => setShowShare(false)}
              style={{
                position: "absolute",
                right: "7.8%",
                top: "6.2%",
                width: 36,
                height: 36,
                transform: "translate(50%, -50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: "50%",
                outline: "none",
                WebkitTapHighlightColor: "transparent"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

