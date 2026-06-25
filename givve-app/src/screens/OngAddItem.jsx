import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScreenHeader from "../components/ScreenHeader";
import { C, F } from "../theme/tokens";

export function OngAddItem({ go, showToast, onAdd }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [urgency, setUrgency] = useState("Baixa");
    const [category, setCategory] = useState("Alimentos");

    const handleSave = () => {
        if (!name.trim() || !quantity) {
            showToast("Preencha nome e quantidade!");
            return;
        }

        onAdd({
            name: name,
            quantity: quantity,
            urgency: urgency,
            category: category
        });

        showToast("Item adicionado à lista!");
        go("management");
    };

    return (
        <div style={styles.page}>
            <ScreenHeader title="Adicionar item" onBack={() => go("management")} />

            <div style={styles.scroll}>
                <label style={styles.label}>NOME DO ITEM</label>
                <input
                    style={styles.input}
                    placeholder="Ex: Arroz 5Kg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label style={styles.label}>QUANTIDADE NECESSÁRIA</label>
                <input
                    type="number"
                    style={styles.input}
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label style={styles.label}>NÍVEL DE URGÊNCIA</label>
                <div style={styles.segmentedControl}>
                    {["Baixa", "Média", "Alta"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setUrgency(level)}
                            style={{
                                ...styles.segmentBtn,
                                background: urgency === level ? C.green : "transparent",
                                color: urgency === level ? C.white : C.soft,
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <label style={styles.label}>CATEGORIA</label>
                <div style={styles.selectWrap}>
                    <select
                        style={styles.select}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Alimentos</option>
                        <option>Produtos de limpeza</option>
                        <option>Remédios</option>
                    </select>
                    <ChevronDown size={20} color={C.soft} style={styles.selectIcon} />
                </div>
            </div>

            <div style={styles.footer}>
                <button style={styles.saveBtn} onClick={handleSave}>
                    SALVAR ITEM
                </button>
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    scroll: { flex: 1, overflowY: "auto", padding: "16px 20px" },
    label: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, marginBottom: 8, display: "block" },
    input: { width: "100%", padding: "16px", borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 20, fontSize: 15, fontFamily: F.sans, boxSizing: "border-box" },
    segmentedControl: { display: "flex", background: "#D7CCC8", borderRadius: 12, padding: 4, marginBottom: 20 },
    segmentBtn: { flex: 1, padding: "10px 0", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" },
    selectWrap: { position: "relative" },
    select: { width: "100%", padding: "16px", borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 15, fontFamily: F.sans, appearance: "none", background: C.white, boxSizing: "border-box" },
    selectIcon: { position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
    footer: { padding: "16px 20px" },
    saveBtn: { width: "100%", padding: "16px", borderRadius: 24, background: C.green, color: C.white, border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" },
};