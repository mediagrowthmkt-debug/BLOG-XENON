# 📊 FLUXOGRAMA VISUAL DO SISTEMA

**⚡ Atualizado para v4.0 - Upload Imediato de Imagens (01/03/2026)**

## 🔄 FLUXO COMPLETO: CRIAÇÃO → PUBLICAÇÃO

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUÁRIO ACESSA POSTIN.HTML                    │
│                  Interface de Criação de Posts                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PREENCHE FORMULÁRIO                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🤖  BLOCO 0: Auto-Preenchimento (cola texto de IA)       │   │
│  │ 🧱  BLOCO 1: Identidade (título, autor, categoria)       │   │
│  │ 🧠  BLOCO 2: SEO Essencial (meta tags, keywords)         │   │
│  │ 🖼️  BLOCO 3: Imagens (capa + até 3 internas)             │   │
│  │ ✍️  BLOCO 4: Conteúdo (intro, corpo, conclusão)          │   │
│  │ 🔗  BLOCO 5: Links (até 5 links relacionados)            │   │
│  │ 🏷️  BLOCO 6: Tags e Organização                         │   │
│  │ 🚀  BLOCO 7: Formulário de Captação (webhook)            │   │
│  │ ⚙️  BLOCO 8: Configurações Avançadas                     │   │
│  │ 🤖  BLOCO 9: Template para IA                            │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
    ┌─────────────────────┐   ┌─────────────────────┐
    │  👁️  PREVIEW        │   │  🚀  PUBLICAR       │
    │  (Visualizar)       │   │  (GitHub API)       │
    └──────────┬──────────┘   └──────────┬──────────┘
               │                          │
               ▼                          │
    ┌─────────────────────┐              │
    │  Nova Aba Abre      │              │
    │  Preview Completo   │              │
    │  - Header           │              │
    │  - Imagens          │              │
    │  - Conteúdo         │              │
    │  - Formulário       │              │
    │  - Footer           │              │
    └─────────────────────┘              │
                                         │
                                         ▼
                          ┌──────────────────────────┐
                          │   FORM-SCRIPT.JS         │
                          │   Processa Dados         │
                          │                          │
                          │  1. Valida campos        │
                          │  2. Gera slug            │
                          │  3. Sanitiza HTML        │
                          │  4. Processa imagens     │
                          │  5. Gera HTML completo   │
                          └──────────┬───────────────┘
                                     │
                                     ▼
                          ┌──────────────────────────┐
                          │   GITHUB REST API        │
                          │   PUT /repos/.../posts/  │
                          │                          │
                          │  Authorization: token    │
                          │  Content: Base64(HTML)   │
                          │  Message: "Post: title"  │
                          └──────────┬───────────────┘
                                     │
                                     ▼
                          ┌──────────────────────────┐
                          │   GITHUB PAGES           │
                          │   Build & Deploy         │
                          │                          │
                          │  Jekyll processa         │
                          │  URLs sem .html          │
                          │  Deploy em CDN           │
                          │  Certificado SSL         │
                          └──────────┬───────────────┘
                                     │
                                     ▼
                          ┌──────────────────────────┐
                          │   POST PUBLICADO! ✅     │
                          │                          │
                          │  URL: /posts/slug        │
                          │  Tempo: 1-3 minutos      │
                          │  Status: Online          │
                          └──────────────────────────┘
