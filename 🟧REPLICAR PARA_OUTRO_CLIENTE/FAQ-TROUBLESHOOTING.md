# ❓ FAQ & TROUBLESHOOTING COMPLETO

**Sistema de Blog MediaGrowth**  
**Versão:** 2.0  
**Data:** 22 de fevereiro de 2026

---

## 📋 ÍNDICE

1. [Perguntas Frequentes (FAQ)](#perguntas-frequentes)
2. [Problemas Comuns e Soluções](#problemas-comuns)
3. [Erros do GitHub API](#erros-github-api)
4. [Problemas com Imagens](#problemas-com-imagens)
5. [Problemas de Layout](#problemas-de-layout)
6. [Problemas de SEO](#problemas-de-seo)
7. [Como Recuperar de Erros](#recuperação)
8. [Logs e Debugging](#debugging)

---

## ❓ PERGUNTAS FREQUENTES

### Geral

**Q: Este sistema é gratuito?**  
A: Sim! Usa GitHub Pages que é 100% gratuito. Único custo opcional é domínio customizado.

**Q: Preciso saber programar?**  
A: Não! A interface é um formulário visual. Apenas preencha e publique.

**Q: Quantos posts posso criar?**  
A: Ilimitado! GitHub não tem limite de arquivos.

**Q: Posso usar domínio próprio?**  
A: Sim! Configure CNAME e DNS. Veja [Guia de Replicação](GUIA-REPLICACAO-CLIENTE.md).

**Q: É seguro?**  
A: Sim! Todo conteúdo é sanitizado. GitHub gerencia segurança da hospedagem.

**Q: Funciona em mobile?**  
A: Perfeitamente! Design responsivo mobile-first.

**Q: Posso ter múltiplos autores?**  
A: Sim! Cada post pode ter autor diferente. Configure no formulário.

**Q: Como faço backup?**  
A: Git é backup nativo! Cada commit é salvo. Clone o repositório para backup local.

---

### Publicação

**Q: Quanto tempo leva para publicar?**  
A: 1-3 minutos após clicar em "Publicar".

**Q: Por que meu post não aparece imediatamente?**  
A: GitHub Pages precisa fazer build do site. Normal demorar 1-3 minutos.

**Q: Posso agendar publicação?**  
A: Não nativamente. Precisaria usar GitHub Actions (avançado).

**Q: Como publico vários posts de uma vez?**  
A: Publique um por vez através do formulário, ou use API diretamente (avançado).

**Q: Posso editar um post depois de publicado?**  
A: Sim! Preencha formulário com MESMO TÍTULO e publique novamente. Sobrescreve.

**Q: Como deleto um post?**  
A: Via GitHub: vá em posts/, clique no arquivo, delete. Ou via Git local.

---

### Imagens

**Q: Onde hospedar minhas imagens?**  
A: Google Drive (recomendado), Imgur, Cloudinary, ou servidor próprio.

**Q: Tamanho máximo de imagem?**  
A: Recomendado: até 300KB. Máximo técnico: ~10MB (mas não recomendado).

**Q: Posso usar GIFs?**  
A: Sim! Qualquer formato: JPG, PNG, GIF, WebP, SVG.

**Q: Como comprimir imagens?**  
A: Use TinyPNG (tinypng.com) ou Squoosh (squoosh.app).

**Q: Imagens do Google Drive funcionam?**  
A: Sim! Sistema converte automaticamente. Arquivo deve ser "Qualquer um com link".

**Q: Quantas imagens por post?**  
A: 1 capa + até 3 internas = 4 total. Mais pode deixar lento.

---

### Formulário de Leads

**Q: O formulário funciona sem webhook?**  
A: Aparece visualmente, mas não envia dados. Webhook é obrigatório para funcionar.

**Q: Que serviços de webhook posso usar?**  
A: Make.com, Zapier, n8n, Webhooks próprio, Airtable, qualquer que aceite POST.

**Q: Como testo o webhook?**  
A: Use webhook.site para gerar URL de teste e ver dados chegando.

**Q: Formulário aparece em todos os posts?**  
A: Só se marcar pelo menos 1 campo (Nome/Email/Telefone) na criação.

**Q: Como removo formulário de um post?**  
A: Re-publique desmarcando todos os checkboxes de coleta.

---

### SEO

**Q: Os posts são indexados pelo Google?**  
A: Sim! Desde que submeta sitemap no Search Console.

**Q: Como melhorar SEO?**  
A: Preencha TODOS os campos SEO, use keywords relevantes, meta description clara.

**Q: Open Graph funciona no Facebook?**  
A: Sim! Ao compartilhar, puxará imagem e descrição automaticamente.

**Q: Como testo meta tags?**  
A: Use Facebook Debugger ou Twitter Card Validator.

**Q: Canonical URL é obrigatória?**  
A: Recomendada! Evita conteúdo duplicado. Use URL final do post.

---

### GitHub

**Q: Preciso criar conta no GitHub?**  
A: Sim, é onde o blog fica hospedado.

**Q: Conta gratuita funciona?**  
A: Perfeitamente! GitHub Pages é grátis mesmo na conta free.

**Q: Token expira?**  
A: Depende. Pode configurar sem expiração ou com data. Configure nas settings.

**Q: Perdi meu token, e agora?**  
A: Gere novo em github.com/settings/tokens. Token antigo para de funcionar.

**Q: Posso usar GitHub Desktop?**  
A: Sim! Para gerenciar arquivos localmente. Mas não é necessário.

**Q: Repositório privado funciona?**  
A: Sim! GitHub Pages funciona em repos privados também.

---

## 🔧 PROBLEMAS COMUNS E SOLUÇÕES

### 1. Post não publica

**Sintomas:**
```
❌ Erro ao publicar
❌ Failed to fetch
❌ 401 Unauthorized
❌ 404 Not Found
```

**Diagnóstico:**

```javascript
// Abra console do navegador (F12) e rode:
console.log('Token:', localStorage.getItem('githubToken'));
console.log('Repo:', document.getElementById('githubRepo').value);
console.log('Branch:', document.getElementById('githubBranch').value);
```

**Soluções:**

| Erro | Causa Provável | Solução |
|------|---------------|---------|
| 401 Unauthorized | Token inválido | Gere novo token |
| 404 Not Found | Repo não existe | Verifique nome do repo |
| 403 Forbidden | Token sem permissão | Token precisa scope 'repo' |
| Failed to fetch | Internet/CORS | Verifique conexão |

**Fix Passo a Passo:**

```bash
# 1. Verifique se repo existe
https://github.com/[usuario]/[repo]

# 2. Gere novo token
https://github.com/settings/tokens
→ Generate new token (classic)
→ Marcar: repo (full control)
→ Generate token
→ COPIAR token

# 3. Teste no formulário
Cole token → Preencha post → Publique
```

---

### 2. Imagens não carregam

**Sintomas:**
```
🖼️ Quadrado com X (broken image)
🖼️ Alt text aparece mas sem imagem
🖼️ Loading infinito
```

**Diagnóstico:**

```javascript
// Console (F12):
document.querySelectorAll('img').forEach(img => {
    console.log('URL:', img.src, 'Status:', img.complete);
});
```

**Causas e Soluções:**

#### Google Drive

```
❌ ERRADO:
https://drive.google.com/file/d/ABC123/view?usp=sharing

✅ CERTO (sistema converte automaticamente):
https://drive.google.com/uc?export=view&id=ABC123

FIX:
1. Clique direito na imagem no Drive
2. Compartilhar → Qualquer pessoa com o link
3. Copie URL
4. Cole no formulário (sistema converte)
```

#### URLs Diretas

```
❌ PROBLEMAS:
- URL redirecionada (Dropbox, OneDrive)
- Imagem em pasta privada
- URL com autenticação
- Protocolo http:// em site https://

✅ SOLUÇÕES:
- Use URL direta: termina em .jpg, .png, .webp
- Imagem deve ser pública
- Use HTTPS sempre
```

#### Teste de Imagem

```bash
# Cole URL da imagem no navegador
# Deve abrir SOMENTE a imagem, nada mais

✅ CORRETO:
[imagem aparece sozinha]

❌ ERRADO:
[página do Drive/Dropbox com botão de download]
```

---

### 3. Preview não abre

**Sintomas:**
```
🚫 Nada acontece ao clicar
🚫 Aba branca abre e fecha
🚫 "Popup bloqueado"
```

**Soluções:**

```javascript
// 1. POPUP BLOCKER
→ Ícone no canto da URL
→ "Permitir popups deste site"
→ Recarregue página
→ Tente novamente

// 2. JAVASCRIPT DESATIVADO
→ Configurações do navegador
→ Privacidade & Segurança
→ JavaScript: Permitir

// 3. CONSOLE ERRORS
F12 → Console → Veja erros
Copie e envie para suporte
```

**Teste Alternativo:**

```javascript
// Cole no console (F12):
const data = collectFormData();
console.log('Dados:', data);

// Se retornar objeto com dados: formulário OK
// Se retornar null/undefined: campos faltando
```

---

### 4. Formulário de leads não aparece

**Sintomas:**
```
📝 Post não tem formulário
📝 Seção de lead capture sumida
```

**Diagnóstico:**

```javascript
// Verifique no postin.html:
const showForm = 
    document.getElementById('formCollectName').checked ||
    document.getElementById('formCollectEmail').checked ||
    document.getElementById('formCollectPhone').checked;

console.log('Mostrar formulário?', showForm);
```

**Causa:**
- Nenhum checkbox marcado = formulário não aparece
- **ISSO É PROPOSITAL!** Formulário só aparece se configurado.

**Solução:**
```
1. Edite o post (re-preencha formulário)
2. Marque pelo menos 1 checkbox:
   ☑️ Coletar Nome
   ☑️ Coletar Email
   ☑️ Coletar Telefone
3. Preencha webhook URL
4. Publique novamente
```

---

### 5. Posts relacionados não carregam

**Sintomas:**
```
⏳ "Loading..." infinito
⏳ Seção vazia
⏳ Erro no console
```

**Diagnóstico:**

```javascript
// Console (F12) no post:
console.log('Posts folder:', '../posts/');
fetch('../posts/')
    .then(r => r.json())
    .then(files => console.log('Files:', files))
    .catch(e => console.error('Error:', e));
```

**Causas Comuns:**

| Causa | Fix |
|-------|-----|
| Menos de 2 posts | Normal! Precisa de 3+ posts |
| blog-post.js não carrega | Verifique caminho do arquivo |
| Erro CORS local | Teste em servidor (GitHub Pages) |
| Arquivos não .html | Renomeie para .html |

**Solução:**

```bash
# 1. Verifique se posts/ tem arquivos
ls -la posts/

# 2. Deve ter pelo menos 2-3 posts .html
# (além de index.html e README.md)

# 3. Publique mais posts se necessário
```

---

### 6. URLs com .html no final

**Sintomas:**
```
🔗 /posts/my-post.html (errado)
🔗 Deveria ser: /posts/my-post
```

**Causa:**
- Jekyll não configurado
- _config.yml ausente

**Solução:**

```yaml
# Crie/edite _config.yml na raiz:
permalink: /:title

defaults:
  - scope:
      path: "posts"
    values:
      permalink: /posts/:title
```

```bash
# Commit:
git add _config.yml
git commit -m "config: Add Jekyll permalinks"
git push origin main

# Aguarde 2-3 minutos
# URLs limpas funcionarão
```

---

## 🚨 ERROS GITHUB API

### 401 Unauthorized

```json
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest"
}
```

**Causa:** Token inválido ou expirado

**Solução:**
1. Gere novo token: https://github.com/settings/tokens
2. Scope: `repo` (full control)
3. Cole no formulário
4. Teste novamente

---

### 403 Forbidden

```json
{
  "message": "Resource not accessible by integration"
}
```

**Causa:** Token sem permissão necessária

**Solução:**
1. Edite token: https://github.com/settings/tokens
2. Marque scope `repo`
3. Salve
4. Use token atualizado

---

### 404 Not Found

```json
{
  "message": "Not Found"
}
```

**Causas:**

| Mensagem | Causa | Fix |
|----------|-------|-----|
| Repository not found | Repo não existe | Crie repositório |
| Branch not found | Branch 'main' não existe | Use 'master' ou crie 'main' |
| Invalid path | Pasta posts/ não existe | Crie pasta posts/ |

**Solução:**

```bash
# Verifique repo existe:
https://github.com/[usuario]/[repo]

# Verifique branch:
git branch -a

# Crie pasta posts se necessário:
mkdir posts
echo "# Posts" > posts/README.md
git add posts/
git commit -m "feat: Add posts folder"
git push origin main
```

---

### 422 Unprocessable Entity

```json
{
  "message": "Invalid request"
}
```

**Causa:** Conteúdo Base64 inválido

**Solução:**

```javascript
// form-script.js deve ter:
const base64Content = btoa(
    unescape(
        encodeURIComponent(htmlContent)
    )
);

// Se erro persistir, verifique caracteres especiais no conteúdo
```

---

## 🖼️ PROBLEMAS COM IMAGENS

### Google Drive - Imagem não aparece

**Problema:** URL do Drive não funciona diretamente

**Formato Errado:**
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```

**Como Sistema Converte:**
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

**Formato Correto Após Conversão:**
```
https://drive.google.com/uc?export=view&id=1ABC123xyz
```

**Checklist Google Drive:**
- [ ] Arquivo compartilhado: "Qualquer pessoa com o link"
- [ ] URL no formato /file/d/[ID]/view
- [ ] Sistema converte automaticamente
- [ ] Teste URL convertida no navegador

---

### Imagem Muito Grande

**Problema:** Post demora para carregar

**Diagnóstico:**

```javascript
// Console do navegador:
const imgs = document.querySelectorAll('img');
imgs.forEach(img => {
    fetch(img.src, {method: 'HEAD'})
        .then(r => r.headers.get('content-length'))
        .then(size => console.log(img.src, (size/1024).toFixed(2), 'KB'));
});
```

**Recomendações:**
- Capa: até 200KB
- Internas: até 100KB cada
- Total do post: até 500KB

**Como Comprimir:**

```bash
# Online:
→ TinyPNG.com (PNG/JPG)
→ Squoosh.app (todos formatos)
→ Compressor.io

# Qualidade recomendada:
→ JPG: 85%
→ PNG: comprimir com perdas
→ WebP: 80%
```

---

### Imagem Duplicada

**Problema:** Mesma imagem aparece 2x (capa + interna)

**Como Sistema Previne:**

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

**Se ainda acontecer:**
- Verifique URLs exatas (espaços, maiúsculas)
- Use URLs diferentes para capa e internas
- Sistema deve filtrar automaticamente

---

## 📐 PROBLEMAS DE LAYOUT

### Imagens Não Fluem Corretamente

**Problema:** Texto não fica ao lado das imagens LEFT

**Causa:** CSS não carregado ou sobrescrito

**Verificação:**

```javascript
// Console:
const img = document.querySelector('.image-left');
console.log('Float:', getComputedStyle(img).float);
console.log('Width:', getComputedStyle(img).width);

// Deve retornar:
// Float: left
// Width: 40% (ou ~360px)
```

**Fix:**

```css
/* Verifique em blog-post.css: */
.dynamic-image.image-left {
    float: left !important;
    width: 40% !important;
    max-width: 450px !important;
    margin: 0 25px 15px 0 !important;
}
```

---

### Layout Quebrado em Mobile

**Problema:** Elementos sobrepostos ou cortados

**Causa:** Media queries não aplicando

**Verificação:**

```javascript
// Console:
console.log('Width:', window.innerWidth);
console.log('Mobile?', window.innerWidth < 768);
```

**Fix:**

```css
/* blog-post.css - linha 726 */
@media (max-width: 768px) {
    .dynamic-image.image-left,
    .dynamic-image.image-right {
        float: none !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 25px 0 !important;
    }
}
```

---

### Header/Footer Não Aparecem

**Problema:** Logo não carrega no header/footer

**Causa:** Caminho de imagem errado

**Verificação:**

```html
<!-- Posts estão em: /posts/meu-post.html -->
<!-- Logo deve ser: ../assets/images/logo.webp -->

<!-- Estrutura: -->
/posts/meu-post.html
/assets/images/logo.webp

<!-- Caminho relativo: -->
../assets/images/logo.webp ✅
assets/images/logo.webp ❌ (errado)
```

**Fix:**

```javascript
// form-script.js
// Linha 1144 (generateFullPreviewPage):
<img src="../assets/images/logo-mediagrowth.webp" alt="Logo">

// Linha 2143 (generatePostHtml):
<img src="../assets/images/logo-mediagrowth.webp" alt="Logo">
```

---

## 🔍 PROBLEMAS DE SEO

### Post não aparece no Google

**Problema:** Publicado mas não indexa

**Checklist:**

```
1. Site submetido no Search Console?
   → https://search.google.com/search-console

2. Sitemap configurado?
   → /sitemap.xml deve existir

3. Robots.txt permite?
   → /robots.txt não deve bloquear

4. Meta tags preenchidas?
   → Title, description, keywords

5. Aguardou tempo suficiente?
   → Google pode levar 1-4 semanas
```

**Forçar Indexação:**

```bash
# 1. Google Search Console
→ Inspeção de URL
→ Cole URL do post
→ "Solicitar indexação"

# 2. Compartilhe em redes sociais
→ Acelera descoberta pelo Google

# 3. Link interno
→ Link de outros posts para o novo
```

---

### Open Graph não funciona

**Problema:** Compartilha no Facebook sem imagem

**Teste:**

```
→ https://developers.facebook.com/tools/debug/
→ Cole URL do post
→ "Fetch new information"
→ Veja preview
```

**Problemas Comuns:**

| Erro | Causa | Fix |
|------|-------|-----|
| No og:image | Meta tag faltando | Preencha no formulário |
| Image too small | < 200x200px | Use imagem maior |
| Image not loading | URL privada | Imagem deve ser pública |
| Wrong dimensions | Não 16:9 | Use 1200x630px ideal |

**Fix:**

```html
<!-- Verifique no HTML gerado: -->
<meta property="og:image" content="[URL DA IMAGEM]">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

---

### Schema.org Inválido

**Teste:**

```
→ https://validator.schema.org/
→ Cole URL do post
→ Verifique erros
```

**Fix Comum:**

```javascript
// form-script.js - linha 1860
// Certifique-se que datas estão em ISO:
"datePublished": "2026-02-22T10:00:00Z",
"dateModified": "2026-02-22T10:00:00Z",
```

---

## 🔄 RECUPERAÇÃO DE ERROS

### Restaurar Post Deletado

```bash
# 1. Ver histórico do Git
git log --all --full-history -- posts/meu-post.html

# 2. Recuperar arquivo
git checkout [COMMIT_HASH] -- posts/meu-post.html

# 3. Commit restauração
git add posts/meu-post.html
git commit -m "restore: Recupera post deletado"
git push origin main
```

---

### Reverter Mudança Errada

```bash
# 1. Ver últimos commits
git log --oneline -10

# 2. Reverter commit específico
git revert [COMMIT_HASH]

# 3. Push
git push origin main
```

---

### Backup e Restore Completo

```bash
# BACKUP:
git clone https://github.com/usuario/repo.git backup-$(date +%Y%m%d)
cd backup-*
tar -czf ../backup-$(date +%Y%m%d).tar.gz .

# RESTORE:
tar -xzf backup-20260222.tar.gz
cd backup-*
git push -f origin main
```

---

## 🐛 DEBUGGING

### Ativar Modo Debug

```javascript
// Adicione no console do navegador:
localStorage.setItem('debug', 'true');
location.reload();

// Ver logs detalhados:
console.log('Debug mode:', localStorage.getItem('debug'));
```

### Ver Dados do Formulário

```javascript
// Console (F12) no postin.html:
const data = collectFormData();
console.table(data);

// Ver imagens:
console.log('Cover:', data.coverImage);
console.log('Internal:', data.internalImages);
```

### Ver HTML Gerado

```javascript
// Antes de publicar:
const html = await generatePostHtml(collectFormData());
console.log(html);

// Copiar para arquivo:
copy(html); // Cola no editor de texto
```

### Ver Chamadas API

```javascript
// Chrome DevTools:
// Network tab → Filter: Fetch/XHR
// Clique em "Publicar Post"
// Veja chamada para api.github.com
// Inspect: Headers, Payload, Response
```

### Logs do GitHub Pages

```bash
# Acesse:
https://github.com/[usuario]/[repo]/actions

# Clique no último workflow
# "pages build and deployment"
# Veja logs detalhados
```

---

## 📞 QUANDO PEDIR AJUDA

Antes de pedir suporte, colete:

```
1. URL do blog
2. Screenshot do erro
3. Console do navegador (F12 → Console)
4. Network tab (F12 → Network)
5. Descrição: o que tentou fazer, o que aconteceu
6. Sistema: navegador, versão, OS
```

**Template de Suporte:**

```
PROBLEMA:
[Descreva o problema]

PASSOS PARA REPRODUZIR:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

RESULTADO ESPERADO:
[O que deveria acontecer]

RESULTADO ATUAL:
[O que está acontecendo]

CONSOLE ERRORS:
[Cole erros do console]

AMBIENTE:
- Navegador: Chrome 120
- OS: Windows 11
- URL: https://exemplo.github.io/blog
```

---

## 📚 RECURSOS ADICIONAIS

- [Documentação Completa](DOCUMENTACAO-COMPLETA.md)
- [Guia de Replicação](GUIA-REPLICACAO-CLIENTE.md)
- [Fluxograma do Sistema](FLUXOGRAMA-SISTEMA.md)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [GitHub API Docs](https://docs.github.com/rest)

---

**Criado por:** MediaGrowth Development Team  
**Contato:** contato@mediagrowth.com.br  
**Última atualização:** 22 de fevereiro de 2026

