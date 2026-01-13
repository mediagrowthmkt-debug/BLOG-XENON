# 📖 GUIA COMPLETO - Sistema de Blog com GitHub Pages

> **Documentação para replicar este projeto em outros diretórios**

---

## 📋 ÍNDICE

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Estrutura de Arquivos](#-estrutura-de-arquivos)
3. [Hierarquia de URLs/Slugs](#-hierarquia-de-urlsslugs)
4. [Página de Formulário (postin.html)](#-página-de-formulário-postinhtml)
5. [Integração com GitHub](#-integração-com-github)
6. [Processo de Publicação](#-processo-de-publicação)
7. [Como Replicar o Projeto](#-como-replicar-o-projeto)

---

## 🎯 VISÃO GERAL DO PROJETO

Sistema **100% estático** de blog hospedado no **GitHub Pages**, sem necessidade de servidor backend (PHP, Node, etc).

### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      NAVEGADOR                              │
├─────────────────────────────────────────────────────────────┤
│  /postin.html  →  Formulário de criação de posts            │
│  /index.html   →  Lista de posts (home do blog)             │
│  /posts/*.html →  Posts publicados                          │
├─────────────────────────────────────────────────────────────┤
│                    GITHUB PAGES                             │
│              (Hospedagem estática gratuita)                 │
└─────────────────────────────────────────────────────────────┘
```

### Tecnologias

| Componente | Tecnologia |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript Vanilla |
| Hospedagem | GitHub Pages |
| Armazenamento | GitHub Repository |
| Integração | GitHub API v3 (opcional) |
| SEO | Schema.org, Open Graph, Twitter Cards |

---

## 📁 ESTRUTURA DE ARQUIVOS

```
protec-blog/
│
├── 📄 index.html              # Home do blog (lista de posts)
├── 📄 postin.html             # Formulário de criação (URL secreta)
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── blog-post.css      # Estilos dos posts publicados
│   │   └── form-style.css     # Estilos do formulário
│   └── 📂 js/
│       ├── blog-post.js       # JavaScript dos posts
│       └── form-script.js     # Lógica do formulário (1300+ linhas)
│
├── 📂 drafts/                 # ⭐ RASCUNHOS - coloque aqui os .html baixados!
│   └── README.md              # Instruções
│
├── 📂 posts/                  # ✅ PUBLICADOS - movidos automaticamente
│   ├── index.html             # Listagem alternativa de posts
│   └── *.html                 # Posts publicados (vem de /drafts/)
│
├── 📂 templates/
│   └── post-template.html     # Template base para novos posts
│
├──  github-api.js           # Integração com GitHub API
├── 📄 github-actions-api.js   # API para GitHub Actions
│
├── 📂 .github/workflows/
│   ├── auto-publish-drafts.yml  # ⭐ Move drafts → posts automaticamente
│   └── publish-post.yml
│
└── 📄 *.md                    # Documentações
```

### Fluxo de Pastas

```
/drafts/  ──(GitHub Action)──▶  /posts/  ──(GitHub Pages)──▶  🌐 Online
```

---

## 🔗 HIERARQUIA DE URLs/SLUGS

### Estrutura de URLs

```
seusite.github.io/
│
├── /                    → index.html (Home do blog)
├── /postin              → postin.html (Formulário - URL secreta!)
│
└── /posts/
    ├── /                → posts/index.html (Lista de posts)
    └── /slug-do-post.html → Post individual
```

### Exemplo Prático

| URL | Arquivo | Descrição |
|-----|---------|-----------|
| `blog.exemplo.com/` | `index.html` | Página inicial |
| `blog.exemplo.com/postin` | `postin.html` | Formulário admin |
| `blog.exemplo.com/posts/guia-granito.html` | `posts/guia-granito.html` | Post publicado |

### Geração de Slug

O slug é gerado automaticamente a partir do título:

```javascript
// Entrada: "Como Instalar Granito na Cozinha em 5 Passos"
// Saída:   "instalar-granito-cozinha-5-passos"

// Regras aplicadas:
// 1. Converte para minúsculas
// 2. Remove acentos
// 3. Remove stopwords (o, a, de, da, em, etc.)
// 4. Substitui espaços por hífens
// 5. Remove caracteres especiais
```

---

## 📝 PÁGINA DE FORMULÁRIO (postin.html)

### Visão Geral

O formulário está dividido em **8 blocos organizados**:

### 🧱 BLOCO 1: Identidade do Post

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Título (H1) | ✅ | Máx. 60 caracteres |
| Slug | Auto | Gerado do título, editável |
| Categoria | ✅ | Guia, Tutorial, Blog, Dicas, etc. |
| Autor | ✅ | Nome do autor |
| Avatar | ❌ | URL da foto do autor |
| Data | Auto | Data de publicação |
| Tempo de Leitura | Auto | Calculado automaticamente |

### 🧠 BLOCO 2: SEO Essencial

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Keyword Principal | ✅ | Palavra-chave foco |
| Keywords Secundárias | ❌ | 3-5, separadas por vírgula |
| Meta Title | ✅ | Até 60 caracteres |
| Meta Description | ✅ | 140-160 caracteres |
| Intenção de Busca | ✅ | Informacional, Comercial, etc. |

### 🖼️ BLOCO 3: Imagens

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Imagem de Capa | ✅ | URL da imagem principal (1200x630) |
| Alt Text Capa | ✅ | Texto alternativo com keyword |
| Legenda | ❌ | Legenda opcional |
| Imagens Internas | ❌ | Botão para adicionar múltiplas |

### ✍️ BLOCO 4: Conteúdo

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Introdução | ✅ | 100-150 palavras |
| Conteúdo Principal | ✅ | Aceita HTML (h2, h3, p, ul, ol) |
| Conclusão | ✅ | Resumo final do post |

**Toolbar de Edição:**
- Botões: `H2` | `H3` | `Parágrafo` | `Lista` | `Negrito` | `Itálico`

### 🔗 BLOCO 5: Links

| Campo | Descrição |
|-------|-----------|
| Links Internos | 2-4 por post (URL + Anchor) |
| Links Externos | 1-2 sites confiáveis |

### 🏷️ BLOCO 6: Tags

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Tags | ✅ | 3-6, separadas por vírgula |
| Posts Relacionados | ❌ | URLs separadas por vírgula |

### 🚀 BLOCO 7: Formulário de Captura de Leads

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| Título do Formulário | ✅ | Ex: "Quer Viver Esta Experiência?" |
| Descrição do Formulário | ✅ | Texto persuasivo para o visitante |
| Texto do Botão | ✅ | Ex: "Quero Reservar" |
| URL do Webhook | ❌ | Para integração com Zapier/Make |
| E-mail de Destino | ❌ | E-mail que recebe os leads |

#### 📤 Dados Enviados pelo Webhook

Quando o visitante preenche o formulário no post, os seguintes dados são enviados:

| Campo | Valor | Exemplo |
|-------|-------|---------|
| `nome` | Nome do lead | "João Silva" |
| `email` | E-mail do lead | "joao@email.com" |
| `telefone` | Telefone formatado | "(48) 99999-9999" |
| `plataforma` | Origem fixa | "blog" |
| `fonte` | Título do post | "5 Dicas para Noite Romântica" |
| `quando` | Data/hora (BR) | "13/01/2026, 14:30" |

**Exemplo de payload JSON:**
```json
{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(48) 99999-9999",
    "plataforma": "blog",
    "fonte": "5 Dicas para uma Noite Romântica Inesquecível",
    "quando": "13/01/2026, 14:30"
}
```

### ⚙️ BLOCO 8: Configurações

| Campo | Descrição |
|-------|-----------|
| URL Base | URL principal do site |
| URL Logo | Para Schema.org |
| Comentários | Habilitar/Desabilitar |
| Compartilhamento | Botões sociais |

### 🤖 BLOCO 9: Template para IA (Copiar e Colar)

O formulário inclui um **template completo para usar com ChatGPT/Claude** que gera todo o conteúdo do post automaticamente.

**Como usar:**
1. Role até o **BLOCO 9: 🤖 Assistente IA**
2. Preencha os campos `[ENTRE COLCHETES]` no template
3. Clique em **"📋 Copiar Template Completo"**
4. Cole no ChatGPT, Claude ou outra IA
5. A IA retorna todos os campos preenchidos
6. Copie os valores e cole no formulário

**Geração de Imagens com IA:**

O template inclui instruções automáticas para gerar prompts de imagens:

```
🖼️ BLOCO 3: IMAGENS

URL da Imagem de Capa:
[GERAR PROMPT para imagem de capa 1200x630px relacionada ao tema]

URL da Imagem Interna 1:
[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]

URL da Imagem Interna 2:
[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]

URL da Imagem Interna 3:
[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]
```

**Workflow:**
1. A IA lê o tema do post
2. Gera **4 prompts otimizados** para DALL-E/Midjourney
3. Você copia cada prompt e gera a imagem
4. Cola a URL da imagem no formulário

---

## 🔘 BOTÕES E FUNCIONALIDADES

### Header do Formulário

| Botão | Função | Efeito |
|-------|--------|--------|
| 🧪 **Preencher Teste** | Preenche TODOS os campos com 5 versões diferentes | Alterna entre 5 posts pré-prontos a cada clique |
| 🗑️ **Limpar Campos** | Limpa formulário + localStorage | Com confirmação |
| ⚙️ **Configurar GitHub** | Abre modal de token | Para publicação automática |

### 🧪 Botão "Preencher Teste" - 5 Versões de Conteúdo

O botão **alterna entre 5 versões diferentes** de conteúdo de teste a cada clique. Isso permite testar rapidamente múltiplos posts sem precisar preencher manualmente.

#### Como Funciona

```
1º clique → Versão 1
2º clique → Versão 2
3º clique → Versão 3
4º clique → Versão 4
5º clique → Versão 5
6º clique → Volta para Versão 1 (ciclo)
```

#### ⚠️ IMPORTANTE: Personalizar para seu Nicho

**As 5 versões de teste estão configuradas para o nicho de MOTEL.** Ao replicar este projeto para outro nicho, você deve editar o array `testDataVersions` no arquivo `assets/js/form-script.js`:

```javascript
// Localização: assets/js/form-script.js (linha ~150)
const testDataVersions = [
    {
        h1Title: 'Título do Post 1 para SEU NICHO',
        slug: 'slug-do-post-1',
        category: 'Categoria',
        // ... demais campos
    },
    {
        h1Title: 'Título do Post 2 para SEU NICHO',
        // ... 
    },
    // ... até 5 versões
];
```

#### Versões Atuais (Nicho: Motel)

| # | Título | Categoria |
|---|--------|-----------|
| 1 | 5 Dicas para Noite Romântica Perfeita | Dicas |
| 2 | Suítes com Hidromassagem | Suítes |
| 3 | Como Comemorar Aniversário de Namoro | Romance |
| 4 | Gastronomia: Cardápio Exclusivo | Gastronomia |
| 5 | Por que o Pernoite é a Melhor Opção | Experiências |

#### Campos Preenchidos em Cada Versão

**BLOCO 1 - Identidade:**
- Título H1, Slug, Categoria, Autor, Data, Avatar, Tempo de leitura

**BLOCO 2 - SEO:**
- Palavra-chave principal e secundárias, Meta Title, Meta Description, Intenção de busca

**BLOCO 3 - Imagens:**
- Imagem de capa + Alt text + 2 imagens internas com alt texts

**BLOCO 4 - Conteúdo:**
- Introdução, Conteúdo principal (com H2, H3, listas), Conclusão

**BLOCO 5 - Links:**
- 2 links internos + 1 link externo com anchor texts

**BLOCO 6 - Tags:**
- Tags do post + Posts relacionados

**BLOCO 7 - Formulário de Captura:**
- Título, Descrição, Texto do Botão
- URL do Webhook (opcional)
- E-mail de Destino

**BLOCO 8 - Configurações:**
- URL base, Logo, Checkboxes habilitados

### Rodapé do Formulário

| Botão | Função | Efeito |
|-------|--------|--------|
| 👁️ **Pré-visualizar** | Abre modal de preview | Mostra como ficará |
| ✨ **Gerar Post** | Gera HTML e publica | Ver seção "Publicação Automática" |

### Funcionalidades Automáticas

| Funcionalidade | Descrição |
|----------------|-----------|
| 💾 **Auto-Save** | Salva no localStorage a cada 2s |
| 📊 **Contador de Caracteres** | Mostra limite em tempo real |
| 📝 **Contador de Palavras** | Para introdução/conteúdo/conclusão |
| 🔄 **Geração de Slug** | Automática ao digitar título |
| ⏱️ **Tempo de Leitura** | Calculado automaticamente |
| 🔗 **Conversão Google Drive** | URLs do Drive convertidas automaticamente |

---

## 🔌 INTEGRAÇÃO COM GITHUB

### 🚀 Publicação Automática (COM Token)

Quando você configura o GitHub API Token, os posts são **publicados automaticamente** no GitHub ao clicar em "✨ Gerar Post":

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. PREENCHER   │ ──▶ │  2. GERAR POST  │ ──▶ │  3. PUBLICADO!  │
│   Formulário    │     │   Click botão   │     │   Automático!   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Como configurar (uma única vez):**

1. Clique em **"⚙️ Configurar GitHub"** no formulário
2. Acesse: `github.com/settings/tokens`
3. Clique em **"Generate new token" → "Generate new token (classic)"**
4. Nome: `grupo-amcc-blog` (ou o nome do seu blog)
5. Marque a permissão: **✅ repo** (full control)
6. Clique em **"Generate token"**
7. Copie o token (você só verá uma vez!)
8. Cole no campo do modal e clique em **"💾 Salvar Token"**
9. (Opcional) Clique em **"🧪 Testar Conexão"** para validar

**Depois de configurar:**
- Preencha o formulário normalmente
- Clique em **"✨ Gerar Post"**
- **O post é enviado automaticamente para `/posts/`**
- GitHub Pages publica em 1-2 minutos
- Você recebe a URL pública do post

### 📥 Download Manual (SEM Token)

Se você não configurar o token, o sistema continua funcionando com download manual:

```
1. Preencher formulário
2. Clicar "Gerar Post"
3. Baixar arquivo .html
4. Mover para pasta /drafts/
5. git add . && git commit -m "novo post" && git push
6. GitHub Action move automaticamente para /posts/
```

### Comportamento Inteligente

| Cenário | Comportamento |
|---------|---------------|
| ✅ Token configurado | Publica automaticamente no GitHub |
| ❌ Sem token | Oferece download manual |
| ⚠️ Erro na publicação | Mostra erro + fallback para download |

### Arquivo github-api.js

```javascript
class GitHubBlogPublisher {
    constructor(config) {
        this.owner = 'SEU-USUARIO';       // ⚠️ Alterar para seu usuário
        this.repo = 'NOME-DO-SEU-REPO';   // ⚠️ Alterar para seu repo
        this.token = token;                // Token de acesso
        this.branch = 'main';              // Branch principal
    }

    // Métodos principais:
    async savePost(slug, htmlContent)  // Salva/atualiza post
    async getFile(path)                // Verifica se existe
    async createFile(path, content)    // Cria novo arquivo
    async updateFile(path, content)    // Atualiza existente
    
    // ⚠️ IMPORTANTE: Alterar também getPublicUrl()
    getPublicUrl(slug) {
        return `https://SEU-DOMINIO.com.br/posts/${slug}.html`;
    }
}
```

### GitHub Actions (Workflows)

**auto-publish-drafts.yml** ⭐ (Principal):
- Dispara quando há push em `drafts/*.html`
- Move automaticamente para `/posts/`
- Faz commit e push automático
- Resultado: post publicado no GitHub Pages

**publish-post.yml:**
- Workflow alternativo para publicar posts via Actions

---

## 📤 PROCESSO DE PUBLICAÇÃO

### Fluxo COM Token GitHub (Automático) ⭐ RECOMENDADO

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. PREENCHER   │ ──▶ │  2. GERAR POST  │ ──▶ │  3. PUBLICADO!  │
│   Formulário    │     │   Click botão   │     │   Em /posts/    │
│   (ou IA)       │     │                 │     │   Automático!   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                          ┌─────────────────────────┐
                                          │  URL Pública Pronta:    │
                                          │  github.io/.../posts/   │
                                          │  slug-do-post.html      │
                                          └─────────────────────────┘
```

**Passo a passo:**
1. Configure o token uma vez (⚙️ Configurar GitHub)
2. Preencha o formulário (ou use 🧪 Preencher Teste)
3. Clique em **✨ Gerar Post**
4. **PRONTO!** O post é publicado automaticamente
5. Aguarde 1-2 minutos para o GitHub Pages atualizar

### Fluxo SEM Token (Download Manual)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. PREENCHER   │ ──▶ │  2. GERAR HTML  │ ──▶ │  3. DOWNLOAD    │
│   Formulário    │     │   Click botão   │     │   Arquivo .html │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  6. PUBLICADO!  │ ◀── │  5. GITHUB      │ ◀── │  4. MOVER PARA  │
│   GitHub Pages  │     │     ACTION      │     │  pasta /drafts/ │
│   em /posts/    │     │   (automático)  │     │   + git push    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Como Funciona

1. **Você baixa o HTML** gerado pelo formulário
2. **Move para `/drafts/`** (não para /posts/ diretamente)
3. **Faz commit e push** para o GitHub
4. **GitHub Action detecta** o novo arquivo em `/drafts/`
5. **Automaticamente move** de `/drafts/` para `/posts/`
6. **GitHub Pages publica** o post

### Comandos Git

```bash
# 1. Mover arquivo baixado para drafts
mv ~/Downloads/nome-do-post.html drafts/

# 2. Commit e push
git add drafts/
git commit -m "draft: novo post - Nome do Post"
git push origin main

# 3. PRONTO! O GitHub Action faz o resto automaticamente
#    - Move de /drafts/ para /posts/
#    - Faz commit automático
#    - GitHub Pages publica
```

### GitHub Action: auto-publish-drafts.yml

```yaml
# Dispara quando há push em drafts/*.html
on:
  push:
    paths:
      - 'drafts/*.html'

# O que faz:
# 1. Move todos os .html de /drafts/ para /posts/
# 2. Faz commit automático
# 3. Push para o repositório
```

### Vantagens deste Fluxo

| Benefício | Descrição |
|-----------|-----------|
| 📝 **Revisão** | Você pode revisar em `/drafts/` antes de publicar |
| 🤖 **Automático** | Não precisa mover manualmente para `/posts/` |
| 📊 **Histórico** | Git mostra quando foi draft e quando foi publicado |
| 🔄 **Simples** | Apenas um push e o resto é automático |

---

## 🔄 COMO REPLICAR O PROJETO

### Passo 1: Clonar/Copiar Estrutura

```bash
# Opção A: Clonar repo existente
git clone https://github.com/SEU-USER/protec-blog.git novo-blog
cd novo-blog

# Opção B: Copiar pasta local
cp -r /caminho/protec-blog /caminho/novo-blog
cd novo-blog
rm -rf .git  # Remove histórico antigo
git init     # Inicia novo repo
```

### Passo 2: Configurar Novo Repositório

```bash
# Criar repo no GitHub (via interface ou CLI)
gh repo create nome-novo-blog --public

# Vincular
git remote add origin https://github.com/SEU-USER/nome-novo-blog.git
```

### Passo 3: Personalizar Configurações

Editar os seguintes arquivos:

**1. `github-api.js`** (linhas 140-150):
```javascript
return new GitHubBlogPublisher({
    owner: 'SEU-USUARIO',      // ← Alterar
    repo: 'NOME-DO-REPO',      // ← Alterar
    token: token,
    branch: 'main'
});
```

**2. `index.html`** - Títulos e descrições

**3. `templates/post-template.html`** - URLs e branding

**4. `assets/css/*.css`** - Cores e estilos

### ⚠️ Passo 3.1: CONFIGURAÇÕES CRÍTICAS - NÃO ESQUECER!

> **IMPORTANTE:** Sempre que replicar este projeto para um novo cliente, você DEVE alterar as seguintes configurações para evitar que posts sejam publicados no repositório/domínio errado!

#### 📁 Arquivo: `github-api.js`

| Linha | O que alterar | Exemplo |
|-------|---------------|---------|
| ~8 | `this.repo` (comentário) | `// NOME-DO-SEU-REPO` |
| ~130 | `getPublicUrl()` - URL completa | `https://blogs.seudominio.com.br/posts/${slug}.html` |
| ~148 | `repo:` na configuração | `'NOME-DO-SEU-REPO'` |

```javascript
// ANTES (errado - aponta para projeto anterior):
getPublicUrl(slug) {
    return `https://mediagrowthmkt-debug.github.io/grupo-amcc-blog/posts/${slug}.html`;
}

// DEPOIS (correto - aponta para seu novo projeto):
getPublicUrl(slug) {
    return `https://blogs.seudominio.com.br/posts/${slug}.html`;
}
```

```javascript
// ANTES (errado):
return new GitHubBlogPublisher({
    owner: 'mediagrowthmkt-debug',
    repo: 'grupo-amcc-blog',  // ❌ Repositório antigo!
    ...
});

// DEPOIS (correto):
return new GitHubBlogPublisher({
    owner: 'mediagrowthmkt-debug',
    repo: 'NOME-DO-SEU-NOVO-REPO',  // ✅ Seu novo repositório!
    ...
});
```

#### 📁 Arquivo: `CNAME`

```plaintext
# Alterar para o subdomínio do novo cliente:
blogs.novodominio.com.br
```

#### 📁 Arquivo: `index.html`

- Alterar URL da API do GitHub para buscar posts:
```javascript
// Linha ~225 (aproximadamente)
const response = await fetch('https://api.github.com/repos/SEU-USER/SEU-REPO/contents/posts');
```

#### 📁 Arquivo: `posts/index.html`

- Mesma alteração da URL da API:
```javascript
const response = await fetch('https://api.github.com/repos/SEU-USER/SEU-REPO/contents/posts');
```

#### 🔍 Busca Rápida para Verificar

Execute estes comandos para encontrar referências ao projeto anterior:

```bash
# Buscar nome do repo antigo
grep -r "grupo-amcc-blog" --include="*.js" --include="*.html"

# Buscar domínio antigo
grep -r "grupoamcc" --include="*.js" --include="*.html" --include="*.css"

# Buscar URL do GitHub Pages antigo
grep -r "github.io" --include="*.js" --include="*.html"
```

Se encontrar qualquer resultado, **SUBSTITUA** pelo novo repositório/domínio!

---

### Passo 4: Ativar GitHub Pages

1. Vá em: `Settings` → `Pages`
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Save

### Passo 5: ⚠️ Ativar GitHub Actions (IMPORTANTE!)

Para a automação `/drafts/` → `/posts/` funcionar, você precisa:

**5.1. Habilitar Actions no Repositório:**
1. Vá em: `Settings` → `Actions` → `General`
2. Em **"Actions permissions"**, selecione:
   - ✅ `Allow all actions and reusable workflows`
3. Clique em `Save`

**5.2. Dar Permissão de Escrita ao Workflow:**
1. Na mesma página, role até **"Workflow permissions"**
2. Selecione:
   - ✅ `Read and write permissions`
3. Marque também:
   - ✅ `Allow GitHub Actions to create and approve pull requests` (opcional)
4. Clique em `Save`

```
⚠️ SEM ESSAS CONFIGURAÇÕES, O WORKFLOW NÃO CONSEGUE:
   - Fazer commit automático
   - Mover arquivos de /drafts/ para /posts/
   - Push das alterações
```

**Caminho visual:**
```
GitHub Repo → Settings → Actions → General
                           ↓
              ┌─────────────────────────────┐
              │ Actions permissions         │
              │ ✅ Allow all actions        │
              ├─────────────────────────────┤
              │ Workflow permissions        │
              │ ✅ Read and write           │
              └─────────────────────────────┘
```

### Passo 6: Primeiro Commit

```bash
git add .
git commit -m "feat: setup inicial do blog"
git push -u origin main
```

---

## 📋 CHECKLIST PARA NOVO PROJETO

```
☐ Clonar/copiar estrutura de arquivos
☐ Criar repositório no GitHub
☐ Vincular remote origin
☐ Editar github-api.js (owner, repo)
☐ Editar index.html (título, descrição)
☐ Editar templates/post-template.html (URLs)
☐ Personalizar CSS (cores, fontes)
☐ Ativar GitHub Pages (Settings → Pages)
☐ ⚠️ Ativar GitHub Actions (Settings → Actions → General)
☐ ⚠️ Workflow permissions: "Read and write" (OBRIGATÓRIO!)
☐ Fazer primeiro commit e push
☐ Testar criação de post via /postin
☐ Testar fluxo: baixar HTML → mover para /drafts/ → push
☐ Verificar se Action moveu para /posts/ (aba Actions no GitHub)
☐ Verificar publicação no GitHub Pages
```

---

## 🚀 RESUMO RÁPIDO (TL;DR)

### Opção 1: Publicação Automática (COM Token) ⭐

```bash
# 1. Configurar token (uma vez)
Clicar: ⚙️ Configurar GitHub → Seguir instruções → Salvar Token

# 2. Criar e publicar post
Abrir: seusite.github.io/postin
Preencher formulário (ou usar 🧪 Preencher Teste)
Clicar: ✨ Gerar Post

# 3. PRONTO! Post publicado automaticamente!
URL: seusite.github.io/grupo-amcc-blog/posts/slug-do-post.html
```

### Opção 2: Download Manual (SEM Token)

```bash
# 1. Criar post no formulário
abrir: seusite.github.io/postin

# 2. Baixar HTML gerado
clicar: "Gerar Post" → Download

# 3. Mover para drafts e publicar
mv ~/Downloads/meu-post.html drafts/
git add drafts/
git commit -m "draft: meu novo post"
git push

# 4. GitHub Action faz o resto
# - Move de /drafts/ para /posts/
# - Publica automaticamente
```

### Opção 3: Usar IA para Gerar Conteúdo

```bash
# 1. Copiar template
Abrir: postin.html → BLOCO 9: 🤖 Assistente IA
Clicar: 📋 Copiar Template Completo

# 2. Colar no ChatGPT/Claude
# A IA preenche tudo incluindo prompts de imagem

# 3. Gerar imagens
Copiar cada [GERAR PROMPT...]
Colar no DALL-E/Midjourney
Gerar imagem → Copiar URL

# 4. Preencher formulário
Colar os valores gerados pela IA
Colar as URLs das imagens
Clicar: ✨ Gerar Post
```

---

## 📚 ARQUIVOS DE DOCUMENTAÇÃO

| Arquivo | Descrição |
|---------|-----------|
| `README.md` | Documentação geral |
| `QUICK-START.md` | Guia rápido de uso |
| `AUTO-SAVE-GUIDE.md` | Sistema de auto-save |
| `GOOGLE-DRIVE-IMAGES-GUIDE.md` | Usar imagens do Drive |
| `IMAGE-LAYOUTS-GUIDE.md` | Layouts de imagens |
| `SECURITY.md` | Práticas de segurança |
| `CHANGELOG.md` | Histórico de mudanças |

---

## 🔒 SEGURANÇA

- URL `/postin` é "secreta" (não indexada)
- Token GitHub fica apenas no localStorage do navegador
- Sem backend = menos vulnerabilidades
- CORS não é problema (tudo estático)

---

## ✅ VANTAGENS DESTE SISTEMA

| Vantagem | Descrição |
|----------|-----------|
| 💰 **Gratuito** | GitHub Pages é free |
| 🚀 **Rápido** | Sites estáticos são ultra-rápidos |
| 🔒 **Seguro** | Sem servidor = menos ataques |
| 📱 **Responsivo** | CSS mobile-first |
| 🎯 **SEO Otimizado** | Schema.org, OG, meta tags |
| 💾 **Versionado** | Git mantém histórico |
| 🌍 **CDN Global** | GitHub distribui mundialmente |

---

**Última atualização:** 13 de Janeiro de 2026  
**Versão:** 4.1 (5 Versões de Teste + Personalização por Nicho)

### Changelog v4.1:
- ✅ **5 versões de conteúdo de teste** ao invés de apenas 1
- ✅ **Alternância automática** a cada clique em "Preencher Teste"
- ✅ **Feedback visual** mostrando qual versão foi usada
- ✅ **Documentação** de como personalizar para outros nichos
- ✅ **Array `testDataVersions`** no form-script.js para fácil edição

### Changelog v4.0:
- ✅ **Formulário de captura de leads** substitui o CTA com link
- ✅ **Campos do formulário:** Nome, E-mail, Telefone
- ✅ **Integração com Webhook** (Zapier, Make, n8n, etc.)
- ✅ **Dados enviados:** nome, email, telefone, plataforma, fonte, quando
- ✅ **Máscara de telefone** automática (formato BR)
- ✅ **Armazenamento local** de leads como backup
- ✅ **Mensagem de sucesso** após envio
- ✅ **Categorias atualizadas** para contexto de motel

### Changelog v3.0:
- ✅ **Publicação automática no GitHub** via API Token
- ✅ **Botão "Preencher Teste"** preenche TODOS os campos obrigatórios
- ✅ **Template para IA** com geração de prompts de imagens
- ✅ **4 campos de imagem** no template (1 capa + 3 internas)
- ✅ **Fix localStorage** que não sobrescreve o template atualizado

---

## 🔄 PERSONALIZAÇÃO PARA OUTROS NICHOS

### Ao Duplicar o Projeto

Quando você replicar este projeto para um cliente de **outro nicho** (não motel), lembre-se de:

1. **Alterar as 5 versões de teste** em `assets/js/form-script.js`
2. **Alterar as categorias** em `postin.html`
3. **Alterar os textos padrão** do formulário de captura
4. **Alterar as cores/branding** no CSS

### Editando as 5 Versões de Teste

Localize o array `testDataVersions` no arquivo `assets/js/form-script.js` (aproximadamente linha 150):

```javascript
const testDataVersions = [
    // VERSÃO 1
    {
        h1Title: 'Título do Post 1 para SEU NICHO',
        slug: 'slug-post-1-seu-nicho',
        category: 'Categoria do Nicho',
        author: 'Nome do Autor/Empresa',
        primaryKeyword: 'palavra-chave principal',
        secondaryKeywords: 'kw1, kw2, kw3',
        metaTitle: 'Meta Title para SEO',
        metaDescription: 'Meta description de até 160 caracteres...',
        introduction: 'Introdução do post...',
        contentBody: '<h2>Seção 1</h2><p>Conteúdo...</p>',
        conclusion: 'Conclusão do post...',
        tags: 'tag1, tag2, tag3',
        formTitle: 'CTA do Formulário',
        formDescription: 'Descrição persuasiva...',
        formButtonText: 'Texto do Botão',
        siteUrl: 'https://seusite.com.br',
        // ... demais campos
    },
    // VERSÃO 2, 3, 4, 5...
];
```

### Exemplos de Versões por Nicho

#### Nicho: Contabilidade
| # | Título | Categoria |
|---|--------|-----------|
| 1 | Como Regularizar Sua Empresa | Regularização |
| 2 | Impostos para MEI: Guia Completo | Impostos |
| 3 | Declaração de IR: Passo a Passo | IRPF |
| 4 | Benefícios de Contratar um Contador | Serviços |
| 5 | Erros Fiscais que Podem Quebrar Sua Empresa | Dicas |

#### Nicho: Advocacia
| # | Título | Categoria |
|---|--------|-----------|
| 1 | Direitos Trabalhistas que Você Não Conhece | Trabalhista |
| 2 | Como Funciona o Divórcio Consensual | Família |
| 3 | Indenização por Danos Morais | Civil |
| 4 | Direitos do Consumidor Online | Consumidor |
| 5 | Quando Contratar um Advogado | Dicas |

#### Nicho: Clínica Estética
| # | Título | Categoria |
|---|--------|-----------|
| 1 | Botox: Mitos e Verdades | Procedimentos |
| 2 | Harmonização Facial: O Guia Completo | Harmonização |
| 3 | Cuidados Pós-Procedimento | Dicas |
| 4 | Tendências em Estética 2026 | Tendências |
| 5 | Como Escolher sua Clínica de Estética | Guia |

---

## 📞 FORMULÁRIO DE CAPTURA DE LEADS

### O que é?

No final de cada post publicado, há um **formulário de captura** que coleta dados dos visitantes interessados. Diferente do antigo CTA com link, agora os dados são enviados diretamente para seu webhook.

### Campos Capturados

| Campo | Tipo | Exemplo |
|-------|------|---------|
| Nome | texto | "Maria Silva" |
| E-mail | email | "maria@email.com" |
| Telefone | tel (mascarado) | "(48) 99999-9999" |

### Dados Enviados para o Webhook

```json
{
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "telefone": "(48) 99999-9999",
    "plataforma": "blog",
    "fonte": "5 Dicas para uma Noite Romântica",
    "quando": "13/01/2026, 15:30"
}
```

| Campo | Descrição |
|-------|-----------|
| `nome` | Nome completo do lead |
| `email` | E-mail do lead |
| `telefone` | Telefone com máscara BR |
| `plataforma` | Sempre "blog" (origem fixa) |
| `fonte` | Título do post onde preencheu |
| `quando` | Data/hora do cadastro (formato BR) |

### Configuração do Webhook

No formulário de criação de post (`postin.html`), preencha:

1. **URL do Webhook:** URL do seu Zapier/Make/n8n
2. **E-mail de Destino:** E-mail alternativo para receber leads

### Integrações Sugeridas

| Plataforma | Como usar |
|------------|-----------|
| **Zapier** | Catch Hook → Google Sheets / CRM |
| **Make** | Webhook → Planilha / E-mail |
| **n8n** | Webhook trigger → Ação |
| **Google Sheets** | Via Zapier/Make |
| **RD Station** | Webhook para integração API |
| **Hubspot** | Webhook para formulário |

### Backup Local

Todos os leads também são salvos no `localStorage` do navegador do visitante como backup. Você pode acessar via console:

```javascript
JSON.parse(localStorage.getItem('xenon_leads'))
```

---

## 🔄 ATUALIZANDO PARA V4.0

Se você já tem uma versão anterior do blog, atualize estes arquivos:

### 1. postin.html
- BLOCO 7 agora tem campos do formulário (não mais CTA)

### 2. templates/post-template.html
- Novo HTML do formulário de captura

### 3. assets/js/blog-post.js
- Nova função `initLeadCaptureForm()`
- Envio para webhook com campos corretos

### 4. assets/js/form-script.js
- Novos campos: `formTitle`, `formDescription`, `formButtonText`
- Removidos: `ctaTitle`, `ctaText`, `ctaLink`, `ctaButtonText`

### 5. assets/css/blog-post.css
- Novos estilos para `.post-lead-form`
- Removidos estilos de `.post-cta`
