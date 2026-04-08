// Registrations for Maria Participante (userId: 3)
export const registrations = [
  {
    id: 1,
    eventId: 2,
    userId: 3,
    eventTitle: "Hackathon Labs Talents",
    eventDate: "20/04/2026",
    paymentStatus: "Aprovado",
    status: "Confirmado",
    checkedIn: false,
    paymentMethod: "PIX",
  },
  {
    id: 2,
    eventId: 3,
    userId: 3,
    eventTitle: "Palestra: IA Generativa",
    eventDate: "25/04/2026",
    paymentStatus: "Pendente",
    status: "Pendente de Pagamento",
    checkedIn: false,
    paymentMethod: "Boleto Bancário",
  },
  {
    id: 3,
    eventId: 4,
    userId: 3,
    eventTitle: "Bootcamp TypeScript",
    eventDate: "01/05/2026",
    paymentStatus: "Recusado",
    status: "Cancelado",
    checkedIn: false,
    paymentMethod: "Cartão de Crédito",
  },
];

// Certificates for completed events
export const certificates = [
  {
    id: 1,
    userId: 3,
    eventId: 1,
    eventTitle: "Workshop de React Avançado",
    issueDate: "08/04/2026",
    code: "CERT-2026-001",
    hours: 8,
  },
];

// Participants per event (for organizador check-in)
export const participants = [
  {
    id: 1,
    name: "Maria Participante",
    email: "part@eventflow.com",
    eventId: 2,
    paymentStatus: "Aprovado",
    checkedIn: false,
  },
  {
    id: 2,
    name: "João Silva",
    email: "joao@email.com",
    eventId: 2,
    paymentStatus: "Aprovado",
    checkedIn: true,
  },
  {
    id: 3,
    name: "Carla Mendes",
    email: "carla@email.com",
    eventId: 2,
    paymentStatus: "Pendente",
    checkedIn: false,
  },
  {
    id: 4,
    name: "Pedro Costa",
    email: "pedro@email.com",
    eventId: 2,
    paymentStatus: "Aprovado",
    checkedIn: false,
  },
  {
    id: 5,
    name: "Luciana Ferreira",
    email: "lu@email.com",
    eventId: 1,
    paymentStatus: "Aprovado",
    checkedIn: true,
  },
  {
    id: 6,
    name: "Rafael Andrade",
    email: "rafa@email.com",
    eventId: 3,
    paymentStatus: "Aprovado",
    checkedIn: false,
  },
  {
    id: 7,
    name: "Beatriz Souza",
    email: "bea@email.com",
    eventId: 1,
    paymentStatus: "Aprovado",
    checkedIn: false,
  },
];

// All registrations for admin view
export const allRegistrations = [
  { id: 1, eventTitle: "Hackathon Labs Talents", userName: "Maria Participante", paymentStatus: "Aprovado", amount: "Gratuito", date: "10/04/2026" },
  { id: 2, eventTitle: "Palestra: IA Generativa", userName: "Maria Participante", paymentStatus: "Pendente", amount: "R$ 29,90", date: "11/04/2026" },
  { id: 3, eventTitle: "Bootcamp TypeScript", userName: "Maria Participante", paymentStatus: "Recusado", amount: "R$ 79,90", date: "09/04/2026" },
  { id: 4, eventTitle: "Workshop de React Avançado", userName: "João Silva", paymentStatus: "Aprovado", amount: "R$ 49,90", date: "01/04/2026" },
  { id: 5, eventTitle: "Workshop de React Avançado", userName: "Carla Mendes", paymentStatus: "Pendente", amount: "R$ 49,90", date: "02/04/2026" },
];
