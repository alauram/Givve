import { C, F } from "../theme/tokens";


export function Avatar({ size = 36, initials = "LF" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: C.green, color: C.cream,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.round(size * 0.36), fontFamily: size >= 48 ? F.serif : F.sans, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}
