import { C, F } from "../theme/tokens";


export function Button({ children, onClick, variant = "primary", disabled = false }) {
  const base = {
    width: "100%", borderRadius: 999, fontFamily: F.sans, fontWeight: 500,
    cursor: disabled ? "default" : "pointer", border: "none",
  };
  const variants = {
    primary: { ...base, background: C.green, color: C.cream, padding: "13px", fontSize: 14 },
    ghost: { ...base, background: "transparent", color: C.green, border: `1.5px solid ${C.green}`, padding: "11px", fontSize: 14 },
    disabled: { ...base, background: C.disabledBg, color: C.disabledText, padding: "13px", fontSize: 14 },
  };
  const v = disabled ? "disabled" : variant;
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={variants[v]}>
      {children}
    </button>
  );
}
