import { ChevronLeft } from "lucide-react";
import { C, F } from "../theme/tokens";


export function TopBar({ title, onBack, center = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "10px 16px 14px" }}>
      {onBack
        ? <ChevronLeft size={22} color={C.green} style={{ cursor: "pointer" }} onClick={onBack} />
        : <span style={{ width: 22 }} />}
      <span style={{
        flex: 1, fontFamily: F.serif, fontSize: 18, color: C.dark,
        textAlign: center ? "center" : "left",
        marginLeft: center ? 0 : 10, marginRight: center ? 22 : 0,
      }}>
        {title}
      </span>
    </div>
  );
}
