import { Calendar, Building, Package2 } from 'lucide-react';
import { C, F, brl } from '../theme/tokens';
import ScreenHeader from '../components/ScreenHeader';

export default function MinhasDoacoes({ donations, onBack }) {
  return (
    <div style={styles.page}>
      <ScreenHeader title="Minhas doações" onBack={onBack} />

      <div style={styles.scroll}>
        {donations.length === 0 ? (
          <div style={styles.emptyState}>
            <Package2 size={48} color={C.iconOff} style={{ marginBottom: 12 }} />
            <p style={styles.emptyText}>Você ainda não fez nenhuma doação.</p>
            <p style={styles.emptySubtext}>Suas doações aparecerão aqui assim que forem confirmadas.</p>
          </div>
        ) : (
          <div style={styles.list}>
            {donations.map((d) => {
              const isEntregue = d.status === "Entregue";
              return (
                <div key={d.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.ongName}>{d.ong}</span>
                    <span style={{
                      ...styles.statusBadge,
                      background: isEntregue ? C.greenTint : C.amberTint,
                      color: isEntregue ? C.success : C.amberText,
                    }}>
                      {d.status}
                    </span>
                  </div>

                  <div style={styles.cardMeta}>
                    <div style={styles.metaItem}>
                      <Calendar size={13} color={C.soft} />
                      <span style={styles.metaText}>{d.date}</span>
                    </div>
                    <div style={styles.metaItem}>
                      <Building size={13} color={C.soft} />
                      <span style={styles.metaText}>{d.market}</span>
                    </div>
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.itemsList}>
                    {d.items.map((it, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <span style={styles.itemName}>
                          {it.nome} <span style={styles.itemQtd}>×{it.qtd}</span>
                        </span>
                        <span style={styles.itemPrice}>{brl(it.qtd * it.preco)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={styles.dividerDashed} />

                  <div style={styles.cardFooter}>
                    <span style={styles.totalLabel}>Total doado</span>
                    <span style={styles.totalValue}>{brl(d.total)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: C.cream,
  },
  scroll: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px 16px 24px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  card: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    padding: 16,
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ongName: {
    fontSize: 16,
    fontWeight: 600,
    color: C.ink,
    fontFamily: F.serif,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 12,
    fontFamily: F.sans,
    letterSpacing: '0.02em',
  },
  cardMeta: {
    display: 'flex',
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: C.soft,
    fontFamily: F.sans,
  },
  divider: {
    height: 1,
    background: C.border,
    margin: '4px 0 12px',
  },
  dividerDashed: {
    height: 1,
    borderTop: `1px dashed ${C.borderEm}`,
    margin: '12px 0',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 13,
    color: C.ink,
  },
  itemQtd: {
    color: C.soft,
    fontWeight: 500,
    marginLeft: 4,
  },
  itemPrice: {
    fontFamily: F.mono,
    fontSize: 12,
    color: C.soft,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    color: C.soft,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 600,
    color: C.green,
    fontFamily: F.sans,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 600,
    color: C.ink,
    margin: '0 0 4px',
    fontFamily: F.serif,
  },
  emptySubtext: {
    fontSize: 13,
    color: C.soft,
    margin: 0,
    lineHeight: 1.4,
  },
};
