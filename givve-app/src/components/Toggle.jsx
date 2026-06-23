import { C } from '../theme/tokens';

export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{
        ...styles.track,
        background: checked ? C.success : 'rgba(107,107,107,0.28)',
      }}
    >
      <span
        style={{
          ...styles.thumb,
          transform: checked ? 'translateX(18px)' : 'translateX(0)',
        }}
      />
    </button>
  );
}

const styles = {
  track: {
    width: 44,
    height: 26,
    borderRadius: 14,
    border: 'none',
    padding: 3,
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.18s ease',
    flexShrink: 0,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'transform 0.18s ease',
  },
};
