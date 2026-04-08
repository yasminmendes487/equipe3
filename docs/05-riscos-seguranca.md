Risco 1 — Autenticação (login/sessão)
Cenário: usuário mal-intencionado tenta várias combinações de senha para invadir uma conta
Impacto: acesso indevido a contas e informações pessoais
Mitigação: bloquear login após 5 tentativas + exigir senha forte

Risco 2 — Autorização (acesso indevido)
Cenário: participante tenta acessar funções de organizador ou admin (ex: editar evento)
Impacto: alterações indevidas no sistema
Mitigação: controle de acesso por perfil (verificação de permissões no backend)

Risco 3 — Dados (vazamento/exposição)
Cenário: dados sensíveis (nome, e-mail, pagamento) são expostos ou interceptados
Impacto: violação de privacidade e possível uso indevido das informações
Mitigação: uso de HTTPS + criptografia de dados sensíveis