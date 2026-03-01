# 📤 GUIA COMPLETO - SISTEMA DE UPLOAD DE IMAGENS

> **Sistema automatizado de upload IMEDIATO de imagens para GitHub com otimização e repositório dedicado**

**⭐ VERSÃO 4.0 - UPLOAD IMEDIATO (01/03/2026)**

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Configuração Inicial](#configuração-inicial)
4. [Como Usar](#como-usar)
5. [Estrutura de Armazenamento](#estrutura-de-armazenamento)
6. [Arquitetura do Sistema](#arquitetura-do-sistema)
7. [Troubleshooting](#troubleshooting)
8. [Replicação para Clientes](#replicação-para-clientes)

---

## 🎯 VISÃO GERAL

### **O que é?**
Sistema v4.0 que permite fazer upload **IMEDIATO** de imagens para o GitHub no momento da seleção - sem esperar pela publicação do post!

### **🆕 NOVO na v4.0: Upload Imediato!**
```
ANTES (v1-v3):
[Selecionar Imagem] → [Armazena Base64] → [Publicar Post] → [Upload GitHub]
                                                                    ↑
                                              Problema: Post fica sem imagem até fazer upload

AGORA (v4.0):
[Selecionar Imagem] → [Upload IMEDIATO GitHub] → [URL já disponível] → [Publicar Post]
                              ↑
                    Solução: Imagem já está no GitHub antes da publicação!
```

### **Funcionalidades**
✅ **Upload IMEDIATO** ao selecionar imagem (não espera publicação)  
✅ Otimização automática (resize + compressão)  
✅ Repositório dedicado (`blog-images`) criado automaticamente  
✅ **Organização por POST** (cada post tem sua pasta)  
✅ Preview visual usa URL do GitHub (real)  
✅ Feedback de progresso em tempo real  
✅ URLs definitivas no HTML publicado  

### **Vantagens**
- 🆓 **Gratuito:** Usa GitHub como CDN
- ⚡ **Imediato:** Imagem vai para GitHub ao selecionar
- 🔒 **Seguro:** Controle total via GitHub API
- 📁 **Organizado:** Cada post tem sua pasta de imagens
- 🌐 **Global:** CDN do GitHub entrega rápido mundialmente
- ✅ **Confiável:** URL do GitHub funciona em preview E produção

---

## 🔧 REQUISITOS

### **1. Token do GitHub**
- Necessário para autenticar uploads via API
- Permissões: `repo` (acesso completo a repositórios)

### **2. Arquivos Necessários**
```
projeto/
├── postin.html                          # Interface com botões de upload
├── scripts/
│   └── github-image-uploader.js         # Core do sistema de upload
├── assets/
│   ├── js/
│   │   └── form-script.js               # Handlers dos botões
│   └── css/
│       └── form-style.css               # Estilos dos botões
```

### **3. Navegador**
- Chrome/Edge/Firefox/Safari (suporte a FileReader API)
- JavaScript habilitado

---

## ⚙️ CONFIGURAÇÃO INICIAL

### **PASSO 1: Gerar Token do GitHub**

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   ```
   Note: Blog Image Uploader
   Expiration: No expiration (ou escolha período)
   Scopes: ✅ repo (marcar tudo em "repo")
   ```
4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (só aparece uma vez!)

### **PASSO 2: Configurar no Navegador**

1. Abra `postin.html` no navegador local
2. Abra o **Console do Navegador** (F12)
3. Execute o comando:
   ```javascript
   localStorage.setItem('github_token', 'SEU_TOKEN_AQUI');
   ```
4. Recarregue a página (F5)

### **PASSO 3: Verificar Configuração**

Execute no console:
```javascript
console.log(localStorage.getItem('github_token') ? '✅ Token configurado' : '❌ Token ausente');
```

---

## 🚀 COMO USAR

### **1️⃣ Upload do Avatar do Autor**

![Avatar Upload](https://via.placeholder.com/600x100/4ade80/FFFFFF?text=UPLOAD+AVATAR)

**🎯 Cada post tem seu próprio avatar!**

1. Localize o campo **"Avatar do Autor (URL)"**
2. Clique no botão **"📤 UPLOAD AVATAR"**
3. Selecione a foto do autor do seu computador
4. Aguarde o feedback:
   - � **"Enviando para GitHub..."** → Fazendo upload
   - 🟢 **"Avatar enviado!"** → Sucesso!
5. URL é preenchida automaticamente no campo

**💡 Comportamento (v4.0):**
- ✅ **Upload IMEDIATO** ao selecionar a imagem
- ✅ Avatar é salvo na pasta do post: `posts/{slug}/avatar.jpg`
- ✅ Cada post tem SEU PRÓPRIO avatar (não sobrescreve outros)
- ✅ Imagem otimizada (max 400x400, 90% quality)

### **2️⃣ Upload da Imagem de Capa**

![Exemplo de botão de upload](https://via.placeholder.com/600x100/EB7A3D/FFFFFF?text=UPLOAD+IMAGEM)

1. Localize o campo **"Imagem Principal (Cover)"**
2. Clique no botão **"📤 UPLOAD IMAGEM"**
3. Selecione a imagem do seu computador
4. Aguarde o feedback:
   - 🟠 **"Enviando para GitHub..."** → Upload em progresso
   - 🟢 **"Capa enviada!"** → Sucesso!
5. A URL do GitHub é preenchida automaticamente no campo

**💡 Comportamento (v4.0):**
- ✅ Upload IMEDIATO ao selecionar
- ✅ Salva em: `posts/{slug}/cover.jpg`
- ✅ Otimizada: max 1200x630, 85% quality (ideal para OG/sharing)

### **3️⃣ Upload de Imagens Internas**

![Exemplo de botão pequeno](https://via.placeholder.com/50x50/EB7A3D/FFFFFF?text=📤)

1. Em cada campo de **"Imagens Internas"**
2. Clique no botão pequeno **📤** (ao lado do botão remover)
3. Selecione a imagem
4. Aguarde o feedback: **"Enviando..."** → **"Enviada!"**
5. URL preenchida automaticamente

**💡 Comportamento (v4.0):**
- ✅ Upload IMEDIATO ao selecionar
- ✅ Salva em: `posts/{slug}/image-1.jpg`, `image-2.jpg`, `image-3.jpg`
- ✅ Otimizada: max 1920x1080, 85% quality

---

## 📁 ESTRUTURA DE ARMAZENAMENTO

### **v4.0 - Cada Post com Sua Pasta**

As imagens são organizadas POR POST no repositório `blog-images`:

```
blog-images/
└── posts/
    ├── meu-primeiro-post/
    │   ├── avatar.jpg        # Avatar do autor DESTE post
    │   ├── cover.jpg         # Imagem de capa
    │   ├── image-1.jpg       # 1ª imagem interna
    │   ├── image-2.jpg       # 2ª imagem interna
    │   └── image-3.jpg       # 3ª imagem interna
    │
    ├── segundo-post-legal/
    │   ├── avatar.jpg        # Avatar (pode ser diferente!)
    │   ├── cover.jpg
    │   └── image-1.jpg
    │
    └── guia-completo-seo/
        ├── avatar.jpg
        ├── cover.jpg
        └── image-1.jpg
```

### **URLs Geradas**

```
https://raw.githubusercontent.com/{usuario}/blog-images/main/posts/{slug}/avatar.jpg
https://raw.githubusercontent.com/{usuario}/blog-images/main/posts/{slug}/cover.jpg
https://raw.githubusercontent.com/{usuario}/blog-images/main/posts/{slug}/image-1.jpg
```

**Exemplo real:**
```
https://raw.githubusercontent.com/mediagrowthmkt-debug/blog-images/main/posts/trafego-pago-empresas-guia-completo/cover.jpg
```

### **⚠️ IMPORTANTE: Slug é Obrigatório!**

O sistema usa o **slug do post** para criar a pasta. Se o slug não estiver preenchido, usa "post" como padrão.

**DICA:** Preencha o título primeiro (o slug é gerado automaticamente), DEPOIS faça upload das imagens.

---

## 🏗️ ARQUITETURA DO SISTEMA (v4.0)

### **Fluxo de Upload IMEDIATO**

```
┌─────────────────┐
│  Usuário clica  │
│   em Upload     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FileReader API │  ← Lê arquivo local
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Preview LOCAL   │  ← Mostra preview instantâneo
│ (ObjectURL)     │     (enquanto faz upload)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Canvas API    │  ← Redimensiona/Comprime
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Base64 Encoding │  ← Converte para texto
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API     │  ← PUT /repos/{owner}/{repo}/contents/{path}
│  IMEDIATO!      │     Upload acontece AGORA, não no publish!
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  URL GitHub     │  ← Preenche campo automaticamente
│  Definitiva!    │     Preview atualiza com URL real
└─────────────────┘
```

### **Arquivos do Sistema**

```
projeto/
├── postin.html                          # Interface com botões de upload
├── scripts/
│   └── github-image-uploader.js         # Core v4.0 (~500 linhas)
├── assets/
│   ├── js/
│   │   └── form-script.js               # Lógica de formulário
│   └── css/
│       └── form-style.css               # Estilos dos botões
```

### **Componentes do Código (v4.0)**

#### **1. github-image-uploader.js** (~500 linhas) ⭐ v4.0

**Variáveis Globais:**
```javascript
var IMAGE_REPO_NAME = 'blog-images';  // Nome do repositório de imagens
var API_BASE = 'https://api.github.com';
var RAW_BASE = 'https://raw.githubusercontent.com';

// URLs das imagens já enviadas (para referência)
window.uploadedImageUrls = {
    avatar: null,
    cover: null,
    internals: []
};
```

**Funções Principais:**
```javascript
// Credenciais
async function getGitHubCredentials()      // Busca token e username

// Repositório
async function ensureImageRepository()     // Cria repo se não existir

// Processamento
async function optimizeImage(file, maxW, maxH, quality)  // Resize + compress
async function blobToBase64(blob)          // Converte para Base64

// Upload
async function uploadImageToGitHub(token, user, path, blob)  // Upload real

// Handlers (upload IMEDIATO ao selecionar arquivo)
async function handleAvatarUpload(file)           // Avatar → posts/{slug}/avatar.jpg
async function handleCoverUpload(file)            // Capa → posts/{slug}/cover.jpg
async function handleInternalImageUpload(file, input, index)  // Internas → posts/{slug}/image-{n}.jpg

// Setup
function setupImageUploadHandlers()        // Configura event listeners
function updateImagesLoadedIndicator()     // Atualiza contador UI
function getUploadedImageUrls()            // Retorna URLs já enviadas
```

**Otimizações por Tipo de Imagem:**
| Tipo | Max Width | Max Height | Quality |
|------|-----------|------------|---------|
| Avatar | 400px | 400px | 90% |
| Cover | 1200px | 630px | 85% |
| Internal | 1920px | 1080px | 85% |

#### **2. postin.html** (Inputs)

IDs importantes para os handlers:
```html
<!-- Avatar -->
<input type="url" id="authorAvatar">
<input type="file" id="avatarUploadInput" class="hidden">

<!-- Capa -->
<input type="url" id="coverImage">
<input type="file" id="coverUploadInput" class="hidden">

<!-- Imagens Internas (dinâmicas) -->
<div class="internal-image-item">
  <input type="url" name="internalImageUrl[]">
  <input type="file" class="internal-image-upload hidden">
</div>
```

#### **3. form-style.css** (estilos)

```css
/* Botão principal (capa/avatar) */
.btn-upload {
    background: linear-gradient(135deg, #EB7A3D 0%, #d4692e 100%);
    box-shadow: 0 4px 12px rgba(235, 122, 61, 0.3);
    text-transform: uppercase;
}

/* Botão pequeno (internas) */
.btn-upload-small {
    border: 2px solid #EB7A3D;
    background: rgba(235, 122, 61, 0.15);
}

/* Status de upload */
.upload-status.show { display: block; }
```

### **GitHub API Endpoints Utilizados**

#### **1. Buscar Username**
```http
GET https://api.github.com/user
Authorization: token {GITHUB_TOKEN}
```

#### **2. Verificar/Criar Repositório**
```http
GET https://api.github.com/repos/{owner}/blog-images
POST https://api.github.com/user/repos  (se não existir)
```

#### **3. Upload de Arquivo (com suporte a update)**
```http
PUT https://api.github.com/repos/{owner}/blog-images/contents/posts/{slug}/{filename}
Authorization: token {GITHUB_TOKEN}
Content-Type: application/json

{
  "message": "Upload: posts/{slug}/{filename}",
  "content": "{BASE64_CONTENT}",
  "branch": "main",
  "sha": "{SHA_IF_UPDATE}"  // Opcional: para sobrescrever arquivo existente
}
```
GET https://api.github.com/repos/{owner}/blog-images
Authorization: token {GITHUB_TOKEN}
```

---

## 🐛 TROUBLESHOOTING

### ❌ **"Token não configurado"**

**Problema:** Token ausente no localStorage

**Solução:**
```javascript
// No console do navegador (F12)
localStorage.setItem('github_token', 'ghp_XXXXXXXXXXXXXXXXXXXXX');
location.reload();
```

---

### ❌ **"Erro ao criar repositório: 422"**

**Problema:** Repositório `blog-images` já existe

**Solução:** 
- Normal! O sistema detecta e usa o existente
- Se persistir, verifique permissões do token

---

### ❌ **"Imagem muito grande"**

**Problema:** Arquivo > 10MB

**Solução:**
- Sistema otimiza automaticamente
- Se falhar, reduza qualidade da imagem original
- Use ferramentas como TinyPNG antes do upload

---

### ❌ **"Upload falhou - Network error"**

**Problema:** Limite de rate do GitHub (5000 req/hora)

**Solução:**
- Aguarde 1 minuto e tente novamente
- Verifique conexão com internet
- Teste: `fetch('https://api.github.com/rate_limit')`

---

### ❌ **"URL não preenche automaticamente"**

**Problema:** JavaScript não encontra campo

**Solução:**
1. Abra console (F12) e procure erros
2. Verifique se IDs estão corretos:
   - `authorAvatar` (campo do avatar)
   - `avatarUploadInput` (input file do avatar)
   - `coverImage` (campo da capa)
   - `coverUploadInput` (input file da capa)
   - `input[name="internalImageUrl[]"]` (campos de imagens internas)
   - `.internal-image-upload` (inputs file das internas)
3. Limpe cache (Ctrl+Shift+Delete)

---

### ❓ **"Imagens vão para pasta errada / 'post'"**

**Problema:** Slug não está preenchido no momento do upload

**Solução:**
1. **SEMPRE preencha o título ANTES** de fazer upload das imagens
2. O slug é gerado automaticamente do título
3. Verifique se o campo `#slug` existe e tem valor

**Verificar:**
```javascript
// No console
document.getElementById('slug').value
// Deve mostrar algo como "meu-post-titulo"
```

---

### ❓ **"Avatar sobrescrevendo outros posts"**

**NÃO é mais um problema na v4.0!**

Na v4.0, cada post tem sua própria pasta:
- Post A: `posts/post-a/avatar.jpg`
- Post B: `posts/post-b/avatar.jpg`

São arquivos SEPARADOS. Não há sobrescrita entre posts!

---

### ✅ **Verificar Estado do Sistema v4.0**

Execute no console:

```javascript
// 1. Token
console.log('Token:', localStorage.getItem('github_token') ? '✅' : '❌');

// 2. Username
console.log('Username:', localStorage.getItem('github_username') || '(será detectado automaticamente)');

// 3. Slug atual
console.log('Slug:', document.getElementById('slug')?.value || '❌ VAZIO');

// 4. URLs já enviadas
console.log('Imagens enviadas:', window.uploadedImageUrls);

// 5. Rate limit
fetch('https://api.github.com/rate_limit', {
    headers: { 'Authorization': `token ${localStorage.getItem('github_token')}` }
})
.then(r => r.json())
.then(d => console.log('Rate Limit:', d.rate.remaining, '/', d.rate.limit));
```

---

## 🔄 REPLICAÇÃO PARA CLIENTES

### **CHECKLIST DE CONFIGURAÇÃO (v4.0)**

```markdown
- [ ] 1. Copiar arquivos:
      - scripts/github-image-uploader.js (v4.0)
      - assets/js/form-script.js
      - assets/css/form-style.css
      - postin.html (com estrutura de inputs correta)

- [ ] 2. Verificar IDs no postin.html:
      - #authorAvatar (input url)
      - #avatarUploadInput (input file)
      - #coverImage (input url)
      - #coverUploadInput (input file)
      - input[name="internalImageUrl[]"] (inputs url)
      - .internal-image-upload (inputs file)

- [ ] 3. Gerar token do cliente:
      - GitHub Settings → Developer settings → Personal access tokens
      - Scope: repo (full control)

- [ ] 4. Configurar token no navegador do cliente:
      localStorage.setItem('github_token', 'TOKEN_AQUI');

- [ ] 5. Testar upload (IMPORTANTE: Preencher título ANTES!):
      - Upload de avatar → verifica pasta posts/{slug}/avatar.jpg
      - Upload de capa → verifica pasta posts/{slug}/cover.jpg
      - Upload de imagem interna → verifica pasta posts/{slug}/image-1.jpg

- [ ] 6. Verificar se imagens aparecem na produção:
      - Criar post de teste
      - Publicar
      - Verificar se imagens carregam na URL final

- [ ] 7. Documentar para o cliente:
      - Como gerar novo token se expirar
      - Onde encontrar imagens (GitHub → blog-images/posts/)
      - IMPORTANTE: Preencher título ANTES de fazer upload!
```

### **PERSONALIZAÇÃO POR CLIENTE**

#### **Mudar Nome do Repositório**

Em `github-image-uploader.js` (linha ~8):
```javascript
var IMAGE_REPO_NAME = 'imagens-cliente';  // ← Mude aqui
```

#### **Mudar Estrutura de Pastas**

Em `github-image-uploader.js`, dentro das funções de handle:
```javascript
// handleAvatarUpload (~linha 230)
var filePath = 'assets/' + postSlug + '/avatar.jpg';  // ← Mude estrutura

// handleCoverUpload (~linha 295)
var filePath = 'assets/' + postSlug + '/cover.jpg';  // ← Mude estrutura

// handleInternalImageUpload (~linha 360)
var filePath = 'assets/' + postSlug + '/image-' + index + '.jpg';  // ← Mude estrutura
```

#### **Ajustar Otimização**

Em `github-image-uploader.js`, dentro de cada handler:

```javascript
// Avatar - mais quadrado, menor
var optimizedBlob = await optimizeImage(file, 400, 400, 0.9);  // ← Ajuste

// Capa - formato OG/sharing
var optimizedBlob = await optimizeImage(file, 1200, 630, 0.85);  // ← Ajuste

// Internas - alta qualidade
var optimizedBlob = await optimizeImage(file, 1920, 1080, 0.85);  // ← Ajuste
```

#### **Cores dos Botões**

Em `form-style.css`:
```css
.btn-upload {
    background: linear-gradient(135deg, #EB7A3D 0%, #d4692e 100%); /* ← Mude cores */
    box-shadow: 0 4px 12px rgba(235, 122, 61, 0.3); /* ← Ajuste sombra */
}

.btn-upload-small {
    border: 2px solid #EB7A3D; /* ← Mude cor da borda */
    color: #EB7A3D; /* ← Mude cor do texto */
}
```

---

## 📊 ESTATÍSTICAS E LIMITES

### **GitHub API Limits**

| Recurso | Autenticado | Não autenticado |
|---------|-------------|-----------------|
| Requests/hora | 5000 | 60 |
| Tamanho arquivo | 100 MB | - |
| Repositórios | Ilimitado | - |

### **Tamanhos Recomendados**

| Tipo | Dimensões Originais | Após Otimização | Tamanho Final |
|------|---------------------|-----------------|---------------|
| Capa | Qualquer | Max 1920x1080 | ~200-500 KB |
| Interna | Qualquer | Max 1920x1080 | ~150-400 KB |

### **Performance**

- ⏱️ **Upload típico:** 2-5 segundos
- 📦 **Compressão:** ~60-80% do tamanho original
- 🌐 **CDN GitHub:** Entrega global < 200ms

---

## 📝 CHANGELOG

### **v4.0.0** (01/03/2026) ⭐ MAJOR UPDATE - UPLOAD IMEDIATO
- 🚀 **UPLOAD IMEDIATO** - Imagem vai para GitHub AO SELECIONAR
  - Não espera mais pela publicação do post
  - Preview usa URL real do GitHub
  - Posts publicados já têm URLs corretas
- 📁 **Organização por Post** - Cada post tem sua própria pasta
  - Avatar: `posts/{slug}/avatar.jpg` (NÃO sobrescreve outros posts!)
  - Capa: `posts/{slug}/cover.jpg`
  - Internas: `posts/{slug}/image-1.jpg`, `image-2.jpg`, `image-3.jpg`
- ⚡ **Código refatorado** - ~500 linhas, sem classes, ES5 compatível
- 🔧 **Seletor de internas corrigido** - `input[name="internalImageUrl[]"]`
- 📊 **Indicador de imagens** - Mostra quantas imagens foram enviadas
- 🎨 **Preview local instantâneo** - Mostra imagem enquanto faz upload

### **v2.0.0** (27/02/2026)
- ✨ **Sistema de Avatar Persistente** (REMOVIDO na v4.0)
  - Avatar era compartilhado entre todos os posts
  - Na v4.0 cada post tem seu próprio avatar
- 🔄 Método `getAvatarUrl()` para buscar avatar existente
- 📖 Documentação atualizada com seção de Avatar

### **v1.0.0** (27/02/2026)
- ✨ Sistema completo de upload implementado
- 🎨 Design dos botões melhorado (gradiente laranja)
- 🔄 Auto-criação do repositório blog-images
- ⚡ Otimização automática de imagens
- 📱 Suporte a múltiplas imagens internas
- 🎯 Feedback visual de progresso/sucesso/erro
- 📖 Documentação completa criada

---

## 🔗 REFERÊNCIAS

- **GitHub REST API:** https://docs.github.com/en/rest
- **FileReader API:** https://developer.mozilla.org/en-US/docs/Web/API/FileReader
- **Canvas API:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Base64 Encoding:** https://developer.mozilla.org/en-US/docs/Glossary/Base64

---

## 💡 DICAS AVANÇADAS

### **Upload Múltiplo (Batch)**

Para fazer upload de várias imagens de uma vez:

```javascript
async function uploadMultiple(files, postSlug) {
    const uploader = new GitHubImageUploader(
        localStorage.getItem('github_token'),
        'seu-usuario'
    );
    
    const results = await Promise.all(
        files.map((file, index) => 
            uploader.uploadImage(file, postSlug, `internal-${index + 1}`)
        )
    );
    
    return results;
}
```

### **Deletar Imagens Antigas**

```javascript
async function deleteImage(postSlug, filename) {
    const token = localStorage.getItem('github_token');
    const path = `posts/${postSlug}/${filename}`;
    
    // 1. Pegar SHA do arquivo
    const response = await fetch(
        `https://api.github.com/repos/${username}/blog-images/contents/${path}`,
        { headers: { Authorization: `token ${token}` } }
    );
    const data = await response.json();
    
    // 2. Deletar
    await fetch(
        `https://api.github.com/repos/${username}/blog-images/contents/${path}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Delete: ${filename}`,
                sha: data.sha
            })
        }
    );
}
```

### **Migrar Imagens Existentes**

Se você já tem imagens em outro lugar e quer migrar:

```javascript
async function migrateFromURL(imageUrl, postSlug, imageType) {
    // 1. Baixar imagem
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // 2. Criar File object
    const file = new File([blob], `${imageType}.jpg`, { type: 'image/jpeg' });
    
    // 3. Upload
    const uploader = new GitHubImageUploader(
        localStorage.getItem('github_token'),
        'seu-usuario'
    );
    
    return await uploader.uploadImage(file, postSlug, imageType);
}
```

---

## 📧 SUPORTE

Se encontrar problemas:

1. ✅ Verifique o console do navegador (F12)
2. ✅ Confirme que o token tem permissão `repo`
3. ✅ Teste o rate limit da API
4. ✅ Verifique se os arquivos JS estão carregando
5. 📧 Entre em contato com suporte técnico

---

**🎉 Sistema pronto para uso! Bom upload!**
