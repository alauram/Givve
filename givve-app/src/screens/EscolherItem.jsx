import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { C, F, brl } from "../theme/tokens";

// Dicionário de itens para compra por ONG
const ITEMS_POR_ONG = {
    "ONG Recomeçando": [
        { id: 1, nome: "Arroz 5kg", preco: 27.00 },
        { id: 2, nome: "Leite integral", preco: 6.00 },
        { id: 3, nome: "Cadernos e lápis", preco: 12.00 }
    ],
    "Casa do Caminho": [
        { id: 4, nome: "Absorventes", preco: 8.50 },
        { id: 5, nome: "Roupas infantis", preco: 35.00 }
    ],
    "Recomeçando Vidas": [
        { id: 6, nome: "Cestas básicas", preco: 65.00 },
        { id: 7, nome: "Papel higiênico", preco: 15.00 }
    ],
    "Instituto Esperança": [
        { id: 8, nome: "Cobertores", preco: 45.00 },
        { id: 9, nome: "Agasalhos", preco: 60.00 }
    ],
    "Lar Acolher": [
        { id: 10, nome: "Cobertores", preco: 45.00 },
        { id: 11, nome: "Desinfetante", preco: 12.00 }
    ],
    "Instituto Crescer": [
        { id: 12, nome: "Mochilas", preco: 50.00 },
        { id: 13, nome: "Estojos", preco: 15.00 }
    ]
};

export function EscolherItem({ ong, setCart, go }) {
    // Busca os itens da ONG ou usa um fallback caso não encontre
    const items = ITEMS_POR_ONG[ong] || ITEMS_POR_ONG["ONG Recomeçando"];

    // Inicializa as quantidades com 0
    const [qtds, setQtds] = useState(() => {
        const initialState = {};
        items.forEach(item => initialState[item.id] = 0);
        return initialState;
    });

    const inc = (id) => setQtds((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    const dec = (id) => setQtds((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));

    const subtotal = items.reduce((acc, item) => acc + (qtds[item.id] * item.preco), 0);

    const continuar = () => {
        const selecionados = items
            .filter((n) => qtds[n.id] > 0)
            .map((n) => ({ nome: n.nome, qtd: qtds[n.id], preco: n.preco }));
        setCart(selecionados);
        go("a5");
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <button onClick={() => go("ongDetails")} style={styles.backBtn}>
                    <ChevronLeft size={26} color={C.dark} />
                </button>
                <h1 style={styles.title}>Escolher item</h1>
                <div style={{ width: 26 }} />
            </div>

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>SELECIONE A QUANTIDADE</p>

                {items.map((item) => (
                    <div key={item.id} style={styles.itemCard}>
                        <div style={{ flex: 1 }}>
                            <p style={styles.itemName}>{item.nome}</p>
                            <p style={styles.itemPrice}>{brl(item.preco)}</p>
                        </div>

                        <div style={styles.stepperWrap}>
                            <button style={styles.stepperBtn} onClick={() => dec(item.id)}>-</button>
                            <span style={styles.stepperValue}>{qtds[item.id]}</span>
                            <button style={styles.stepperBtn} onClick={() => inc(item.id)}>+</button>
                        </div>
                    </div>
                ))}

                <div style={styles.divider} />

                <div style={styles.subtotalRow}>
                    <span style={styles.subtotalLabel}>Subtotal</span>
                    <span style={styles.subtotalValue}>{brl(subtotal)}</span>
                </div>

                <button
                    style={{
                        ...styles.continueBtn,
                        background: subtotal > 0 ? C.green : "rgba(31, 77, 63, 0.1)",
                        color: subtotal > 0 ? C.white : C.green,
                        cursor: subtotal > 0 ? "pointer" : "not-allowed"
                    }}
                    onClick={continuar}
                    disabled={subtotal === 0}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%", background: C.cream },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" },
    backBtn: { background: "transparent", border: "none", cursor: "pointer", padding: 0 },
    title: { margin: 0, fontFamily: F.serif, fontSize: 20, color: C.dark },
    scroll: { flex: 1, overflowY: "auto", padding: "20px" },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, marginBottom: 16 },
    itemCard: { display: "flex", alignItems: "center", background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px", marginBottom: 12 },
    itemName: { margin: 0, fontSize: 15, fontWeight: 500, color: C.ink },
    itemPrice: { margin: "4px 0 0", fontFamily: F.mono, fontSize: 12, color: C.soft },
    stepperWrap: { display: "flex", alignItems: "center", gap: 12 },
    stepperBtn: { width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", color: C.dark },
    stepperValue: { fontFamily: F.mono, fontSize: 15, fontWeight: 500, color: C.ink, width: 20, textAlign: "center" },
    divider: { height: 1, borderTop: `1px dashed ${C.soft}`, margin: "24px 0", opacity: 0.5 },
    subtotalRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    subtotalLabel: { fontSize: 14, color: C.soft },
    subtotalValue: { fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.dark },
    continueBtn: { width: "100%", height: 56, borderRadius: 28, border: "none", fontSize: 16, fontWeight: 600, transition: "0.2s" }
};