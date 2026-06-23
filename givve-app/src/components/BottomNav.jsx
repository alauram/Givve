import { Home, Search, Bell, User } from "lucide-react";
import { C } from "../theme/tokens";



export function BottomNav({ active, go, showToast }) {
  const tabs = [
    { k: "inicio", Icon: Home, onPress: () => showToast("Em breve") },
    { k: "buscar", Icon: Search, onPress: () => go("buscar") },
    { k: "a10", Icon: Bell, onPress: () => go("a10") },
    { k: "a8", Icon: User, onPress: () => go("a8") },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", padding: "12px 0 16px",
      borderTop: `1px solid ${C.border}`, background: C.sand,
    }}>
      {tabs.map(({ k, Icon, onPress }) => (
        <Icon key={k} size={22} color={active === k ? C.green : C.iconOff}
          style={{ cursor: "pointer" }} onClick={onPress} />
      ))}
    </div>
  );
}
