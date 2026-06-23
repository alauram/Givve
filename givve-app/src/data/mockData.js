export const notifications = [
  {
    id: 1,
    text: 'Sua doação saiu para entrega à ONG Esperança.',
    time: 'há 5 min',
    read: false,
    type: 'delivery',
  },
  {
    id: 2,
    text: 'Pedido urgente de cestas em Vila Nova.',
    time: 'há 2h',
    read: false,
    type: 'urgent',
  },
  {
    id: 3,
    text: 'Você subiu para o selo Anjo Prata!',
    time: 'ontem',
    read: true,
    type: 'badge',
  },
  {
    id: 4,
    text: 'Doação à Casa do Caminho entregue.',
    time: '2 dias',
    read: true,
    type: 'delivered',
  },
];

export const faqItems = [
  {
    id: 1,
    question: 'Como funciona a doação via PIX?',
    answer:
      'Você escolhe os itens, paga via PIX direto no app e o valor vai para um mercado parceiro perto da ONG. O mercado separa os produtos e a ONG retira — você acompanha cada etapa em tempo real.',
  },
  {
    id: 2,
    question: 'O que é o mercado parceiro?',
    answer:
      'É um comércio local cadastrado na Givve que recebe sua doação e separa os itens para a ONG. Assim o dinheiro fica no bairro, fortalece a economia local e a ONG recebe exatamente o que precisa.',
  },
  {
    id: 3,
    question: 'Como acompanho a minha doação?',
    answer:
      'Depois de doar, a tela de acompanhamento mostra cada etapa em tempo real: pagamento confirmado, mercado separando, ONG retirando e impacto registrado. Você também recebe uma notificação a cada mudança de status.',
  },
];

export const initialNeeds = [
  { id: 1, name: 'Arroz 5kg', quantity: 20, urgent: false },
  { id: 2, name: 'Leite integral', quantity: 12, unit: 'uni', urgent: true },
];

export const campaignGoal = {
  current: 8400,
  target: 12000,
};
