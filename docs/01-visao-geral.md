# 📌 Visão Geral da Plataforma

## 🧩 O que é
A **Plataforma de Eventos com Check-in** é um sistema web projetado para gerenciar todo o ciclo de vida de eventos, desde a inscrição e pagamento até o check-in presencial e a emissão de certificados.

O sistema tem como objetivo central facilitar a organização de eventos e melhorar a experiência dos participantes, garantindo **controle, segurança e rastreabilidade** das operações.

---

## 🎯 Objetivos Principais
- Automatizar o processo de inscrição e pagamento
- Garantir controle de presença com check-in digital
- Gerar comprovantes (certificados) automáticos
- Fornecer analytics e relatórios para organizadores
- Rastrear todas as operações para auditoria

---

## 👥 Público-alvo
- **Organizadores de eventos:** workshops, palestras, conferências
- **Participantes:** interessados em eventos e certificação
- **Administradores:** responsáveis pela gestão global da plataforma

---

## 🏗️ Contexto Técnico
- **Usuários esperados:** 100-1000 por evento
- **Eventos simultâneos:** 5-10
- **Volume de transações:** Baixo a médio
- **Criticidade:** Alta (envolve pagamento)
- **Horário crítico:** inscrição e check-in

---

## 👥 Perfis de Usuário

### 🔐 Admin
- Gerencia a plataforma de forma global
- Visualiza relatórios e métricas de todos eventos
- Gerencia usuários (organizadores e participantes)
- Acessa logs de auditoria completos
- Aprova pagamentos suspeitos manualmente

### 🛠️ Organizador
- Cria e edita seus próprios eventos
- Define vagas, datas, local e valores de inscrição
- Visualiza inscrições do seu evento
- Aprova ou recusa inscrições
- Realiza check-in dos participantes
- Emite certificados para participantes confirmados
- Acessa relatórios do seu evento

### 👤 Participante
- Pesquisa e visualiza eventos disponíveis
- Realiza inscrição com preenchimento de dados
- Realiza pagamento (cartão, boleto, PIX)
- Realiza check-in presencial no evento
- Baixa certificado após participação confirmada
- Visualiza histórico de eventos participados

---

## 🔄 Fluxos Principais

### 💳 Fluxo 1 — Inscrição + Pagamento
**Atores:** Participante, Organizador, Admin

1. Participante seleciona um evento
2. Realiza inscrição com preenchimento de dados
3. Envia pagamento (crédito, débito, PIX, boleto)
4. Organizador/Admin analisa o pagamento

**Decisão Principal:**
- ✅ Pagamento aprovado → inscrição confirmada
- ❌ Pagamento recusado → participante notificado

**Exceções/Erros Tratados:**
- ⚠️ Vagas esgotadas → recusa automática
- ⚠️ Dados inválidos → solicitação de correção
- ⚠️ Falha na transação → retry automático
- ⚠️ Pagamento duplicado → detecção e bloqueio

**Checagem de Permissão:**
- Admin pode revisar e aprovar pagamentos suspeitos
- Organizador visualiza apenas seus eventos

---

### 🎟️ Fluxo 2 — Check-in + Certificado
**Atores:** Participante, Organizador, Admin

1. Participante comparece ao evento com QR Code ou credencial
2. Organizador realiza o check-in no sistema
3. Sistema valida inscrição e pagamento confirmado

**Decisão Principal:**
- ✅ Dentro do horário → check-in registrado com timestamp
- ❌ Fora do horário → check-in recusado (com possibilidade de intervenção administrativa) 

**Exceções tratadas:**
- ⚠️ Participante não inscrito → acesso negado
- ⚠️ Código QR inválido/expirado → rejeição
- ⚠️ Erro ao gerar certificado → notificação para admin

**Após Check-in:**
3. Sistema gera certificado em PDF automaticamente
4. Certificado é enviado por email ao participante
5. Participante pode baixar certificado na plataforma

**Permissões:**
- Apenas Organizador/Admin podem fazer check-in
- Certificados só são gerados após presença confirmada

---

## 📋 Regras do Jogo (Constraints Obrigatórios)
- **Máximo de papéis:** 3 ✅ (Admin, Organizador, Participante)
- **Fluxos:** 2 ✅ (Inscrição+Pagamento, Check-in+Certificado)
- **Requisitos Funcionais:** até 12
- **Requisitos Não-Funcionais:** até 8 (segurança, usabilidade, disponibilidade)
- **Riscos de segurança:** 3 obrigatórios

---

## 🔗 Matriz de Participação nos Fluxos

| Fluxo | Admin | Organizador | Participante |
|-------|:-----:|:----------:|:------------:|
| **Inscrição + Pagamento** | Revisão/Aprovação | Análise | Ação principal |
| **Check-in + Certificado** | Acesso total | Ação principal | Ação principal |

---

## 📌 Premissas do Projeto
- Todos os usuários possuem email válido e verificado
- Pagamentos são processados via gateway certificado (PCI-DSS)
- Check-in é realizado presencialmente no local do evento
- Certificados são gerados automaticamente após check-in
- Eventos têm limite de vagas bem definido
- Horário de início/fim dos eventos é obrigatório

---

## 🎯 Valor Entregue por Papel

| Papel | Benefícios Principais |
|-------|----------------------|
| **Admin** | Controle total, auditoria, insights de plataforma |
| **Organizador** | Automação, controle de presença, certificação automática |
| **Participante** | Inscrição fácil, pagamento seguro, certificado digital |