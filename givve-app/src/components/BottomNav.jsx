import { Home, Search, Bell, User } from "lucide-react";
import { C } from "../theme/tokens";

export function BottomNav({ active, go, showToast }) {
  const NavItem = ({ id, Icon }) => {
    const isActive = active === id;
    const color = isActive ? C.green : C.soft;

    return (
        <button
            onClick={() => go(id)}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", border: "none", cursor: "pointer", padding: "16px 0",
            }}
        >
          <Icon size={26} color={color} strokeWidth={isActive ? 2.5 : 2} />
        </button>
    );
  };

  return (
      <div style={{
        display: "flex", background: C.white, borderTop: `1px solid ${C.border}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        <NavItem id="inicio" Icon={Home} />
        <NavItem id="buscar" Icon={Search} />
        <NavItem id="a10" Icon={Bell} />
        <NavItem id="a8" Icon={User} />
      </div>
  );
}