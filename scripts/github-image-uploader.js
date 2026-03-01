/**
 * Sistema de Upload Imediato de Imagens para GitHub v4.0
 * 
 * Upload IMEDIATO - imagens vão para GitHub ao selecionar, não no momento da publicação
 * Cada post tem sua própria pasta de imagens
 * 
 * @author MediaGrowth Team
 * @version 4.0.0
 * @date 01/03/2026
 * 
 * Estrutura de pastas:
 * blog-images/
 * └── posts/
 *     └── {slug-do-post}/
 *         ├── avatar.jpg
 *         ├── cover.jpg
 *         ├── image-1.jpg
 *         ├── image-2.jpg
 *         └── image-3.jpg
 */

// Configurações globais
var IMAGE_REPO_NAME = 'BLOG-XENON';  // Mesmo repositório do blog
var API_BASE = 'https://api.github.com';
var RAW_BASE = 'https://raw.githubusercontent.com';

// URLs das imagens já enviadas (para referência)
window.uploadedImageUrls = {
    avatar: null,
    cover: null,
    internals: []
};

/**
 * Busca credenciais do GitHub (token e username)
 * @returns {Promise<{token: string, username: string}>}
 */
async function getGitHubCredentials() {
    var token = localStorage.getItem('github_token');
    
    if (!token) {
        throw new Error('Token do GitHub não configurado. Configure em ⚙️ Configurar GitHub');
    }
    
    // Busca username se não estiver em cache
    var username = localStorage.getItem('github_username');
    
    if (!username) {
        var response = await fetch(API_BASE + '/user', {
            headers: {
                'Authorization': 'token ' + token,
                'Accept': 'application/vnd.github+json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Token inválido ou expirado');
            }
            throw new Error('Erro ao buscar usuário: ' + response.status);
        }
        
        var userData = await response.json();
        username = userData.login;
        localStorage.setItem('github_username', username);
    }
    
    return { token: token, username: username };
}

/**
 * Verifica se o repositório de imagens existe, cria se necessário
 * @param {string} token 
 * @param {string} username 
 * @returns {Promise<boolean>}
 */
async function ensureImageRepository(token, username) {
    // Verificar se repo existe
    var checkResponse = await fetch(API_BASE + '/repos/' + username + '/' + IMAGE_REPO_NAME, {
        headers: {
            'Authorization': 'token ' + token,
            'Accept': 'application/vnd.github+json'
        }
    });
    
    if (checkResponse.ok) {
        console.log('✅ Repositório ' + IMAGE_REPO_NAME + ' encontrado');
        return true;
    }
    
    if (checkResponse.status === 404) {
        // Criar repositório
        console.log('📦 Criando repositório ' + IMAGE_REPO_NAME + '...');
        
        var createResponse = await fetch(API_BASE + '/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': 'token ' + token,
                'Accept': 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: IMAGE_REPO_NAME,
                description: 'Repositório de imagens do blog - Upload automático',
                private: false,
                auto_init: true
            })
        });
        
        if (!createResponse.ok) {
            var errorData = await createResponse.json();
            // Se o erro for que o repo já existe, tudo bem
            if (createResponse.status === 422 && errorData.errors && 
                errorData.errors.some(function(e) { return e.message && e.message.includes('already exists'); })) {
                console.log('✅ Repositório já existe');
                return true;
            }
            throw new Error('Erro ao criar repositório: ' + (errorData.message || createResponse.status));
        }
        
        console.log('✅ Repositório criado com sucesso!');
        
        // Aguarda um momento para o repo ficar disponível
        await new Promise(function(resolve) { setTimeout(resolve, 2000); });
        return true;
    }
    
    throw new Error('Erro ao verificar repositório: ' + checkResponse.status);
}

/**
 * Otimiza a imagem (redimensiona e comprime)
 * @param {File} file 
 * @param {number} maxWidth 
 * @param {number} maxHeight 
 * @param {number} quality 
 * @returns {Promise<Blob>}
 */
