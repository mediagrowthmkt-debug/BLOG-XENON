// Sistema de Criação de Posts - Blog Grupo AMCC
// Autor: Grupo AMCC - Assessoria Contábil
// Data: 2026

// ======================
// AUTO-SAVE SYSTEM
// ======================

const AUTO_SAVE_KEY = 'amcc_blog_form_data';
let autoSaveTimeout = null;

// Salva os dados do formulário no LocalStorage
function saveFormToLocalStorage() {
    const formData = {};
    const form = document.getElementById('blogForm');
    
    // Salva todos os inputs e textareas
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'button' || field.type === 'submit') return;
        
        if (field.type === 'checkbox') {
            formData[field.id || field.name] = field.checked;
        } else if (field.name && field.name.includes('[]')) {
            // Campos múltiplos (arrays)
            if (!formData[field.name]) formData[field.name] = [];
            formData[field.name].push(field.value);
        } else {
            formData[field.id || field.name] = field.value;
        }
    });
    
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(formData));
    updateAutoSaveStatus();
}

// Carrega os dados salvos do LocalStorage
function loadFormFromLocalStorage() {
    const savedData = localStorage.getItem(AUTO_SAVE_KEY);
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('blogForm');
        
        // Restaura valores de campos simples
        Object.keys(formData).forEach(key => {
            // Pula campos array por enquanto
            if (key.includes('[]')) return;
            
            // NÃO restaurar o aiTemplate - sempre usar o template atualizado do HTML
            if (key === 'aiTemplate') return;
            
            const field = form.querySelector(`#${key}`) || form.querySelector(`[name="${key}"]`);
            
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = formData[key];
                } else {
                    field.value = formData[key];
                }
            }
        });
        
        // Restaura campos múltiplos (arrays)
        Object.keys(formData).forEach(key => {
            if (key.includes('[]') && Array.isArray(formData[key])) {
                const allFields = Array.from(form.querySelectorAll('input')).filter(
                    input => input.getAttribute('name') === key
                );
                
                formData[key].forEach((value, index) => {
                    if (allFields[index]) {
                        allFields[index].value = value;
                    } else {
                        if (key === 'internalImageUrl[]' && index > 0) {
                            document.getElementById('addInternalImage').click();
                            setTimeout(() => {
                                const newFields = Array.from(form.querySelectorAll('input')).filter(
                                    input => input.getAttribute('name') === key
                                );
                                if (newFields[index]) newFields[index].value = value;
                            }, 100);
                        }
                    }
                });
            }
        });
        
        console.log('✅ Dados carregados do auto-save');
        updateAutoSaveStatus('Dados restaurados');
    } catch (error) {
        console.error('❌ Erro ao carregar dados salvos:', error);
    }
}

// Auto-save com debounce (aguarda 2 segundos sem digitação)
function scheduleAutoSave() {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
        saveFormToLocalStorage();
    }, 2000);
}

// Atualiza o status visual do auto-save
function updateAutoSaveStatus(customMessage = null) {
    const statusDiv = document.getElementById('autoSaveStatus');
    if (!statusDiv) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    statusDiv.textContent = customMessage || `💾 Salvo às ${timeString}`;
    statusDiv.style.opacity = '1';
    
    // Fade out após 3 segundos
    setTimeout(() => {
        statusDiv.style.opacity = '0.5';
    }, 3000);
}

// Limpa o formulário e o LocalStorage
function clearFormData() {
    if (confirm('⚠️ Tem certeza que deseja limpar TODOS os campos? Esta ação não pode ser desfeita.')) {
        document.getElementById('blogForm').reset();
        localStorage.removeItem(AUTO_SAVE_KEY);
        
        const statusDiv = document.getElementById('autoSaveStatus');
        if (statusDiv) {
            statusDiv.textContent = '🗑️ Campos limpos';
            statusDiv.style.opacity = '1';
            setTimeout(() => {
                statusDiv.style.opacity = '0';
            }, 2000);
        }
        
        console.log('🗑️ Formulário e cache limpos');
    }
}

