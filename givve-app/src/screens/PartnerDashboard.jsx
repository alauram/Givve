import { ChevronRight, Users } from "lucide-react";
import { C, F, brl } from "../theme/tokens";
import ScreenHeader from "../components/ScreenHeader";
import { PartnerBottomNav } from "../components/PartnerBottomNav";

const SALES_DATA = [1200, 980, 1450, 870, 1100, 760, 1840];
const DAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

const ORDERS = [
    { id: 1042, items: 8, time: "há 5 min", isNew: true },
    { id: 1041, items: 4, time: "há 2h", isNew: false },
];

const ONGS = [
    "ONG Esperança - Casa do Caminho",
    "Casa do Caminho",
];

export default function PartnerDashboard({ go, showToast, abrirPedido, orderProgress = {} }) {
    const maxVal = Math.max(...SALES_DATA);

    return (
        <div style={styles.page}>
            <ScreenHeader
                title="Painel do Parceiro"
                avatar="MB"
            />

            <div style={styles.scroll}>
                <div style={styles.card}>
                    <p style={styles.chartLabel}>VOLUME DE VENDAS · 7 DIAS</p>
                    <p style={styles.chartValue}>{brl(1840)}</p>
                    <div style={styles.chartRow}>
                        {SALES_DATA.map((v, i) => {
                            const isLast = i === SALES_DATA.length - 1;
                            const height = Math.max(14, Math.round((v / maxVal) * 72));
                            return (
                                <div key={i} style={styles.barWrap}>
                                    <div
                                        style={{
                                            width: 22,
                                            height,
                                            borderRadius: 6,
                                            background: isLast ? C.green : C.border,
                                            alignSelf: "flex-end",
                                        }}
                                    />
                                    <span style={styles.dayLabel}>{DAYS[i]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p style={styles.sectionLabel}>PEDIDOS RECEBIDOS VIA APP</p>
                {ORDERS.map((o) => (
                    <button
                        key={o.id}
                        style={styles.orderCard}
                        onClick={() => abrirPedido(o.id)}
                    >
                        <div style={{ flex: 1, textAlign: "left" }}>
                            <p style={styles.orderTitle}>Pedido #{o.id}</p>
                            <p style={styles.orderSub}>
                                {o.items} itens · {o.time}
                            </p>
                        </div>
                        {o.isNew && !orderProgress[o.id] ? (
                            <span style={styles.newBadge}>NOVO</span>
                        ) : (
                            <ChevronRight size={18} color={C.iconOff} />
                        )}
                    </button>
                ))}

                <p style={styles.sectionLabel}>ONG'S QUE ATENDO</p>
                {ONGS.map((ong) => (
                    <div key={ong} style={styles.ongCard}>
                        <Users size={18} color={C.soft} style={{ flexShrink: 0 }} />
                        <span style={styles.ongName}>{ong}</span>
                    </div>
                ))}
            </div>

            <PartnerBottomNav active="partnerHome" go={go} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    scroll: { flex: 1, overflowY: "auto", padding: "8px 20px 20px" },
    card: {
        background: C.sand,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: "16px 18px 14px",
        marginBottom: 24,
    },
    chartLabel: {
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.soft,
        margin: "0 0 4px",
    },
    chartValue: {
        fontFamily: F.serif,
        fontSize: 28,
        color: C.dark,
        margin: "0 0 14px",
    },
    chartRow: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 4,
        height: 88,
    },
    barWrap: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        height: "100%",
        justifyContent: "flex-end",
    },
    dayLabel: {
        fontFamily: F.mono,
        fontSize: 10,
        color: C.soft,
    },
    sectionLabel: {
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.soft,
        margin: "0 4px 10px",
    },
    orderCard: {
        width: "100%",
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "14px 16px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        textAlign: "left",
    },
    orderTitle: { margin: 0, fontSize: 15, fontWeight: 500, color: C.ink },
    orderSub: {
        margin: "2px 0 0",
        fontFamily: F.mono,
        fontSize: 11,
        color: C.soft,
    },
    newBadge: {
        background: C.amber,
        color: C.white,
        fontFamily: F.mono,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        borderRadius: 20,
        padding: "5px 12px",
        flexShrink: 0,
    },
    ongCard: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    ongName: { fontSize: 14, fontWeight: 500, color: C.ink },
};