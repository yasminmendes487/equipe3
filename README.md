#  EventNow

> Plataforma completa para gestão de eventos com check-in, inscrições e certificados.  
> **Desafio 4 · Semana 2 · Labs Talents 2026**

## 📋 Sobre o Projeto

O **EventNow** é uma plataforma web para gerenciamento de eventos acadêmicos e corporativos. Permite que administradores criem eventos, gerenciem inscrições, realizem check-in de participantes e emitam certificados — tudo em um único lugar, com um fluxo conectado de ponta a ponta.

---

## ✨ Funcionalidades

| Módulo | Descrição |
|---|---|
| 🗓️ **Eventos** | Criação e listagem de eventos com controle de vagas, datas, local e preço |
| 📋 **Inscrições** | Aprovação ou recusa de inscrições com atualização de status de pagamento |
| ✅ **Check-in** | Registro de presença validado por lista de aprovados, com busca por nome e evento |
| 🏆 **Certificados** | Emissão de certificados vinculada ao check-in — só quem participou recebe |
| 📊 **Relatórios** | Receita estimada, inscrições por status e ocupação dos eventos |
| 👑 **Administradores** | Gerenciamento de usuários admin: adicionar, remover, ativar/desativar e alterar cargo |

### 🔗 Fluxo conectado

```
Inscrição pendente
       ↓
  Admin aprova
       ↓
Participante aparece na lista de Check-in
       ↓
  Check-in registrado
       ↓
Participante entra automaticamente em Certificados
       ↓
  Admin emite o certificado
```

## 👥 Perfis de Usuário

| Perfil | Acesso |
|---|---|
| 👑 **Admin** | Acesso total — gerencia usuários, relatórios e configurações |
| 🎯 **Organizador** | Cria eventos, aprova inscrições, realiza check-in e emite certificados |
| 🙋 **Participante** | Se inscreve em eventos, faz check-in e recebe certificados |


## 🛠️ Tecnologias

- **[React 19](https://react.dev/)** — biblioteca de interface
- **[Vite](https://vitejs.dev/)** — build tool e dev server
- **[React Router DOM v7](https://reactrouter.com/)** — roteamento
- **[Tailwind CSS v3](https://tailwindcss.com/)** — estilização utilitária
- **[Framer Motion](https://www.framer.com/motion/)** — animações
- **[Lucide React](https://lucide.dev/)** — ícones
- **[clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)** — utilitários de classe


## 📁 Estrutura do Projeto

```
src/
├── App.jsx                  # Roteamento e Context global (estado compartilhado)
├── main.jsx                 # Ponto de entrada React
├── index.css                # Estilos globais e variáveis CSS
│
├── components/
│   ├── AppLayout.jsx        # Layout base com sidebar
│   ├── AppSidebar.jsx       # Navegação lateral
│   ├── StatCard.jsx         # Card de estatística reutilizável
│   └── StatusBadge.jsx      # Badge de status (aprovado, pendente, etc.)
│
├── data/
│   └── mockData.js          # Dados mock: eventos, inscrições, check-ins, admins
│
├── lib/
│   └── utils.js             # Utilitário cn() para classes condicionais
│
└── pages/
    ├── Index.jsx            # Landing page pública
    ├── Login.jsx            # Tela de login
    ├── Cadastro.jsx         # Tela de cadastro
    ├── Dashboard.jsx        # Visão geral com métricas
    ├── Eventos.jsx          # Listagem e criação de eventos
    ├── Inscricoes.jsx       # Gestão de inscrições
    ├── CheckIn.jsx          # Registro de presença
    ├── Certificados.jsx     # Emissão de certificados
    ├── Relatorios.jsx       # Relatórios e métricas
    ├── Administradores.jsx  # Gestão de usuários admin
    └── NotFound.jsx         # Página 404
```

## 🏗️ Arquitetura

O estado da aplicação é centralizado em um **Context React** definido no `App.jsx`. Isso garante que mudanças em uma página (ex: aprovar uma inscrição em *Inscrições*) se reflitam imediatamente em outra (ex: lista de elegíveis no *Check-in*), sem a necessidade de um backend.

## 👩‍💻 Equipe

| Nome | GitHub |
|---|---|
| Isabella Andrade | [@raory1](https://github.com/raory1) |
| Yasmin Mendes | [@yasminmendes487](https://github.com/yasminmendes487) |
| Yuré Santana | [@SantanaYure](https://github.com/SantanaYure) |

---

<p align="center">
  Feito  pela equipe 3· Labs Talents 2026
</p>
