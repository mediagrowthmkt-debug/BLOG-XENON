# 🚀 GUIA RÁPIDO: REPLICAR BLOG PARA NOVO CLIENTE

**Tempo estimado:** 30-45 minutos  
**Dificuldade:** ⭐⭐☆☆☆ (Intermediário)  
**Versão:** 4.0 (Upload Imediato)

> 📤 **v4.0:** Sistema de upload IMEDIATO de imagens para GitHub!  
> Imagens são enviadas ao selecionar, não no momento da publicação.  
> Veja o guia completo em: **[UPLOAD-IMAGENS-GUIDE.md](UPLOAD-IMAGENS-GUIDE.md)**

---

## ⚠️ AVISOS IMPORTANTES - LEIA ANTES DE COMEÇAR!

### 🔴 PROBLEMAS CONHECIDOS
Antes de iniciar a implementação, **LEIA OBRIGATORIAMENTE**:
📋 **[PROBLEMAS-CONHECIDOS-SOLUCOES.md](PROBLEMAS-CONHECIDOS-SOLUCOES.md)**

### ⚡ PONTOS CRÍTICOS MAIS COMUNS

| Problema | Causa | Solução Rápida |
|----------|-------|----------------|
| Upload não funciona | Nome do repo errado | Verificar `IMAGE_REPO_NAME` em `github-image-uploader.js` |
| Erro "sanitizeUrl not defined" | Função não global | Mover para FORA do `DOMContentLoaded` em `form-script.js` |
| Layout sem margens | CSS inline ausente | Garantir `.blog-post { max-width: 800px; margin: 0 auto; }` |
| Logo não aparece | Pasta `assets/images/` vazia | Commitar logo.webp na pasta correta |
| Links não aparecem | `generateLinksHtml()` ausente | Verificar função em `form-script.js` |
| Posts não listam | `posts/index.html` com XSS | Usar DOM API, não innerHTML direto |

### 📦 ARQUIVOS OBRIGATÓRIOS DO REPOSITÓRIO

```
✅ scripts/github-image-uploader.js   ← Upload v4.0
✅ assets/js/form-script.js           ← Lógica do formulário
✅ assets/css/blog-post.css           ← Estilos do post
✅ assets/images/logo-*.webp          ← Logo do cliente
✅ postin.html                         ← Formulário de criação
✅ posts/index.html                   ← Lista de posts
```

---

## ✅ CHECKLIST COMPLETO

### FASE 1: PREPARAÇÃO (5 min)

- [ ] Cliente tem conta no GitHub? (Se não, criar)
- [ ] Gerar Personal Access Token do GitHub (scope: `repo`)
- [ ] **[NOVO]** Configurar token para upload de imagens
- [ ] Anotar: Token, Nome do repositório desejado
- [ ] Ter logo do cliente em .webp ou .png
- [ ] Ter cores da marca do cliente (código hex)

---

### FASE 2: CRIAR REPOSITÓRIO (3 min)

#### **Opção A: Fork Direto (Recomendado)**

1. Acesse: https://github.com/mediagrowthmkt-debug/blog-template-md
2. Clique em **"Fork"**
3. Selecione a conta do cliente
4. Renomeie para: `blog-[nome-cliente]`
5. Deixe público ou privado (GitHub Pages funciona em ambos)
6. Clique em **"Create fork"**

#### **Opção B: Clone Manual**

```bash
# Clone o template
git clone https://github.com/mediagrowthmkt-debug/blog-template-md.git blog-cliente

# Entre na pasta
cd blog-cliente

# Configure novo remote
git remote set-url origin https://github.com/[cliente]/blog-cliente.git

# Push inicial
git push -u origin main
```

---

### FASE 3: ATIVAR GITHUB PAGES (2 min)

1. Vá em: **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `/ (root)`
4. Clique em **"Save"**
5. ✅ Aguarde 1-2 minutos
6. URL disponível em: `https://[usuario].github.io/[repositorio]/`

---

### FASE 4: PERSONALIZAÇÃO VISUAL (15 min)

#### **4.1. Logo e Favicon**

```bash
# Navegue até a pasta de imagens
cd assets/images/

# Substitua os arquivos (mantenha os mesmos nomes)
# - logo-mediagrowth.webp → Logo do cliente
# - faviconmd.webp → Favicon do cliente

# Dicas:
# - Logo: 200-400px de largura, fundo transparente
# - Favicon: 64x64px ou 128x128px
```

