import { ChevronRight, Package, Settings, FileText, LogOut } from "lucide-react";
import { C, F } from "../theme/tokens";
import { TopBar } from "../components/TopBar";
import { Card } from "../components/Card";
import { Label } from "../components/Label";
import { Avatar } from "../components/Avatar";
import { BottomNav } from "../components/BottomNav";


export function Perfil({ go, showToast, onLogout }) {
  const stats = [["12", "doações"], ["38", "itens"]];
  const menu = [
    { Icon: Package, t: "Minhas doações", onClick: () => showToast("Em breve") },
    { Icon: Settings, t: "Configurações", onClick: () => go("a9") },
    { Icon: FileText, t: "Perguntas frequentes", onClick: () => go("a11") },
  ];
  return (
    <>
      <TopBar title="Perfil" />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <Avatar size={56} />
          <div>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: C.ink }}>Lucas Ferreira</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.soft }}>lucas@email.com</p>
          </div>
        </div>

        <Card style={{ display: "flex", padding: "14px 0", marginBottom: 18 }}>
          {stats.map(([n, l], i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <p style={{ margin: 0, fontFamily: F.serif, fontSize: 20, color: C.green }}>{n}</p>
              <p style={{ margin: "2px 0 0", fontFamily: F.mono, fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: C.label }}>{l}</p>
            </div>
          ))}
        </Card>

        <Label>Conta</Label>
        {menu.map(({ Icon, t, onClick }) => (
          <Card key={t} onClick={onClick}
            style={{ padding: "13px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
            <Icon size={20} color={C.green} />
            <span style={{ flex: 1, fontSize: 14, color: C.ink }}>{t}</span>
            <ChevronRight size={18} color={C.iconOff} />
          </Card>
        ))}
        <Card onClick={onLogout}
          style={{ padding: "13px 14px", marginTop: 4, display: "flex", alignItems: "center", gap: 12 }}>
          <LogOut size={20} color={C.danger} />
          <span style={{ flex: 1, fontSize: 14, color: C.danger }}>Sair</span>
        </Card>
      </div>
      <BottomNav active="a8" go={go} showToast={showToast} />
    </>
  );
}