```

---

## 📤 FLUXO DE UPLOAD IMEDIATO DE IMAGENS (v4.0)

```
┌─────────────────────────────────────────────────────────────────┐
│               USUÁRIO SELECIONA IMAGEM                           │
│          (Clica no botão "📤 UPLOAD")                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   1. PREVIEW LOCAL INSTANTÂNEO                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  var localPreview = URL.createObjectURL(file);          │   │
│   │  previewElement.src = localPreview;                     │   │
│   │  ➜ Usuário vê a imagem imediatamente!                   │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Paralelo
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   2. CREDENCIAIS DO GITHUB                                       │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Token: localStorage.getItem('github_token')            │   │
│   │  Username: busca via API /user (se não cacheado)        │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   3. VERIFICA/CRIA REPOSITÓRIO blog-images                       │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  GET /repos/{user}/blog-images                          │   │
│   │  ├─ Existe? ✅ Continua                                 │   │
│   │  └─ 404? POST /user/repos → Cria repositório            │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   4. OTIMIZAÇÃO DA IMAGEM                                        │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Canvas API → Resize + Compress                         │   │
│   │  ├─ Avatar:  400x400,  90% quality                      │   │
│   │  ├─ Cover:   1200x630, 85% quality                      │   │
│   │  └─ Interna: 1920x1080, 85% quality                     │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   5. UPLOAD PARA GITHUB (IMEDIATO!)                              │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Slug do post: document.getElementById('slug').value    │   │
│   │  Path: posts/{slug}/avatar.jpg                          │   │
│   │        posts/{slug}/cover.jpg                           │   │
│   │        posts/{slug}/image-{n}.jpg                       │   │
│   │                                                         │   │
│   │  PUT /repos/{user}/blog-images/contents/{path}          │   │
│   │  Body: { message, content: base64, sha?: (se update) }  │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   6. URL DO GITHUB PREENCHIDA                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  URL: https://raw.githubusercontent.com/{user}/         │   │
│   │       blog-images/main/posts/{slug}/cover.jpg           │   │
│   │                                                         │   │
│   │  input.value = githubUrl;                               │   │
│   │  preview.src = githubUrl + '?t=' + Date.now();          │   │
│   │  ➜ Preview agora usa URL REAL do GitHub!               │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│   ✅ IMAGEM JÁ ESTÁ NO GITHUB!                                   │
│                                                                  │
│   Quando post for publicado, a URL já estará correta!           │
│   Não há processamento adicional de imagens no publish.         │
└─────────────────────────────────────────────────────────────────┘
```

### **Estrutura de Pastas Criada (v4.0)**

```
blog-images/
└── posts/
    ├── meu-post-seo/
    │   ├── avatar.jpg     ← Avatar DESTE post
    │   ├── cover.jpg      ← Capa DESTE post
    │   ├── image-1.jpg    ← 1ª interna
    │   └── image-2.jpg    ← 2ª interna
    │
    └── outro-post/
        ├── avatar.jpg     ← Avatar diferente (se quiser)
        ├── cover.jpg
        └── image-1.jpg
```

### **Comparação: Antes vs Agora**

```
ANTES (v1-v3):
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│Seleciona│ →  │Armazena │ →  │Publicar │ →  │ Upload  │
│ Imagem  │    │ Base64  │    │  Post   │    │ GitHub  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                   ↑
                              ❌ Problema: Podia falhar aqui
                                 e post ficava sem imagens

AGORA (v4.0):
┌─────────┐    ┌─────────┐    ┌─────────┐
│Seleciona│ →  │ Upload  │ →  │Publicar │
│ Imagem  │    │ GitHub  │    │  Post   │
└─────────┘    │ IMEDIATO│    │(URL já) │
               └─────────┘    └─────────┘
                    ↑
          ✅ Imagem já está no GitHub!
             Post usa URL definitiva.
```

---

## 🎨 SISTEMA DE IMAGENS DISTRIBUÍDAS

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTEÚDO DO POST                              │
│                                                                  │
│  ## Primeiro Subtítulo (H2)                                     │
│  Parágrafo de texto...                                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │           1ª IMAGEM - FULL WIDTH (100%)                 │  │
│  │           Aspect Ratio 16:10                            │  │
│  │           Grande destaque visual                        │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│  [Legenda da imagem]                                            │
│                                                                  │
│  ## Segundo Subtítulo (H2)                                      │
│  Parágrafo de texto...                                          │
│                                                                  │
│  ┌─────────────────┐  Mais texto continua aqui ao lado        │
│  │                 │  da segunda imagem, criando um layout     │
│  │   2ª IMAGEM     │  mais dinâmico e interessante. O texto   │
│  │   LEFT (40%)    │  flui naturalmente ao redor dela.        │
│  │   Float Left    │  Parágrafo continua...                   │
│  │                 │                                           │
│  └─────────────────┘  E continua mais embaixo também.         │
│  [Legenda]                                                      │
│                                                                  │
│  ## Terceiro Subtítulo (H2)                                     │
│  Parágrafo de texto...                                          │
│                                                                  │
│  ┌─────────────────┐  A terceira imagem também fica no lado   │
│  │                 │  esquerdo, criando harmonia visual com    │
│  │   3ª IMAGEM     │  a segunda imagem. Texto flui ao lado    │
│  │   LEFT (40%)    │  direito dela também. Layout fica        │
│  │   Float Left    │  balanceado e profissional.              │
│  │                 │                                           │
│  └─────────────────┘  Parágrafo continua...                    │
│  [Legenda]                                                      │
│                                                                  │
│  ## Mais Conteúdo (H2)                                          │
│  Texto final do post...                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

REGRAS:
- Máximo 3 imagens internas
- Sequência: [FULL, LEFT, LEFT]
- Inserção automática após cada H2
- Duplicate cover image é filtrado
- Mobile: todas ficam full width
```

