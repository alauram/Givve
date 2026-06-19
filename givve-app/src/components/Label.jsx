import { C, F } from "../theme/tokens";


export function Label({ children, style }) {
  return (
    <p style={{
      fontFamily: F.mono, fontSize: 11, letterSpacing: ".08em",
      textTransform: "uppercase", color: C.label, margin: "0 0 8px", ...style,
    }}>
      {children}
    </p>
  );
}
