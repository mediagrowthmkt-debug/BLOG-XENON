# 📖 Blog Motel Xenon

Sistema de blog completo para o **Motel Xenon**, hospedado no GitHub Pages com integração automatizada.

## 🎯 Sobre

Blog desenvolvido para compartilhar:
- Dicas de romance e experiências
- Novidades sobre suítes e serviços
- Guias e conteúdos relacionados ao universo do Motel Xenon
- Promoções e eventos especiais

## 🌟 Características

- ✅ **100% Estático** - Hospedado gratuitamente no GitHub Pages
- ✅ **Sistema de Criação Intuitivo** - Formulário completo para gerar posts
- ✅ **SEO Otimizado** - Meta tags, Schema.org, Open Graph
- ✅ **Design Dark Theme** - Visual moderno alinhado com a identidade Xenon
- ✅ **Responsivo** - Funciona perfeitamente em todos os dispositivos
- ✅ **Seguro** - Sanitização contra XSS e validações de segurança

## 🚀 Acesso Rápido

- **Home do Blog**: [https://mediagrowthmkt-debug.github.io/BLOG-XENON/](https://mediagrowthmkt-debug.github.io/BLOG-XENON/)
- **Criar Post** (Admin): [/postin.html](https://mediagrowthmkt-debug.github.io/BLOG-XENON/postin.html)

## 📁 Estrutura

```
BLOG XENON/
├── index.html                 # Página principal (lista de posts)
├── postin.html                # Sistema de criação de posts (admin)
│
├── assets/
│   ├── css/
│   │   ├── blog-post.css      # Estilos dos posts
│   │   └── form-style.css     # Estilos do formulário
│   └── js/
│       ├── blog-post.js       # JavaScript dos posts
│       └── form-script.js     # Lógica do formulário
│
├── drafts/                    # Rascunhos (aguardando publicação)
├── posts/                     # Posts publicados
├── templates/                 # Templates base
└── .github/workflows/         # Automações
```

## 🎨 Paleta de Cores Xenon

```css
--primary-color: #d91518;      /* Vermelho Xenon */
--primary-dark: #bd1313;       /* Vermelho escuro */
--neon-red: #ff3366;          /* Neon vermelho */
--bg-dark: #0a0a0a;           /* Fundo escuro */
--bg-section: #1a1a1a;        /* Seção escura */
```

## 📝 Como Criar um Post

1. Acesse `/postin.html`
2. Preencha os campos do formulário:
   - Título, categoria, autor
   - Palavras-chave e SEO
   - Imagens e conteúdo
   - Links e CTAs
3. Clique em **"Gerar Post"**
4. Baixe o arquivo HTML gerado
5. Coloque na pasta `/drafts/` do repositório
6. O GitHub Actions moverá automaticamente para `/posts/`

## 🔧 Configuração GitHub

Para habilitar a publicação automática:

1. Gere um Personal Access Token no GitHub
2. Acesse `/postin.html` → **"⚙️ Configurar GitHub"**
3. Cole o token e salve

## 🛡️ Segurança

- Sanitização de inputs contra XSS
- Validação de URLs
- Escape de HTML em conteúdo dinâmico
- Bloqueio de protocolos perigosos (javascript:, data:)

## 📊 SEO

Cada post inclui automaticamente:
- Meta tags otimizadas
- Open Graph (Facebook)
- Twitter Cards
- Schema.org (Article)
- Sitemap XML

## 🌐 Deploy

O site é atualizado automaticamente via GitHub Pages a cada commit na branch `main`.

## 📞 Contato

**Motel Xenon** - Criciúma/SC  
🌐 [xenonmotel.com.br](https://xenonmotel.com.br)

---

© 2026 Motel Xenon - Todos os direitos reservados
