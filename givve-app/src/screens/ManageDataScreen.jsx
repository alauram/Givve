import { ChevronRight, Download, UserCog, Trash2 } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import Toggle from '../components/Toggle';
import { C, F } from '../theme/tokens';

export default function ManageDataScreen({ anonymousDonations, onToggleAnonymous, onBack, showToast }) {
  return (
    <div style={styles.page}>
      <ScreenHeader title="Gerenciar dados" onBack={onBack} />

      <div style={styles.scroll}>
        <p style={styles.intro}>
          Você tem controle total sobre suas informações, de acordo com a LGPD.
        </p>

        <p style={styles.sectionLabel}>Meus Dados</p>
        <div style={styles.card}>
          <button style={styles.linkRow} onClick={() => showToast("Em breve")}>
            <span style={styles.linkLeft}>
              <UserCog size={18} color={C.soft} />
              <span style={styles.linkText}>Editar dados pessoais</span>
            </span>
            <ChevronRight size={18} color={C.soft} />
          </button>
          <div style={styles.divider} />
          <button style={styles.linkRow} onClick={() => showToast("Em breve")}>
            <span style={styles.linkLeft}>
              <Download size={18} color={C.soft} />
              <span style={styles.linkText}>Baixar meus dados</span>
            </span>
            <ChevronRight size={18} color={C.soft} />
          </button>
        </div>

        <p style={styles.sectionLabel}>Privacidade</p>
        <div style={styles.card}>
          <div style={styles.row}>
            <span style={styles.linkText}>Doações anônimas</span>
            <Toggle
              checked={anonymousDonations}
              onChange={onToggleAnonymous}
              label="Ativar doações anônimas"
            />
          </div>
          <div style={styles.divider} />
          <button style={styles.linkRow} onClick={() => showToast("Em breve")}>
            <span style={styles.linkText}>Permissões de notificação</span>
            <ChevronRight size={18} color={C.soft} />
          </button>
        </div>
        <p style={styles.helperText}>
          Quando ativo, seu nome não aparece no histórico da ONG.
        </p>

        <p style={styles.sectionLabel}>Conta</p>
        <button style={styles.dangerButton} onClick={() => showToast("Em breve")}>
          <Trash2 size={17} />
          Excluir minha conta
        </button>

        <p style={styles.footerLinks}>
          Política de Privacidade · Termos de Uso
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', height: '100%' },
  scroll: { flex: 1, overflowY: 'auto', padding: '4px 20px 24px' },
  intro: {
    fontSize: 13,
    color: C.soft,
    lineHeight: 1.5,
    margin: '0 4px 18px',
  },
  sectionLabel: {
    fontFamily: F.mono,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: C.soft,
    margin: '0 4px 8px',
  },
  card: {
    background: C.sand,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    overflow: 'hidden',
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 16px',
  },
  linkRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  linkLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  linkText: { fontSize: 14.5, fontWeight: 500, color: C.ink },
  divider: { height: 1, background: C.border, margin: '0 16px' },
  helperText: {
    fontSize: 12.5,
    color: C.soft,
    margin: '-8px 4px 20px',
    lineHeight: 1.5,
  },
  dangerButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 0',
    borderRadius: 28,
    border: '1.5px solid #C0392B',
    background: 'transparent',
    color: '#C0392B',
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 24,
    cursor: 'pointer',
  },
  footerLinks: {
    textAlign: 'center',
    fontSize: 12,
    color: C.green,
    fontWeight: 500,
  },
};
