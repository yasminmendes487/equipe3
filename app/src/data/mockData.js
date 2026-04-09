export const currentUser = {
  id: '1',
  name: 'Yasmin Mendes',
  email: 'yasmin@eventNow.com',
  role: 'admin',

  id: '2',
  name: 'Yuré Santana',
  email: 'yure@eventNow.com',
  role: 'admin',
 
  id: '3',
  name: 'Isabella Andrade',
  email: 'isabella@eventNow.com',
  role: 'admin',

};



export const mockEvents = [
  { id: '1', title: 'Workshop de React Avançado', description: 'Aprenda hooks avançados, performance optimization e patterns modernos de React.', date: '10-04-2026', time: '14:00', location: 'Auditório Principal', capacity: 200, enrolled: 38, status: 'aberto', organizer: 'Yasmin Mendes', price: 89.90 },

  { id: '2', title: 'Hackathon Labs Talents', description: 'Competição de 24h para criar soluções inovadoras em equipe.', date: '15-04-2026', time: '08:00', location: 'Centro de Convenções', capacity: 120, enrolled: 95, status: 'aberto', organizer: 'Yuré Santana', price: 0 },

  { id: '3', title: 'Palestra: IA Generativa', description: 'Como a IA está transformando o desenvolvimento de software.', date: '11-04-2026', time: '19:00', location: 'Sala 201', capacity: 80, enrolled: 80, status: 'encerrado', organizer: 'Isabella Andrade', price: 99.90 },

  { id: '4', title: 'Bootcamp TypeScript', description: 'Domine TypeScript do zero ao avançado em um dia.', date: '26-05-2026', time: '09:00', location: 'Lab de Informática', capacity: 30, enrolled: 12, status: 'aberto', organizer: 'Yasmin Mendes', price: 79.90 },
];

export const mockEnrollments = [
  { id: '1', eventId: '1', eventTitle: 'Workshop de React Avançado', participantName: 'Carlos Silva', participantEmail: 'carlos@email.com', status: 'aprovado', paymentStatus: 'aprovado', date: '01-04-2026' },

  { id: '2', eventId: '1', eventTitle: 'Workshop de React Avançado', participantName: 'Ana Souza', participantEmail: 'ana@email.com', status: 'pendente', paymentStatus: 'pendente', date: '01-04-2026' },

  { id: '3', eventId: '2', eventTitle: 'Hackathon Labs Talents', participantName: 'Pedro Costa', participantEmail: 'pedro@email.com', status: 'aprovado', paymentStatus: 'aprovado', date: '02-04-2026' },

  { id: '4', eventId: '1', eventTitle: 'Workshop de React Avançado', participantName: 'Maria Oliveira', participantEmail: 'maria@email.com', status: 'recusado', paymentStatus: 'recusado', date: '03-04-2026' },

  { id: '5', eventId: '3', eventTitle: 'Palestra: IA Generativa', participantName: 'Lucas Ferreira', participantEmail: 'lucas@email.com', status: 'aprovado', paymentStatus: 'aprovado', date: '05-04-2026' },

  { id: '6', eventId: '2', eventTitle: 'Hackathon Labs Talents', participantName: 'Juliana Lima', participantEmail: 'juliana@email.com', status: 'pendente', paymentStatus: 'pendente', date: '06-04-2026' },
];

export const mockCheckIns = [
  { id: '1', eventId: '3', eventTitle: 'Palestra: IA Generativa', participantName: 'Lucas Ferreira', checkedInAt: '2026-04-10T18:55:00', certificateIssued: true },
  { id: '2', eventId: '3', eventTitle: 'Palestra: IA Generativa', participantName: 'Carlos Silva', checkedInAt: '2026-04-10T18:58:00', certificateIssued: true },
  { id: '3', eventId: '1', eventTitle: 'Workshop de React Avançado', participantName: 'Pedro Costa', checkedInAt: '2026-04-15T13:50:00', certificateIssued: false },
];
