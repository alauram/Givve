import { LayoutGrid, ClipboardList, Briefcase, Settings } from "lucide-react";
import { C } from "../theme/tokens";

export function PartnerBottomNav({ active, go, showToast }) {
    const NavItem = ({ id, Icon, onClick }) => {
        const isActive = active === id;
        const color = isActive ? C.green : C.soft;

        return (
            <button
                onClick={onClick || (() => go(id))}
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 0",
                }}
            >
                <Icon size={26} color={color} strokeWidth={isActive ? 2.5 : 2} />
            </button>
        );
    };

    return (
        <div style={{
            display: "flex",
            background: C.white,
            borderTop: `1px solid ${C.border}`,
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}>
            <NavItem id="partnerHome" Icon={LayoutGrid} />
            <NavItem id="partnerHistory" Icon={ClipboardList} />
            <NavItem id="partnerStore" Icon={Briefcase} />
            <NavItem id="partnerSettings" Icon={Settings} />        </div>
    );
}