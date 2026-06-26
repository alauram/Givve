import { useState } from "react";
import { Search, ChevronRight, ShoppingBasket, Droplet, Shirt, BedDouble, Backpack, BriefcaseMedical, X } from "lucide-react";
import { C, F } from "../theme/tokens";
import { LOGO_RECOMECANDO } from "../assets/logos";
import { BottomNav } from "../components/BottomNav";

// Categorias com os ícones exatos do design
const CATEGORIAS_MOCK = [
    { id: 1, nome: "Alimentos", Icon: ShoppingBasket },
    { id: 2, nome: "Higiene", Icon: Droplet },
    { id: 3, nome: "Roupas", Icon: Shirt },
    { id: 4, nome: "Cobertores", Icon: BedDouble },
    { id: 5, nome: "Material Escolar", Icon: Backpack },
    { id: 6, nome: "Remédios", Icon: BriefcaseMedical },
];

// Banco de dados simulado para a pesquisa funcionar
const SEARCH_DB = [
    { id: 1, item: "Arroz 5kg", ong: "ONG Recomeçando", cat: "Alimentos", urgente: false },
    { id: 2, item: "Cestas Básicas", ong: "ONG Recomeçando", cat: "Alimentos", urgente: true },
    { id: 3, item: "Absorventes", ong: "Casa do Caminho", cat: "Higiene", urgente: true },
    { id: 4, item: "Roupas infantis", ong: "Casa do Caminho", cat: "Roupas", urgente: false },
    { id: 5, item: "Cobertores", ong: "Instituto Esperança", cat: "Cobertores", urgente: true },
    { id: 6, item: "Cadernos e lápis", ong: "ONG Recomeçando", cat: "Material Escolar", urgente: false },
    { id: 7, item: "Remédios básicos", ong: "Recomeçando Vidas", cat: "Remédios", urgente: true },
    { id: 8, item: "Leite e óleo", ong: "ONG Recomeçando", cat: "Alimentos", urgente: false },
];

