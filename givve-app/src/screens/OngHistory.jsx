import { Download } from "lucide-react";
import { C, F } from "../theme/tokens";
import { OngBottomNav } from "../components/OngBottomNav";

const HISTORY = [
    { name: "Lucas F", items: 7, date: "14 mai" },
    { name: "Emilly V.", items: 3, date: "28 mai" },
    { name: "Elias Julião", items: 24, date: "1 jun" },
    { name: "Anônimo", items: 4, date: "10 mai" },
];

export function OngHistory({ go, showToast }) {
    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Histórico</h1>
            </div>

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>RELATÓRIO DE ITENS</p>
                <div style={styles.statsCard}>
                    <div style={styles.statBox}>
                        <span style={styles.statNumber}>340</span>
                        <span style={styles.statLabel}>ITENS RECEBIDOS</span>
                    </div>
                    <div style={styles.divider} />
                    <div style={styles.statBox}>
                        <span style={styles.statNumber}>48</span>
                        <span style={styles.statLabel}>DOADORES</span>
                    </div>
                </div>

                <p style={styles.sectionLabel}>DOAÇÕES RECEBIDAS</p>
                {HISTORY.map((h, i) => (
                    <div key={i} style={styles.historyCard}>
                        <p style={styles.historyName}>{h.name}</p>
                        <p style={styles.historyDetails}>{h.items} itens - {h.date}</p>
                    </div>
                ))}

                <button style={styles.exportBtn} onClick={() => showToast("Download iniciado")}>
                    <Download size={16} /> Exportar relatório
                </button>
            </div>

            <OngBottomNav active="ongHistory" go={go} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    header: { padding: "24px 20px 16px", textAlign: "center" },
    title: { fontFamily: F.serif, fontSize: 24, color: C.dark, margin: 0 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px 20px" },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, margin: "0 4px 10px" },
    statsCard: { display: "flex", background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 0", marginBottom: 24 },
    statBox: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center" },
    statNumber: { fontFamily: F.serif, fontSize: 32, color: C.dark, marginBottom: 4 },
    statLabel: { fontFamily: F.mono, fontSize: 9, letterSpacing: 0.5, color: C.soft },
    divider: { width: 1, background: C.border },
    historyCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 10 },
    historyName: { margin: 0, fontSize: 15, fontWeight: 500, color: C.ink },
    historyDetails: { margin: "4px 0 0", fontFamily: F.mono, fontSize: 12, color: C.soft },
    exportBtn: { width: "100%", padding: "14px", marginTop: 20, borderRadius: 24, border: `1px solid ${C.border}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" },
};