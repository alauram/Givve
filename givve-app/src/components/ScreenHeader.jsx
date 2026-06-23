import { ChevronLeft } from 'lucide-react';
import { C, F } from '../theme/tokens';

export default function ScreenHeader({ title, onBack, avatar, action }) {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {onBack && (
          <button onClick={onBack} aria-label="Voltar" style={styles.backButton}>
            <ChevronLeft size={24} color={C.green} strokeWidth={2} />
          </button>
        )}
        <h1 style={styles.title}>{title}</h1>
      </div>
      {avatar && (
        <div style={styles.avatar} aria-hidden="true">
          {avatar}
        </div>
      )}
      {action && <div style={styles.action}>{action}</div>}
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '12px 20px 8px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  backButton: {
    background: 'none',
    border: 'none',
    padding: 4,
    marginLeft: -6,
    display: 'flex',
    flexShrink: 0,
  },
  title: {
    fontFamily: F.serif,
    fontSize: 26,
    fontWeight: 600,
    color: C.ink,
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: C.green,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: F.sans,
    fontWeight: 600,
    fontSize: 14,
    flexShrink: 0,
  },
  action: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  },
};
