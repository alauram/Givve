import { useState } from "react";
import { Search, ChevronRight, ShoppingBag, Droplet, Shirt, BedDouble, Book } from "lucide-react";
import { C, F } from "../theme/tokens";
import { BottomNav } from "../components/BottomNav";

import logoCasaDoCaminho from "../assets/logo-casa-do-caminho.png-omb2UCfK.png";
import logoInstitutoCrescer from "../assets/logo-instituto-crescer.png-C9mqGjPM.png";
import logoInstitutoEsperanca from "../assets/logo-instituto-esperança.png-cf4TVz1V.png";
import logoLarAcolher from "../assets/logo-lar-acolher.png-CwJLMA9C.png";
import logoRecomecandoVidas from "../assets/logo-recomeçando-vidas.png-DF76ZTXR.png";
import { LOGO_RECOMECANDO } from "../assets/logos";

const ONGS_MOCK = [
    { id: 1, nome: "ONG Recomeçando", percent: 70, logo: LOGO_RECOMECANDO, regiao: "Vila Nova" },
    { id: 2, nome: "Casa do Caminho", percent: 40, logo: logoCasaDoCaminho, regiao: "Centro" },
    { id: 3, nome: "Recomeçando Vidas", percent: 25, logo: logoRecomecandoVidas, regiao: "Centro" },
    { id: 4, nome: "Instituto Esperança", percent: 50, logo: logoInstitutoEsperanca, regiao: "Jardim Aurora" },
    { id: 5, nome: "Lar Acolher", percent: 80, logo: logoLarAcolher, regiao: "Zona Norte" },
    { id: 6, nome: "Instituto Crescer", percent: 60, logo: logoInstitutoCrescer, regiao: "Vila Nova" },
];

const URGENT_MOCK = [
    { id: 101, title: "Cestas Básicas · Vila Nova", percent: 62, sub: "Faltam 18 cestas", ong: "ONG Recomeçando" },
    { id: 102, title: "Cobertores · Zona Norte", percent: 62, sub: "Faltam 18 cobertores", ong: "Lar Acolher" },
];

const CATEGORIA_ITEMS_MOCK = [
    { id: 1, nome: "Arroz 5kg", ong: "ONG Recomeçando", cat: "Alimentos", Icon: ShoppingBag },
    { id: 2, nome: "Absorventes", ong: "Casa do Caminho", cat: "Higiene", Icon: Droplet },
    { id: 3, nome: "Roupas infantis", ong: "Casa do Caminho", cat: "Roupas", Icon: Shirt },
    { id: 4, nome: "Cobertores", ong: "Instituto Esperança", cat: "Cobertores", Icon: BedDouble },
    { id: 5, nome: "Cadernos e lápis", ong: "ONG Recomeçando", cat: "Material Escolar", Icon: Book },
];

const REGIOES = ["Centro", "Vila Nova", "Jardim Aurora", "Zona Norte"];

