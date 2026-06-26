import { useState } from "react";
import { ChevronLeft, Heart, CheckCircle2 } from "lucide-react";
import { C, F } from "../theme/tokens";

// Importação das Logos
import logoCasaDoCaminho from "../assets/logo-casa-do-caminho.png-omb2UCfK.png";
import logoInstitutoCrescer from "../assets/logo-instituto-crescer.png-C9mqGjPM.png";
import logoInstitutoEsperanca from "../assets/logo-instituto-esperança.png-cf4TVz1V.png";
import logoLarAcolher from "../assets/logo-lar-acolher.png-CwJLMA9C.png";
import logoRecomecandoVidas from "../assets/logo-recomeçando-vidas.png-DF76ZTXR.png";
import { LOGO_RECOMECANDO } from "../assets/logos";

// Dicionário de Dados Dinâmicos das ONGs
const ONGS_DATA = {
    "ONG Recomeçando": {
        logo: LOGO_RECOMECANDO,
        percent: 70,
        metaStr: "R$ 8.400 DE R$ 12.000",
        necessidades: [
            { icon: "☕", nome: "Arroz e feijão", faltam: 40 },
            { icon: "🍼", nome: "Leite e óleo", faltam: 25 },
            { icon: "📓", nome: "Cadernos e lápis", faltam: 15 }
        ]
    },
    "Casa do Caminho": {
        logo: logoCasaDoCaminho,
        percent: 40,
        metaStr: "R$ 2.000 DE R$ 5.000",
        necessidades: [
            { icon: "💧", nome: "Absorventes", faltam: 50 },
            { icon: "👕", nome: "Roupas infantis", faltam: 30 }
        ]
    },
    "Recomeçando Vidas": {
        logo: logoRecomecandoVidas,
        percent: 25,
        metaStr: "R$ 1.000 DE R$ 4.000",
        necessidades: [
            { icon: "🥫", nome: "Cestas básicas", faltam: 20 },
            { icon: "🧻", nome: "Papel higiênico", faltam: 45 }
        ]
    },
    "Instituto Esperança": {
        logo: logoInstitutoEsperanca,
        percent: 50,
        metaStr: "R$ 3.000 DE R$ 6.000",
        necessidades: [
            { icon: "🛏️", nome: "Cobertores", faltam: 20 },
            { icon: "🧥", nome: "Agasalhos", faltam: 10 }
        ]
    },
    "Lar Acolher": {
        logo: logoLarAcolher,
        percent: 80,
        metaStr: "R$ 8.000 DE R$ 10.000",
        necessidades: [
            { icon: "🛏️", nome: "Cobertores", faltam: 18 },
            { icon: "🧼", nome: "Produtos de limpeza", faltam: 12 }
        ]
    },
    "Instituto Crescer": {
        logo: logoInstitutoCrescer,
        percent: 60,
        metaStr: "R$ 6.000 DE R$ 10.000",
        necessidades: [
            { icon: "🎒", nome: "Mochilas", faltam: 10 },
            { icon: "✏️", nome: "Estojos", faltam: 25 }
        ]
    }
};

export function OngDetails({ go, ong, iniciarDoacao, onBack }) {
    const [liked, setLiked] = useState(false);

    // Busca os dados da ONG selecionada (ou usa um fallback de segurança)
    const data = ONGS_DATA[ong] || ONGS_DATA["ONG Recomeçando"];

    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <button onClick={onBack} style={styles.iconBtn}>
                    <ChevronLeft size={26} color={C.dark}/>
                </button>
                <button onClick={() => setLiked(!liked)} style={styles.iconBtn}>
                    <Heart size={24} color={C.green} fill={liked ? C.green : "transparent"} />
                </button>
            </div>

            <div style={styles.scroll}>
                {/* Banner Logo Dinâmico */}
                <div style={styles.logoWrap}>
                    {data.logo ? (
                        <img src={data.logo} alt={ong} style={{ width: 120, objectFit: "contain" }} />
                    ) : (
                        <span style={{ fontSize: 40 }}>🏡</span>
                    )}
                </div>

                {/* Title */}
                <div style={styles.titleRow}>
                    <h1 style={styles.title}>{ong}</h1>
                    <div style={styles.verifiedBadge}>
                        <CheckCircle2 size={12} color={C.green} /> Verificada
                    </div>
                </div>

                {/* Meta da Arrecadação Dinâmica */}
                <p style={styles.sectionLabel}>META DA ARRECADAÇÃO</p>
                <div style={styles.track}>
                    <div style={{ ...styles.fill, width: `${data.percent}%` }} />
                </div>
                <p style={styles.metaSub}>{data.metaStr}</p>

                {/* Lista de necessidades Dinâmica */}
                <p style={{ ...styles.sectionLabel, marginTop: 24 }}>
                    LISTA DE NECESSIDADES
                </p>

                {data.necessidades.map((item, index) => (
                    <div key={index} style={styles.needCard}>
                        <span style={styles.needLeft}>{item.icon} {item.nome}</span>
                        <span style={styles.needRight}>Faltam {item.faltam}</span>
                    </div>
                ))}
            </div>

            <div style={styles.footer}>
                <button style={styles.doarBtn} onClick={() => iniciarDoacao()}>
                    Quero doar
                </button>
            </div>
        </div>
    );
}

const styles = {
    page: { display: "flex", flexDirection: "column", height: "100%" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" },
    iconBtn: { background: "transparent", border: "none", cursor: "pointer", padding: 0 },
    scroll: { flex: 1, overflowY: "auto", padding: "0 20px" },
    logoWrap: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
    titleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24 },
    title: { margin: 0, fontFamily: F.serif, fontSize: 24, color: C.dark },
    verifiedBadge: { display: "flex", alignItems: "center", gap: 4, background: "rgba(31,77,63,0.1)", color: C.green, fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 12 },
    sectionLabel: { fontFamily: F.mono, fontSize: 10.5, letterSpacing: 0.6, color: C.soft, marginBottom: 10 },
    track: { height: 6, background: C.sand, borderRadius: 3, overflow: "hidden", marginBottom: 8 },
    fill: { height: "100%", background: C.green, borderRadius: 3 },
    metaSub: { margin: 0, fontFamily: F.mono, fontSize: 11, color: C.soft },
    needCard: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px", display: "flex", justifyContent: "space-between", marginBottom: 10 },
    needLeft: { fontSize: 14, fontWeight: 500, color: C.ink },
    needRight: { fontFamily: F.mono, fontSize: 11, color: C.soft },
    footer: { padding: "16px 20px" },
    doarBtn: { width: "100%", padding: "16px", borderRadius: 28, background: C.green, color: C.white, border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer" }
};