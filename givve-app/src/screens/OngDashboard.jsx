import { CheckCircle2 } from "lucide-react";
import { C, F } from "../theme/tokens";
import { OngBottomNav } from "../components/OngBottomNav";

export function OngDashboard({ go, items }) {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>acompanhamento</h1>
            </div>

            <div style={styles.scroll}>
                <div style={styles.successCard}>
                    <CheckCircle2 size={24} color={C.white} />
                    <div>
                        <p style={styles.successTitle}>Meta batida!</p>
                        <p style={styles.successSub}>Cestas básicas - Vila Nova</p>
                    </div>
                </div>

                <div style={styles.sectionHeader}>
                    <p style={styles.sectionLabel}>EM ANDAMENTO</p>
                </div>

                {/* Renderização Dinâmica dos Itens */}
                {items.map((item) => {
                    const percentage = item.target > 0 ? Math.min(100, Math.round((item.current / item.target) * 100)) : 0;
                    return (
                        <div key={item.id} style={styles.progressCard}>
                            <div style={styles.progressHeader}>
                                <span style={styles.itemName}>{item.name}</span>
                                <span style={styles.itemValues}>{item.current}/{item.target}</span>
                            </div>
                            <div style={styles.track}>
                                <div style={{ ...styles.fill, width: `${percentage}%`, background: item.color }} />
                            </div>
                        </div>
                    );
                })}

                <p style={styles.sectionLabel} style={{...styles.sectionLabel, marginTop: 16}}>ÚLTIMAS DOAÇÕES</p>
                <div style={styles.donationCard}>
                    <span style={styles.donationName}>Lucas F. - 7 Itens</span>
                    <span style={styles.donationTime}>há 5 min</span>
                </div>
            </div>

            <OngBottomNav active="ongTracking" go={go} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    header: { padding: "24px 20px 16px", textAlign: "center" },
    title: { fontFamily: F.serif, fontSize: 24, color: C.dark, margin: 0 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px 20px" },
    successCard: { display: "flex", alignItems: "center", gap: 12, background: "#81C784", padding: "16px", borderRadius: 16, color: C.white, marginBottom: 24 },
    successTitle: { margin: 0, fontSize: 16, fontWeight: 600 },
    successSub: { margin: "2px 0 0", fontSize: 13, opacity: 0.9 },
    sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, margin: "0 4px 10px" },
    addBtn: { background: "none", border: "none", color: C.green, fontSize: 11, fontWeight: 700, cursor: "pointer" },
    progressCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 12 },
    progressHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
    itemName: { fontSize: 14, fontWeight: 600, color: C.ink },
    itemValues: { fontFamily: F.mono, fontSize: 12, color: C.soft },
    track: { height: 10, background: "#E0E0E0", borderRadius: 5, overflow: "hidden" },
    fill: { height: "100%", borderRadius: 5 },
    donationCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    donationName: { fontSize: 14, fontWeight: 500, color: C.ink },
    donationTime: { fontFamily: F.mono, fontSize: 11, color: C.soft },
};