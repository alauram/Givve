import { C, F, brl } from "../theme/tokens";
import { PartnerBottomNav } from "../components/PartnerBottomNav";

const ACTIVE_ORDERS = [
    { id: 1042, items: 8, time: "há 5 min", price: 50.32 },
    { id: 1041, items: 4, time: "há 2h", price: 23.21 },
];

const PAST_ORDERS = [
    { id: 1040, items: 2, time: "há 3h", price: 12.50 },
    { id: 1039, items: 5, time: "há 3h", price: 66.83 },
    { id: 1038, items: 9, time: "há 5h", price: 121.45 },
    { id: 1037, items: 1, time: "ontem", price: 6.00 },
    { id: 1036, items: 4, time: "ontem", price: 38.90 },
    { id: 1035, items: 5, time: "ontem", price: 47.00 },
];

export function PartnerHistory({ go, showToast, abrirPedido }) {
    return (
        <div style={styles.page}>
            <div style={{ padding: "24px 20px 16px" }}>
                <h1 style={styles.title}>Histórico de Pedidos</h1>
            </div>

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>EM ANDAMENTO</p>
                {ACTIVE_ORDERS.map((o) => (
                    <button
                        key={o.id}
                        style={styles.orderCardActive}
                        onClick={() => abrirPedido(o.id)}
                    >
                        <div style={{ textAlign: "left" }}>
                            <p style={styles.orderTitle}>Pedido #{o.id}</p>
                            <p style={styles.orderSub}>
                                {o.items} {o.items > 1 ? 'itens' : 'item'} · {o.time}
                            </p>
                        </div>
                        <span style={styles.price}>{brl(o.price)}</span>
                    </button>
                ))}

                <p style={styles.sectionLabel} style={{ ...styles.sectionLabel, marginTop: 24 }}>
                    CONCLUÍDOS
                </p>
                {PAST_ORDERS.map((o) => (
                    <div key={o.id} style={styles.orderCardPast}>
                        <div style={{ textAlign: "left" }}>
                            <p style={styles.orderTitle}>Pedido #{o.id}</p>
                            <p style={styles.orderSub}>
                                {o.items} {o.items > 1 ? 'itens' : 'item'} · {o.time}
                            </p>
                        </div>
                        <span style={styles.price}>{brl(o.price)}</span>
                    </div>
                ))}
            </div>

            <PartnerBottomNav active="partnerHistory" go={go} showToast={showToast} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    title: { fontFamily: F.serif, fontSize: 24, color: C.dark, margin: 0 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px 20px" },
    sectionLabel: {
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.soft,
        margin: "0 4px 10px",
    },
    orderCardActive: {
        width: "100%",
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "16px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
    },
    orderCardPast: {
        width: "100%",
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "16px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    orderTitle: { margin: 0, fontSize: 15, fontWeight: 500, color: C.ink },
    orderSub: { margin: "4px 0 0", fontFamily: F.mono, fontSize: 11, color: C.soft },
    price: { fontFamily: F.mono, fontSize: 13, color: C.green, fontWeight: 500 },
};