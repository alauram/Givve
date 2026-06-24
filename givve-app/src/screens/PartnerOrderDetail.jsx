import { useState } from "react";
import { Users } from "lucide-react";
import { C, F } from "../theme/tokens";
import ScreenHeader from "../components/ScreenHeader";

// Nosso "banco de dados" de pedidos
const ORDERS_DB = {
    1042: {
        id: 1042,
        destino: "ONG Esperança",
        tipo: "Entrega",
        dist: "4.1 km",
        items: [
            { nome: "Arroz 5kg", qtd: 2 },
            { nome: "Leite Integral", qtd: 5 },
            { nome: "Óleo de Soja", qtd: 1 },
        ],
    },
    1041: {
        id: 1041,
        destino: "ONG Esperança",
        tipo: "Retirada",
        dist: null, // Sem distância, pois é retirada
        items: [
            { nome: "Desinfetante", qtd: 2 },
            { nome: "Sabonete Líquido", qtd: 2 },
        ],
    }
};

const STATUS_LABELS = ["Em preparação", "Aguardando entrega/retirada", "Pedido recebido"];

export default function PartnerOrderDetail({ go, showToast, orderId }) {
    // Busca o pedido selecionado (ou fallback pro 1042 se não achar)
    const ORDER = ORDERS_DB[orderId] || ORDERS_DB[1042];

    const [checked, setChecked] = useState(() =>
        Object.fromEntries(ORDER.items.map((it) => [it.nome, false]))
    );
    const [status, setStatus] = useState(0);

    const allChecked = ORDER.items.every((it) => checked[it.nome]);

    const toggleItem = (nome) =>
        setChecked((s) => ({ ...s, [nome]: !s[nome] }));

    const advance = () => {
        if (status < STATUS_LABELS.length - 1) {
            setStatus((s) => s + 1);
            if (status === STATUS_LABELS.length - 2) {
                showToast("Pedido marcado como recebido!");
            }
        }
    };

    return (
        <div style={styles.page}>
            <ScreenHeader
                title={`Pedido #${ORDER.id}`}
                onBack={() => go("partnerHome")}
                center
            />

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>LISTA DE COMPRAS DO DOADOR</p>
                <div style={styles.listCard}>
                    {ORDER.items.map((it, i) => {
                        const isChecked = checked[it.nome];
                        const last = i === ORDER.items.length - 1;
                        return (
                            <div key={it.nome}>
                                <button style={styles.itemRow} onClick={() => toggleItem(it.nome)}>
                                    <div
                                        style={{
                                            ...styles.checkbox,
                                            background: isChecked ? C.green : C.white,
                                            borderColor: isChecked ? C.green : C.border,
                                        }}
                                    >
                                        {isChecked && (
                                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                                <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <span style={{
                                        ...styles.itemName,
                                        textDecoration: isChecked ? "line-through" : "none",
                                        color: isChecked ? C.soft : C.ink,
                                    }}>
                                        {it.nome}
                                    </span>
                                    <span style={styles.qtdPill}>{it.qtd}x</span>
                                </button>
                                {!last && <div style={styles.divider} />}
                            </div>
                        );
                    })}
                </div>

                <p style={styles.sectionLabel}>DESTINO</p>
                <div style={styles.destCard}>
                    <Users size={20} color={C.soft} style={{ flexShrink: 0 }} />
                    <div>
                        <p style={styles.destName}>{ORDER.destino}</p>
                        <p style={styles.destSub}>
                            {ORDER.tipo} {ORDER.dist ? `· ${ORDER.dist}` : ""}
                        </p>
                    </div>
                </div>

                <p style={styles.sectionLabel}>STATUS</p>
                <div style={styles.statusCard}>
                    <span style={styles.statusText}>{STATUS_LABELS[status]}</span>
                    {status < STATUS_LABELS.length - 1 && (
                        <button
                            style={{
                                ...styles.actionBtn,
                                background: status === 0 ? (allChecked ? C.green : C.amber) : C.green,
                                opacity: status === 0 && !allChecked ? 0.7 : 1,
                            }}
                            onClick={advance}
                            disabled={status === 0 && !allChecked}
                        >
                            {status === 0 ? "Pedido Pronto" : "Pedido recebido"}
                        </button>
                    )}
                    {status === STATUS_LABELS.length - 1 && (
                        <span style={{ ...styles.actionBtn, background: C.green, opacity: 1, cursor: "default" }}>
                            ✓ Concluído
                        </span>
                    )}
                </div>

                {status > 0 && status < STATUS_LABELS.length - 1 && (
                    <div style={styles.nextStepCard}>
                        <span style={styles.nextStepText}>{STATUS_LABELS[status + 1]}</span>
                    </div>
                )}
                {status === 1 && (
                    <div style={styles.finalStepCard}>
                        <button style={styles.finalBtn} onClick={advance}>
                            Pedido recebido
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    scroll: { flex: 1, overflowY: "auto", padding: "8px 20px 24px" },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, textTransform: "uppercase", color: C.soft, margin: "0 4px 10px" },
    listCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 22 },
    itemRow: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" },
    checkbox: { width: 22, height: 22, borderRadius: 6, border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s, border-color 0.15s" },
    itemName: { flex: 1, fontSize: 14.5, fontWeight: 500, transition: "color 0.15s" },
    qtdPill: { fontFamily: F.mono, fontSize: 12, color: C.soft, background: "rgba(107,107,107,0.1)", borderRadius: 10, padding: "3px 10px", flexShrink: 0 },
    divider: { height: 1, background: C.border, margin: "0 16px" },
    destCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 22, display: "flex", alignItems: "center", gap: 12 },
    destName: { margin: 0, fontSize: 15, fontWeight: 500, color: C.ink },
    destSub: { margin: "2px 0 0", fontSize: 12, color: C.soft },
    statusCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 },
    statusText: { fontSize: 15, fontWeight: 500, color: C.ink },
    actionBtn: { borderRadius: 20, border: "none", padding: "8px 16px", fontSize: 13.5, fontWeight: 600, color: C.white, cursor: "pointer", flexShrink: 0, transition: "opacity 0.2s" },
    nextStepCard: { background: "rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 16px", marginBottom: 10 },
    nextStepText: { fontSize: 15, color: C.soft },
    finalStepCard: { background: C.green, borderRadius: 16, padding: "14px 16px", marginBottom: 10 },
    finalBtn: { background: "none", border: "none", width: "100%", fontSize: 15, fontWeight: 600, color: C.white, cursor: "pointer", padding: 0 },
};