// Preenche formulário com dados fictícios para teste
function fillTestData() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    const testData = {
        // BLOCO 1: Identidade do Post
        h1Title: 'Como Regularizar Sua Empresa: Guia Completo AMCC',
        slug: 'como-regularizar-sua-empresa-guia-completo-amcc',
        category: 'Guia',
        author: 'Equipe AMCC',
        datePublished: dateTimeLocal,
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        readTime: '8',
        
        // BLOCO 2: SEO Essencial
        primaryKeyword: 'regularização de empresas',
        secondaryKeywords: 'contabilidade, CNPJ, impostos, assessoria contábil, Grupo AMCC',
        metaTitle: 'Como Regularizar Sua Empresa: Guia Completo 2026',
        metaDescription: 'Aprenda como regularizar sua empresa de forma simples. Guia completo com passo a passo e dicas de especialistas contábeis do Grupo AMCC. Confira!',
        searchIntent: 'Comercial',
        
        // BLOCO 3: Imagens
        coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
        coverImageAlt: 'Documentos contábeis organizados sobre mesa de escritório',
        coverImageCaption: 'Processo de regularização empresarial',
        
        // BLOCO 4: Conteúdo do Post
        introduction: 'Regularizar sua empresa pode parecer uma tarefa complexa, mas com a orientação certa, o processo se torna simples e direto. Neste guia completo, a equipe do Grupo AMCC vai explicar passo a passo como colocar sua empresa em dia com todas as obrigações fiscais, contábeis e trabalhistas. Se você está iniciando um negócio ou possui uma empresa que precisa se regularizar, este é o guia perfeito para você.',
        
        contentBody: '<h2>Por Que Regularizar Sua Empresa?</h2><p>Manter sua empresa regularizada traz inúmeras vantagens, desde evitar multas até conseguir melhores condições de crédito no mercado. Empresas regulares também transmitem mais confiança para clientes e parceiros comerciais.</p><h3>Benefícios Principais da Regularização</h3><ul><li>Evita multas e penalidades do fisco</li><li>Melhora o acesso a crédito e financiamentos</li><li>Aumenta a credibilidade no mercado</li><li>Permite participar de licitações públicas</li><li>Facilita a contratação de colaboradores</li></ul><h2>Passo a Passo para Regularização</h2><p>O primeiro passo é fazer um diagnóstico completo da situação atual da sua empresa. Isso inclui verificar pendências fiscais, trabalhistas, previdenciárias e municipais. Com um relatório claro, você saberá exatamente o que precisa ser regularizado.</p><h3>Documentos Necessários para a Regularização</h3><ul><li>Contrato Social atualizado e registrado</li><li>CNPJ regular perante a Receita Federal</li><li>Alvará de funcionamento municipal</li><li>Certidões negativas federais, estaduais e municipais</li><li>Inscrição Estadual (se aplicável)</li><li>Comprovante de endereço comercial</li></ul><h2>Como o Grupo AMCC Pode Ajudar</h2><p>Nossa equipe de especialistas contábeis possui mais de 15 anos de experiência em regularização empresarial. Oferecemos uma análise completa e personalizada para cada cliente, garantindo conformidade total com a legislação.</p>',
        
        conclusion: 'Regularizar sua empresa é um investimento no futuro do seu negócio. Com a parceria do Grupo AMCC, você conta com profissionais especializados que vão orientar cada etapa do processo, garantindo que sua empresa esteja sempre em conformidade com a legislação vigente. Não deixe para depois - comece hoje mesmo sua jornada rumo a uma empresa regularizada e confiável!',
        
        // BLOCO 6: Tags e Organização
        tags: 'contabilidade, regularização, empresa, CNPJ, impostos, assessoria contábil',
        relatedPosts: '/blog/como-abrir-empresa-no-brasil, /blog/dicas-contabeis-para-pmes, /blog/guia-fiscal-2026',
        
        // BLOCO 7: Engajamento
        ctaTitle: 'Precisa de Ajuda para Regularizar Sua Empresa?',
        ctaText: 'Entre em contato com o Grupo AMCC e receba uma consultoria gratuita sobre a situação da sua empresa. Nossa equipe está pronta para ajudar sua empresa a crescer de forma regular, segura e lucrativa.',
        ctaLink: 'https://grupoamcc.com.br/contato',
        ctaButtonText: 'Falar com Especialista',
        
        // BLOCO 8: Configurações
        siteUrl: 'https://grupoamcc.com.br',
        siteLogo: 'https://grupoamcc.com.br/logo.png'
    };
    
    // Preenche os campos
    Object.keys(testData).forEach(key => {
        const field = document.getElementById(key);
        if (field) {
            field.value = testData[key];
            field.dispatchEvent(new Event('input', { bubbles: true }));
            field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    
    // Preenche checkboxes
    const enableComments = document.getElementById('enableComments');
    const enableShare = document.getElementById('enableShare');
    if (enableComments) {
        enableComments.checked = true;
        enableComments.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (enableShare) {
        enableShare.checked = true;
        enableShare.dispatchEvent(new Event('change', { bubbles: true }));
    }
    
    // Preenche imagens internas (2 imagens)
    const form = document.getElementById('blogForm');
    const internalImageUrls = form.querySelectorAll('[name="internalImageUrl[]"]');
    const internalImageAlts = form.querySelectorAll('[name="internalImageAlt[]"]');
    
    // Garante que há pelo menos 2 imagens
    if (internalImageUrls.length < 2) {
        const addBtn = document.getElementById('addInternalImage');
        if (addBtn) {
            addBtn.click();
        }
    }
    
    // Preenche a primeira imagem interna
    if (internalImageUrls[0]) {
        internalImageUrls[0].value = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800';
        internalImageUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlts[0]) {
        internalImageAlts[0].value = 'Consultor contábil analisando documentos fiscais com cliente';
        internalImageAlts[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche a segunda imagem interna (se existir)
    if (internalImageUrls[1]) {
        internalImageUrls[1].value = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800';
        internalImageUrls[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlts[1]) {
        internalImageAlts[1].value = 'Gráfico de crescimento empresarial após regularização contábil';
        internalImageAlts[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche links internos (2 links)
    const internalLinkUrls = form.querySelectorAll('[name="internalLinkUrl[]"]');
    const internalLinkAnchors = form.querySelectorAll('[name="internalLinkAnchor[]"]');
    
    // Garante que há pelo menos 2 links internos
    if (internalLinkUrls.length < 2) {
        const addBtn = document.getElementById('addInternalLink');
        if (addBtn) {
            addBtn.click();
        }
    }
    
    // Preenche o primeiro link interno
    if (internalLinkUrls[0]) {
        internalLinkUrls[0].value = 'https://grupoamcc.com.br/blog/como-abrir-empresa-no-brasil';
        internalLinkUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalLinkAnchors[0]) {
        internalLinkAnchors[0].value = 'como abrir empresa no Brasil';
        internalLinkAnchors[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche o segundo link interno
    if (internalLinkUrls[1]) {
        internalLinkUrls[1].value = 'https://grupoamcc.com.br/blog/dicas-contabeis-para-pmes';
        internalLinkUrls[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalLinkAnchors[1]) {
        internalLinkAnchors[1].value = 'dicas contábeis para pequenas empresas';
        internalLinkAnchors[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche links externos (1 link)
    const externalLinkUrls = form.querySelectorAll('[name="externalLinkUrl[]"]');
    const externalLinkAnchors = form.querySelectorAll('[name="externalLinkAnchor[]"]');
    
    if (externalLinkUrls[0]) {
        externalLinkUrls[0].value = 'https://www.receita.fazenda.gov.br/';
        externalLinkUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (externalLinkAnchors[0]) {
        externalLinkAnchors[0].value = 'portal da Receita Federal';
        externalLinkAnchors[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Salva os dados no localStorage
    saveFormToLocalStorage();
    
    // Feedback visual
    const statusDiv = document.getElementById('autoSaveStatus');
    if (statusDiv) {
        statusDiv.textContent = '🧪 ✅ Formulário completo com dados de teste!';
        statusDiv.style.opacity = '1';
        statusDiv.style.color = '#27ae60';
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 3000);
    }
    
    console.log('✅ Formulário preenchido COMPLETAMENTE com dados de teste');
}

// ======================
// UTILITY FUNCTIONS
// ======================

// Gera slug automaticamente a partir do título
function generateSlug(text) {
    if (!text || typeof text !== 'string') {
        console.warn('⚠️ generateSlug recebeu texto inválido:', text);
        return '';
    }
    
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífen
        .replace(/--+/g, '-') // Remove hífens duplicados
        .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

// Remove stopwords do slug
function removeStopwords(slug) {
    const stopwords = ['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 
                       'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob'];
    const words = slug.split('-');
    const filtered = words.filter(word => !stopwords.includes(word));
    return filtered.join('-');
}

// Conta caracteres
function updateCharCounter(input, counter) {
    const count = input.value.length;
    const max = input.getAttribute('maxlength');
    counter.textContent = `${count}/${max} caracteres`;
    
    if (count > max * 0.9) {
        counter.style.color = '#e74c3c';
    } else {
        counter.style.color = '#7f8c8d';
    }
}

// Conta palavras
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Atualiza contador de palavras
function updateWordCounter(textarea, counter) {
    const words = countWords(textarea.value);
    counter.textContent = `${words} palavras`;
}

// Calcula tempo de leitura (média 200 palavras/minuto)
function calculateReadTime(text) {
    const words = countWords(text);
    return Math.ceil(words / 200);
}

// Formata data para ISO 8601
function formatDateISO(date) {
    return date.toISOString();
}

// Formata data para exibição em português
function formatDatePTBR(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

// Escapa HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ======================
// GOOGLE DRIVE CONVERTER
// ======================

/**
 * Converte URL do Google Drive em URL de imagem direta
 */
function convertGoogleDriveUrl(url) {
    if (!url || typeof url !== 'string') {
        return url;
    }
    
    url = url.trim();
    
    if (!url.includes('drive.google.com')) {
        return url;
    }
    
    let fileId = null;
    
    // Padrão 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const pattern1 = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match1 = url.match(pattern1);
    if (match1) {
        fileId = match1[1];
    }
    
    // Padrão 2: https://drive.google.com/open?id=FILE_ID
    const pattern2 = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
    const match2 = url.match(pattern2);
    if (match2) {
        fileId = match2[1];
    }
    
    // Padrão 3: https://drive.google.com/uc?id=FILE_ID
    const pattern3 = /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/;
    const match3 = url.match(pattern3);
    if (match3) {
        fileId = match3[1];
    }
    
    if (fileId) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('✅ Google Drive URL convertida:', url, '->', convertedUrl);
        return convertedUrl;
    }
    
    console.warn('⚠️ Não foi possível extrair o ID do arquivo do Google Drive:', url);
    return url;
}

/**
 * Processa todas as URLs de imagem em um texto HTML
 */
function processImagesInHtml(html) {
    if (!html) return html;
    
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    
    return html.replace(imgRegex, (match, srcUrl) => {
        const convertedUrl = convertGoogleDriveUrl(srcUrl);
        return match.replace(srcUrl, convertedUrl);
    });
}

// ======================
// FORM INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blogForm');
    const h1TitleInput = document.getElementById('h1Title');
    const slugInput = document.getElementById('slug');
    const primaryKeywordInput = document.getElementById('primaryKeyword');
    
    // ======================
    // AUTO-SAVE SETUP
    // ======================
    
    loadFormFromLocalStorage();
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit') {
            field.addEventListener('input', scheduleAutoSave);
            field.addEventListener('change', scheduleAutoSave);
        }
    });
    
    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFormData);
    }
    
    const fillTestBtn = document.getElementById('fillTestData');
    if (fillTestBtn) {
        fillTestBtn.addEventListener('click', fillTestData);
    }
    
    window.addEventListener('beforeunload', function() {
        saveFormToLocalStorage();
    });
    
    console.log('✅ Sistema de auto-save ativado');
    
    // ======================
    // FORM BEHAVIORS
    // ======================
    
    h1TitleInput.addEventListener('input', function() {
        const slug = removeStopwords(generateSlug(this.value));
        slugInput.value = slug;
        
        const counter = this.parentElement.querySelector('.char-counter');
        updateCharCounter(this, counter);
    });
    
    h1TitleInput.addEventListener('blur', function() {
        const metaTitleInput = document.getElementById('metaTitle');
        if (!metaTitleInput.value && this.value) {
            metaTitleInput.value = this.value;
        }
    });
    
    primaryKeywordInput.addEventListener('blur', function() {
        const coverAltInput = document.getElementById('coverImageAlt');
        if (!coverAltInput.value && this.value) {
            const h1 = h1TitleInput.value;
            if (h1) {
                coverAltInput.value = h1;
            }
        }
    });
    
    // Contadores de caracteres
    document.querySelectorAll('input[maxlength], textarea[maxlength]').forEach(input => {
        const counter = input.parentElement.querySelector('.char-counter');
        if (counter) {
            input.addEventListener('input', () => updateCharCounter(input, counter));
        }
    });
    
    // Contadores de palavras
    document.querySelectorAll('textarea:not([maxlength])').forEach(textarea => {
        const counter = textarea.parentElement.querySelector('.word-counter');
        if (counter) {
            textarea.addEventListener('input', () => updateWordCounter(textarea, counter));
        }
    });
    
    setupDynamicFields();
    setupEditorToolbar();
    
    document.getElementById('previewBtn').addEventListener('click', showPreview);
    
    form.addEventListener('submit', handleFormSubmit);
    
    setupModals();
});

// ======================
// DYNAMIC FIELDS
// ======================

function setupDynamicFields() {
    document.getElementById('addInternalImage').addEventListener('click', function() {
        const container = document.getElementById('internalImagesContainer');
        const newItem = document.createElement('div');
        newItem.className = 'internal-image-item';
        newItem.innerHTML = `
            <input type="url" name="internalImageUrl[]" placeholder="URL da imagem">
            <input type="text" name="internalImageAlt[]" placeholder="Alt text descritivo">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    document.getElementById('addInternalLink').addEventListener('click', function() {
        const container = document.getElementById('internalLinksContainer');
        const newItem = document.createElement('div');
        newItem.className = 'link-item';
        newItem.innerHTML = `
            <input type="url" name="internalLinkUrl[]" placeholder="URL interna">
            <input type="text" name="internalLinkAnchor[]" placeholder="Texto âncora">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    document.getElementById('addExternalLink').addEventListener('click', function() {
        const container = document.getElementById('externalLinksContainer');
        const newItem = document.createElement('div');
        newItem.className = 'link-item';
        newItem.innerHTML = `
            <input type="url" name="externalLinkUrl[]" placeholder="URL externa">
            <input type="text" name="externalLinkAnchor[]" placeholder="Texto âncora">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

// ======================
// EDITOR TOOLBAR
// ======================

function setupEditorToolbar() {
    const toolbar = document.querySelector('.editor-toolbar');
    const contentBody = document.getElementById('contentBody');
    
    toolbar.querySelectorAll('.editor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            insertTag(contentBody, tag);
        });
    });
}

function insertTag(textarea, tag) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let insertText = '';
    
    switch(tag) {
        case 'h2':
            insertText = `\n<h2>${selectedText || 'Título da Seção'}</h2>\n`;
            break;
        case 'h3':
            insertText = `\n<h3>${selectedText || 'Subtítulo'}</h3>\n`;
            break;
        case 'p':
            insertText = `\n<p>${selectedText || 'Seu parágrafo aqui...'}</p>\n`;
            break;
        case 'ul':
            insertText = `\n<ul>\n  <li>${selectedText || 'Item 1'}</li>\n  <li>Item 2</li>\n</ul>\n`;
            break;
        case 'strong':
            insertText = `<strong>${selectedText || 'texto em negrito'}</strong>`;
            break;
        case 'em':
            insertText = `<em>${selectedText || 'texto em itálico'}</em>`;
            break;
    }
    
    textarea.value = beforeText + insertText + afterText;
    textarea.focus();
}

// ======================
// PREVIEW
// ======================

function showPreview() {
    const formData = collectFormData();
    
    console.log('📸 Imagens Internas no Preview:', formData.internalImages);
    
    const previewHtml = generatePreviewHtml(formData);
    
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = previewHtml;
    
    const modal = document.getElementById('previewModal');
    modal.style.display = 'flex';
}

function generatePreviewHtml(data) {
    const internalImagesHtml = data.internalImages && data.internalImages.length > 0 
        ? `<div class="internal-images" style="margin: 30px 0;">
            <h3 style="margin-bottom: 20px;">📸 Imagens Internas:</h3>
            ${data.internalImages.map(img => `
                <figure style="margin: 20px 0;">
                    <img src="${img.url}" alt="${img.alt}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    ${img.alt ? `<figcaption style="margin-top: 8px; font-size: 14px; color: #666; font-style: italic;">${img.alt}</figcaption>` : ''}
                </figure>
            `).join('')}
           </div>`
        : '';
    
    return `
        <div class="preview-post">
            <header>
                <div class="category-badge">${data.category}</div>
                <h1>${data.h1Title}</h1>
                <div class="meta">
                    <span>Por ${data.author}</span>
                    <span>${data.datePublishedFormatted}</span>
                    <span>⏱️ ${data.readTime} min</span>
                </div>
            </header>
            
            <img src="${data.coverImage}" alt="${data.coverImageAlt}" style="max-width: 100%; height: auto;">
            
            <div class="content">
                <div class="intro">${data.introduction}</div>
                ${data.contentBody}
                ${internalImagesHtml}
                <div class="conclusion">${data.conclusion}</div>
            </div>
            
            <div class="tags">
                ${data.tagsArray.map(tag => `<span class="tag">#${tag.trim()}</span>`).join(' ')}
            </div>
            
            <div class="cta">
                <h3>${data.ctaTitle}</h3>
                <p>${data.ctaText}</p>
                <a href="${data.ctaLink}" class="cta-btn">${data.ctaButtonText}</a>
            </div>
        </div>
    `;
}

// ======================
// FORM SUBMIT
// ======================

let lastGeneratedHtml = null;
let lastGeneratedSlug = null;

async function handleFormSubmit(e) {
    e.preventDefault();
    
    showLoading();
    
    try {
        const formData = collectFormData();
        
        console.log('📦 Dados coletados:', formData);
        
        const postHtml = await generatePostHtml(formData);
        
        console.log('📄 HTML gerado, tamanho:', postHtml.length, 'caracteres');
        
        lastGeneratedHtml = postHtml;
        lastGeneratedSlug = formData.slug;
        
        const result = await savePostToServer(postHtml, formData.slug);
        
        showSuccess(formData.slug, result);
        
    } catch (error) {
        console.error('❌ Erro ao gerar post:', error);
        alert('Erro ao gerar o post: ' + error.message);
    } finally {
        hideLoading();
    }
}

async function savePostToServer(html, slug) {
    console.log('📄 Preparando post...', slug);
    
    // Verificar se há token do GitHub configurado
    const githubToken = localStorage.getItem('github_token');
    
    if (githubToken) {
        // Publicar automaticamente no GitHub
        console.log('🚀 Token encontrado! Publicando no GitHub...');
        return await publishToGitHub(html, slug, githubToken);
    } else {
        // Sem token: apenas preparar download
        console.log('⚠️ Token não configurado. Preparando download manual...');
        return savePostAsDownload(html, slug);
    }
}

async function publishToGitHub(html, slug, token) {
    console.log('🚀 Iniciando publicação no GitHub...');
    
    if (!html || html.trim().length === 0) {
        console.error('❌ HTML vazio!');
        throw new Error('HTML está vazio');
    }
    
    try {
        // Usar a função global do github-api.js
        if (typeof window.publishPost === 'function') {
            const publicUrl = await window.publishPost(slug, html);
            
            return {
                success: true,
                method: 'github',
                filename: slug + '.html',
                publicUrl: publicUrl,
                message: `✅ Post publicado com sucesso no GitHub!\n\n🌐 URL pública: ${publicUrl}\n\n⏳ Aguarde 1-2 minutos para o GitHub Pages atualizar.`
            };
        } else {
            throw new Error('GitHubBlogPublisher não encontrado. Verifique se github-api.js está carregado.');
        }
    } catch (error) {
        console.error('❌ Erro ao publicar no GitHub:', error);
        
        // Se falhar, retornar opção de download manual
        return {
            success: false,
            method: 'download',
            filename: slug + '.html',
            error: error.message,
            message: `❌ Falha ao publicar no GitHub: ${error.message}\n\nVocê pode fazer o download manual usando o botão abaixo.`
        };
    }
}

function savePostAsDownload(html, slug) {
    console.log('📥 Preparando download do post...');
    
    if (!html || html.trim().length === 0) {
        console.error('❌ HTML vazio!');
        throw new Error('HTML está vazio');
    }
    
    return {
        success: true,
        method: 'download',
        filename: slug + '.html',
        message: '⚠️ Token do GitHub não configurado.\n\n✅ Post gerado! Use o botão "📥 Baixar HTML" abaixo para download manual.\n\n💡 Dica: Configure o GitHub API Token para publicação automática!'
    };
}

function collectFormData() {
    const form = document.getElementById('blogForm');
    const formData = new FormData(form);
    
    let datePublished = formData.get('datePublished');
    if (!datePublished) {
        datePublished = new Date();
    } else {
        datePublished = new Date(datePublished);
    }
    
    let readTime = formData.get('readTime');
    if (!readTime) {
        const allText = formData.get('introduction') + ' ' + 
                       formData.get('contentBody') + ' ' + 
                       formData.get('conclusion');
        readTime = calculateReadTime(allText);
    }
    
    const internalImages = [];
    const internalImageUrls = formData.getAll('internalImageUrl[]');
    const internalImageAlts = formData.getAll('internalImageAlt[]');
    
    for (let i = 0; i < internalImageUrls.length; i++) {
        const rawUrl = internalImageUrls[i];
        const url = rawUrl ? rawUrl.trim() : '';
        
        if (url && url.length > 0) {
            const convertedUrl = convertGoogleDriveUrl(url);
            internalImages.push({
                url: convertedUrl,
                alt: internalImageAlts[i] || ''
            });
        }
    }
    
    const internalLinks = [];
    const internalLinkUrls = formData.getAll('internalLinkUrl[]');
    const internalLinkAnchors = formData.getAll('internalLinkAnchor[]');
    for (let i = 0; i < internalLinkUrls.length; i++) {
        if (internalLinkUrls[i]) {
            internalLinks.push({
                url: internalLinkUrls[i],
                anchor: internalLinkAnchors[i] || ''
            });
        }
    }
    
    const externalLinks = [];
    const externalLinkUrls = formData.getAll('externalLinkUrl[]');
    const externalLinkAnchors = formData.getAll('externalLinkAnchor[]');
    for (let i = 0; i < externalLinkUrls.length; i++) {
        if (externalLinkUrls[i]) {
            externalLinks.push({
                url: externalLinkUrls[i],
                anchor: externalLinkAnchors[i] || ''
            });
        }
    }
    
    const tagsString = formData.get('tags');
    const tagsArray = tagsString.split(',').map(t => t.trim()).filter(t => t);
    
    const allKeywords = [
        formData.get('primaryKeyword'),
        ...formData.get('secondaryKeywords').split(',').map(k => k.trim()).filter(k => k)
    ].join(', ');
    
    const slug = formData.get('slug');
    const siteUrl = formData.get('siteUrl').replace(/\/$/, '');
    const categorySlug = generateSlug(formData.get('category'));
    
    return {
        h1Title: formData.get('h1Title'),
        slug: slug,
        category: formData.get('category'),
        categorySlug: categorySlug,
        author: formData.get('author'),
        authorAvatar: formData.get('authorAvatar') || 'https://via.placeholder.com/100',
        datePublished: datePublished,
        datePublishedISO: formatDateISO(datePublished),
        datePublishedFormatted: formatDatePTBR(datePublished),
        dateModifiedISO: formatDateISO(new Date()),
        readTime: readTime,
        primaryKeyword: formData.get('primaryKeyword'),
        secondaryKeywords: formData.get('secondaryKeywords'),
        keywords: allKeywords,
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
        searchIntent: formData.get('searchIntent'),
        coverImage: convertGoogleDriveUrl(formData.get('coverImage')),
        coverImageAlt: formData.get('coverImageAlt'),
        coverImageCaption: formData.get('coverImageCaption') || '',
        internalImages: internalImages,
        introduction: processImagesInHtml(formData.get('introduction')),
        contentBody: processImagesInHtml(formData.get('contentBody')),
        conclusion: processImagesInHtml(formData.get('conclusion')),
        internalLinks: internalLinks,
        externalLinks: externalLinks,
        tags: tagsString,
        tagsArray: tagsArray,
        relatedPosts: formData.get('relatedPosts'),
        ctaTitle: formData.get('ctaTitle'),
        ctaText: formData.get('ctaText'),
        ctaLink: formData.get('ctaLink'),
        ctaButtonText: formData.get('ctaButtonText'),
        siteUrl: siteUrl,
        siteLogo: formData.get('siteLogo') || `${siteUrl}/logo.png`,
        enableComments: formData.get('enableComments') === 'on',
        enableShare: formData.get('enableShare') === 'on',
        canonicalUrl: `${siteUrl}/blog/${slug}`,
        blogUrl: `${siteUrl}/blog`,
        categoryUrl: `${siteUrl}/blog/${categorySlug}`
    };
}

async function generatePostHtml(data) {
    console.log('📥 Carregando template...');
    
    try {
        const response = await fetch('templates/post-template.html');
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar template: ${response.status} ${response.statusText}`);
        }
        
        let template = await response.text();
        console.log('✅ Template carregado');
        
        const sanitizeUrl = (url) => {
            if (!url) return '';
            const urlStr = String(url).trim();
            const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
            if (dangerousProtocols.test(urlStr)) {
                return '';
            }
            if (!/^(https?:\/\/|mailto:|\/|#)/i.test(urlStr)) {
                return '';
            }
            return urlStr;
        };
    
        template = template.replace(/{{META_TITLE}}/g, escapeHtml(data.metaTitle));
        template = template.replace(/{{META_DESCRIPTION}}/g, escapeHtml(data.metaDescription));
        template = template.replace(/{{KEYWORDS}}/g, escapeHtml(data.keywords));
        template = template.replace(/{{AUTHOR}}/g, escapeHtml(data.author));
        template = template.replace(/{{CANONICAL_URL}}/g, sanitizeUrl(data.canonicalUrl));
        template = template.replace(/{{COVER_IMAGE_URL}}/g, sanitizeUrl(data.coverImage));
        template = template.replace(/{{DATE_PUBLISHED}}/g, data.datePublishedISO);
        template = template.replace(/{{DATE_MODIFIED}}/g, data.dateModifiedISO);
        template = template.replace(/{{CATEGORY}}/g, escapeHtml(data.category));
        template = template.replace(/{{TAGS}}/g, escapeHtml(data.tags));
        template = template.replace(/{{H1_TITLE}}/g, escapeHtml(data.h1Title));
        template = template.replace(/{{SITE_LOGO_URL}}/g, sanitizeUrl(data.siteLogo));
        template = template.replace(/{{SITE_URL}}/g, sanitizeUrl(data.siteUrl));
        template = template.replace(/{{CATEGORY_SLUG}}/g, data.categorySlug);
        template = template.replace(/{{READ_TIME}}/g, data.readTime);
        template = template.replace(/{{AUTHOR_AVATAR}}/g, sanitizeUrl(data.authorAvatar));
        template = template.replace(/{{DATE_PUBLISHED_FORMATTED}}/g, data.datePublishedFormatted);
        template = template.replace(/{{COVER_IMAGE_ALT}}/g, escapeHtml(data.coverImageAlt));
        template = template.replace(/{{COVER_IMAGE_CAPTION}}/g, escapeHtml(data.coverImageCaption));
        
        const sanitizeHtmlContent = (html) => {
            if (!html) return '';
            return html
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/data:text\/html/gi, '');
        };
        
        template = template.replace(/{{INTRODUCTION}}/g, sanitizeHtmlContent(data.introduction));
        template = template.replace(/{{CONTENT_BODY}}/g, sanitizeHtmlContent(data.contentBody));
        template = template.replace(/{{CONCLUSION}}/g, sanitizeHtmlContent(data.conclusion));
        
        const tagsHtml = data.tagsArray.map(tag => 
            `<a href="${sanitizeUrl(data.siteUrl)}/blog/tag/${generateSlug(tag)}" class="tag">#${escapeHtml(tag)}</a>`
        ).join(' ');
        template = template.replace(/{{TAGS_HTML}}/g, tagsHtml);
        
        template = template.replace(/{{CTA_TITLE}}/g, escapeHtml(data.ctaTitle));
        template = template.replace(/{{CTA_TEXT}}/g, escapeHtml(data.ctaText));
        template = template.replace(/{{CTA_LINK}}/g, sanitizeUrl(data.ctaLink));
        template = template.replace(/{{CTA_BUTTON_TEXT}}/g, escapeHtml(data.ctaButtonText));
        
        template = template.replace(/{{RELATED_POSTS_HTML}}/g, '<!-- Posts relacionados serão adicionados automaticamente -->');
        
        return template;
        
    } catch (error) {
        console.error('❌ Erro ao gerar HTML do template:', error);
        throw error;
    }
}

function downloadPost(html, slug) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ======================
// MODALS
// ======================

function setupModals() {
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    document.getElementById('openPost')?.addEventListener('click', function() {
        const slug = document.getElementById('postPath').textContent.split('/').pop().replace('.html', '');
        window.open(`posts/${slug}.html`, '_blank');
    });
    
    document.getElementById('createAnother')?.addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
        document.getElementById('blogForm').reset();
        window.scrollTo(0, 0);
    });
}

function showSuccess(slug, result) {
    const modal = document.getElementById('successModal');
    const pathElement = document.getElementById('postPath');
    
    const postPath = `posts/${slug}.html`;
    pathElement.textContent = postPath;
    
    const messageElement = document.querySelector('.success-message') || document.createElement('p');
    if (!document.querySelector('.success-message')) {
        messageElement.className = 'success-message';
        messageElement.style.marginTop = '10px';
        messageElement.style.fontSize = '0.9em';
        messageElement.style.color = '#666';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#f0f0f0';
        messageElement.style.borderRadius = '5px';
        messageElement.style.whiteSpace = 'pre-wrap';
        modal.querySelector('.modal-content').appendChild(messageElement);
    }
    
    if (result && result.method === 'github') {
        // Publicado com sucesso no GitHub
        messageElement.innerHTML = `
            <strong>🎉 Post publicado automaticamente no GitHub!</strong><br><br>
            📁 Arquivo: <code>${postPath}</code><br>
            🌐 URL pública: <a href="${result.publicUrl}" target="_blank" style="color: #007bff;">${result.publicUrl}</a><br><br>
            ⏳ <em>Aguarde 1-2 minutos para o GitHub Pages processar o arquivo.</em>
        `;
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.fontWeight = 'normal';
        
        // Adicionar botão para abrir URL pública
        let openUrlBtn = document.getElementById('openPublicUrlBtn');
        if (!openUrlBtn) {
            openUrlBtn = document.createElement('button');
            openUrlBtn.id = 'openPublicUrlBtn';
            openUrlBtn.className = 'btn-primary';
            openUrlBtn.style.marginTop = '15px';
            openUrlBtn.style.marginRight = '10px';
            openUrlBtn.style.padding = '10px 20px';
            openUrlBtn.innerHTML = '🌐 Abrir Post Publicado';
            messageElement.parentElement.insertBefore(openUrlBtn, messageElement.nextSibling);
        }
        openUrlBtn.onclick = function() {
            window.open(result.publicUrl, '_blank');
        };
        
    } else if (result && result.method === 'download' && result.success === false) {
        // Erro ao publicar no GitHub
        messageElement.innerHTML = `
            <strong>⚠️ Falha na publicação automática</strong><br><br>
            ❌ Erro: ${result.error}<br><br>
            💡 Você pode fazer o download manual usando o botão abaixo.
        `;
        messageElement.style.backgroundColor = '#fff3cd';
        messageElement.style.color = '#856404';
        messageElement.style.fontWeight = 'normal';
        
    } else {
        // Download manual (sem token configurado)
        messageElement.innerHTML = `
            <strong>✅ Post gerado com sucesso!</strong><br><br>
            ⚠️ <em>GitHub API Token não configurado.</em><br>
            📥 Use o botão abaixo para download manual.<br><br>
            💡 <strong>Dica:</strong> Configure o token em "⚙️ Configurar GitHub API" para publicação automática!
        `;
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.fontWeight = 'normal';
    }
    
    let downloadBtn = document.getElementById('downloadHtmlBtn');
    if (!downloadBtn) {
        downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadHtmlBtn';
        downloadBtn.className = 'btn-secondary';
        downloadBtn.style.marginTop = '15px';
        downloadBtn.style.padding = '10px 20px';
        downloadBtn.style.backgroundColor = '#8B0F0F';
        downloadBtn.style.color = 'white';
        downloadBtn.style.border = 'none';
        downloadBtn.style.borderRadius = '5px';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.fontSize = '14px';
        downloadBtn.innerHTML = '📥 Baixar HTML Completo';
        
        modal.querySelector('.modal-content').appendChild(downloadBtn);
    }
    
    downloadBtn.onclick = function() {
        if (lastGeneratedHtml && lastGeneratedSlug) {
            try {
                const blob = new Blob([lastGeneratedHtml], { type: 'text/html; charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = lastGeneratedSlug + '.html';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                alert('✅ Download iniciado! Verifique sua pasta de downloads.');
            } catch (error) {
                console.error('❌ Erro ao criar download:', error);
                alert('❌ Erro ao criar download: ' + error.message);
            }
        } else {
            alert('❌ Erro: HTML não disponível. Gere o post novamente.');
        }
    };
    
    modal.style.display = 'flex';
}

function showLoading() {
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// ======================
// TEMPLATE PARA IA
// ======================

document.getElementById('copyTemplate')?.addEventListener('click', function() {
    const template = document.getElementById('aiTemplate');
    const status = document.getElementById('copyStatus');
    
    if (template) {
        const templateText = template.value;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(templateText).then(() => {
                status.textContent = '✅ Template copiado!';
                status.style.color = '#27ae60';
                
                setTimeout(() => {
                    status.textContent = '';
                }, 3000);
            }).catch(err => {
                status.textContent = '❌ Erro ao copiar. Tente novamente.';
                status.style.color = '#e74c3c';
                console.error('Erro ao copiar:', err);
            });
        } else {
            template.select();
            
            try {
                document.execCommand('copy');
                status.textContent = '✅ Template copiado!';
                status.style.color = '#27ae60';
            } catch (err) {
                status.textContent = '❌ Erro ao copiar. Tente novamente.';
                status.style.color = '#e74c3c';
            }
            
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    }
});

// ======================
// GITHUB INTEGRATION
// ======================

const githubModal = document.getElementById('githubModal');
const configBtn = document.getElementById('configGitHub');
const closeGithubModal = document.getElementById('closeGithubModal');
const saveTokenBtn = document.getElementById('saveToken');
const testTokenBtn = document.getElementById('testToken');
const githubTokenInput = document.getElementById('githubToken');
const tokenStatus = document.getElementById('tokenStatus');

configBtn?.addEventListener('click', () => {
    githubModal.style.display = 'flex';
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
        githubTokenInput.value = '••••••••••••••••••••';
        tokenStatus.textContent = '✅ Token já configurado';
        tokenStatus.className = 'success';
    }
});

closeGithubModal?.addEventListener('click', () => {
    githubModal.style.display = 'none';
});

saveTokenBtn?.addEventListener('click', () => {
    const token = githubTokenInput.value.trim();
    
    if (!token || token === '••••••••••••••••••••') {
        tokenStatus.textContent = '❌ Digite um token válido';
        tokenStatus.className = 'error';
        return;
    }
    
    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
        tokenStatus.textContent = '❌ Token inválido. Deve começar com ghp_ ou github_pat_';
        tokenStatus.className = 'error';
        return;
    }
    
    localStorage.setItem('github_token', token);
    tokenStatus.textContent = '✅ Token salvo com sucesso!';
    tokenStatus.className = 'success';
    
    setTimeout(() => {
        githubTokenInput.value = '••••••••••••••••••••';
    }, 1000);
});

testTokenBtn?.addEventListener('click', async () => {
    const token = localStorage.getItem('github_token');
    
    if (!token) {
        tokenStatus.textContent = '❌ Nenhum token configurado';
        tokenStatus.className = 'error';
        return;
    }
    
    tokenStatus.textContent = '🔄 Testando conexão...';
    tokenStatus.className = '';
    
    try {
        const response = await fetch('https://api.github.com/repos/mediagrowthmkt-debug/grupo-amcc-blog', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            tokenStatus.textContent = '✅ Conexão bem-sucedida! Pronto para publicar.';
            tokenStatus.className = 'success';
        } else {
            tokenStatus.textContent = '❌ Erro de autenticação. Verifique o token.';
            tokenStatus.className = 'error';
        }
    } catch (error) {
        tokenStatus.textContent = '❌ Erro de rede: ' + error.message;
        tokenStatus.className = 'error';
    }
});

// ======================
// EXPORT FUNCTIONS
// ======================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSlug,
        removeStopwords,
        calculateReadTime,
        formatDateISO,
        formatDatePTBR
    };
}