async function optimizeImage(file, maxWidth, maxHeight, quality) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        img.onload = function() {
            var width = img.width;
            var height = img.height;
            
            // Calcula dimensões mantendo proporção
            if (width > maxWidth || height > maxHeight) {
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Desenha imagem no canvas
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            
            // Converte para JPEG otimizado
            canvas.toBlob(function(blob) {
                if (blob) {
                    console.log('📐 Imagem otimizada: ' + width + 'x' + height + ' (' + Math.round(blob.size / 1024) + 'KB)');
                    resolve(blob);
                } else {
                    reject(new Error('Erro ao otimizar imagem'));
                }
            }, 'image/jpeg', quality);
        };
        
        img.onerror = function() {
            reject(new Error('Erro ao carregar imagem'));
        };
        
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Converte Blob para Base64 (sem o prefixo data:...)
 * @param {Blob} blob 
 * @returns {Promise<string>}
 */
async function blobToBase64(blob) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function() {
            // Remove o prefixo "data:image/jpeg;base64,"
            var base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Faz upload de uma imagem para o GitHub
 * @param {string} token 
 * @param {string} username 
 * @param {string} path 
 * @param {Blob} blob 
 * @returns {Promise<string>} URL da imagem
 */
async function uploadImageToGitHub(token, username, path, blob) {
    var base64Content = await blobToBase64(blob);
    
    var url = API_BASE + '/repos/' + username + '/' + IMAGE_REPO_NAME + '/contents/' + path;
    
    // Verificar se arquivo já existe (para obter SHA)
    var sha = null;
    var checkResponse = await fetch(url, {
        headers: {
            'Authorization': 'token ' + token,
            'Accept': 'application/vnd.github+json'
        }
    });
    
    if (checkResponse.ok) {
        var existingFile = await checkResponse.json();
        sha = existingFile.sha;
        console.log('🔄 Arquivo existe, será atualizado');
    }
    
    // Upload
    var payload = {
        message: 'Upload: ' + path,
        content: base64Content,
        branch: 'main'
    };
    
    if (sha) {
        payload.sha = sha;
    }
    
    var uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'token ' + token,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    
    if (!uploadResponse.ok) {
        var errorData = await uploadResponse.json();
        throw new Error('Erro no upload: ' + (errorData.message || uploadResponse.status));
    }
    
    // Retorna URL pública
    var publicUrl = RAW_BASE + '/' + username + '/' + IMAGE_REPO_NAME + '/main/' + path;
    
    // Adiciona timestamp para evitar cache
    return publicUrl + '?t=' + Date.now();
}

/**
 * Obtém o slug atual do post
 * @returns {string}
 */
function getCurrentSlug() {
    var slugInput = document.getElementById('slug');
    var slug = slugInput ? slugInput.value.trim() : '';
    
    // Remove barra inicial se existir
    if (slug.startsWith('/')) {
        slug = slug.substring(1);
    }
    
    if (!slug) {
        // Tenta gerar do título
        var titleInput = document.getElementById('h1Title');
        if (titleInput && titleInput.value.trim()) {
            slug = titleInput.value.trim()
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            
            if (slugInput) {
                slugInput.value = slug;
            }
        }
    }
    
    // Garante que não há barras no início ou duplicadas
    slug = slug.replace(/^\/+/, '').replace(/\/+/g, '/');
    
    return slug || 'post';
}

/**
 * Atualiza o status de upload na UI
 * @param {HTMLElement} statusElement 
 * @param {string} message 
 * @param {string} type - 'loading', 'success', 'error'
 */
function updateUploadStatus(statusElement, message, type) {
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = 'upload-status show ' + type;
    
    if (type === 'success') {
        setTimeout(function() {
            statusElement.classList.remove('show');
        }, 3000);
    }
}

/**
 * Handler para upload de Avatar
 * @param {File} file 
 */
async function handleAvatarUpload(file) {
    console.log('🔵 handleAvatarUpload INICIADO com arquivo:', file.name, file.size, 'bytes');
    
    var statusEl = document.getElementById('avatarUploadStatus');
    var inputEl = document.getElementById('authorAvatar');
    var previewEl = document.getElementById('avatarPreview');
    
    console.log('🔵 Elementos encontrados:', {
        statusEl: !!statusEl,
        inputEl: !!inputEl,
        previewEl: !!previewEl
    });
    
    try {
        updateUploadStatus(statusEl, '⏳ Enviando para GitHub...', 'loading');
        
        // Preview local instantâneo
        if (previewEl) {
            previewEl.src = URL.createObjectURL(file);
            previewEl.style.display = 'block';
            console.log('🔵 Preview local criado');
        }
        
        // Credenciais
        console.log('🔵 Buscando credenciais...');
        var creds = await getGitHubCredentials();
        console.log('🔵 Credenciais obtidas, username:', creds.username);
        
        console.log('🔵 Verificando repositório de imagens...');
        await ensureImageRepository(creds.token, creds.username);
        console.log('🔵 Repositório verificado');
        
        // Otimizar (400x400, 90% quality)
        console.log('🔵 Otimizando imagem...');
        var optimizedBlob = await optimizeImage(file, 400, 400, 0.9);
        console.log('🔵 Imagem otimizada, tamanho:', optimizedBlob.size, 'bytes');
        
        // Path com slug do post
        var slug = getCurrentSlug();
        console.log('🔵 Slug atual:', slug);
        var filePath = 'posts/' + slug + '/avatar.jpg';
        console.log('🔵 Path do arquivo:', filePath);
        
        // Upload
        console.log('🔵 Iniciando upload para GitHub...');
        var publicUrl = await uploadImageToGitHub(creds.token, creds.username, filePath, optimizedBlob);
        console.log('🔵 Upload concluído! URL:', publicUrl);
        
        // Atualiza campo
        if (inputEl) {
            inputEl.value = publicUrl;
            console.log('🔵 Campo atualizado com URL');
        }
        
        // Atualiza preview com URL do GitHub
        if (previewEl) {
            previewEl.src = publicUrl;
        }
        
        // Salva referência
        window.uploadedImageUrls.avatar = publicUrl;
        
        updateUploadStatus(statusEl, '✅ Avatar enviado!', 'success');
        updateImagesLoadedIndicator();
        
        console.log('✅ Avatar enviado com sucesso:', publicUrl);
        
    } catch (error) {
        console.error('❌ Erro no upload do avatar:', error);
        console.error('❌ Stack:', error.stack);
        updateUploadStatus(statusEl, '❌ Erro: ' + error.message, 'error');
        alert('Erro no upload do avatar: ' + error.message);
    }
}

/**
 * Handler para upload de Capa
 * @param {File} file 
 */
async function handleCoverUpload(file) {
    console.log('🟢 handleCoverUpload INICIADO com arquivo:', file.name, file.size, 'bytes');
    
    var statusEl = document.getElementById('coverImageUploadStatus');
    var inputEl = document.getElementById('coverImage');
    var previewEl = document.getElementById('coverPreview');
    
    console.log('🟢 Elementos encontrados:', {
        statusEl: !!statusEl,
        inputEl: !!inputEl,
        previewEl: !!previewEl
    });
    
    try {
        updateUploadStatus(statusEl, '⏳ Enviando para GitHub...', 'loading');
        
        // Preview local instantâneo
        if (previewEl) {
            previewEl.src = URL.createObjectURL(file);
            previewEl.style.display = 'block';
            console.log('🟢 Preview local criado');
        }
        
        // Credenciais
        console.log('🟢 Buscando credenciais...');
        var creds = await getGitHubCredentials();
        console.log('🟢 Credenciais obtidas, username:', creds.username);
        
        console.log('🟢 Verificando repositório de imagens...');
        await ensureImageRepository(creds.token, creds.username);
        console.log('🟢 Repositório verificado');
        
        // Otimizar (1200x630, 85% quality - formato OG ideal)
        console.log('🟢 Otimizando imagem...');
        var optimizedBlob = await optimizeImage(file, 1200, 630, 0.85);
        console.log('🟢 Imagem otimizada, tamanho:', optimizedBlob.size, 'bytes');
        
        // Path com slug do post
        var slug = getCurrentSlug();
        console.log('🟢 Slug atual:', slug);
        var filePath = 'posts/' + slug + '/cover.jpg';
        console.log('🟢 Path do arquivo:', filePath);
        
        // Upload
        console.log('🟢 Iniciando upload para GitHub...');
        var publicUrl = await uploadImageToGitHub(creds.token, creds.username, filePath, optimizedBlob);
        console.log('🟢 Upload concluído! URL:', publicUrl);
        
        // Atualiza campo
        if (inputEl) {
            inputEl.value = publicUrl;
            console.log('🟢 Campo atualizado com URL');
        }
        
        // Atualiza preview com URL do GitHub
        if (previewEl) {
            previewEl.src = publicUrl;
        }
        
        // Salva referência
        window.uploadedImageUrls.cover = publicUrl;
        
        updateUploadStatus(statusEl, '✅ Capa enviada!', 'success');
        updateImagesLoadedIndicator();
        
        console.log('✅ Capa enviada:', publicUrl);
        
    } catch (error) {
        console.error('❌ Erro no upload da capa:', error);
        updateUploadStatus(statusEl, '❌ Erro: ' + error.message, 'error');
    }
}

/**
 * Handler para upload de Imagem Interna
 * @param {File} file 
 * @param {HTMLElement} inputElement - O input de URL correspondente
 * @param {number} index - Índice da imagem (1, 2, 3)
 */
async function handleInternalImageUpload(file, inputElement, index) {
    // Encontra o status element mais próximo
    var container = inputElement.closest('.internal-image-item');
    var statusEl = container ? container.querySelector('.internal-upload-status') : null;
    
    try {
        if (statusEl) {
            updateUploadStatus(statusEl, '⏳ Enviando...', 'loading');
        }
        
        // Credenciais
        var creds = await getGitHubCredentials();
        await ensureImageRepository(creds.token, creds.username);
        
        // Otimizar (1920x1080, 85% quality)
        var optimizedBlob = await optimizeImage(file, 1920, 1080, 0.85);
        
        // Path com slug do post
        var slug = getCurrentSlug();
        var filePath = 'posts/' + slug + '/image-' + index + '.jpg';
        
        // Upload
        var publicUrl = await uploadImageToGitHub(creds.token, creds.username, filePath, optimizedBlob);
        
        // Atualiza campo de URL
        if (inputElement) {
            inputElement.value = publicUrl;
        }
        
        // Salva referência
        window.uploadedImageUrls.internals[index - 1] = publicUrl;
        
        if (statusEl) {
            updateUploadStatus(statusEl, '✅ Enviada!', 'success');
        }
        
        updateImagesLoadedIndicator();
        
        console.log('✅ Imagem interna ' + index + ' enviada:', publicUrl);
        
    } catch (error) {
        console.error('❌ Erro no upload da imagem interna:', error);
        if (statusEl) {
            updateUploadStatus(statusEl, '❌ Erro', 'error');
        }
    }
}

/**
 * Atualiza indicador de imagens carregadas
 */
function updateImagesLoadedIndicator() {
    var indicator = document.getElementById('imagesLoadedIndicator');
    if (!indicator) return;
    
    var count = 0;
    if (window.uploadedImageUrls.avatar) count++;
    if (window.uploadedImageUrls.cover) count++;
    count += window.uploadedImageUrls.internals.filter(Boolean).length;
    
    indicator.textContent = count + ' imagem(ns) enviada(s) para GitHub';
    indicator.style.display = count > 0 ? 'block' : 'none';
}

/**
 * Retorna as URLs das imagens já enviadas
 * @returns {object}
 */
function getUploadedImageUrls() {
    return window.uploadedImageUrls;
}

/**
 * Configura os event listeners para upload
 */
function setupImageUploadHandlers() {
    console.log('🖼️ Configurando handlers de upload de imagens v4.0...');
    
    // === AVATAR ===
    var avatarUploadBtn = document.getElementById('uploadAvatarBtn');
    var avatarUploadInput = document.getElementById('avatarUploadInput');
    
    if (avatarUploadBtn && avatarUploadInput) {
        // Remove listeners antigos para evitar duplicação
        var newAvatarBtn = avatarUploadBtn.cloneNode(true);
        avatarUploadBtn.parentNode.replaceChild(newAvatarBtn, avatarUploadBtn);
        avatarUploadBtn = newAvatarBtn;
        
        avatarUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Limpa o input antes de abrir para permitir re-selecionar o mesmo arquivo
            avatarUploadInput.value = '';
            avatarUploadInput.click();
        });
        
        // Usar evento único para evitar múltiplos disparos
        avatarUploadInput.onchange = async function(e) {
            if (e.target.files && e.target.files[0]) {
                console.log('📤 Iniciando upload de avatar:', e.target.files[0].name);
                try {
                    await handleAvatarUpload(e.target.files[0]);
                } catch (error) {
                    console.error('❌ Erro capturado no handler de avatar:', error);
                    alert('Erro no upload do avatar: ' + error.message);
                }
            }
        };
        
        console.log('✅ Handler de avatar configurado');
    }
    
    // === CAPA ===
    var coverUploadBtn = document.getElementById('uploadCoverBtn');
    var coverUploadInput = document.getElementById('coverUploadInput');
    
    // Também suporta o botão antigo
    var coverUploadBtnOld = document.getElementById('uploadCoverImage');
    var coverUploadInputOld = document.getElementById('coverImageFile');
    
    if (coverUploadBtn && coverUploadInput) {
        // Remove listeners antigos para evitar duplicação
        var newCoverBtn = coverUploadBtn.cloneNode(true);
        coverUploadBtn.parentNode.replaceChild(newCoverBtn, coverUploadBtn);
        coverUploadBtn = newCoverBtn;
        
        coverUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Limpa o input antes de abrir para permitir re-selecionar o mesmo arquivo
            coverUploadInput.value = '';
            coverUploadInput.click();
        });
        
        // Usar evento único para evitar múltiplos disparos
        coverUploadInput.onchange = async function(e) {
            if (e.target.files && e.target.files[0]) {
                console.log('📤 Iniciando upload de capa:', e.target.files[0].name);
                try {
                    await handleCoverUpload(e.target.files[0]);
                } catch (error) {
                    console.error('❌ Erro capturado no handler de capa:', error);
                    alert('Erro no upload da capa: ' + error.message);
                }
            }
        };
        
        console.log('✅ Handler de capa configurado (novo)');
    }
    
    // Suporte para estrutura antiga também
    if (coverUploadBtnOld && coverUploadInputOld) {
        coverUploadBtnOld.addEventListener('click', function(e) {
            e.preventDefault();
            coverUploadInputOld.value = '';
            coverUploadInputOld.click();
        });
        
        coverUploadInputOld.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                handleCoverUpload(e.target.files[0]);
            }
        });
        
        console.log('✅ Handler de capa configurado (compatibilidade)');
    }
    
    // === IMAGENS INTERNAS ===
    setupInternalImageHandlers();
    
    // Observer para novos campos de imagem interna adicionados dinamicamente
    var internalImagesContainer = document.getElementById('internalImagesContainer');
    if (internalImagesContainer) {
        var observer = new MutationObserver(function() {
            setupInternalImageHandlers();
        });
        observer.observe(internalImagesContainer, { childList: true, subtree: true });
    }
    
    console.log('🎉 Sistema de upload v4.0 inicializado!');
}