export function Inicio({ go, showToast, iniciarDoacao }) {
    const [q, setQ] = useState("");

    // CORREÇÃO: O estado inicial agora é null, para não selecionar nenhuma aba ao abrir
    const [activeTab, setActiveTab] = useState(null);
    const [activeRegiao, setActiveRegiao] = useState("Centro");

    const tabs = ["Região", "Urgência", "Categoria"];
    const isSearching = q.trim().length > 0;

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Início</h1>
                <div style={styles.avatar}>LF</div>
            </div>

            <div style={styles.scroll}>
                <div style={styles.searchWrap}>
                    <Search size={18} color={C.soft} />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Buscar ONGs e campanhas"
                        style={styles.searchInput}
                    />
                </div>

                {!isSearching && (
                    <div style={styles.tabsRow}>
                        {tabs.map((t) => (
                            <button
                                key={t}
                                onClick={() => setActiveTab(activeTab === t ? null : t)}
                                style={{
                                    ...styles.tabBtn,
                                    background: activeTab === t ? C.green : "transparent",
                                    color: activeTab === t ? C.white : C.soft,
                                    border: `1px solid ${activeTab === t ? C.green : C.border}`,
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                )}

                {isSearching ? (
                    <>
                        <p style={styles.sectionLabel}>RESULTADOS</p>
                        {ONGS_MOCK.filter(o => o.nome.toLowerCase().includes(q.toLowerCase())).map((ong) => (
                            <OngCard key={ong.id} ong={ong} onClick={() => iniciarDoacao(ong.nome)} />
                        ))}
                    </>
                ) : activeTab === "Região" ? (
                    <>
                        <div style={styles.subTabsRow}>
                            {REGIOES.map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setActiveRegiao(r)}
                                    style={{
                                        ...styles.subTabBtn,
                                        border: `1px solid ${activeRegiao === r ? C.green : C.border}`,
                                        color: activeRegiao === r ? C.white : C.soft,
                                        background: activeRegiao === r ? C.green : C.white,
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                        <p style={styles.sectionLabel}>ONGS EM {activeRegiao.toUpperCase()}</p>
                        {ONGS_MOCK.filter(o => o.regiao === activeRegiao).map((ong) => (
                            <OngCard key={ong.id} ong={ong} onClick={() => iniciarDoacao(ong.nome)} />
                        ))}
                    </>
                ) : activeTab === "Urgência" ? (
                    <>
                        <p style={styles.sectionLabel}>MAIS URGENTES PRIMEIRO</p>
                        {URGENT_MOCK.map((u) => (
                            <UrgentCard key={u.id} data={u} onClick={() => iniciarDoacao(u.ong)} />
                        ))}
                    </>
                ) : activeTab === "Categoria" ? (
                    <>
                        <p style={styles.sectionLabel}>RESULTADOS</p>
                        {CATEGORIA_ITEMS_MOCK.map((item) => (
                            <button key={item.id} style={styles.itemCard} onClick={() => iniciarDoacao(item.ong)}>
                                <div style={styles.itemIconBox}>
                                    <item.Icon size={20} color={C.green} />
                                </div>
                                <div style={{ flex: 1, textAlign: "left" }}>
                                    <p style={styles.itemName}>{item.nome}</p>
                                    <p style={styles.itemSub}>{item.ong} • {item.cat}</p>
                                </div>
                                <ChevronRight size={18} color={C.soft} />
                            </button>
                        ))}
                    </>
                ) : (
                    /* CORREÇÃO: Exibição padrão sem abas ativas */
                    <>
                        <p style={styles.sectionLabel}>PEDIDO URGENTE</p>
                        <UrgentCard data={URGENT_MOCK[0]} onClick={() => iniciarDoacao(URGENT_MOCK[0].ong)} />

                        <p style={styles.sectionLabel}>CAMPANHAS ATIVAS</p>
                        {ONGS_MOCK.filter(o => o.id === 1 || o.id === 2).map((ong) => (
                            <OngCard key={ong.id} ong={ong} onClick={() => iniciarDoacao(ong.nome)} />
                        ))}
                    </>
                )}
            </div>

            <BottomNav active="inicio" go={go} showToast={showToast} />
        </div>
    );
}

function OngCard({ ong, onClick }) {
    return (
        <button style={styles.ongCard} onClick={onClick}>
            <div style={styles.ongLogoBox}>
                {ong.logo ? (
                    <img src={ong.logo} alt={ong.nome} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                    <span style={{ fontSize: 20 }}>🏡</span>
                )}
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
                <p style={styles.ongName}>{ong.nome}</p>
                <p style={styles.ongSub}>{ong.regiao}</p>
                <div style={styles.trackSmall}><div style={{ ...styles.fillSmall, width: `${ong.percent}%` }} /></div>
                <p style={styles.ongSub}>{ong.percent}% da meta</p>
            </div>
        </button>
    );
}

function UrgentCard({ data, onClick }) {
    return (
        <button style={styles.urgentCard} onClick={onClick}>
            <div style={styles.urgentRow}>
                <span style={styles.urgentTitle}>{data.title}</span>
                <div style={styles.urgentBadge}>URGENTE</div>
            </div>
            <div style={styles.track}><div style={{ ...styles.fill, width: `${data.percent}%` }} /></div>
            <p style={styles.urgentSub}>{data.percent}% &nbsp;·&nbsp; {data.sub}</p>
        </button>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%", background: "#F5F3ED" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 16px" },
    title: { margin: 0, fontFamily: F.serif, fontSize: 28, color: C.dark },
    avatar: { width: 36, height: 36, borderRadius: "50%", background: C.green, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px 20px" },
    searchWrap: { display: "flex", alignItems: "center", gap: 10, background: C.white, border: `1px solid ${C.border}`, borderRadius: 999, padding: "12px 16px", marginBottom: 16 },
    searchInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, fontFamily: F.sans, color: C.ink },
    tabsRow: { display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 },
    tabBtn: { padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "0.2s", whiteSpace: "nowrap" },
    subTabsRow: { display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 },
    subTabBtn: { padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "0.2s", whiteSpace: "nowrap" },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, marginBottom: 12 },

    urgentCard: { width: "100%", background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", marginBottom: 16, cursor: "pointer", textAlign: "left" },
    urgentRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    urgentTitle: { fontSize: 15, fontWeight: 600, color: C.ink },
    urgentBadge: { background: "#D97706", color: C.white, fontSize: 10, fontFamily: F.mono, fontWeight: 700, padding: "4px 10px", borderRadius: 12, textTransform: "uppercase" },
    track: { height: 6, background: C.sand, borderRadius: 3, overflow: "hidden", marginBottom: 8 },
    fill: { height: "100%", background: "#D97706", borderRadius: 3 },
    urgentSub: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },

    ongCard: { width: "100%", display: "flex", alignItems: "center", gap: 14, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", marginBottom: 10, cursor: "pointer", textAlign: "left" },
    ongLogoBox: { width: 56, height: 56, borderRadius: 8, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", background: C.white, overflow: "hidden", flexShrink: 0 },
    ongName: { margin: "0 0 2px", fontSize: 15, fontWeight: 600, color: C.ink },
    trackSmall: { height: 4, background: C.sand, borderRadius: 2, overflow: "hidden", marginBottom: 6, marginTop: 8 },
    fillSmall: { height: "100%", background: C.green, borderRadius: 2 },
    ongSub: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },

    itemCard: { width: "100%", display: "flex", alignItems: "center", gap: 14, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px", marginBottom: 10, cursor: "pointer" },
    itemIconBox: { width: 44, height: 44, borderRadius: 10, background: "rgba(31,77,63,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    itemName: { margin: "0 0 4px", fontSize: 15, fontWeight: 500, color: C.ink },
    itemSub: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },
};