#### **4.2. Cores da Marca**

Edite: `assets/css/blog-post.css`

```css
/* BUSQUE E SUBSTITUA: #EB7A3D por [COR DO CLIENTE] */

/* Principais locais: */

/* Linha 80 - Badge de categoria */
.category-badge {
    background: #EB7A3D; /* ← MUDE AQUI */
}

/* Linha 145 - Hover do autor */
.author-name:hover {
    color: #EB7A3D; /* ← MUDE AQUI */
}

/* Linha 280 - Links no conteúdo */
.post-content a {
    color: #EB7A3D; /* ← MUDE AQUI */
}

/* Linha 95 - Footer love */
.footer-love {
    color: #EB7A3D; /* ← MUDE AQUI */
}

/* Linha 120 - Header nav hover */
.header-nav a:hover {
    color: #EB7A3D; /* ← MUDE AQUI */
}
```

Edite: `assets/css/blog-index.css`

```css
/* Linha 150 */
.post-card:hover {
    border-color: #EB7A3D; /* ← MUDE AQUI */
}

/* Linha 230 */
.category-badge {
    background: #EB7A3D; /* ← MUDE AQUI */
}
```

**Dica:** Use Find & Replace (Ctrl+H) para trocar todas de uma vez!

#### **4.3. Textos e Links**

Edite: `index.html`

```html
<!-- Linha 15-20 -->
<div class="blog-hero">
    <img src="assets/images/logo-mediagrowth.webp" alt="[NOME DO CLIENTE]" class="hero-logo">
    <h1>Blog da [NOME DO CLIENTE]</h1>
    <p>[SLOGAN/DESCRIÇÃO DO BLOG DO CLIENTE]</p>
</div>
```

Edite: `assets/js/form-script.js`

**Navegação (2 lugares):**

```javascript
// Linha 1162 (função generateFullPreviewPage)
<nav class="header-nav">
    <a href="https://[SITE-CLIENTE].com.br">Site Oficial</a>
    <a href="https://[BLOG-CLIENTE].com.br">Ver Todos os Blogs</a>
</nav>

// Linha 2143 (função generatePostHtml) - MESMA MUDANÇA
```

**Footer (2 lugares):**

```javascript
// Linha 1320 (função generateFullPreviewPage)
<footer class="site-footer">
    <div class="footer-container">
        <img src="../assets/images/logo-mediagrowth.webp" alt="[NOME CLIENTE]" class="footer-logo">
        <p class="footer-tagline">Blog desenvolvido pela [NOME CLIENTE]</p>
        <p class="footer-subtitle">Feito com <span class="footer-love">♥</span> e tecnologia</p>
        <p class="footer-copyright">© ${new Date().getFullYear()} [NOME CLIENTE]</p>
    </div>
</footer>

// Linha 2224 (função generatePostHtml) - MESMA MUDANÇA
```

---

### FASE 5: CONFIGURAR UPLOAD DE IMAGENS v4.0 (5 min) 📤

> **IMPORTANTE:** Sistema de upload IMEDIATO - imagens vão para GitHub ao selecionar!

#### **5.0. ⚠️ VERIFICAÇÃO CRÍTICA ANTES DE COMEÇAR**

**VERIFIQUE O NOME DO REPOSITÓRIO no arquivo `scripts/github-image-uploader.js`:**

```javascript
// LINHA ~31 - DEVE SER O MESMO NOME DO REPOSITÓRIO DO BLOG!
const IMAGE_REPO_NAME = 'NOME-DO-REPO-DO-CLIENTE';
```

**❌ ERRO COMUM:** Deixar `blog-images` quando o repo é outro nome!

**Exemplo:**
- Se o repo do cliente é: `mediagrowthmkt-debug/BLOG-XENON`
- Então deve ser: `const IMAGE_REPO_NAME = 'BLOG-XENON';`

#### **5.1. Gerar Token para o Cliente**

1. Cliente acessa: https://github.com/settings/tokens
2. **"Generate new token (classic)"**
3. Configure:
   ```
   Note: Blog Image Uploader
   Expiration: No expiration
   Scopes: ✅ repo (marcar tudo)
   ```
4. **COPIAR O TOKEN** (só aparece uma vez!)

#### **5.2. Configurar no Navegador do Cliente**

