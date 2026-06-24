import { Plus } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import UrgentBadge from '../components/UrgentBadge';
import { C, F } from '../theme/tokens';
import { OngBottomNav } from '../components/OngBottomNav';

export default function ManagementScreen({ goal, needs, onAddItem, go }) {
  const percentage = Math.round((goal.current / goal.target) * 100);

  return (
      <div style={styles.page}>
        <ScreenHeader title="Painel de Gestão" avatar="OR" />

        <div style={styles.scroll}>
          <p style={styles.sectionLabel}>Meta de Arrecadação</p>
          <div style={styles.goalCard}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${percentage}%` }} />
            </div>
            <span style={styles.goalText}>
            R$ {formatCurrency(goal.current)} de R$ {formatCurrency(goal.target)} · {percentage}%
          </span>
          </div>

          <p style={styles.sectionLabel}>Lista de Necessidades Ativas</p>
          <div style={styles.needsList}>
            {needs.map((need) => (
                <div key={need.id} style={styles.needRow}>
                  <span style={styles.needName}>{need.name}</span>
                  {need.urgent ? (
                      <UrgentBadge compact />
                  ) : (
                      <span style={styles.quantityPill}>
                  x{need.quantity}
                        {need.unit ? ` ${need.unit}` : ''}
                </span>
                  )}
                </div>
            ))}
          </div>

          <button style={styles.addButton} onClick={onAddItem}>
            <Plus size={18} strokeWidth={2.5} />
            Adicionar Item
          </button>
        </div>

        <OngBottomNav active="management" go={go} />
      </div>
  );
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR');
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', height: '100%' },
  scroll: { flex: 1, overflowY: 'auto', padding: '8px 20px 24px' },
  sectionLabel: {
    fontFamily: F.mono,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: C.soft,
    margin: '16px 4px 8px',
  },
  goalCard: {
    background: C.sand,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    background: 'rgba(31,77,63,0.12)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    background: C.green,
    transition: 'width 0.3s ease',
  },
  goalText: {
    fontFamily: F.mono,
    fontSize: 13,
    color: C.soft,
  },
  needsList: { display: 'flex', flexDirection: 'column', gap: 10 },
  needRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    background: C.sand,
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: '14px 16px',
  },
  needName: { fontSize: 15, fontWeight: 500, color: C.ink },
  quantityPill: {
    fontFamily: F.mono,
    fontSize: 12.5,
    color: C.soft,
    background: 'rgba(107,107,107,0.1)',
    borderRadius: 12,
    padding: '4px 10px',
    flexShrink: 0,
  },
  addButton: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '15px 0',
    borderRadius: 28,
    border: 'none',
    background: C.green,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
};