export function Buscar({ go, showToast, iniciarDoacao }) {
    const [q, setQ] = useState("");
    const [cat, setCat] = useState(null);

    // Lógica de filtragem: por categoria ou por texto digitado
    const getResultados = () => {
        if (cat) return SEARCH_DB.filter(x => x.cat === cat);
        if (q.trim()) {
            return SEARCH_DB.filter(x =>
                x.item.toLowerCase().includes(q.toLowerCase()) ||
                x.ong.toLowerCase().includes(q.toLowerCase()) ||
                x.cat.toLowerCase().includes(q.toLowerCase())
            );
        }
        return [];
    };

    const resultados = getResultados();
    const isBuscando = cat !== null || q.trim().length > 0;

    return (
        <div style={styles.page}>
            <div style={styles.scroll}>

                {/* Barra de Pesquisa */}
                <div style={styles.searchWrap}>
                    <Search size={20} color={C.soft} />
                    <input
                        value={q}
                        onChange={(e) => { setQ(e.target.value); setCat(null); }} // Digitar limpa a categoria
                        placeholder="O que você quer doar hoje?"
                        style={styles.searchInput}
                    />
                    {q && (
                        <X
                            size={18}
                            color={C.hint}
                            style={{ cursor: "pointer" }}
                            onClick={() => setQ("")}
                        />
                    )}
                </div>

                {/* Alternância Dinâmica de Visão */}
                {isBuscando ? (
                    <>
                        <div style={styles.resultHeader}>
                            <p style={{...styles.sectionLabel, marginBottom: 0}}>
                                {cat ? `RESULTADOS EM ${cat.toUpperCase()}` : `RESULTADOS PARA "${q}"`}
                            </p>
                            {cat && (
                                <button onClick={() => setCat(null)} style={styles.clearBtn}>
                                    Limpar Filtro <X size={14} />
                                </button>
                            )}
                        </div>

                        {resultados.length > 0 ? (
                            resultados.map(res => {
                                const CatIcon = CATEGORIAS_MOCK.find(c => c.nome === res.cat)?.Icon || ShoppingBasket;
                                return (
                                    <button key={res.id} style={styles.resultCard} onClick={() => iniciarDoacao(res.ong, res.item)}>
                                        <div style={styles.resultIconBox}>
                                            <CatIcon size={20} color={C.green} strokeWidth={2} />
                                        </div>
                                        <div style={{ flex: 1, textAlign: "left" }}>
                                            <p style={styles.resultName}>{res.item}</p>
                                            <p style={styles.resultOng}>{res.ong}</p>
                                        </div>
                                        {res.urgente ? (
                                            <span style={styles.urgentBadge}>URGENTE</span>
                                        ) : (
                                            <ChevronRight size={18} color={C.soft} />
                                        )}
                                    </button>
                                )
                            })
                        ) : (
                            <div style={styles.emptyState}>
                                <Search size={28} color={C.iconOff} style={{ margin: "0 auto 12px", display: "block" }} />
                                <p style={{ margin: 0, fontSize: 14, color: C.soft }}>Nenhum resultado encontrado.</p>
                            </div>
                        )}
                    </>
                ) : (
                    /* Exibição Padrão (Sem Pesquisa Ativa) */
                    <>
                        <p style={styles.sectionLabel}>CATEGORIAS</p>
                        <div style={styles.grid}>
                            {CATEGORIAS_MOCK.map((categoria) => (
                                <button
                                    key={categoria.id}
                                    style={styles.catCard}
                                    onClick={() => { setCat(categoria.nome); setQ(""); }}
                                >
                                    <categoria.Icon size={20} color={C.green} strokeWidth={2} />
                                    <span style={styles.catName}>{categoria.nome}</span>
                                </button>
                            ))}
                        </div>

                        <p style={styles.sectionLabel}>PERTO DE VOCÊ</p>
                        <button style={styles.ongCard} onClick={() => iniciarDoacao("ONG Recomeçando")}>
                            <div style={styles.ongLogoBox}>
                                <img
                                    src={LOGO_RECOMECANDO}
                                    alt="ONG Recomeçando"
                                    style={{ width: "80%", height: "80%", objectFit: "contain" }}
                                />
                            </div>
                            <div style={{ flex: 1, textAlign: "left" }}>
                                <p style={styles.ongName}>ONG Recomeçando</p>
                                <p style={styles.ongSub}>1,4 km · 12 necessidades</p>
                            </div>
                            <ChevronRight size={18} color={C.soft} />
                        </button>
                    </>
                )}

            </div>
            <BottomNav active="buscar" go={go} showToast={showToast} />
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%", background: "#F5F3ED" },
    scroll: { flex: 1, overflowY: "auto", padding: "24px 20px" },

    // Barra de Pesquisa
    searchWrap: { display: "flex", alignItems: "center", gap: 12, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 28 },
    searchInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 15, fontFamily: F.sans, color: C.ink },

    // Rótulos
    sectionLabel: { fontFamily: F.mono, fontSize: 11, letterSpacing: 0.8, color: C.soft, marginBottom: 14, textTransform: "uppercase" },

    // Visão Padrão
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 },
    catCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" },
    catName: { fontSize: 14, fontWeight: 500, color: C.ink },
    ongCard: { width: "100%", background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "14px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textAlign: "left" },
    ongLogoBox: { width: 48, height: 48, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.white, flexShrink: 0 },
    ongName: { margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: C.ink },
    ongSub: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },

    // Visão de Resultados
    resultHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
    clearBtn: { display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", color: C.green, fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 },
    resultCard: { width: "100%", background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" },
    resultIconBox: { width: 44, height: 44, borderRadius: 12, background: "rgba(31,77,63,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    resultName: { margin: "0 0 4px", fontSize: 15, fontWeight: 500, color: C.ink },
    resultOng: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },
    urgentBadge: { background: "#D97706", color: C.white, fontSize: 10, fontFamily: F.mono, fontWeight: 700, padding: "4px 8px", borderRadius: 12 },
    emptyState: { textAlign: "center", padding: "40px 20px" },
};