import { useState } from "react";
import { Settings } from "lucide-react";
import ScreenHeader from "../components/ScreenHeader";
import { C, F } from "../theme/tokens";
import { OngBottomNav } from "../components/OngBottomNav";
import { LOGO_RECOMECANDO } from "../assets/logos";

export function OngProfile({ go, showToast }) {
    const [isEditing, setIsEditing] = useState(false);
    const [missao, setMissao] = useState("Combater a vulnerabilidade social e fomentar a cidadania por meio da educação, cultura, esporte e qualificação profissional.");

    return (
        <div style={styles.page}>
            <ScreenHeader
                title="Perfil da ONG"
                onBack={isEditing ? () => setIsEditing(false) : null}
                rightIcon={!isEditing ? <Settings size={20} color={C.dark} /> : null}
                onRightClick={!isEditing ? () => showToast("Configurações em breve") : null}
            />

            <div style={styles.scroll}>
                <div style={styles.logoCard}>
                    <img src={LOGO_RECOMECANDO} alt="Logo" style={styles.logo} />
                    <p style={styles.ongName}>ONG Recomeçando</p>
                </div>

                <p style={styles.sectionLabel}>MISSÃO</p>
                {isEditing ? (
                    <textarea
                        style={styles.textarea}
                        value={missao}
                        onChange={(e) => setMissao(e.target.value)}
                    />
                ) : (
                    <div style={styles.infoCard}>
                        <p style={styles.text}>{missao}</p>
                    </div>
                )}

                <p style={{...styles.sectionLabel, textAlign: "center", marginTop: 24}}>INFORMAÇÕES INSTITUCIONAIS</p>
                <div style={styles.infoCard}>
                    <div style={styles.row}><span style={styles.label}>CNPJ</span><span style={styles.value}>XXXXXXXXX</span></div>
                    <div style={styles.divider} />
                    <div style={styles.row}><span style={styles.label}>FUNDAÇÃO</span><span style={styles.value}>2015</span></div>
                    <div style={styles.divider} />
                    <div style={styles.row}><span style={styles.label}>CIDADE</span><span style={styles.value}>Rio de Janeiro, RJ</span></div>
                </div>

                <button
                    style={styles.actionBtn}
                    onClick={() => {
                        if (isEditing) showToast("Perfil salvo!");
                        setIsEditing(!isEditing);
                    }}
                >
                    {isEditing ? "Salvar Perfil" : "Editar Perfil"}
                </button>
            </div>

            {!isEditing && <OngBottomNav active="ongProfile" go={go} />}
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    scroll: { flex: 1, overflowY: "auto", padding: "8px 20px 20px" },
    logoCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 },
    logo: { width: 80, height: 80, objectFit: "contain", marginBottom: 12 },
    ongName: { margin: 0, fontFamily: F.serif, fontSize: 18, color: C.dark },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, margin: "0 4px 10px" },
    infoCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px" },
    textarea: { width: "100%", minHeight: 100, padding: "16px", borderRadius: 16, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: F.sans, resize: "none", boxSizing: "border-box" },
    text: { margin: 0, fontSize: 14, color: C.soft, lineHeight: 1.5 },
    row: { display: "flex", justifyContent: "space-between", padding: "12px 0" },
    label: { fontFamily: F.mono, fontSize: 12, color: C.soft },
    value: { fontSize: 13, color: C.ink },
    divider: { height: 1, background: C.border },
    actionBtn: { width: "100%", padding: "16px", marginTop: 24, borderRadius: 24, border: `1px solid ${C.green}`, background: "transparent", color: C.green, fontSize: 14, fontWeight: 600, cursor: "pointer" },
};