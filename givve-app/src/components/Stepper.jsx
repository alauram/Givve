import { Minus, Plus } from "lucide-react";
import { C, F } from "../theme/tokens";


export function Stepper({ value, onInc, onDec }) {
  const btn = {
    width: 30, height: 30, border: `1px solid ${C.borderEm}`, borderRadius: 8,
    background: "transparent", color: C.green, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button onClick={onDec} style={btn}><Minus size={15} /></button>
      <span style={{ fontFamily: F.mono, fontSize: 14, minWidth: 16, textAlign: "center" }}>{value}</span>
      <button onClick={onInc} style={btn}><Plus size={15} /></button>
    </div>
  );
}