1. Cliente abre: `https://[usuario].github.io/[repositorio]/postin.html`
2. Pressiona **F12** (Console)
3. Executa:
   ```javascript
   localStorage.setItem('github_token', 'ghp_XXXXXXXXXXXXX');
   location.reload();
   ```

#### **5.3. Testar Sistema (v4.0)**

⚠️ **IMPORTANTE:** Preencher TÍTULO do post ANTES de fazer upload das imagens!

- [ ] Cliente preenche o **TÍTULO** do post (slug é gerado automaticamente)
- [ ] Cliente clica em **"📤 UPLOAD IMAGEM"**
- [ ] Seleciona uma imagem do computador
- [ ] Aguarda mensagem: **"Capa enviada!"** (verde)
- [ ] URL do GitHub preenchida automaticamente
- [ ] **Verifica no repositório** se a imagem está em `posts/{slug}/cover.jpg`

**Estrutura de Pastas (v4.0):**
```
posts/
└── {slug-do-post}/
    ├── avatar.jpg    ← Cada post tem seu avatar
    ├── cover.jpg     ← Imagem de capa
    └── image-{n}.jpg ← Imagens internas
```

**⚠️ Atenção:** As imagens ficam NO MESMO REPOSITÓRIO do blog (não em repo separado)!

📖 **Guia completo:** [UPLOAD-IMAGENS-GUIDE.md](UPLOAD-IMAGENS-GUIDE.md)

---

### FASE 6: COMMIT DAS MUDANÇAS (2 min)

```bash
# Adicione todas as alterações
git add -A

# Commit descritivo
git commit -m "feat: Personalização para cliente [NOME]

- Logo e favicon atualizados
- Cores da marca aplicadas (#HEXCODE)
- Textos e links personalizados
- Footer com informações do cliente
- Sistema de upload de imagens configurado"

# Push para o GitHub
git push origin main
```

---

### FASE 7: CONFIGURAR DOMÍNIO CUSTOMIZADO (Opcional - 10 min)

#### **7.1. No Repositório**

Crie arquivo `CNAME` na raiz:

```
blog.cliente.com.br
```

Commit:
```bash
echo "blog.cliente.com.br" > CNAME
git add CNAME
git commit -m "feat: Add custom domain"
git push origin main
```

#### **6.2. No Provedor DNS do Cliente**

Adicione registro CNAME:

```
Tipo: CNAME
Nome: blog
Valor: [usuario-github].github.io.
TTL: 3600
```

**Exemplos por provedor:**

**Registro.br:**
- Entrada: `blog`
- Tipo: `CNAME`
- Dados: `[usuario].github.io`

**Cloudflare:**
- Type: `CNAME`
- Name: `blog`
- Target: `[usuario].github.io`
- Proxy status: DNS only (nuvem cinza)

#### **6.3. Ativar HTTPS**

1. Aguarde 10-30 minutos para DNS propagar
2. GitHub → Settings → Pages
3. Marque: ✅ **"Enforce HTTPS"**

---

### FASE 7: TESTE COMPLETO (5 min)

#### **Checklist de Testes:**

```
VISUAL:
- [ ] Logo aparece corretamente no header
- [ ] Logo aparece corretamente no footer
- [ ] Cores da marca aplicadas (links, badges, hover)
- [ ] Textos personalizados (footer, hero)

FUNCIONAL:
- [ ] Acessar index.html - carrega OK
- [ ] Acessar postin.html - formulário carrega
- [ ] Criar post de teste
- [ ] Gerar preview - abre em nova aba
- [ ] Verificar preview:
    - [ ] Header com logo
    - [ ] Footer com logo
    - [ ] Imagens carregam
    - [ ] Layout responsivo
- [ ] Publicar post de teste
- [ ] Verificar post publicado
- [ ] Posts relacionados aparecem
- [ ] Links de navegação funcionam

MOBILE:
- [ ] Abrir no celular
- [ ] Menu responsivo OK
- [ ] Imagens adaptam
- [ ] Formulário usável
```

---

### FASE 8: DOCUMENTAÇÃO PARA CLIENTE (5 min)

Crie arquivo: `MANUAL-[CLIENTE].md`

