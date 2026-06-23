import { Truck, AlertTriangle, Award, CheckCircle2, CheckCheck, HelpCircle, ChevronRight } from 'lucide-react';
import { C, F } from '../theme/tokens';
import ScreenHeader from '../components/ScreenHeader';
import { BottomNav } from '../components/BottomNav';

const iconMap = {
  delivery: Truck,
  urgent: AlertTriangle,
  badge: Award,
  delivered: CheckCircle2,
};

export default function NotificationsScreen({ notifications, onMarkAllRead, onNavigateHelp, onBack, colorBlindMode, go, showToast }) {

  return (
    <div style={styles.page}>
      <ScreenHeader
        title="Notificações"
        onBack={onBack}
        action={
          <button
            onClick={onMarkAllRead}
            aria-label="Marcar todas como lidas"
            style={styles.markAllButton}
          >
            <CheckCheck size={20} color={C.green} />
          </button>
        }
      />

      <div style={styles.scroll}>
        {notifications.length === 0 ? (
          <p style={styles.emptyText}>Nenhuma notificação por aqui.</p>
        ) : (
          notifications.map((item) => {
            const Icon = iconMap[item.type] || CheckCircle2;
            return (
              <div key={item.id} style={styles.card}>
                <div
                  style={{
                    ...styles.iconWrap,
                    background: item.type === 'urgent' ? C.amberTint : C.greenTint,
                  }}
                >
                  <Icon
                    size={18}
                    color={item.type === 'urgent' ? C.amber : C.success}
                    strokeWidth={2}
                  />
                </div>
                <div style={styles.textWrap}>
                  <p style={styles.text}>{item.text}</p>
                  <span style={styles.time}>{item.time}</span>
                </div>
                {!item.read && (
                  colorBlindMode ? (
                    <span style={styles.unreadLabel}>NOVO</span>
                  ) : (
                    <span style={styles.dot} aria-label="não lida" />
                  )
                )}
              </div>
            );
          })
        )}

        <button style={styles.helpRow} onClick={onNavigateHelp}>
          <div style={styles.helpLeft}>
            <HelpCircle size={18} color={C.green} />
            <span style={styles.helpText}>Precisa de ajuda? Ver FAQ e suporte</span>
          </div>
          <ChevronRight size={18} color={C.soft} />
        </button>
      </div>
      <BottomNav active="a10" go={go} showToast={showToast} />
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', height: '100%' },
  markAllButton: {
    background: 'none',
    border: 'none',
    padding: 6,
    marginRight: -6,
    display: 'flex',
  },
  scroll: { flex: 1, overflowY: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 },
  emptyText: {
    textAlign: 'center',
    color: C.soft,
    fontSize: 14,
    padding: '32px 0',
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    background: C.sand,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: 14,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrap: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  text: { margin: 0, fontSize: 14, color: C.ink, lineHeight: 1.4 },
  time: { fontSize: 12, color: C.soft, fontFamily: F.mono },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: C.amber,
    flexShrink: 0,
    marginTop: 6,
  },
  unreadLabel: {
    fontFamily: F.mono,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.4,
    color: C.amber,
    border: `1px solid ${C.amber}`,
    borderRadius: 8,
    padding: '2px 6px',
    flexShrink: 0,
  },
  helpRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    background: C.greenTint,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '14px 16px',
    marginTop: 4,
  },
  helpLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  helpText: { fontSize: 13.5, fontWeight: 500, color: C.green },
};
