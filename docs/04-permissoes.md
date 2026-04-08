Perfis de Usuário
Admin: responsável por gerenciar toda a plataforma, visualizar relatórios e controlar permissões.
Organizador: responsável por criar e gerenciar eventos, acompanhar inscrições e realizar operações como check-in e emissão de certificados.
Participante: usuário que se inscreve em eventos, realiza pagamento, faz check-in e acessa seu certificado.

🔐 Matriz de Permissões

| Recurso     | Ação       | Admin | Organizador | Participante |
|-------------|------------|:-----:|:-----------:|:------------:|
| Evento      | Criar      | Sim   | Sim         | Não          |
| Evento      | Ver        | Sim   | Sim         | Sim          |
| Evento      | Editar     | Sim   | Sim         | Não          |
| Evento      | Cancelar   | Sim   | Sim         | Não          |
| Inscrição   | Criar      | Não   | Não         | Sim          |
| Inscrição   | Ver        | Sim   | Sim         | Sim*         |
| Inscrição   | Cancelar   | Sim   | Sim         | Sim*         |
| Pagamento   | Realizar   | Não   | Não         | Sim          |
| Pagamento   | Ver status | Sim   | Sim         | Sim*         |
| Check-in    | Realizar   | Não   | Sim         | Sim*         |
| Certificado | Emitir     | Sim   | Sim         | Não          |
| Certificado | Ver/Baixar | Sim   | Sim         | Sim*         |
| Relatórios  | Ver        | Sim   | Sim         | Não          |

📝 Regras e Observações
O Participante só pode visualizar e interagir com suas próprias informações (*).
O Organizador pode gerenciar apenas os eventos sob sua responsabilidade.
O Admin possui acesso completo a todos os recursos da plataforma.
Todas as ações sensíveis devem validar permissões no backend.