```markdown
# 📘 Manual de Uso - Blog [Nome do Cliente]

## 🎯 Links Importantes

- **Blog:** https://blog.cliente.com.br
- **Criar Post:** https://blog.cliente.com.br/postin.html
- **GitHub:** https://github.com/[usuario]/[repositorio]

## 🔑 Dados de Acesso

**GitHub Token:** `ghp_xxxxxxxxxxxxxxxxxx`  
**Repositório:** `[usuario]/[repositorio]`  
**Branch:** `main`

⚠️ **GUARDE ESTE TOKEN COM SEGURANÇA!**

## ✍️ Como Criar um Post

### Passo 1: Acessar Interface
Abra: https://blog.cliente.com.br/postin.html

### Passo 2: Preencher Formulário

**Informações Básicas:**
- Título H1: Título principal do post
- Introdução: Primeiro parágrafo (destaque)
- Categoria: Ex: Dicas, Notícias, Tutoriais
- Autor: Seu nome
- Avatar: URL da sua foto
- Tempo de Leitura: Ex: 5 (minutos)

**Imagem de Capa:**
- URL: Link da imagem principal
- ALT: Descrição da imagem
- Legenda: (opcional)

**Imagens Internas (até 3):**
- Adicione até 3 imagens que aparecerão ao longo do texto
- Sistema distribui automaticamente

**Conteúdo:**
- Escreva o texto principal
- Use ## para subtítulos
- Use ### para seções
- Listas com - ou 1.

**Conclusão:**
- Parágrafo final do post

**Lead Capture (opcional):**
- Marque campos que deseja coletar
- Configure webhook se tiver

**SEO:**
- Meta Title: Título para Google (60 chars)
- Meta Description: Resumo (160 chars)
- Keywords: palavras, separadas, por, vírgula
- Tags: #tag1 #tag2 #tag3

**GitHub:**
- Cole o token fornecido
- Repositório e branch já estão preenchidos

### Passo 3: Visualizar Preview
1. Clique em "👁️ Visualizar Preview"
2. Nova aba abre com o post
3. Revise tudo com atenção

### Passo 4: Publicar
1. Volte para aba do formulário
2. Clique em "🚀 Publicar Post"
3. Aguarde mensagem de sucesso
4. Post estará online em 1-3 minutos

## 🖼️ Como Usar Imagens

### Google Drive (Recomendado)

1. Faça upload da imagem no Google Drive
2. Clique com botão direito → "Compartilhar"
3. Mude para: "Qualquer pessoa com o link"
4. Copie o link
5. Cole no campo URL da imagem
6. Sistema converte automaticamente!

### Links Diretos

Use URLs de imagens hospedadas:
- Imgur
- Cloudinary
- Servidor próprio
- Qualquer URL pública

**Formato:** `https://exemplo.com/imagem.jpg`

## 📝 Dicas de Conteúdo

