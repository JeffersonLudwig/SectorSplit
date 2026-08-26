# 🏎️ SectorSplit

> Plataforma web de Fórmula 1 com calendário de etapas, contagem regressiva de sessões, visualização de dados de circuitos e fórum de debates interativo por Grande Prêmio.

[![Deploy API](https://img.shields.io/badge/API-Render-46E3B7?logo=render)](https://sectorsplit-api.onrender.com)
[![Deploy Web](https://img.shields.io/badge/Web-Vercel-black?logo=vercel)](https://sectorsplit.vercel.app)
[![Release](https://img.shields.io/github/v/tag/SEU_USUARIO/SectorSplit?label=versão)](https://github.com/SEU_USUARIO/SectorSplit/releases)

---

## 🚀 Links de Produção

| Serviço | URL |
|---|---|
| 🌐 Front-end | https://sectorsplit.vercel.app |
| ⚙️ API | https://sectorsplit-api.onrender.com/api |

---

## 🛠️ Stack Utilizada

### Back-end (`apps/api`)
- **NestJS** + TypeScript — framework MVC para API REST
- **Prisma ORM** — modelagem e migrations do banco de dados
- **PostgreSQL** — banco relacional (hospedado no Neon)
- **JWT + Passport** — autenticação stateless
- **class-validator** — validação de DTOs

### Front-end (`apps/web`)
- **Next.js 15** (App Router) + TypeScript — framework React
- **Tailwind CSS** — estilização utilitária
- **fetch API** — consumo da API NestJS via HTTPS/JSON

### DevOps
- **Git / GitHub** — controle de versão com commits semânticos
- **Vercel** — deploy do front-end (CI/CD automático)
- **Render** — deploy do back-end
- **Neon** — PostgreSQL gerenciado (free tier)
- **Docker Compose** — banco local para desenvolvimento

---

## ⚡ Instalação Local

### Pré-requisitos
- Node.js 20+
- Docker Desktop (para PostgreSQL local)
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/SectorSplit.git
cd SectorSplit
```

### 2. Suba o banco de dados local

```bash
docker-compose up -d
```

> O PostgreSQL estará disponível em `localhost:5432` com usuário `sectorsplit` e senha `sectorsplit_dev`.

### 3. Configure o Back-end

```bash
cd apps/api

# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Gere o Prisma Client
npx prisma generate

# Execute as migrations
npx prisma migrate dev --name init

# Popule o banco com dados da temporada 2026
npx ts-node prisma/seed.ts
```

### 4. Configure o Front-end

```bash
cd apps/web

# Copie o arquivo de variáveis de ambiente
cp .env.local.example .env.local

# Instale as dependências
npm install
```

### 5. Inicie os servidores

**Terminal 1 — API:**
```bash
cd apps/api
npm run start:dev
# API disponível em: http://localhost:3000/api
```

**Terminal 2 — Web:**
```bash
cd apps/web
npm run dev
# App disponível em: http://localhost:4000
```

> Dica: configure a porta do Next.js em `package.json` → `"dev": "next dev --port 4000"` para evitar conflito com a API na 3000.

---

## 🔐 Variáveis de Ambiente

### `apps/api/.env`

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | Chave secreta do JWT (mín. 32 chars) | `minha-chave-super-secreta-123456` |
| `JWT_EXPIRES_IN` | Expiração do token | `7d` |
| `PORT` | Porta da API | `3000` |
| `NODE_ENV` | Ambiente | `development` |
| `FRONTEND_URL` | URL do front para CORS | `https://sectorsplit.vercel.app` |

### `apps/web/.env.local`

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:3000` |

---

## 🗄️ Banco de Dados

### Migrations

```bash
# Criar nova migration após alterar o schema
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção (sem criar novas)
npx prisma migrate deploy

# Reset completo (apenas desenvolvimento)
npx prisma migrate reset
```

### Seed

```bash
# Popular banco com dados da temporada 2026 (21 GPs + circuitos + sessões)
npx ts-node prisma/seed.ts

# Usuários criados pelo seed:
# Admin: admin@sectorsplit.com / Admin@123
# Demo:  demo@sectorsplit.com  / Demo@123
```

### Prisma Studio (GUI visual)

```bash
npx prisma studio
# Abre em http://localhost:5555
```

---

## 📡 Endpoints da API

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Cadastro |
| POST | `/api/auth/login` | ❌ | Login → JWT |
| GET | `/api/auth/me` | ✅ | Usuário logado |
| GET | `/api/races` | ❌ | Todos os GPs |
| GET | `/api/races/:slug` | ❌ | Detalhe do GP |
| GET | `/api/sessions/next` | ❌ | Próxima sessão |
| GET | `/api/races/:slug/posts` | ❌ | Posts do fórum |
| POST | `/api/races/:slug/posts` | ✅ | Criar post |
| PATCH | `/api/posts/:id` | ✅ Owner | Editar post |
| DELETE | `/api/posts/:id` | ✅ Owner | Deletar post |
| GET | `/api/posts/:id/comments` | ❌ | Comentários |
| POST | `/api/posts/:id/comments` | ✅ | Comentar |
| PATCH | `/api/comments/:id` | ✅ Owner | Editar comentário |
| DELETE | `/api/comments/:id` | ✅ Owner | Deletar comentário |

---

## 📦 Scripts

### API (`apps/api`)

```bash
npm run start:dev     # desenvolvimento com hot-reload
npm run build         # build de produção
npm run start:prod    # iniciar build de produção
npm run lint          # ESLint
```

### Web (`apps/web`)

```bash
npm run dev           # desenvolvimento
npm run build         # build de produção
npm run start         # iniciar build de produção
npm run lint          # ESLint
```

---

## 🏷️ Release

```bash
git tag v1.0.0 -m "Release MVP SectorSplit"
git push origin v1.0.0
```

---

## 📁 Estrutura do Projeto

```
SectorSplit/
├── apps/
│   ├── api/          # NestJS — Back-end
│   └── web/          # Next.js — Front-end
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 👤 Autor

Desenvolvido por **Jefferson Ludwig** · [GitHub](https://github.com/JeffersonLudwig)
