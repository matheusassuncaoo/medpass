# MedPass - Documentação para Integração Frontend

## Configurações Realizadas no Backend

### 1. Configuração de CORS
Foi implementada uma configuração de CORS para permitir a comunicação entre o frontend e o backend. A configuração está localizada em `src/main/java/com/br/medpass/medpass/config/WebConfig.java`.

A configuração permite:
- Acesso de qualquer origem (`*`) - Em ambiente de produção, recomenda-se especificar os domínios permitidos
- Métodos HTTP: GET, POST, PUT, DELETE, OPTIONS, PATCH
- Todos os cabeçalhos
- Cabeçalhos expostos: Authorization, Content-Type, Content-Disposition
- Tempo de cache de preflight: 1 hora (3600 segundos)

### 2. Dependências Adicionadas
Foram adicionadas as seguintes dependências ao projeto:
- MySQL Connector: `com.mysql:mysql-connector-j`
- OpenAPI (Swagger): `org.springdoc:springdoc-openapi-starter-webmvc-ui`

### 3. Documentação da API
Foi configurado o OpenAPI (Swagger) para documentação da API. A configuração está localizada em `src/main/java/com/br/medpass/medpass/config/OpenApiConfig.java`.

A documentação da API pode ser acessada em:
- http://localhost:8080/api/swagger-ui.html
- http://localhost:8080/api/api-docs

## Endpoints da API

### Pacientes
- `GET /api/pacientes` - Listar todos os pacientes
- `GET /api/pacientes/{id}` - Buscar paciente por ID
- `GET /api/pacientes/cpf/{cpf}` - Buscar paciente por CPF
- `POST /api/pacientes` - Criar paciente
- `PUT /api/pacientes/{id}` - Atualizar paciente
- `DELETE /api/pacientes/{id}` - Deletar paciente

### Senhas
- `GET /api/senhas` - Listar todas as senhas
- `GET /api/senhas/{id}` - Buscar senha por ID
- `GET /api/senhas/fila/{filaId}` - Buscar senhas por fila
- `GET /api/senhas/paciente/{pacienteId}` - Buscar senhas por paciente
- `GET /api/senhas/fila/{filaId}/status/{status}` - Buscar senhas por fila e status
- `POST /api/senhas` - Emitir senha
- `PUT /api/senhas/{id}/chamar` - Chamar senha
- `PUT /api/senhas/{id}/atender` - Atender senha
- `PUT /api/senhas/{id}/cancelar` - Cancelar senha

### Filas
- `GET /api/filas` - Listar todas as filas
- `GET /api/filas/{id}` - Buscar fila por ID
- `GET /api/filas/hospital/{hospitalId}` - Buscar filas por hospital
- `GET /api/filas/especialidade/{especialidadeId}` - Buscar filas por especialidade
- `GET /api/filas/hospital/{hospitalId}/ativas` - Buscar filas ativas por hospital
- `POST /api/filas` - Criar fila
- `PUT /api/filas/{id}` - Atualizar fila
- `DELETE /api/filas/{id}` - Desativar fila
- `PUT /api/filas/{id}/ativar` - Ativar fila

## Recomendações para o Frontend

### Tecnologias Recomendadas
- **Framework**: React.js ou Next.js
- **Biblioteca de UI**: Material-UI, Chakra UI ou Tailwind CSS
- **Gerenciamento de Estado**: Redux Toolkit ou React Query
- **Cliente HTTP**: Axios

### Estrutura de Páginas Sugerida
1. **Login/Autenticação**
   - Página de login para usuários do sistema

2. **Dashboard**
   - Visão geral do sistema
   - Estatísticas de atendimento
   - Gráficos de desempenho

3. **Gerenciamento de Senhas**
   - Emissão de senhas
   - Monitoramento de senhas em tempo real
   - Chamada de senhas

4. **Gerenciamento de Pacientes**
   - Cadastro de pacientes
   - Busca de pacientes
   - Histórico de atendimentos

5. **Gerenciamento de Filas**
   - Criação e configuração de filas
   - Monitoramento de filas

6. **Painel de Visualização**
   - Tela para exibição em TVs nas salas de espera
   - Exibição de senhas chamadas

### Integração com a API
1. **Configuração do Axios**
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://localhost:8080/api',
     timeout: 10000,
     headers: {
       'Content-Type': 'application/json',
     },
   });

   export default api;
   ```

2. **Exemplo de Chamada à API**
   ```javascript
   import api from './api';

   // Listar todos os pacientes
   const listarPacientes = async () => {
     try {
       const response = await api.get('/pacientes');
       return response.data;
     } catch (error) {
       console.error('Erro ao listar pacientes:', error);
       throw error;
     }
   };

   // Emitir senha
   const emitirSenha = async (senha) => {
     try {
       const response = await api.post('/senhas', senha);
       return response.data;
     } catch (error) {
       console.error('Erro ao emitir senha:', error);
       throw error;
     }
   };
   ```

### Considerações de UX/UI
1. **Design Responsivo**
   - Garantir que a aplicação funcione bem em dispositivos móveis e desktops

2. **Feedback Visual**
   - Fornecer feedback claro para ações do usuário
   - Utilizar notificações para informar sobre eventos importantes

3. **Acessibilidade**
   - Seguir diretrizes de acessibilidade (WCAG)
   - Garantir contraste adequado e suporte a leitores de tela

4. **Performance**
   - Implementar carregamento lazy de componentes
   - Otimizar renderização de listas grandes

5. **Experiência do Usuário**
   - Simplificar fluxos de trabalho
   - Minimizar o número de cliques para tarefas comuns
   - Fornecer atalhos de teclado para operações frequentes

## Próximos Passos

1. Configurar o ambiente de desenvolvimento do frontend
2. Implementar a autenticação de usuários
3. Desenvolver os componentes principais
4. Integrar com a API do backend
5. Realizar testes de integração
6. Implementar melhorias de UX/UI
7. Preparar para implantação em produção