import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, F } from "../theme/tokens";
import { OngBottomNav } from "../components/OngBottomNav";
import Toggle from "../components/Toggle";

export function OngSettings({ go, showToast, settings, onToggle, onLogout }) {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <button onClick={() => go("ongProfile")} style={styles.iconBtn}>
                    <ChevronLeft size={26} color={C.dark} strokeWidth={2} />
                </button>
                <h1 style={styles.title}>Configurações</h1>
                <span style={styles.iconBtn} />
            </div>

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>ACESSIBILIDADE</p>
                <div style={styles.card}>
                    <div style={styles.row}>
                        <span style={styles.text}>Modo Daltônico</span>
                        <Toggle
                            checked={settings.colorBlindMode}
                            onChange={(val) => onToggle("colorBlindMode", val)}
                            label="Modo Daltônico"
                        />
                    </div>
                </div>
                <p style={styles.helperText}>
                    Usa ícones e rótulos além de cor em todos os status.
                </p>

                <p style={{ ...styles.sectionLabel, marginTop: 32 }}>
                    PRIVACIDADE E SEGURANÇA
                </p>
                <div style={styles.card}>
                    <button
                        style={styles.linkRow}
                        onClick={() => showToast("Em breve")}
                    >
                        <span style={styles.text}>Gerenciar meus dados</span>
                        <ChevronRight size={18} color={C.soft} />
                    </button>
                </div>

                <div style={styles.card}>
                    <button
                        style={styles.linkRow}
                        onClick={onLogout}
                    >
                        <span style={{ ...styles.text, color: C.danger }}>Sair</span>
                    </button>
                </div>
            </div>

            <OngBottomNav active="ongSettings" go={go} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" },
    iconBtn: { width: 26, height: 26, background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" },
    title: { fontFamily: F.serif, fontSize: 22, color: C.dark, margin: 0 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px 20px" },
    sectionLabel: {
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.soft,
        margin: "0 4px 10px",
    },
    card: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 10,
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
    },
    text: { fontSize: 15, fontWeight: 500, color: C.ink },
    helperText: { fontSize: 13, color: C.soft, margin: "0 4px", lineHeight: 1.5 },
    linkRow: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        background: "none",
        border: "none",
        cursor: "pointer",
    },
};