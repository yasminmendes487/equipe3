# 📄 02 — Requisitos

## 📝 Requisitos Funcionais (RF) — Máx. 12

Formato: **"Como [perfil], quero [ação], para [benefício]."**  
Cada requisito possui **1 critério de aceitação objetivo**.

| Código | Requisito | Critério de Aceitação |
|--------|----------|----------------------|
| **RF-01** | Como **Organizador**, quero criar um evento com título, descrição, data, local e limite de vagas, para disponibilizá-lo para inscrição. | Sistema valida campos obrigatórios, salva com status **"Rascunho"** e exibe confirmação. |
| **RF-02** | Como **Participante**, quero me inscrever em um evento disponível, para garantir minha vaga. | Sistema valida vagas e cria inscrição com status **"Pendente de Pagamento"**. |
| **RF-03** | Como **Participante**, quero realizar pagamento online, para confirmar minha inscrição. | Sistema retorna status **aprovado/recusado em até 3s** e atualiza a inscrição. |
| **RF-04** | Como **Admin**, quero revisar pagamentos em análise, para garantir conformidade. | Admin altera status e sistema notifica o participante por e-mail. |
| **RF-05** | Como **Participante**, quero realizar check-in no evento, para registrar minha presença. | Sistema valida inscrição e registra presença com timestamp. |
| **RF-06** | Como **Organizador**, quero registrar presença manualmente, para controlar participantes no evento. | Sistema permite busca por nome/email e registra presença corretamente. |
| **RF-07** | Como **Sistema**, quero gerar certificados automaticamente, para comprovar participação. | Certificado gerado em **até 5s** com identificador único. |
| **RF-08** | Como **Participante**, quero acessar meus certificados, para comprovar participação. | Usuário visualiza e baixa certificados em PDF. |
| **RF-09** | Como **Organizador**, quero visualizar lista de participantes, para gerenciar o evento. | Sistema exibe lista com status de pagamento e presença com filtros. |
| **RF-10** | Como **Usuário**, quero me autenticar com segurança, para acessar o sistema. | Sistema valida credenciais e bloqueia após tentativas inválidas. |
| **RF-11** | Como **Novo usuário**, quero criar uma conta, para utilizar a plataforma. | Sistema valida e-mail único e ativa conta após verificação. |
| **RF-12** | Como **Admin**, quero gerar relatórios, para análise de eventos. | Sistema permite filtrar dados e exportar em PDF/Excel. |

---

## ⚙️ Requisitos Não-Funcionais (RNF) — Máx. 8

Inclui obrigatoriamente: **Segurança, Usabilidade e Disponibilidade**.  
Todos possuem critérios **mensuráveis sempre que possível**.

### 🔐 Segurança

| Código | Requisito | Métrica |
|--------|----------|--------|
| **RNF-01** | Autenticação com senha criptografada (bcrypt) e suporte a JWT. | ✅ Bloqueio após **5 tentativas por 30 minutos** |
| **RNF-02** | Criptografia de dados sensíveis em trânsito (TLS 1.3). | ✅ 100% dos dados sensíveis protegidos |
| **RNF-03** | Controle de acesso baseado em papéis (RBAC). | ✅ Nenhum acesso indevido permitido |
| **RNF-04** | Registro de logs para ações críticas. | ✅ Logs mantidos por **mínimo 90 dias** |

---

### 🎯 Usabilidade

| Código | Requisito | Métrica |
|--------|----------|--------|
| **RNF-05** | Interface responsiva e acessível em múltiplos dispositivos. | ✅ Funcional em desktop e mobile |
| **RNF-06** | Tempo de resposta otimizado. | ✅ Resposta em até **2 segundos** |

---

### ☁️ Disponibilidade

| Código | Requisito | Métrica |
|--------|----------|--------|
| **RNF-07** | Alta disponibilidade do sistema. | ✅ **99% uptime** mensal |
| **RNF-08** | Backup e recuperação de dados. | ✅ **RTO ≤ 4h** e **RPO ≤ 1h** |

---

## 📊 Rastreabilidade

| Código | Tipo | Prioridade |
|--------|------|------------|
| RF-01 a RF-03 | Core | Alta |
| RF-04 | Gerencial | Média |
| RF-05 a RF-08 | Core | Alta |
| RF-09 | Gerencial | Média |
| RF-10 a RF-11 | Core | Alta |
| RF-12 | Gerencial | Baixa |
| RNF-01 a RNF-04 | Segurança | Alta |
| RNF-05 a RNF-06 | Usabilidade | Alta |
| RNF-07 a RNF-08 | Disponibilidade | Alta |

---

## 📏 Métricas Mensuráveis

- **RNF-01:** Bloqueio após **5 tentativas falhas por 30 minutos**  
- **RNF-04:** Logs de ações administrativas registrados e auditáveis  
- **RNF-06:** Tempo de resposta de até **2 segundos**  
- **RNF-07:** **99% de uptime** (máx. 43 min/mês indisponível)  
- **RNF-08:** **RTO ≤ 4h** e **RPO ≤ 1h**