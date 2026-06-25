import { ChevronRight } from 'lucide-react';
import { C, F } from '../theme/tokens';
import ScreenHeader from '../components/ScreenHeader';
import Toggle from '../components/Toggle';

export default function SettingsScreen({ settings, onToggle, onNavigateNotifications, onNavigateData, onBack, onLogout }) {
  return (
    <div style={styles.page}>
      <ScreenHeader title="Configurações" onBack={onBack} />

      <div style={styles.scroll}>
        <Section label="Acessibilidade">
          <Row
            title="Modo Daltônico"
            description="Usa ícones e rótulos além de cor em todos os status."
            control={
              <Toggle
                checked={settings.colorBlindMode}
                onChange={(v) => onToggle('colorBlindMode', v)}
                label="Ativar modo daltônico"
              />
            }
          />
        </Section>

        <Section label="Notificações">
          <Row
            title="Campanhas Urgentes"
            control={
              <Toggle
                checked={settings.urgentCampaigns}
                onChange={(v) => onToggle('urgentCampaigns', v)}
                label="Ativar notificações de campanhas urgentes"
              />
            }
          />
          <Divider />
          <Row
            title="Status da Doação"
            control={
              <Toggle
                checked={settings.donationStatus}
                onChange={(v) => onToggle('donationStatus', v)}
                label="Ativar notificações de status da doação"
              />
            }
          />
          <Divider />
          <button style={styles.linkRow} onClick={onNavigateNotifications}>
            <span style={styles.linkText}>Ver notificações recentes</span>
            <ChevronRight size={18} color={C.soft} />
          </button>
        </Section>

        <Section label="Privacidade e Segurança">
          <button style={styles.linkRow} onClick={onNavigateData}>
            <span style={styles.linkText}>Gerenciar meus dados</span>
            <ChevronRight size={18} color={C.soft} />
          </button>
        </Section>

        <button style={styles.logoutButton} onClick={onLogout}>Sair</button>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={styles.section}>
      <p style={styles.sectionLabel}>{label}</p>
      <div style={styles.card}>{children}</div>
    </div>
  );
}

function Row({ title, description, control }) {
  return (
    <div style={styles.row}>
      <div style={styles.rowText}>
        <span style={styles.rowTitle}>{title}</span>
        {description && <span style={styles.rowDescription}>{description}</span>}
      </div>
      {control}
    </div>
  );
}

function Divider() {
  return <div style={styles.divider} />;
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', height: '100%' },
  scroll: { flex: 1, overflowY: 'auto', padding: '8px 16px 16px' },
  section: { marginBottom: 22 },
  sectionLabel: {
    fontFamily: F.mono,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: C.label,
    margin: '0 4px 8px',
    whiteSpace: 'normal',
    overflow: 'visible',
    lineHeight: 1.4,
  },
  card: {
    background: C.sand,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 16px',
  },
  rowText: { display: 'flex', flexDirection: 'column', gap: 4 },
  rowTitle: { fontSize: 15, fontWeight: 500, color: C.ink },
  rowDescription: { fontSize: 12.5, color: C.soft, lineHeight: 1.4 },
  divider: { height: 1, background: C.border, margin: '0 16px' },
  linkRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
  },
  linkText: { fontSize: 15, fontWeight: 500, color: C.ink },
  logoutButton: {
    width: '100%',
    marginTop: 8,
    padding: '14px 0',
    borderRadius: 28,
    border: `1.5px solid ${C.green}`,
    background: 'transparent',
    color: C.green,
    fontSize: 15,
    fontWeight: 600,
  },
};
