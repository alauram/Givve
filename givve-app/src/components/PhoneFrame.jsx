import { C, F } from "../theme/tokens";


export function PhoneFrame({ children }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#E8E4DB", display: "flex",
      justifyContent: "center", alignItems: "center", padding: 16, fontFamily: F.sans,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono&display=swap');
        @keyframes gvIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{
        width: "100%", maxWidth: 400, height: 780, background: C.cream, borderRadius: 28,
        overflow: "hidden", display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(22,32,27,.18)", position: "relative",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", padding: "10px 20px 2px",
          fontFamily: F.mono, fontSize: 11, color: C.ink,
        }}>
          <span>9:41</span><span>100%</span>
        </div>
        {children}
      </div>
    </div>
  );
}