---

## 🔄 FLUXO DE DADOS: FORMULÁRIO → HTML

```
┌─────────────────────────────────────────────────────────────────┐
│                    DADOS DO FORMULÁRIO                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │   collectFormData()           │
            │   - Coleta todos os campos    │
            │   - Valida obrigatórios       │
            │   - Retorna objeto data       │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   generateSlug()              │
            │   - Remove acentos            │
            │   - Lowercase                 │
            │   - Substitui espaços por -   │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   convertGoogleDriveUrls()    │
            │   - Detecta URLs Drive        │
            │   - Converte para /uc?export  │
            │   - Aplica a todas imagens    │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   processImagesInHtml()       │
            │   - Limpa tags template       │
            │   - Remove artefatos          │
            │   - Valida HTML               │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   distributeImages()          │
            │   - Filtra duplicatas         │
            │   - Limita a 3 imagens        │
            │   - Insere após H2s           │
            │   - Aplica layouts            │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   generateLeadFormHtml()      │
            │   - Detecta idioma            │
            │   - Verifica checkboxes       │
            │   - Gera HTML do formulário   │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   generateSeoTags()           │
            │   - Meta tags básicas         │
            │   - Open Graph                │
            │   - Twitter Cards             │
            │   - Schema.org JSON-LD        │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   generatePostHtml()          │
            │   - Monta HTML completo       │
            │   - Inclui header/footer      │
            │   - Sanitiza conteúdo         │
            │   - Adiciona scripts          │
            └───────────┬───────────────────┘
                        │
            ┌───────────┴────────────┐
            │                        │
            ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐
│  PREVIEW            │  │  PUBLICAÇÃO         │
│  (openPreview())    │  │  (publishToGitHub())│
│                     │  │                     │
│  - Abre nova aba    │  │  - Encode Base64    │
│  - Escreve HTML     │  │  - GitHub API PUT   │
│  - Executa scripts  │  │  - Aguarda resposta │
└─────────────────────┘  └─────────────────────┘
```

---

## 📡 GITHUB API - FLUXO DE PUBLICAÇÃO

```
┌─────────────────────────────────────────────────────────────────┐
│                  BOTÃO "PUBLICAR" CLICADO                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │   Valida Dados                │
            │   - Token existe?             │
            │   - Repo preenchido?          │
            │   - Campos obrigatórios OK?   │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   Prepara Request             │
            │   URL: api.github.com/repos/  │
            │        owner/repo/contents/   │
            │        posts/slug.html        │
            │                               │
            │   Headers:                    │
            │   - Authorization: token XXX  │
            │   - Content-Type: json        │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   Encode HTML                 │
            │   Base64(                     │
            │     unescape(                 │
            │       encodeURIComponent(     │
            │         html                  │
            │       )                       │
            │     )                         │
            │   )                           │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   Body JSON                   │
            │   {                           │
            │     message: "Post: título",  │
            │     content: "[base64]",      │
            │     branch: "main"            │
            │   }                           │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   fetch() API Call            │
            │   method: 'PUT'               │
            └───────────┬───────────────────┘
                        │
            ┌───────────┴────────────┐
            │                        │
            ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐
│  SUCESSO (200)      │  │  ERRO (4xx/5xx)     │
│                     │  │                     │
│  - Retorna SHA      │  │  - Token inválido   │
│  - Retorna URL      │  │  - Repo não existe  │
│  - Mostra sucesso   │  │  - Sem permissão    │
│                     │  │  - Mostra erro      │
└──────────┬──────────┘  └─────────────────────┘
           │
           ▼
┌─────────────────────┐
│  GITHUB PAGES       │
│  Auto Deploy        │
│                     │
│  1. Detecta commit  │
│  2. Roda Jekyll     │
│  3. Build site      │
│  4. Deploy CDN      │
│  5. Online (1-3min) │
└─────────────────────┘
```

---

## 🌐 ARQUITETURA COMPLETA DO SISTEMA

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIO                                  │
│                      (Navegador Web)                             │
└────────────┬────────────────────────────────────┬────────────────┘
             │                                    │
             │ Acessa                             │ Publica
             ▼                                    ▼
