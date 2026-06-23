import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { C, F } from '../theme/tokens';

export default function HelpScreen({ faqItems, onBack, showToast }) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggleOpen = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={styles.page}>
      <ScreenHeader title="Ajuda / Suporte" onBack={onBack} />

      <div style={styles.scroll}>
        <p style={styles.sectionLabel}>Perguntas Frequentes</p>

        <div style={styles.faqList}>
          {faqItems.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div key={item.id} style={styles.faqCard}>
                <button
                  style={styles.faqQuestion}
                  onClick={() => toggleOpen(item.id)}
                  aria-expanded={isOpen}
                >
                  <span style={styles.questionText}>{item.question}</span>
                  <ChevronDown
                    size={18}
                    color={C.soft}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={styles.faqAnswerWrap}>
                    <p style={styles.faqAnswer}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p style={styles.sectionLabel}>Contato</p>
        <button style={styles.contactButton} onClick={() => showToast("Em breve")}>
          <MessageCircle size={18} color={C.green} />
          Fale Conosco
        </button>
      </div>
    </div>
  );
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
  faqList: { display: 'flex', flexDirection: 'column', gap: 10 },
  faqCard: {
    background: C.sand,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    overflow: 'hidden',
  },
  faqQuestion: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
  },
  questionText: { fontSize: 14.5, fontWeight: 500, color: C.ink },
  faqAnswerWrap: { padding: '0 16px 16px' },
  faqAnswer: { margin: 0, fontSize: 13.5, color: C.soft, lineHeight: 1.55 },
  contactButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 0',
    borderRadius: 28,
    border: `1.5px solid ${C.green}`,
    background: 'transparent',
    color: C.green,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  },
};
