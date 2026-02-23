# 📚 DOCUMENTAÇÃO COMPLETA DO PROJETO
## Sistema de Blog MediaGrowth - Template Markdown

**Data:** 22 de fevereiro de 2026  
**Versão:** 2.0  
**Repositório:** `mediagrowthmkt-debug/blog-template-md`

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Fluxo de Trabalho Completo](#fluxo-de-trabalho-completo)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)
5. [Páginas Principais](#páginas-principais)
6. [Sistema de Imagens](#sistema-de-imagens)
7. [Formulário de Captura de Leads](#formulário-de-captura-de-leads)
8. [Posts Relacionados](#posts-relacionados)
9. [SEO e Meta Tags](#seo-e-meta-tags)
10. [Publicação no GitHub](#publicação-no-github)
11. [Como Replicar para Outro Cliente](#como-replicar-para-outro-cliente)
12. [Manutenção e Troubleshooting](#manutenção-e-troubleshooting)

---

## 🎯 VISÃO GERAL

### O que é este projeto?

Este é um sistema completo de blog que funciona através do **GitHub Pages**, permitindo criar, editar e publicar posts de blog de forma automatizada sem necessidade de servidor backend ou CMS complexo.

### Características Principais

✅ **Interface Visual Intuitiva** - Formulário completo em `postin.html` para criar posts  
✅ **Preview em Tempo Real** - Visualização instantânea antes de publicar  
✅ **Publicação Automatizada** - Posts sobem direto para GitHub via API  
✅ **Sistema de Imagens Inteligente** - 3 layouts adaptativos (full/left/left)  
✅ **Formulário de Leads** - Captura de contatos com webhook integrado  
✅ **Posts Relacionados** - Sistema dinâmico que carrega automaticamente  
✅ **SEO Completo** - Meta tags, Schema.org, Open Graph, Twitter Cards  
✅ **Multilíngue** - Detecção automática PT/EN  
✅ **Design Responsivo** - Mobile-first, dark theme profissional  
✅ **Header & Footer** - Logo da empresa em todas as páginas  

---

## 🏗️ ARQUITETURA DO SISTEMA

### Stack Tecnológico

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript ES6+
- **Hospedagem:** GitHub Pages (gratuito)
- **API:** GitHub REST API v3
- **Versionamento:** Git
- **Processamento:** Client-side (sem servidor)

### Fluxo de Dados

```
┌─────────────────┐
│  postin.html    │ ← Interface de criação
│  (Formulário)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ form-script.js  │ ← Lógica principal
│ (3200+ linhas)  │
└────────┬────────┘
         │
         ├──────► Preview (visualização)
         │
         └──────► GitHub API (publicação)
                  │
                  ▼
         ┌─────────────────┐
         │  posts/*.html   │ ← Posts publicados
         └────────┬────────┘
                  │
                  ▼
         ┌─────────────────┐
         │   index.html    │ ← Página principal
         │ (Lista posts)   │
         └─────────────────┘
```

---

## 🔄 FLUXO DE TRABALHO COMPLETO

### PASSO 1: Acessar a Interface de Criação

1. Abra o arquivo `postin.html` no navegador
2. Você verá um formulário completo dividido em seções:
   - ✍️ Informações Básicas
   - 🖼️ Imagem de Capa
   - 🎨 Imagens Internas (até 3)
   - 📝 Conteúdo
   - 🎯 Lead Capture
   - 📊 SEO & Meta Tags
   - ⚙️ Configurações

### PASSO 2: Preencher o Formulário

#### **Seção 1: Informações Básicas**
- **Título H1:** Título principal do post (usado no topo da página)
- **Introdução:** Parágrafo de abertura (destaque visual)
- **Categoria:** Ex: "Marketing", "Tecnologia", "Dicas"
- **Autor:** Nome do autor do post
- **Avatar do Autor:** URL da imagem do autor
- **Tempo de Leitura:** Número de minutos (ex: "5")
- **Ativar botão de compartilhamento:** Checkbox

#### **Seção 2: Imagem de Capa**
- **URL da Imagem:** Link direto para a imagem (Google Drive suportado)
- **Texto ALT:** Descrição para acessibilidade e SEO
- **Legenda:** Opcional, aparece abaixo da imagem

#### **Seção 3: Imagens Internas (Sistema de 3 Imagens)**

O sistema distribui **até 3 imagens** ao longo do conteúdo automaticamente:

- **1ª Imagem:** `FULL WIDTH` - Grande destaque, ocupa largura total
- **2ª Imagem:** `LEFT SIDE` - Menor, texto flui ao lado direito
- **3ª Imagem:** `LEFT SIDE` - Menor, texto flui ao lado direito

**Como funciona:**
- As imagens são inseridas automaticamente após cada H2 do conteúdo
- Cada imagem precisa de: URL, ALT text e Prompt AI (opcional)
- URLs do Google Drive são convertidos automaticamente
- Imagens duplicadas da capa são filtradas

#### **Seção 4: Conteúdo do Post**

- **Corpo do Conteúdo:** Use o editor de texto rico (HTML aceito)
- **Conclusão:** Parágrafo de fechamento

**Dicas:**
- Use `## Título` para H2 (onde as imagens serão inseridas)
- Use `### Subtítulo` para H3
- Listas com `- item` ou `1. item`
- Parágrafos normais sem marcação

#### **Seção 5: Lead Capture**

- **Título do Formulário:** Ex: "Solicite um Orçamento"
- **Texto do Botão:** Ex: "Começar Agora"
- **Nome da Campanha:** Para tracking (ex: "blog-jan-2026")
- **Webhook URL:** URL do Make.com ou Zapier para receber os dados
- **Checkboxes:**
  - ☑️ Coletar Nome
  - ☑️ Coletar Email
  - ☑️ Coletar Telefone

**IMPORTANTE:** O formulário só aparece se pelo menos 1 checkbox estiver marcado.

#### **Seção 6: SEO & Meta Tags**

- **Meta Title:** Título para mecanismos de busca (60 caracteres)
- **Meta Description:** Descrição curta (160 caracteres)
- **Keywords:** Palavras-chave separadas por vírgula
- **Canonical URL:** URL definitiva do post (evita conteúdo duplicado)
- **Tags:** Hashtags do post (ex: #marketing #dicas #seo)

#### **Seção 7: Configurações GitHub**

- **GitHub Token:** Token de acesso pessoal (ver seção [Publicação](#publicação-no-github))
- **Nome do Repositório:** Ex: `mediagrowthmkt-debug/blog-template-md`
- **Branch:** Geralmente `main`

### PASSO 3: Visualizar Preview

1. Clique no botão **"👁️ Visualizar Preview"**
2. Aguarde o processamento (2-5 segundos)
3. Uma nova janela/aba abrirá com o post completo
4. **Elementos do Preview:**
   - Header com logo MediaGrowth
   - Navegação (Site Oficial | Ver Todos os Blogs)
   - Imagem de capa
   - Título H1
   - Meta informações (categoria, autor, tempo de leitura)
   - Introdução destacada
   - Conteúdo com imagens distribuídas
   - Conclusão
   - Formulário de leads (se configurado)
   - Tags do post
   - Posts relacionados (dinâmicos)
   - Footer com logo MediaGrowth
   - Botão "voltar ao topo"

5. **Revise tudo:**
   - Imagens carregando corretamente?
   - Textos sem erros?
   - Formulário aparecendo (se configurado)?
   - Layout responsivo OK?

### PASSO 4: Publicar no GitHub

1. Volte para a aba do `postin.html`
2. Clique no botão **"🚀 Publicar Post"**
3. O sistema automaticamente:
   - Valida todos os campos obrigatórios
   - Gera o HTML completo do post
   - Cria um slug (URL amigável) a partir do título
   - Conecta-se à API do GitHub
   - Faz upload do arquivo `.html` para a pasta `posts/`
   - Atualiza o índice de posts
4. **Aguarde a mensagem de sucesso:** "✅ Post publicado com sucesso!"
5. **Tempo de propagação:** 1-3 minutos para o GitHub Pages processar

### PASSO 5: Acessar o Post Publicado

Após publicação, o post estará disponível em:

```
https://[seu-usuario].github.io/[repositorio]/posts/[slug-do-post]
```

Exemplo:
```
https://mediagrowthmkt-debug.github.io/blog-template-md/posts/window-replacement-massachusetts-guide
```

**Observação:** URLs **NÃO** têm `.html` no final (configurado via Jekyll `_config.yml`).

---

## 📁 ESTRUTURA DE ARQUIVOS

```
blog-template-md/
│
├── index.html                    # Página principal (lista de posts)
├── postin.html                   # Interface de criação de posts
├── _config.yml                   # Configuração Jekyll (URLs limpos)
├── CNAME                         # Domínio customizado (opcional)
│
├── assets/
│   ├── css/
│   │   ├── blog-index.css       # Estilos da página principal (430 linhas)
│   │   ├── blog-post.css        # Estilos dos posts (843 linhas)
│   │   └── form-style.css       # Estilos do formulário postin.html
│   │
│   ├── js/
│   │   ├── blog-index.js        # Lógica da página principal
│   │   ├── blog-post.js         # Lógica dos posts (528 linhas)
│   │   └── form-script.js       # ⭐ ARQUIVO PRINCIPAL (3230+ linhas)
│   │
│   └── images/
│       ├── logo-mediagrowth.webp    # Logo da empresa
│       ├── faviconmd.webp           # Favicon
│       └── [outras imagens]
│
├── posts/
│   ├── index.html               # Redirecionamento para página principal
│   ├── *.html                   # Posts individuais publicados
│   └── README.md
│
├── docs/                        # Documentação do projeto
│   ├── INDEX.md
│   ├── QUICK-START.md
│   ├── ACESSO-RAPIDO.md
│   ├── DOCUMENTACAO-COMPLETA.md # 👈 Este arquivo
│   ├── guides/
│   ├── security/
│   └── updates/
│
├── examples/                    # Exemplos e testes
├── templates/                   # Templates de posts
├── scripts/                     # Scripts auxiliares
└── drafts/                      # Rascunhos (não publicados)
```

---

## 📄 PÁGINAS PRINCIPAIS

### 1. **index.html** - Página Principal

**Função:** Lista todos os posts do blog em grid responsivo.

**Características:**
- Header com logo MediaGrowth
- Hero section com título e descrição
- Grid de posts (3 colunas desktop, responsivo)
- Cada card mostra: imagem, categoria, título, descrição, autor, data
- Footer com logo e informações
- Sistema de busca e filtros (via `blog-index.js`)

**Carregamento de Posts:**
```javascript
// blog-index.js carrega todos os .html da pasta posts/
const postsFolder = 'posts/';
fetch(postsFolder)
  .then(response => response.json())
  .then(files => {
    // Carrega metadados de cada post
    files.forEach(file => loadPostMetadata(file));
  });
```

### 2. **postin.html** - Interface de Criação

**Função:** Formulário completo para criar novos posts.

**Seções do Formulário:**
1. Informações Básicas (título, autor, categoria)
2. Imagem de Capa
3. Imagens Internas (até 3)
4. Conteúdo (introdução, corpo, conclusão)
5. Lead Capture (formulário de contatos)
6. SEO & Meta Tags
7. Configurações GitHub

**Botões Principais:**
- `👁️ Visualizar Preview` → Abre preview em nova aba
- `🚀 Publicar Post` → Publica no GitHub
- `💾 Salvar Rascunho` → Salva no localStorage

**JavaScript Principal:** `form-script.js`

### 3. **Posts Individuais** (posts/*.html)

**Gerados automaticamente pelo sistema.**

**Estrutura HTML:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <!-- Meta tags SEO -->
  <!-- Open Graph -->
  <!-- Twitter Cards -->
  <!-- Schema.org JSON-LD -->
  <link rel="stylesheet" href="../assets/css/blog-post.css">
</head>
<body>
  <!-- Header com logo -->
  <header class="site-header">...</header>
  
  <!-- Artigo -->
  <article class="blog-post">
    <header class="post-header">...</header>
    <figure class="post-cover">...</figure>
    <div class="post-intro">...</div>
    <div class="post-content">
      <!-- Imagens distribuídas automaticamente -->
    </div>
    <div class="post-conclusion">...</div>
    
    <!-- Formulário de leads (opcional) -->
    <section class="lead-capture">...</section>
    
    <!-- Tags -->
    <footer class="post-footer">...</footer>
  </article>
  
  <!-- Posts Relacionados -->
  <aside class="related-posts">...</aside>
  
  <!-- Footer com logo -->
  <footer class="site-footer">...</footer>
  
  <script src="../assets/js/blog-post.js"></script>
</body>
</html>
```

---

## 🖼️ SISTEMA DE IMAGENS

### Conceito: Sistema de 3 Imagens Adaptativo

O sistema distribui automaticamente **até 3 imagens** ao longo do conteúdo, criando um layout visual equilibrado.

### Layouts das Imagens

#### **Layout Sequence: [FULL, LEFT, LEFT]**

```
┌─────────────────────────────────┐
│   1ª IMAGEM - FULL WIDTH        │
│   (100% largura, 16:10 ratio)   │
│   Grande destaque visual        │
└─────────────────────────────────┘

    ┌──────────┐  Texto ao lado
    │2ª IMAGEM │  flui normalmente
    │  LEFT    │  criando um layout
    │ (40%)    │  mais dinâmico
    └──────────┘  e interessante

    ┌──────────┐  Mais texto ao
    │3ª IMAGEM │  lado da terceira
    │  LEFT    │  imagem também
    │ (40%)    │  flui ao redor
    └──────────┘  dela naturalmente
```

### Posicionamento Automático

As imagens são inseridas **após cada H2** do conteúdo:

```javascript
// form-script.js - linha 848
const layoutSequence = ['image-full', 'image-left', 'image-left'];

imagesToUse.forEach((img, index) => {
  const layout = layoutSequence[index];
  
  // Insere após o H2 correspondente
  if (h2Array[index]) {
    h2Array[index].insertAdjacentHTML('afterend', imageHTML);
  }
});
```

### Suporte a Google Drive

O sistema converte automaticamente URLs do Google Drive:

**URL Original:**
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```

**Convertido para:**
```
https://drive.google.com/uc?export=view&id=1ABC123xyz
```

**Código de Conversão:**
```javascript
// form-script.js - linha 420
function convertGoogleDriveUrl(url) {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}
```

### Prevenção de Duplicatas

O sistema **filtra automaticamente** imagens internas que tenham a mesma URL da imagem de capa:

```javascript
// form-script.js - linha 833
const validImages = data.internalImages.filter(img => {
  if (data.coverImage && img.url.trim() === data.coverImage.trim()) {
    console.log('⚠️ Imagem interna ignorada (mesma URL da capa)');
    return false;
  }
  return true;
});
```

### Gerador de Prompts AI

Cada imagem pode ter um **prompt para IA** associado, útil para:
- Documentar o conceito da imagem
- Regenerar imagens similares no futuro
- Manter consistência visual

---

## 📝 FORMULÁRIO DE CAPTURA DE LEADS

### Como Funciona

O formulário é **opcional** e só aparece se pelo menos 1 campo for configurado para coleta.

### Configuração

No `postin.html`, marque os checkboxes:
- ☑️ `formCollectName` - Coletar Nome
- ☑️ `formCollectEmail` - Coletar Email  
- ☑️ `formCollectPhone` - Coletar Telefone

### Detecção de Idioma

O sistema detecta automaticamente o idioma do post baseado no conteúdo:

```javascript
// form-script.js - linha 1730
const contentText = (data.h1Title || '') + ' ' + (data.contentBody || '');
const isEnglish = /\b(the|and|for|with|your|home)\b/i.test(contentText);
```

**Textos em Português:**
- Título: "Solicite um Orçamento"
- Botão: "Começar Agora"
- Sucesso: "✅ Mensagem enviada! Entraremos em contato em breve."
- Erro: "❌ Erro ao enviar. Tente novamente."

**Textos em Inglês:**
- Título: "Get Your Free Quote"
- Botão: "Get Started"
- Sucesso: "✅ Message sent! We will contact you soon."
- Erro: "❌ Error sending. Try again."

### Webhook Integration

O formulário envia dados para uma URL de webhook (Make.com, Zapier, etc.):

```javascript
// Dados enviados via POST
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "campaign_name": "blog-jan-2026",
  "page_name": "Window Replacement Guide",
  "FONTE": "https://blogs.mediagrowth.com.br/posts/window-guide",
  "PLATAFORMA": "BLOG"
}
```

### Design do Formulário

- Layout horizontal (campos lado a lado)
- Design minimalista com fundo semitransparente
- Validação HTML5 nativa (required)
- Feedback visual (mensagens de sucesso/erro)
- Botão desabilitado durante envio

---

## 🔗 POSTS RELACIONADOS

### Sistema Dinâmico

O sistema carrega **automaticamente** todos os posts da pasta `posts/` e exibe 3 posts relacionados.

### Algoritmo de Seleção

```javascript
// blog-post.js - linha 200
function getRelatedPosts(currentSlug, allPosts) {
  // 1. Remove o post atual
  const otherPosts = allPosts.filter(p => p.slug !== currentSlug);
  
  // 2. Embaralha aleatoriamente
  const shuffled = otherPosts.sort(() => Math.random() - 0.5);
  
  // 3. Retorna os 3 primeiros
  return shuffled.slice(0, 3);
}
```

### Carregamento

```javascript
// blog-post.js - linha 42
async function loadRelatedPosts() {
  const response = await fetch('../posts/');
  const files = await response.json();
  
  const posts = files
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(file => loadPostMetadata(file));
  
  displayRelatedPosts(posts);
}
```

### Layout

- Grid responsivo (3 colunas desktop, 1 coluna mobile)
- Cada card mostra:
  - Imagem em miniatura
  - Categoria
  - Título
  - Link para o post

---

## 🎯 SEO E META TAGS

### Sistema Completo de SEO

Cada post gerado inclui **todas as meta tags** necessárias para otimização:

### 1. **Meta Tags Básicas**

```html
<title>Título do Post - MediaGrowth Blog</title>
<meta name="description" content="Descrição do post em até 160 caracteres">
<meta name="keywords" content="marketing, dicas, seo">
<meta name="author" content="Nome do Autor">
<link rel="canonical" href="https://blogs.mediagrowth.com.br/posts/slug">
```

### 2. **Open Graph (Facebook)**

```html
<meta property="og:type" content="article">
<meta property="og:title" content="Título do Post">
<meta property="og:description" content="Descrição">
<meta property="og:image" content="URL da imagem de capa">
<meta property="og:url" content="URL canônica">
<meta property="article:published_time" content="2026-02-22T10:00:00Z">
<meta property="article:modified_time" content="2026-02-22T10:00:00Z">
<meta property="article:author" content="Nome do Autor">
<meta property="article:section" content="Categoria">
```

### 3. **Twitter Cards**

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título do Post">
<meta name="twitter:description" content="Descrição">
<meta name="twitter:image" content="URL da imagem">
```

### 4. **Schema.org JSON-LD**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título do Post",
  "image": "URL da imagem",
  "author": {
    "@type": "Person",
    "name": "Nome do Autor"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MediaGrowth",
    "logo": {
      "@type": "ImageObject",
      "url": "URL do logo"
    }
  },
  "datePublished": "2026-02-22T10:00:00Z",
  "dateModified": "2026-02-22T10:00:00Z",
  "description": "Descrição",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "URL canônica"
  }
}
</script>
```

### Geração Automática de Datas

```javascript
// form-script.js - linha 1245
const now = new Date();
const dateISO = now.toISOString();
const dateFormatted = now.toLocaleDateString('pt-BR');
```

---

## 🚀 PUBLICAÇÃO NO GITHUB

### Pré-requisitos

1. **Conta no GitHub**
2. **Repositório criado** (pode ser público ou privado)
3. **GitHub Pages ativado** nas configurações do repositório
4. **Personal Access Token** com permissões de escrita

### Como Obter o GitHub Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome: `Blog Template Token`
4. Marque o escopo: `repo` (Full control of private repositories)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você só verá uma vez!)
7. Cole no campo "GitHub Token" do `postin.html`

### Configuração do Repositório

No `postin.html`, preencha:

```
GitHub Token: ghp_xxxxxxxxxxxxxxxxxxxxxx
Repositório: mediagrowthmkt-debug/blog-template-md
Branch: main
```

### Processo de Publicação

Quando você clica em **"🚀 Publicar Post"**, o sistema executa:

#### **Etapa 1: Validação**
```javascript
// form-script.js - linha 1360
if (!data.h1Title || !data.contentBody) {
  alert('❌ Preencha os campos obrigatórios!');
  return;
}
```

#### **Etapa 2: Geração do Slug**
```javascript
// form-script.js - linha 445
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Espaços → hífens
    .replace(/-+/g, '-'); // Remove hífens duplicados
}

// Exemplo: "Guia de Substituição de Janelas" → "guia-de-substituicao-de-janelas"
```

#### **Etapa 3: Geração do HTML**
```javascript
// form-script.js - linha 1370
const postHtml = await generatePostHtml(formData);
```

#### **Etapa 4: Upload via GitHub API**
```javascript
// form-script.js - linha 1400
const response = await fetch(
  `https://api.github.com/repos/${owner}/${repo}/contents/posts/${slug}.html`,
  {
    method: 'PUT',
    headers: {
      'Authorization': `token ${githubToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `📝 Post publicado: ${title}`,
      content: btoa(unescape(encodeURIComponent(postHtml))), // Base64
      branch: branch
    })
  }
);
```

#### **Etapa 5: Confirmação**
```javascript
if (response.ok) {
  const data = await response.json();
  const postUrl = data.content.html_url.replace('/blob/', '/');
  alert(`✅ Post publicado com sucesso!\n\n🔗 ${postUrl}`);
}
```

### GitHub Pages - Propagação

- **Tempo:** 1-3 minutos após o commit
- **URL:** `https://[usuario].github.io/[repositorio]/posts/[slug]`
- **HTTPS:** Automático (certificado Let's Encrypt)
- **Domínio customizado:** Configure via CNAME

### URLs Limpas (sem .html)

O arquivo `_config.yml` na raiz configura o Jekyll para URLs sem extensão:

```yaml
permalink: /:title

defaults:
  - scope:
      path: "posts"
    values:
      permalink: /posts/:title
```

**Resultado:**
- ✅ `https://site.com/posts/my-post`
- ❌ `https://site.com/posts/my-post.html`

---

## 🔄 COMO REPLICAR PARA OUTRO CLIENTE

### Checklist Completo de Replicação

#### **1. Preparação (5 minutos)**

- [ ] Criar conta GitHub para o cliente (se não tiver)
- [ ] Gerar Personal Access Token
- [ ] Anotar credenciais

#### **2. Fork/Clone do Repositório (2 minutos)**

**Opção A: Fork no GitHub**
1. Acesse: https://github.com/mediagrowthmkt-debug/blog-template-md
2. Clique em **"Fork"**
3. Renomeie: `blog-[nome-cliente]`

**Opção B: Clone Local**
```bash
git clone https://github.com/mediagrowthmkt-debug/blog-template-md.git blog-cliente
cd blog-cliente
git remote set-url origin https://github.com/[cliente]/blog-cliente.git
git push -u origin main
```

#### **3. Personalização Visual (15 minutos)**

##### **3.1. Logo e Favicon**

Substitua os arquivos em `assets/images/`:
- `logo-mediagrowth.webp` → logo do cliente
- `faviconmd.webp` → favicon do cliente

##### **3.2. Cores e Branding**

Edite `assets/css/blog-post.css`:

```css
/* Linha 80 - Cor principal */
.category-badge {
  background: #EB7A3D; /* ← Mude para a cor do cliente */
}

/* Linha 320 - Hover de links */
a:hover {
  color: #EB7A3D; /* ← Mude para a cor do cliente */
}

/* Linha 450 - Botão CTA */
.cta-button {
  background: #EB7A3D; /* ← Mude para a cor do cliente */
}
```

Edite `assets/css/blog-index.css`:

```css
/* Linha 150 - Card hover */
.post-card:hover {
  border-color: #EB7A3D; /* ← Mude para a cor do cliente */
}
```

##### **3.3. Textos e Links**

Edite `index.html`:
```html
<!-- Linha 15 - Título do hero -->
<h1>Blog da [Nome do Cliente]</h1>

<!-- Linha 18 - Descrição -->
<p>Descrição personalizada do blog do cliente</p>
```

Edite `assets/js/form-script.js`:
```javascript
// Linha 1162 - Links de navegação
<a href="https://site-do-cliente.com">Site Oficial</a>
<a href="https://blog.site-do-cliente.com">Ver Todos os Blogs</a>
```

Edite footer em ambos:
- `form-script.js` linha 1320
- `form-script.js` linha 2220

```javascript
<p class="footer-tagline">Blog desenvolvido por [Nome do Cliente]</p>
<p class="footer-copyright">© ${new Date().getFullYear()} [Nome do Cliente]</p>
```

#### **4. Configuração do Domínio (Opcional - 10 minutos)**

##### **4.1. Domínio Personalizado**

Crie/edite `CNAME`:
```
blog.cliente.com.br
```

##### **4.2. Configuração DNS**

No provedor de domínio do cliente, adicione:

```
Tipo: CNAME
Nome: blog
Valor: [usuario-github].github.io
TTL: 3600
```

##### **4.3. Ativar HTTPS**

1. Vá em: Settings → Pages
2. Marque: **"Enforce HTTPS"**

#### **5. Ativação do GitHub Pages (2 minutos)**

1. Acesse: Repositório → Settings → Pages
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. Clique em **"Save"**
6. Aguarde 1-2 minutos para deploy

#### **6. Teste Completo (5 minutos)**

- [ ] Acessar `https://[usuario].github.io/[repositorio]/`
- [ ] Verificar carregamento do index
- [ ] Testar criação de post no `postin.html`
- [ ] Gerar preview
- [ ] Publicar post de teste
- [ ] Verificar post publicado
- [ ] Testar formulário de leads (se configurado)
- [ ] Testar posts relacionados
- [ ] Testar responsividade (mobile)

#### **7. Documentação para o Cliente (5 minutos)**

Crie um arquivo `MANUAL-CLIENTE.md`:

```markdown
# Manual de Uso - Blog [Nome do Cliente]

## Como Criar um Post

1. Abra: https://[usuario].github.io/[repositorio]/postin.html
2. Preencha o formulário
3. Clique em "Visualizar Preview"
4. Revise o preview
5. Clique em "Publicar Post"

## Dados de Acesso

- GitHub Token: [token]
- Repositório: [usuario]/[repositorio]
- Branch: main

## Suporte

- Email: contato@mediagrowth.com.br
- Telefone: (00) 0000-0000
```

#### **8. Treinamento do Cliente (30 minutos)**

Ensine:
- [ ] Como acessar `postin.html`
- [ ] Como preencher cada seção do formulário
- [ ] Como usar imagens do Google Drive
- [ ] Como configurar o formulário de leads
- [ ] Como gerar preview
- [ ] Como publicar
- [ ] Como verificar se publicou corretamente
- [ ] Como editar um post existente (re-publicar)

---

## 🛠️ MANUTENÇÃO E TROUBLESHOOTING

### Problemas Comuns

#### **1. Post não publica no GitHub**

**Sintomas:**
- Erro ao clicar em "Publicar Post"
- Mensagem: "Failed to fetch"

**Soluções:**
```javascript
// Verifique:
✓ Token do GitHub está correto?
✓ Token tem permissão 'repo'?
✓ Nome do repositório está correto? (formato: usuario/repo)
✓ Branch 'main' existe?
✓ Conexão com internet OK?
```

#### **2. Imagens não carregam**

**Sintomas:**
- Imagens quebradas no post

**Soluções:**
```javascript
// Para Google Drive:
✓ URL está no formato: /d/[ID]/view?
✓ Permissões do arquivo: "Qualquer pessoa com o link"
✓ Não está em pasta privada

// Para URLs diretas:
✓ URL começa com https://
✓ Imagem acessível publicamente
✓ Formato suportado: .jpg, .png, .webp, .gif
```

#### **3. Preview não abre**

**Sintomas:**
- Janela de preview não abre ou fica em branco

**Soluções:**
```javascript
// Verifique:
✓ Popup blocker do navegador não está bloqueando
✓ JavaScript está ativado
✓ Console do navegador não mostra erros (F12)
✓ Campos obrigatórios preenchidos
```

#### **4. Formulário de leads não aparece**

**Sintomas:**
- Formulário não é exibido no post

**Verificações:**
```javascript
// No postin.html:
✓ Pelo menos 1 checkbox marcado?
  - Coletar Nome
  - Coletar Email
  - Coletar Telefone

// Se nenhum estiver marcado, formulário não aparece (comportamento esperado)
```

#### **5. Posts relacionados não carregam**

**Sintomas:**
- Seção "Posts Relacionados" mostra "Loading..." infinitamente

**Soluções:**
```javascript
// Verifique:
✓ Existem outros posts na pasta posts/?
✓ Arquivo blog-post.js está carregando corretamente
✓ Console mostra erros? (F12)
```

#### **6. URLs com .html no final**

**Sintomas:**
- URLs aparecem como: `/posts/meu-post.html`

**Soluções:**
```javascript
// Verifique:
✓ Arquivo _config.yml existe na raiz?
✓ _config.yml contém:
  permalink: /:title
  
✓ GitHub Pages está usando Jekyll?
✓ Aguarde 2-3 minutos após publicar
```

### Como Editar um Post Existente

**Processo:**
1. Abra `postin.html`
2. Preencha o formulário com os **mesmos dados** do post original
3. **IMPORTANTE:** Use exatamente o **mesmo título H1** (para manter o mesmo slug)
4. Faça as alterações desejadas
5. Clique em "Publicar Post"
6. O GitHub **sobrescreverá** o arquivo anterior

**Observação:** Não é possível carregar um post existente de volta no formulário automaticamente. Você precisa preencher manualmente ou manter um backup dos dados.

### Como Deletar um Post

**Opção 1: Via GitHub Interface**
1. Acesse: https://github.com/[usuario]/[repositorio]/tree/main/posts
2. Clique no arquivo do post
3. Clique no ícone de lixeira (Delete this file)
4. Commit: "Delete: nome-do-post"

**Opção 2: Via Git Local**
```bash
cd blog-template-md
git pull origin main
rm posts/nome-do-post.html
git add .
git commit -m "Delete: nome-do-post"
git push origin main
```

### Backup e Recuperação

#### **Fazer Backup**

```bash
# Clone o repositório
git clone https://github.com/[usuario]/[repositorio].git backup-blog-$(date +%Y%m%d)
cd backup-blog-*
zip -r ../backup-blog-$(date +%Y%m%d).zip .
```

#### **Restaurar Backup**

```bash
# Extraia o backup
unzip backup-blog-20260222.zip -d blog-restaurado
cd blog-restaurado

# Configure remote e push
git remote set-url origin https://github.com/[usuario]/[repositorio].git
git push -f origin main
```

### Monitoramento

#### **Verificar Status do GitHub Pages**

1. Acesse: https://github.com/[usuario]/[repositorio]/deployments
2. Veja histórico de deploys
3. Status deve estar: ✅ Active

#### **Ver Logs de Deploy**

1. Acesse: Actions → All workflows
2. Clique no último workflow "pages build and deployment"
3. Veja logs detalhados

---

## 📊 ESTATÍSTICAS DO PROJETO

### Linhas de Código

- **form-script.js:** 3.230 linhas
- **blog-post.js:** 528 linhas
- **blog-index.js:** 350 linhas
- **blog-post.css:** 843 linhas
- **blog-index.css:** 430 linhas
- **Total:** ~5.400 linhas de código

### Recursos

- **Formulários:** 7 seções
- **Campos de entrada:** 25+
- **Funções JavaScript:** 45+
- **Classes CSS:** 150+
- **Layouts de imagem:** 3 tipos
- **Idiomas suportados:** 2 (PT/EN)

---

## 🎓 CONCEITOS TÉCNICOS

### GitHub API

O sistema usa a **GitHub REST API v3** para:
- Criar arquivos (PUT)
- Atualizar arquivos (PUT com SHA)
- Listar arquivos (GET)

### Base64 Encoding

Posts são enviados em Base64 para suportar caracteres especiais:

```javascript
const base64 = btoa(unescape(encodeURIComponent(html)));
```

### Client-Side Rendering

Todo o processamento acontece no navegador do usuário:
- Sem servidor backend
- Sem banco de dados
- Sem custo de hospedagem

### Jekyll Integration

GitHub Pages usa Jekyll para:
- Processar Markdown (se houver)
- Configurar permalinks
- Gerar URLs limpas

---

## 🔐 SEGURANÇA

### Sanitização de HTML

Todo conteúdo HTML é sanitizado antes de ser renderizado:

```javascript
// form-script.js - linha 1635
const sanitizeHtmlContent = (html) => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '');
};
```

### Validação de URLs

URLs são validadas para prevenir JavaScript injection:

```javascript
// form-script.js - linha 1625
const sanitizeUrl = (url) => {
  const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
  if (dangerousProtocols.test(url)) return '';
  return url;
};
```

### Token Security

⚠️ **NUNCA COMMITE O TOKEN NO CÓDIGO!**

- Use localStorage para armazenar temporariamente
- Peça ao usuário para inserir a cada sessão
- Configure como variável de ambiente se automatizar

---

## 📞 SUPORTE

### Contato MediaGrowth

- **Site:** https://mediagrowth.com.br
- **Email:** contato@mediagrowth.com.br
- **GitHub:** https://github.com/mediagrowthmkt-debug

### Recursos Adicionais

- [Guia Rápido](QUICK-START.md)
- [Acesso Rápido](ACESSO-RAPIDO.md)
- [Changelog](updates/CHANGELOG.md)
- [Security](security/SECURITY.md)

---

## 📜 LICENÇA

Este projeto foi desenvolvido pela **MediaGrowth** para uso interno e de clientes.

**Direitos:**
- ✅ Usar para projetos de clientes
- ✅ Modificar e personalizar
- ✅ Criar backups
- ❌ Revender como produto
- ❌ Remover créditos da MediaGrowth

---

## 🎉 CONCLUSÃO

Este sistema de blog representa uma solução **completa, profissional e escalável** para blogs corporativos, combinando:

✅ Facilidade de uso (formulário intuitivo)  
✅ Performance (GitHub Pages, CDN grátis)  
✅ SEO otimizado (todas as meta tags)  
✅ Design responsivo (mobile-first)  
✅ Zero custo de hospedagem  
✅ Manutenção simplificada  

**Replicação para novos clientes:** 30-45 minutos  
**Curva de aprendizado:** 1-2 horas  
**Dependências externas:** Zero  

---

**Documentação criada em:** 22 de fevereiro de 2026  
**Versão:** 2.0  
**Autor:** MediaGrowth Development Team  
**Última atualização:** 22/02/2026

