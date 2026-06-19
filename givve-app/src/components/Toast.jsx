import { Check } from "lucide-react";
import { C, F } from "../theme/tokens";


export function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "absolute", left: "50%", bottom: 90, transform: "translateX(-50%)",
      background: C.dark, color: C.cream, borderRadius: 12, padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontFamily: F.sans,
      boxShadow: "0 8px 24px rgba(0,0,0,.25)", animation: "gvIn .2s ease",
    }}>
      <Check size={16} color={C.success} /> {message}
    </div>
  );
}