┌──────────────────────┐              ┌──────────────────────┐
│   INDEX.HTML         │              │   POSTIN.HTML        │
│   (Página Principal) │              │   (Interface Criação)│
│                      │              │                      │
│   - Lista posts      │              │   - Formulário       │
│   - Grid layout      │              │   - Preview          │
│   - Busca/filtro     │              │   - Publicação       │
│                      │              │                      │
│   JS: blog-index.js  │              │   JS: form-script.js │
│   CSS: blog-index.css│              │   CSS: form-style.css│
└──────────┬───────────┘              └───────────┬──────────┘
           │                                      │
           │ Carrega                              │ Chama API
           ▼                                      ▼
┌──────────────────────┐              ┌──────────────────────┐
│   POSTS/*.HTML       │◄─────────────│   GITHUB API         │
│   (Posts Publicados) │   Upload     │   (REST v3)          │
│                      │              │                      │
│   - HTML completo    │              │   - Authentication   │
│   - SEO otimizado    │              │   - File operations  │
│   - Responsivo       │              │   - Base64 encode    │
│                      │              │                      │
│   JS: blog-post.js   │              └──────────────────────┘
│   CSS: blog-post.css │                        │
└──────────┬───────────┘                        │
           │                                    │
           │ Carrega                            │
           ▼                                    ▼
┌──────────────────────┐              ┌──────────────────────┐
│   ASSETS/            │              │   GITHUB PAGES       │
│   (Recursos)         │              │   (Hospedagem)       │
│                      │              │                      │
│   css/               │              │   - Jekyll build     │
│   ├── blog-index     │              │   - CDN global       │
│   ├── blog-post      │              │   - SSL automático   │
│   └── form-style     │              │   - URLs limpas      │
│                      │              │   - 100% grátis      │
│   js/                │              │                      │
│   ├── blog-index     │              └──────────────────────┘
│   ├── blog-post      │
│   └── form-script    │
│                      │
│   images/            │
│   ├── logo.webp      │
│   └── favicon.webp   │
└──────────────────────┘

CAMADAS:
┌────────────────────────────────────────────────────────────┐
│  APRESENTAÇÃO: HTML + CSS + JavaScript (Client-side)      │
├────────────────────────────────────────────────────────────┤
│  PROCESSAMENTO: Formulário → Validação → Geração HTML     │
├────────────────────────────────────────────────────────────┤
│  INTEGRAÇÃO: GitHub REST API v3                           │
├────────────────────────────────────────────────────────────┤
│  VERSIONAMENTO: Git (controle de versão)                  │
├────────────────────────────────────────────────────────────┤
│  HOSPEDAGEM: GitHub Pages + Jekyll + CDN                  │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 DECISÕES DE DESIGN & FLUXO

### Por que Client-Side?

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA CLIENT-SIDE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ VANTAGENS:                                                  │
│  • Zero custo de servidor                                       │
│  • Zero manutenção de backend                                   │
│  • Escalabilidade infinita (GitHub CDN)                         │
│  • Segurança (GitHub gerencia)                                  │
│  • Deploy instantâneo (commit → online)                         │
│  • Versionamento nativo (Git)                                   │
│  • Backup automático (Git history)                              │
│  • SSL/HTTPS grátis                                             │
│                                                                  │
│  ⚠️ LIMITAÇÕES:                                                 │
│  • Processamento no navegador do usuário                        │
│  • Token GitHub precisa ser gerenciado                          │
│  • Não tem banco de dados tradicional                           │
│  • Edição de posts requer re-publicação                         │
│                                                                  │
│  💡 IDEAL PARA:                                                 │
│  • Blogs corporativos                                           │
│  • Sites de conteúdo                                            │
│  • Documentação                                                 │
│  • Portfolios                                                   │
│  • Landing pages                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de Decisão: Preview vs Publicar

```
                    USUÁRIO PREENCHE FORMULÁRIO
                              │
                              ▼
                    ┌─────────────────────┐
                    │   Clica em botão?   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                                 │
              ▼                                 ▼
    ┌──────────────────┐            ┌──────────────────┐
    │  👁️ PREVIEW      │            │  🚀 PUBLICAR     │
    └──────────────────┘            └──────────────────┘
              │                                 │
              ▼                                 ▼
    ┌──────────────────┐            ┌──────────────────┐
    │  openPreview()   │            │  handleSubmit()  │
    │                  │            │                  │
    │  1. Coleta dados │            │  1. Valida tudo  │
    │  2. Gera HTML    │            │  2. Gera HTML    │
    │  3. Abre aba     │            │  3. Encode Base64│
    │  4. Mostra       │            │  4. GitHub API   │
    │                  │            │  5. Aguarda      │
    │  ❌ NÃO salva   │            │  ✅ SALVA        │
    │  ❌ NÃO publica │            │  ✅ PUBLICA      │
    └──────────────────┘            └──────────────────┘
              │                                 │
              ▼                                 ▼
    ┌──────────────────┐            ┌──────────────────┐
    │  Usuário revisa  │            │  Post no GitHub  │
    │  Pode fechar     │            │  Online em 1-3min│
    │  Fazer ajustes   │            │  URL permanente  │
    └──────────────────┘            └──────────────────┘
```

---

## 🔐 SEGURANÇA & SANITIZAÇÃO

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE SEGURANÇA                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │   1. INPUT VALIDATION         │
            │   - Campos obrigatórios       │
            │   - Formato de URLs           │
            │   - Tamanho de campos         │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   2. URL SANITIZATION         │
            │   sanitizeUrl()               │
            │                               │
            │   Bloqueia:                   │
            │   - javascript:               │
            │   - data:                     │
            │   - vbscript:                 │
            │   - file:                     │
            │   - about:                    │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   3. HTML SANITIZATION        │
            │   sanitizeHtmlContent()       │
            │                               │
            │   Remove:                     │
            │   - <script> tags             │
            │   - on* attributes            │
            │   - javascript: refs          │
            │   - data:text/html            │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   4. STRING ESCAPING          │
            │   escapeHtml()                │
            │                               │
            │   Converte:                   │
            │   - < → &lt;                  │
            │   - > → &gt;                  │
            │   - & → &amp;                 │
            │   - " → &quot;                │
            │   - ' → &#039;                │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   5. TOKEN SECURITY           │
            │                               │
            │   - Nunca comitar no código   │
            │   - localStorage temporário   │
            │   - HTTPS obrigatório         │
            │   - Scope mínimo necessário   │
            └───────────┬───────────────────┘
                        │
                        ▼
            ┌───────────────────────────────┐
            │   ✅ HTML SEGURO              │
            │   Pronto para publicação      │
            └───────────────────────────────┘
```

---

## 📱 RESPONSIVIDADE

```
┌─────────────────────────────────────────────────────────────────┐
│                    BREAKPOINTS DO SISTEMA                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🖥️  DESKTOP (> 1200px)                                         │
│  ├─ Container: 900px max-width                                  │
│  ├─ Grid posts: 3 colunas                                       │
│  ├─ Imagens: Full/Left/Left                                     │
│  └─ Header: Logo + Nav horizontal                               │
│                                                                  │
│  💻  TABLET (768px - 1200px)                                    │
│  ├─ Container: 100% com padding                                 │
│  ├─ Grid posts: 2 colunas                                       │
│  ├─ Imagens: Full/Left/Left                                     │
│  └─ Header: Logo + Nav horizontal                               │
│                                                                  │
│  📱  MOBILE (< 768px)                                           │
│  ├─ Container: 100% com padding reduzido                        │
│  ├─ Grid posts: 1 coluna                                        │
│  ├─ Imagens: TODAS full width                                   │
│  └─ Header: Logo + Nav vertical                                 │
│                                                                  │
│  📱  SMALL MOBILE (< 480px)                                     │
│  ├─ Fontes reduzidas                                            │
│  ├─ Padding mínimo                                              │
│  ├─ Imagens: full width                                         │
│  └─ Header: compact                                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

TRANSFORMAÇÕES MOBILE:

Desktop (> 768px):
┌────────────────────────────────────┐
│  ┌──────┐  NAV LINK  NAV LINK     │
│  │ LOGO │                          │
│  └──────┘                          │
└────────────────────────────────────┘

Mobile (< 768px):
┌────────────────────────────────────┐
│         ┌──────┐                   │
│         │ LOGO │                   │
│         └──────┘                   │
│      NAV LINK  NAV LINK            │
└────────────────────────────────────┘

Imagens Desktop:
┌──────────────────────────────────┐
│  [FULL WIDTH IMAGE]              │
└──────────────────────────────────┘
  
  [LEFT]     Text flows
  IMAGE      around the
             image here

Imagens Mobile:
┌──────────────────────────────────┐
│  [FULL WIDTH IMAGE]              │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  [FULL WIDTH IMAGE]              │
└──────────────────────────────────┘

Text below image
```

---

**Criado por:** MediaGrowth Development Team  
**Data:** 22 de fevereiro de 2026  
**Arquivo:** FLUXOGRAMA-SISTEMA.md