/**
 * Configura handlers para imagens internas (chamado inicialmente e quando novos campos são adicionados)
 */
function setupInternalImageHandlers() {
    var internalItems = document.querySelectorAll('.internal-image-item');
    
    internalItems.forEach(function(item, index) {
        // Pula se já configurado
        if (item.dataset.uploadConfigured) return;
        
        var urlInput = item.querySelector('input[name="internalImageUrl[]"]');
        var fileInput = item.querySelector('.internal-image-upload');
        var uploadBtn = item.querySelector('.btn-upload-internal');
        
        // Se não existir botão de upload, cria um
        if (!uploadBtn && urlInput) {
            uploadBtn = document.createElement('button');
            uploadBtn.type = 'button';
            uploadBtn.className = 'btn-upload-small btn-upload-internal';
            uploadBtn.textContent = '📤';
            uploadBtn.title = 'Upload para GitHub';
            
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.className = 'internal-image-upload hidden';
            fileInput.style.display = 'none';
            
            // Insere antes do botão remover
            var removeBtn = item.querySelector('.btn-remove');
            if (removeBtn) {
                item.insertBefore(uploadBtn, removeBtn);
                item.insertBefore(fileInput, removeBtn);
            } else {
                item.appendChild(uploadBtn);
                item.appendChild(fileInput);
            }
            
            // Adiciona status element
            var statusSpan = document.createElement('span');
            statusSpan.className = 'internal-upload-status upload-status';
            item.appendChild(statusSpan);
        }
        
        if (uploadBtn && fileInput && urlInput) {
            var imageIndex = index + 1;
            
            uploadBtn.addEventListener('click', function() {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    handleInternalImageUpload(e.target.files[0], urlInput, imageIndex);
                }
            });
        }
        
        item.dataset.uploadConfigured = 'true';
    });
}

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImageUploadHandlers);
} else {
    setupImageUploadHandlers();
}

// Exporta funções para uso global
window.handleAvatarUpload = handleAvatarUpload;
window.handleCoverUpload = handleCoverUpload;
window.handleInternalImageUpload = handleInternalImageUpload;
window.getUploadedImageUrls = getUploadedImageUrls;
window.setupImageUploadHandlers = setupImageUploadHandlers;
window.getGitHubCredentials = getGitHubCredentials;
