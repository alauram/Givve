import { useState } from "react";
import { Search, X, History, ChevronRight, Droplet, BedDouble } from "lucide-react";
import { C, F } from "../theme/tokens";
import { CATEGORIAS, needsByCategoria, searchNeeds, iconByCategoria } from "../data/needs";
import { LOGO_RECOMECANDO } from "../assets/logos";
import { Card } from "../components/Card";
import { Label } from "../components/Label";
import { Avatar } from "../components/Avatar";
import { BottomNav } from "../components/BottomNav";



export function Buscar({ go, showToast, iniciarDoacao }) {
  const [q, setQ] = useState("");
  const [foco, setFoco] = useState(false);
  const [cat, setCat] = useState(null);

  const digitando = foco || q.length > 0;
  const achados = searchNeeds(q);
  const recentes = ["cestas básicas", "ONG Esperança", "Cobertores"];

  
  const ResultRow = ({ item, ong, urgente, categoria }) => {
    const Ic = iconByCategoria(categoria || cat);
    return (
      <Card onClick={() => iniciarDoacao(ong, item)}
        style={{ padding: "12px 13px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
        <Ic size={18} color={C.green} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: C.ink }}>{item}</p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: C.soft }}>{ong}</p>
        </div>
        {urgente
          ? <span style={{ fontFamily: F.mono, fontSize: 9, color: C.cream, background: C.amber, borderRadius: 999, padding: "3px 8px" }}>URGENTE</span>
          : <ChevronRight size={16} color={C.iconOff} />}
      </Card>
    );
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px 16px 12px" }}>
        <span style={{ flex: 1, fontFamily: F.serif, fontSize: 22, color: C.dark }}>Buscar</span>
        <Avatar />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: C.white,
          border: `1px solid ${(digitando || cat) ? C.green : C.border}`, borderRadius: 999,
          padding: "11px 15px", marginBottom: 14, transition: "border-color .15s",
        }}>
          <Search size={16} color={(digitando || cat) ? C.green : C.hint} />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setCat(null); }}
            onFocus={() => setFoco(true)}
            onBlur={() => setFoco(false)}
            placeholder="O que você quer doar hoje?"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: F.sans, color: C.ink }}
          />
          {q && <X size={16} color={C.hint} style={{ cursor: "pointer" }} onClick={() => setQ("")} />}
        </div>

        {cat ? (
          <>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.green, color: C.cream, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontFamily: F.sans, marginBottom: 14 }}>
              {cat}
              <X size={14} style={{ cursor: "pointer" }} onClick={() => setCat(null)} />
            </div>
            <Label>{needsByCategoria(cat).length} resultados em {cat}</Label>
            {needsByCategoria(cat).map((r) => <ResultRow key={r.item} {...r} />)}
          </>
        ) : digitando ? (
          q.trim() ? (
            achados.length ? (
              <>
                <Label>{achados.length} resultado{achados.length > 1 ? "s" : ""} para "{q}"</Label>
                {achados.map((r) => <ResultRow key={r.categoria + r.item} {...r} />)}
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <Search size={28} color={C.iconOff} />
                <p style={{ margin: "12px 0 0", fontSize: 14, color: C.soft }}>Nenhum resultado para "{q}".</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: C.hint }}>Tente outro termo ou veja as categorias.</p>
              </div>
            )
          ) : (
            <>
              <Label>Buscas recentes</Label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                {recentes.map((r) => (
                  <button key={r} onMouseDown={(e) => e.preventDefault()} onClick={() => setQ(r)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.seg, color: C.soft, border: "none", borderRadius: 999, padding: "7px 13px", fontSize: 12, fontFamily: F.sans, cursor: "pointer" }}>
                    <History size={13} /> {r}
                  </button>
                ))}
              </div>
              <Label>Sugestões</Label>
              <Card onClick={() => iniciarDoacao("Casa do Caminho", "Absorventes")}
                style={{ padding: "12px 13px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <Droplet size={18} color={C.green} />
                <span style={{ flex: 1, fontSize: 13, color: C.ink }}>Absorventes · Casa do Caminho</span>
                <span style={{ fontFamily: F.mono, fontSize: 9, color: C.cream, background: C.amber, borderRadius: 999, padding: "3px 8px" }}>URGENTE</span>
              </Card>
              <Card onClick={() => iniciarDoacao("ONG Esperança", "Cobertores")}
                style={{ padding: "12px 13px", display: "flex", alignItems: "center", gap: 10 }}>
                <BedDouble size={18} color={C.green} />
                <span style={{ flex: 1, fontSize: 13, color: C.ink }}>Cobertores · ONG Esperança</span>
                <ChevronRight size={16} color={C.iconOff} />
              </Card>
            </>
          )
        ) : (
          <>
            <Label>Categorias</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              {CATEGORIAS.map(({ Icon, nome }) => (
                <div key={nome} onClick={() => { setCat(nome); setQ(""); }}
                  style={{ background: C.sand, border: `1px solid ${C.border}`, borderRadius: 14, padding: "15px 13px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <Icon size={20} color={C.green} />
                  <span style={{ fontSize: 13, color: C.ink }}>{nome}</span>
                </div>
              ))}
            </div>
            <Label>Perto de você</Label>
            <Card onClick={() => showToast("Em breve")}
              style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: C.white, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                <img src={LOGO_RECOMECANDO} alt="ONG Recomeçando" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: C.ink }}>ONG Recomeçando</p>
                <p style={{ margin: "2px 0 0", fontFamily: F.mono, fontSize: 11, color: C.label }}>1,4 km · 12 necessidades</p>
              </div>
              <ChevronRight size={18} color={C.iconOff} />
            </Card>
          </>
        )}
      </div>
      <BottomNav active="buscar" go={go} showToast={showToast} />
    </>
  );
}
