import { C } from "../theme/tokens";


export function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.sand,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        cursor: onClick ? "pointer" : "default",
        transition: "transform .12s ease, border-color .12s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
