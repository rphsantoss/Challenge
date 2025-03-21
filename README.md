# Sistema de Inscrição para Eventos

Um sistema simples de inscrição para eventos sem necessidade de login, desenvolvido com TypeScript no backend e React no frontend. O sistema permite a criação, edição, listagem e exclusão de eventos (CRUD completo), além de gerenciar as inscrições dos participantes.

## 📋 Funcionalidades

### Eventos
- Criar eventos com título, data e capacidade máxima
- Editar informações de eventos existentes
- Listar todos os eventos ordenados por data
- Excluir eventos (incluindo todas as inscrições relacionadas)

### Inscrições
- Permitir que usuários se inscrevam em eventos
- Gerenciar status das inscrições: PENDENTE, CONFIRMADO, CANCELADO
- Listar inscrições com filtros por status
- Exibir inscrições mais recentes primeiro
- Atualizar automaticamente a capacidade do evento quando uma inscrição é confirmada

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL 

### Frontend
- React 19
- React Router DOM 7
- React Hook Form
- Axios
- CSS 

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (versão recomendada: 16.x ou superior)
- NPM ou Yarn
- PostgreSQL (ou outro banco de dados compatível com Prisma)

### Backend

1. Clone o repositório
```bash
git clone 
cd /back-end
```

2. Instale as dependências
```bash
npm install
```

3. Configure o banco de dados
   - Crie um arquivo `.env` na raiz do diretório backend
   - Adicione a URL de conexão com o banco de dados:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   ```

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento
```bash
npx ts-node src/server.ts
```

### Frontend

1. Navegue até o diretório frontend
```bash
cd /front-end
```

2. Instale as dependências
```bash
npm install
```

3. Inicie a aplicação React
```bash
npm start
```

## 📝 Estrutura do Projeto

### Backend

```
back-end/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── eventController.ts
│   │   └── registrationController.ts
│   ├── prismaClient.ts
│   ├── routes/
│   │   └── index.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```

### Frontend

```
front-end/
├── public/
├── src/
│   ├── components/
│   |   ├── EventForm.js
│   |   ├── EventList.js
│   │   ├── Home.js
│   │   ├── RegistrationForm.js
|   |   ├── RegistrationList.js
|   |   ├── UpdateEvent.js
│   ├── api.js
│   ├── App.js
│   └── index.js
└── package.json
```

## 📚 API Endpoints

### Eventos


| Método | Rota                   | Descrição                                   |
|--------|------------------------|---------------------------------------------|
| GET    | /events                 | Lista todos os eventos ordenados por data  |
| GET    | /event/:id              | Obtém um evento específico por ID           |
| POST   | /create-event           | Cria um novo evento                        |
| PUT    | /update-event/:id       | Atualiza um evento existente               |
| DELETE | /delete-event/:id       | Exclui um evento e todas as suas inscrições|

### Inscrições

| Método | Rota                                  | Descrição                                 |
|--------|---------------------------------------|-------------------------------------------|
| GET    | /registrations                        | Lista todas as inscrições (com opção de filtro) |
| POST   | /create-registration                  | Cria uma nova inscrição (status inicial: PENDENTE) |
| GET    | /registrations/by-email/:email        | Obtém uma inscrição específica por e-mail |
| PATCH  | /registrations/:id/status             | Atualiza o status de uma inscrição       |

## 🔍 Modelos de Dados

### Evento
```typescript
{
  id: number,
  title: string,
  date: Date,
  capacity: number,
  createdAt: Date,
  registrations: Registration[]
}
```

### Inscrição
```typescript
{
  id: number,
  eventId: number,
  name: string,  // Nome do inscrito
  email: string,
  status: "PENDING" | "CONFIRMED" | "CANCELED",
  createdAt: Date,
  event: Event,  // Referência ao evento relacionado
  referredById?: number,  // ID do inscrito que indicou
  referredBy?: Registration,  // Inscrição do usuário que fez a indicação
  referred?: Registration[]  // Inscrições referenciadas
}
```

## 🚨 Regras de Negócio

1. Quando um inscrito se registra em um evento, o status inicial é sempre "PENDENTE".
2. Na página de listagem de inscritos, existem 3 filtros disponíveis: "pendentes", "confirmado" e "cancelado".
3. Quando o status de uma inscrição é alterado para "confirmado", a capacidade do evento é automaticamente reduzida em 1.
4. A listagem de inscritos é ordenada pelos mais recentes primeiro.
5. A listagem de eventos é ordenada por data.
6. Quando um evento é excluído, todas as inscrições relacionadas também são removidas.
   

## 🔄 Comandos para Execução

### Backend
```bash
cd back-end
npx ts-node src/server.ts
```

### Frontend
```bash
cd front-end
npm start
```

## 👨‍💻 Autor
[Raphael Santos]
