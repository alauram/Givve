import { AlertTriangle } from 'lucide-react';
import { C, F } from '../theme/tokens';

export default function UrgentBadge({ compact }) {
  return (
    <span style={{ ...styles.badge, padding: compact ? '4px 8px' : '6px 12px' }}>
      <AlertTriangle size={12} strokeWidth={2.5} />
      {compact ? 'URG' : 'URGENTE'}
    </span>
  );
}

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    background: C.amber,
    color: '#FFFFFF',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: F.mono,
    letterSpacing: 0.3,
    flexShrink: 0,
  },
};
