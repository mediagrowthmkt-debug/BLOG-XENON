# ⚠️ PROBLEMAS CONHECIDOS E SOLUÇÕES

**Versão:** 4.0  
**Última atualização:** Março 2026  
**Baseado em:** Implementação Motel Xenon

> 📋 Este documento lista todos os problemas encontrados durante a implementação do blog Motel Xenon e suas soluções definitivas. **LEIA ANTES DE REPLICAR PARA NOVO CLIENTE!**

---

## 📑 ÍNDICE

1. [Upload de Imagens](#1-upload-de-imagens)
2. [Preview do Blog](#2-preview-do-blog)
3. [Layout da Página Publicada](#3-layout-da-página-publicada)
4. [Logo no Header e Footer](#4-logo-no-header-e-footer)
5. [Links do Bloco 5](#5-links-do-bloco-5)
6. [Segurança XSS](#6-segurança-xss)
7. [Git e GitHub](#7-git-e-github)
8. [Conflitos de Código](#8-conflitos-de-código)

---

## 1. UPLOAD DE IMAGENS

### ❌ Problema 1.1: "path contains a malformed path component"

**Sintoma:**
```
Error: Erro no upload: path contains a malformed path component
Path do arquivo: posts//slug-do-post/avatar.jpg
```

**Causa:** O slug começa com `/` (barra), criando um path com `//` duplo.

**Solução:** Corrigir a função `getCurrentSlug()` em `scripts/github-image-uploader.js`:

```javascript
function getCurrentSlug() {
    var slugInput = document.getElementById('slug');
    var slug = slugInput ? slugInput.value.trim() : '';
    
    // ✅ CORREÇÃO: Remove barra inicial se existir
    if (slug.startsWith('/')) {
        slug = slug.substring(1);
    }
    
    // ... resto do código ...
    
    // ✅ CORREÇÃO: Garante que não há barras no início ou duplicadas
    slug = slug.replace(/^\/+/, '').replace(/\/+/g, '/');
    
    return slug || 'post';
}
```

---

### ❌ Problema 1.2: Repositório de imagens errado

**Sintoma:** Imagens são enviadas para `blog-images` mas deveriam ir para o repositório do blog.

**Causa:** Variável `IMAGE_REPO_NAME` configurada incorretamente.

**Solução:** Em `scripts/github-image-uploader.js`, altere:

```javascript
// ❌ ERRADO
var IMAGE_REPO_NAME = 'blog-images';

// ✅ CORRETO - use o MESMO nome do repositório do blog
var IMAGE_REPO_NAME = 'BLOG-XENON'; // ou 'blog-nome-cliente'
```

---

### ❌ Problema 1.3: Upload "volta para o início" sem fazer nada

**Sintoma:** Ao clicar no botão de upload e selecionar imagem, nada acontece ou volta para a tela de seleção.

**Causas possíveis:**
1. Event listeners duplicados
2. Função `handleAvatarUpload`/`handleCoverUpload` sendo sobrescrita

**Solução:** Verificar se há função `setupImageUploadHandlers()` DUPLICADA em `form-script.js`. Se houver, renomeie para `setupLegacyImageUploadHandlers()`:

```javascript
// Em form-script.js
// ❌ ERRADO - conflita com github-image-uploader.js
function setupImageUploadHandlers() { ... }

// ✅ CORRETO - nome diferente para evitar conflito
function setupLegacyImageUploadHandlers() { ... }
```

---

## 2. PREVIEW DO BLOG

### ❌ Problema 2.1: "sanitizeUrl is not defined"

**Sintoma:**
```
Uncaught ReferenceError: sanitizeUrl is not defined
at generateFullPreviewPage (form-script.js:1083:37)
```

**Causa:** Função `sanitizeUrl` definida DENTRO de `generatePostHtml()` mas usada em `generateFullPreviewPage()`.

**Solução:** Mover para o ESCOPO GLOBAL no início de `form-script.js`:

```javascript
// ✅ ADICIONAR NO INÍCIO DO ARQUIVO (após variáveis globais)

/**
 * Sanitiza URLs para prevenir JavaScript injection
 */
function sanitizeUrl(url) {
    if (!url) return '';
    const urlStr = String(url).trim();
    const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
    if (dangerousProtocols.test(urlStr)) return '';
    return urlStr;
}

/**
 * Sanitiza conteúdo HTML removendo scripts maliciosos
 */
function sanitizeHtmlContent(html) {
    if (!html) return '';
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/data:text\/html/gi, '');
}
```

E REMOVER as definições duplicadas de dentro das funções.

---

## 3. LAYOUT DA PÁGINA PUBLICADA

### ❌ Problema 3.1: Post publicado sem margens laterais (largura 100%)

**Sintoma:** O preview tem layout correto com margens, mas o post publicado fica em largura total.

**Causa:** O CSS externo (`../assets/css/blog-post.css`) não está carregando ou os estilos essenciais não estão inline.

**Solução:** Adicionar TODOS os estilos essenciais INLINE no HTML gerado em `generatePostHtml()`:

```javascript
// Em form-script.js, dentro do <style> do generatePostHtml()
// ✅ ADICIONAR ESTES ESTILOS ESSENCIAIS:

/* RESET & BASE */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    line-height: 1.7;
}

/* ✅ CONTAINER PRINCIPAL - ESSENCIAL! */
.blog-post {
    max-width: 900px;
    margin: 60px auto;
    padding: 0 30px;
}

/* POST HEADER */
.post-header { margin-bottom: 50px; }
.post-title { font-size: 2.8rem; line-height: 1.2; color: #ffffff; }

/* CONTENT */
.post-intro, .post-content, .post-conclusion {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
}

/* ... incluir TODOS os estilos necessários ... */

/* RESPONSIVO */
@media (max-width: 768px) {
    .blog-post {
        padding: 0 20px;
        margin: 40px auto;
    }
    .post-title { font-size: 2rem; }
}
```

**Lista de classes que DEVEM estar nos estilos inline:**
- `.blog-post` (container principal)
- `.post-header`, `.post-title`, `.post-meta`
- `.author-info`, `.author-avatar`, `.author-name`
- `.post-cover`, `.post-intro`, `.post-content`, `.post-conclusion`
- `.post-footer`, `.tags`, `.tag`
- `.site-header`, `.header-container`, `.header-logo`, `.header-nav`
- `.site-footer`, `.footer-container`, `.footer-logo`
- `.related-posts`, `.related-grid`
- `.back-to-top`

---

## 4. LOGO NO HEADER E FOOTER

### ❌ Problema 4.1: Logo não aparece no site publicado

**Sintomas:**
- Logo aparece localmente mas não em produção
- Imagem quebrada no header/footer

**Causas possíveis:**

**Causa A:** Pasta `assets/images/` não foi commitada no Git

```bash
# ✅ VERIFICAR
git status assets/images/

# Se aparecer "Untracked files", adicionar:
git add assets/images/
git commit -m "feat: add logo and favicon images"
git push
```

**Causa B:** Campo `siteLogo` vazio no formulário

**Solução:** Definir valor padrão em `postin.html`:

```html
<!-- ✅ ADICIONAR value= com URL padrão -->
<input type="url" 
       id="siteLogo" 
       name="siteLogo" 
       value="https://blogs.DOMINIO-CLIENTE.com.br/assets/images/logo.png"
       placeholder="https://blogs.DOMINIO-CLIENTE.com.br/assets/images/logo.png">
```

**Causa C:** Fallback incorreto no JavaScript

**Solução:** Garantir fallback em `form-script.js`:

```javascript
// ✅ SEMPRE incluir || com URL padrão
<img src="${sanitizeUrl(data.siteLogo) || 'https://blogs.DOMINIO.com.br/assets/images/logo.png'}" 
     alt="Nome do Cliente" 
     class="header-logo">
```

---

## 5. LINKS DO BLOCO 5

### ❌ Problema 5.1: Links internos e externos não aparecem no preview/publicação

**Sintoma:** Links são preenchidos no formulário mas não aparecem no post.

**Causa:** Função `generateLinksHtml()` não existia ou não estava sendo chamada.

**Solução:** Criar a função e chamá-la nos templates:

```javascript
// ✅ ADICIONAR função em form-script.js

function generateLinksHtml(data) {
    const hasInternalLinks = data.internalLinks && data.internalLinks.length > 0;
    const hasExternalLinks = data.externalLinks && data.externalLinks.length > 0;
    
    if (!hasInternalLinks && !hasExternalLinks) {
        return '';
    }
    
    // Detecta idioma
    const isEnglish = /\b(the|and|for|with|your)\b/i.test(data.h1Title || '');
    
    let html = `<section class="post-links" style="margin: 40px 0; padding: 30px; background: rgba(255,255,255,0.02); border-radius: 12px;">`;
    
    if (hasInternalLinks) {
        html += `
            <h3>📌 ${isEnglish ? 'Read Also' : 'Leia Também'}</h3>
            <ul>
                ${data.internalLinks.map(link => `
                    <li><a href="${sanitizeUrl(link.url)}">${escapeHtml(link.anchor || link.url)}</a></li>
                `).join('')}
            </ul>`;
    }
    
    if (hasExternalLinks) {
        html += `
            <h3>🔗 ${isEnglish ? 'External Resources' : 'Recursos Externos'}</h3>
            <ul>
                ${data.externalLinks.map(link => `
                    <li><a href="${sanitizeUrl(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.anchor || link.url)}</a></li>
                `).join('')}
            </ul>`;
    }
    
    html += `</section>`;
    return html;
}

// ✅ CHAMAR nos templates (após conclusão, antes do formulário de lead):
${generateLinksHtml(data)}
${generateLeadFormHtml(data)}
```

---

## 6. SEGURANÇA XSS

### ❌ Problema 6.1: Vulnerabilidade XSS em posts/index.html

**Sintoma:** Snyk ou análise de segurança detecta XSS vulnerability.

**Causa:** Uso de `innerHTML` com dados não sanitizados.

**Solução:** Usar DOM API ao invés de innerHTML:

```javascript
// ❌ VULNERÁVEL
card.innerHTML = `<h2>${post.title}</h2>`;

// ✅ SEGURO - usar DOM API
function createPostCardElement(post) {
    const card = document.createElement('article');
    card.className = 'post-card';
    
    const title = document.createElement('h2');
    title.className = 'post-title';
    title.textContent = post.title; // textContent é seguro
    
    card.appendChild(title);
    return card;
}
```

---

## 7. GIT E GITHUB

### ❌ Problema 7.1: Push rejeitado

**Sintoma:**
```
! [rejected] main -> main (fetch first)
error: failed to push some refs
```

**Solução:**
```bash
# Opção A: Pull e merge
git pull --rebase
git push

# Opção B: Force push (CUIDADO - sobrescreve remoto)
git push --force
```

### ❌ Problema 7.2: Remote apontando para repositório errado

**Verificar:**
```bash
git remote -v
```

**Corrigir:**
```bash
git remote set-url origin https://github.com/USUARIO/NOME-CORRETO.git
```

---

## 8. CONFLITOS DE CÓDIGO

### ❌ Problema 8.1: Funções duplicadas

**Sintoma:** Funcionalidade não funciona ou comportamento inesperado.

**Verificar:** Buscar por funções com mesmo nome em arquivos diferentes:

```bash
grep -r "function setupImageUploadHandlers" --include="*.js"
```

**Se encontrar duplicatas:** Renomear uma delas ou remover a que não é usada.

### ❌ Problema 8.2: Versão do cache

**Sintoma:** Alterações não aparecem no navegador.

**Solução:** Incrementar versão nos scripts:

```html
<!-- Antes -->
<script src="form-script.js?v=4001"></script>

<!-- Depois de alterações -->
<script src="form-script.js?v=4002"></script>
```

**Dica:** Sempre fazer hard refresh (Cmd+Shift+R / Ctrl+Shift+R) após alterações.

---

## ✅ CHECKLIST PRÉ-DEPLOY

Antes de considerar a implementação completa, verificar:

- [ ] `assets/images/` está commitado no Git
- [ ] Logo aparece no header e footer
- [ ] Upload de avatar funciona
- [ ] Upload de capa funciona
- [ ] Preview abre corretamente
- [ ] Preview tem layout com margens
- [ ] Post publicado tem layout idêntico ao preview
- [ ] Links do Bloco 5 aparecem no post
- [ ] Formulário de lead aparece (se configurado)
- [ ] Responsivo funciona em mobile
- [ ] GitHub Pages está ativado
- [ ] CNAME configurado (se usar domínio customizado)

---

## 📞 SUPORTE

Se encontrar um problema não listado aqui:

1. Verifique o **Console do navegador** (F12) para erros
2. Verifique os **logs de upload** (emoji coloridos)
3. Documente o problema e a solução neste arquivo
4. Atualize a versão do documento

**Última revisão:** Março 2026 - Implementação Motel Xenon