✅ **BOM:**
- Títulos claros e objetivos
- Parágrafos curtos (3-4 linhas)
- Use subtítulos (##, ###)
- Adicione listas quando possível
- 3 imagens bem distribuídas
- Conclusão que engaja

❌ **EVITE:**
- Blocos de texto muito longos
- Imagens muito pesadas (+ 2MB)
- Muitas tags (máx 5-6)
- Títulos genéricos

## ⚙️ Editar Post Existente

1. Abra postin.html
2. Preencha formulário com MESMO TÍTULO H1
3. Faça as alterações
4. Publique novamente
5. Arquivo será sobrescrito

## 🗑️ Deletar Post

**Via GitHub:**
1. Acesse: github.com/[usuario]/[repositorio]/tree/main/posts
2. Clique no arquivo
3. Clique no ícone de lixeira
4. Confirme

## 🆘 Problemas Comuns

**Post não publica:**
- Verifique token GitHub
- Verifique conexão com internet
- Tente novamente em 1 minuto

**Imagens não aparecem:**
- Verifique se URL está correta
- Para Google Drive: arquivo deve ser "Qualquer um com link"
- Teste URL no navegador primeiro

**Preview não abre:**
- Verifique se navegador está bloqueando popups
- Permita popups do site
- Tente outro navegador

## 📞 Suporte

**Desenvolvimento:** MediaGrowth  
**Email:** contato@mediagrowth.com.br  
**Telefone:** (00) 0000-0000

**Criado em:** [DATA]
```

Salve e commit:
```bash
git add MANUAL-[CLIENTE].md
git commit -m "docs: Add client manual"
git push origin main
```

---

### FASE 9: TREINAMENTO DO CLIENTE (30 min)

#### **Agenda da Reunião:**

**1. Apresentação (5 min)**
- Mostrar blog publicado
- Explicar conceito GitHub Pages
- Mostrar estrutura de pastas

**2. Demonstração Prática (15 min)**
- Acessar postin.html
- Preencher formulário completo
- Explicar cada seção
- Mostrar preview
- Publicar post de exemplo
- Aguardar aparecer online
- Mostrar como fica na listagem

**3. Hands-on (10 min)**
- Cliente cria post sozinho com sua supervisão
- Você ajuda onde necessário
- Cliente publica

**4. Dúvidas e Reforço (5 min)**
- Revisar pontos principais
- Entregar manual
- Mostrar onde buscar ajuda

---

## 📋 TEMPLATE DE ENTREGA

### Email para o Cliente

```
Assunto: ✅ Blog [Nome Cliente] - Configurado e Pronto!

Olá [Nome do Cliente],

Seu blog está online e pronto para uso! 🎉

🔗 **LINKS IMPORTANTES:**

Blog Principal: https://blog.cliente.com.br
Criar Novo Post: https://blog.cliente.com.br/postin.html
GitHub (backup): https://github.com/[usuario]/[repositorio]

🔑 **DADOS DE ACESSO:**

GitHub Token: [TOKEN]
(⚠️ Guarde em local seguro!)

📚 **DOCUMENTAÇÃO:**

Em anexo você encontra:
- Manual completo de uso (PDF)
- Guia rápido de criação de posts
- Dicas de SEO e conteúdo

🎓 **PRÓXIMOS PASSOS:**

1. Acesse o link "Criar Novo Post"
2. Preencha o formulário com seu primeiro post real
3. Clique em "Visualizar Preview" para revisar
4. Clique em "Publicar Post" quando estiver pronto
5. Post estará online em 1-3 minutos!

📞 **SUPORTE:**

Qualquer dúvida, estamos à disposição:
- Email: contato@mediagrowth.com.br
- Telefone: (00) 0000-0000
- WhatsApp: (00) 00000-0000

Sucesso com seu blog! 🚀

---
MediaGrowth - Crescimento Inteligente
https://mediagrowth.com.br
```

---

## 🎯 RESUMO VISUAL

```
┌────────────────────────────────────────────────┐
│  TEMPO TOTAL: 30-45 MINUTOS                   │
├────────────────────────────────────────────────┤
│  1. Preparação          →  5 min              │
│  2. Criar Repo          →  3 min              │
│  3. Ativar Pages        →  2 min              │
│  4. Personalizar        → 15 min              │
│  5. Commit              →  2 min              │
│  6. Domínio (opcional)  → 10 min              │
│  7. Testar             →  5 min              │
│  8. Documentar         →  5 min              │
│  9. Treinar            → 30 min (separado)    │
└────────────────────────────────────────────────┘
```

---

## ✨ DICAS PROFISSIONAIS

### Performance

✅ **Imagens:**
- Comprima antes de usar (TinyPNG, Squoosh)
- Use WebP quando possível
- Tamanho ideal: 100-300KB por imagem

✅ **SEO:**
- Sempre preencha meta description
- Use keywords relevantes
- Canonical URL sempre completa
- ALT text em todas as imagens

✅ **UX:**
- Títulos claros e objetivos
- Parágrafos curtos
- Use listas e bullet points
- Teste em mobile

### Manutenção

🔄 **Mensal:**
- Revisar posts antigos
- Atualizar links quebrados
- Verificar imagens carregando

🔄 **Trimestral:**
- Atualizar cores se marca mudar
- Revisar métricas de acesso
- Backup do repositório

🔄 **Anual:**
- Redesign se necessário
- Atualizar documentação
- Revisar estratégia de conteúdo

---

## 🎓 RECURSOS ADICIONAIS

### Links Úteis

- [Documentação Completa](DOCUMENTACAO-COMPLETA.md)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [SEO Checklist](https://moz.com/learn/seo/on-page-factors)

### Ferramentas Recomendadas

- **Imagens:** Canva, Unsplash, Pexels
- **Compressão:** TinyPNG, Squoosh
- **SEO:** Google Search Console, Ubersuggest
- **Analytics:** Google Analytics, Plausible

---

**Criado por:** MediaGrowth Development Team  
**Data:** 22 de fevereiro de 2026  
**Versão:** 1.0

**Dúvidas?** contato@mediagrowth.com.br

