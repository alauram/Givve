import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { C, F } from "../theme/tokens";
import ScreenHeader from "../components/ScreenHeader";
import Toggle from "../components/Toggle";
import { PartnerBottomNav } from "../components/PartnerBottomNav";

export const ESTABELECIMENTO_INICIAL = {
    nome: "Mercado Bom Preço",
    rua: "Rua das Flores",
    numero: "240",
    bairro: "Centro",
    cidade: "Londrina",
    referencia: "Próximo ao Parque",
    telefone: "(43) 99999-9999",
    horaInicio: "08:00",
    horaFim: "22:00",
    entrega: true,
    retirada: true,
};

function parseHour(str) {
    const [h, m] = str.split(":").map(Number);
    return h + m / 60;
}

function formatHour(val) {
    const h = Math.floor(val);
    const m = Math.round((val - h) * 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function MeuEstabelecimento({ go, showToast, estabelecimento, onSaveEstabelecimento }) {
    const [editing, setEditing] = useState(false);

    if (editing) {
        return (
            <EditarNegocio
                estabelecimento={estabelecimento}
                onBack={() => setEditing(false)}
                onSave={(form) => {
                    onSaveEstabelecimento(form);
                    setEditing(false);
                    showToast("Informações salvas!");
                }}
            />
        );
    }

    return (
        <div style={styles.page}>
            <ScreenHeader title="Meu Estabelecimento" />

            <div style={styles.scroll}>
                <div style={styles.photoWrap}>
                    <div style={styles.photoPlaceholder}>
                        <span style={styles.photoIcon}>🛒</span>
                    </div>
                    <div style={styles.onlineDot} />
                </div>

                <p style={styles.storeName}>{estabelecimento.nome}</p>
                <div style={styles.badgeWrap}>
                    <span style={styles.badge}>Parceiro da Solidariedade</span>
                </div>

                <p style={styles.sectionLabel}>INFORMAÇÕES DO NEGÓCIO</p>
                <div style={styles.infoCard}>
                    <div style={styles.infoRow}>
                        <MapPin size={16} color={C.soft} style={{ flexShrink: 0 }} />
                        <span style={styles.infoText}>
              {estabelecimento.rua}, {estabelecimento.numero} - {estabelecimento.bairro}
            </span>
                    </div>
                    <div style={styles.divider} />
                    <div style={styles.infoRow}>
                        <Phone size={16} color={C.soft} style={{ flexShrink: 0 }} />
                        <span style={styles.infoText}>{estabelecimento.telefone}</span>
                    </div>
                    <div style={styles.divider} />
                    <div style={styles.infoRow}>
                        <Clock size={16} color={C.soft} style={{ flexShrink: 0 }} />
                        <span style={styles.infoText}>
              Seg - Sáb · {estabelecimento.horaInicio} às {estabelecimento.horaFim}
            </span>
                    </div>
                </div>

                <button style={styles.editBtn} onClick={() => setEditing(true)}>
                    Editar Negócio
                </button>
            </div>

            <PartnerBottomNav active="partnerStore" go={go} showToast={showToast} />
        </div>
    );
}

function EditarNegocio({ estabelecimento, onBack, onSave }) {
    const [form, setForm] = useState({ ...estabelecimento });
    const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const sliderStart = parseHour(form.horaInicio);
    const sliderEnd = parseHour(form.horaFim);

    return (
        <div style={styles.page}>
            <ScreenHeader title="Editar Negócio" onBack={onBack} center />

            <div style={styles.scroll}>
                <p style={styles.sectionLabel}>ENDEREÇO</p>
                <div style={styles.gridRow}>
                    <InputField label="Rua" value={form.rua} onChange={(v) => set("rua", v)} flex={2} />
                    <InputField label="Número" value={form.numero} onChange={(v) => set("numero", v)} flex={1} />
                    <InputField label="Bairro" value={form.bairro} onChange={(v) => set("bairro", v)} flex={1.5} />
                </div>
                <div style={styles.gridRow}>
                    <InputField label="Cidade" value={form.cidade} onChange={(v) => set("cidade", v)} flex={1} />
                    <InputField label="Referência" value={form.referencia} onChange={(v) => set("referencia", v)} flex={2} />
                </div>

                <p style={styles.sectionLabel}>TELEFONE</p>
                <div style={styles.inputWrap}>
                    <input
                        style={styles.input}
                        value={form.telefone}
                        onChange={(e) => set("telefone", e.target.value)}
                    />
                </div>

                <p style={styles.sectionLabel}>HORÁRIO DE FUNCIONAMENTO</p>
                <div style={styles.hoursCard}>
                    <div style={styles.hoursRow}>
                        <span style={styles.hoursLabel}>Seg - Sáb</span>
                        <span style={styles.hoursValue}>
              {form.horaInicio} - {form.horaFim}
            </span>
                    </div>
                    <div style={styles.sliderTrack}>
                        <input
                            type="range"
                            min={6}
                            max={12}
                            step={0.5}
                            value={sliderStart}
                            onChange={(e) => set("horaInicio", formatHour(parseFloat(e.target.value)))}
                            style={styles.slider}
                        />
                        <input
                            type="range"
                            min={18}
                            max={24}
                            step={0.5}
                            value={sliderEnd}
                            onChange={(e) => set("horaFim", formatHour(parseFloat(e.target.value)))}
                            style={{ ...styles.slider, marginTop: 6 }}
                        />
                    </div>
                </div>

                <p style={styles.sectionLabel}>MODELO DE ENTREGA</p>
                <div style={styles.deliveryCard}>
                    <div style={styles.deliveryRow}>
                        <span style={styles.deliveryLabel}>Entrega no endereço</span>
                        <Toggle
                            checked={form.entrega}
                            onChange={(v) => set("entrega", v)}
                            label="Entrega no endereço"
                        />
                    </div>
                    <div style={styles.divider} />
                    <div style={styles.deliveryRow}>
                        <span style={styles.deliveryLabel}>Retirada</span>
                        <Toggle
                            checked={form.retirada}
                            onChange={(v) => set("retirada", v)}
                            label="Retirada"
                        />
                    </div>
                </div>
                <p style={styles.helperText}>
                    Cabe à ONG selecionar o método mais vantajoso, se assegure de que
                    pelo menos uma das opções esteja ativa.
                </p>

                <button style={styles.saveBtn} onClick={() => onSave(form)}>
                    Salvar
                </button>
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, flex = 1 }) {
    return (
        <div style={{ flex, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={styles.inputFieldWrap}>
                <span style={styles.inputLabel}>{label}</span>
                <input
                    style={styles.inputInner}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    scroll: { flex: 1, overflowY: "auto", padding: "8px 20px 24px" },
    photoWrap: {
        position: "relative",
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        marginBottom: 16,
        aspectRatio: "16/7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.sand,
    },
    photoPlaceholder: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    photoIcon: { fontSize: 48 },
    onlineDot: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: C.success,
        border: "2px solid white",
    },
    storeName: {
        margin: "0 0 6px",
        fontFamily: F.serif,
        fontSize: 24,
        color: C.dark,
    },
    badgeWrap: { marginBottom: 20 },
    badge: {
        background: C.sand,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: "5px 14px",
        fontSize: 13,
        color: C.soft,
        fontWeight: 500,
    },
    sectionLabel: {
        fontFamily: F.mono,
        fontSize: 10.5,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: C.soft,
        margin: "0 4px 10px",
    },
    infoCard: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
    },
    infoText: { fontSize: 14, color: C.ink },
    divider: { height: 1, background: C.border, margin: "0 16px" },
    editBtn: {
        width: "100%",
        padding: "15px 0",
        borderRadius: 16,
        border: `1.5px solid ${C.border}`,
        background: C.white,
        color: C.ink,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
    },
    gridRow: { display: "flex", gap: 8, marginBottom: 8 },
    inputWrap: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: "14px 16px",
        fontSize: 15,
        color: C.ink,
        border: "none",
        outline: "none",
        background: "transparent",
        boxSizing: "border-box",
    },
    inputFieldWrap: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
    },
    inputLabel: {
        fontFamily: F.mono,
        fontSize: 10,
        letterSpacing: 0.4,
        color: C.soft,
        textTransform: "uppercase",
    },
    inputInner: {
        fontSize: 14,
        color: C.ink,
        border: "none",
        outline: "none",
        background: "transparent",
        padding: 0,
        width: "100%",
    },
    hoursCard: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 20,
    },
    hoursRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    hoursLabel: { fontSize: 14.5, fontWeight: 500, color: C.ink },
    hoursValue: { fontFamily: F.mono, fontSize: 13, color: C.soft },
    sliderTrack: { display: "flex", flexDirection: "column" },
    slider: { width: "100%", accentColor: C.green },
    deliveryCard: {
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 10,
    },
    deliveryRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
    },
    deliveryLabel: { fontSize: 14.5, fontWeight: 500, color: C.ink },
    helperText: {
        fontSize: 12.5,
        color: C.soft,
        lineHeight: 1.5,
        margin: "0 4px 24px",
    },
    saveBtn: {
        width: "100%",
        padding: "15px 0",
        borderRadius: 16,
        border: `1.5px solid ${C.border}`,
        background: C.white,
        color: C.ink,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
    },
};