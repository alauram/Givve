import { LayoutGrid, Activity, RotateCcw, User } from "lucide-react";
import { C } from "../theme/tokens";

export function OngBottomNav({ active, go }) {
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
            <NavItem id="management" Icon={LayoutGrid} />
            <NavItem id="ongTracking" Icon={Activity} />
            <NavItem id="ongHistory" Icon={RotateCcw} />
            <NavItem id="ongProfile" Icon={User} />
        </div>
    );
}