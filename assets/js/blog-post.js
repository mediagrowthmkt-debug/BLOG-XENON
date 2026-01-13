// Blog Post - Funcionalidades Interativas
// Motel Xenon - Criciúma/SC

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    initBackToTop();
    
    // Share Functionality
    initShareButton();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Reading Progress Bar
    initReadingProgress();
    
    // External Links
    initExternalLinks();
});

// ======================
// BACK TO TOP
// ======================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Mostra/esconde o botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Clique no botão
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================
// SHARE BUTTON
// ======================
function initShareButton() {
    const shareBtn = document.querySelector('.share-btn');
    
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async function() {
        // Sanitiza o título para prevenir XSS
        const titleElement = document.querySelector('.post-title');
        const title = titleElement ? String(titleElement.textContent).trim() : String(document.title).trim();
        
        // Constrói URL segura usando apenas origin + pathname (evita hash/query string)
        const safeOrigin = String(window.location.origin || '');
        const safePath = String(window.location.pathname || '/');
        
        // Valida que são strings válidas antes de usar
        if (!safeOrigin.startsWith('http')) {
            console.warn('Origin inválido');
            return;
        }
        
        const url = safeOrigin + safePath;
        
        // Tenta usar Web Share API (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
            } catch (err) {
                console.log('Share cancelled or error:', err);
            }
        } else {
            // Fallback: copia URL para clipboard usando API segura
            copyUrlToClipboard(url);
        }
    });
}

// Função separada para copiar URL - com validação de protocolo
function copyUrlToClipboard(urlString) {
    // Valida que é uma URL válida com protocolo permitido
    let validUrl;
    try {
        validUrl = new URL(urlString);
        if (!['http:', 'https:'].includes(validUrl.protocol)) {
            console.warn('Protocolo não permitido');
            return;
        }
    } catch (e) {
        console.warn('URL inválida');
        return;
    }
    
    const safeUrl = validUrl.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(safeUrl).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyToClipboard(safeUrl);
        });
    } else {
        fallbackCopyToClipboard(safeUrl);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', 'readonly');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (e) {
        console.warn('Falha ao copiar');
    }
    document.body.removeChild(textarea);
}

function showCopySuccess() {
    // Mensagem hardcoded - sem dados externos
    showNotification('Link copiado para área de transferência! 📋');
}

function showNotification(message) {
    const notification = document.createElement('div');
    // Usa textContent para inserção segura (previne XSS automaticamente)
    notification.textContent = String(message).trim();
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #8B0F0F;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(139, 15, 15, 0.3);
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================
// SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======================
// READING PROGRESS BAR
// ======================
function initReadingProgress() {
    // Cria barra de progresso
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #8B0F0F, #D4AF37);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.prepend(progressBar);
    
    // Atualiza progresso no scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// ======================
// EXTERNAL LINKS
// ======================
function initExternalLinks() {
    document.querySelectorAll('.post-content a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Adiciona ícone de link externo
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
        }
    });
}

// ======================
// ANALYTICS (Tempo de leitura)
// ======================
let startTime = Date.now();
let maxScroll = 0;

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
    }
});

window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    console.log('Tempo no post:', timeSpent, 'segundos');
    console.log('Scroll máximo:', Math.round(maxScroll), '%');
    
    // Exemplo com Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'article_engagement', {
            time_spent: timeSpent,
            scroll_depth: Math.round(maxScroll)
        });
    }
});

// Adiciona estilos de animação
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }
`;
document.head.appendChild(animationStyles);

// ======================
// LEAD CAPTURE FORM
// ======================
function initLeadCaptureForm() {
    const leadForm = document.getElementById('leadCaptureForm');
    
    if (!leadForm) return;
    
    leadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = leadForm.querySelector('.lead-submit-btn');
        const formContainer = leadForm.closest('.post-lead-form');
        const successMessage = formContainer.querySelector('.lead-form-success');
        
        // Formata a data atual em formato brasileiro
        const now = new Date();
        const dataFormatada = now.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Obtém o título da página (nome do post)
        const pageTitle = document.querySelector('.post-title')?.textContent?.trim() || document.title;
        
        // Coleta dados do formulário no formato do webhook
        const formData = {
            nome: String(leadForm.querySelector('#leadName').value).trim(),
            email: String(leadForm.querySelector('#leadEmail').value).trim(),
            telefone: String(leadForm.querySelector('#leadPhone').value).trim(),
            plataforma: 'blog',
            fonte: pageTitle,
            quando: dataFormatada
        };
        
        // Validação básica
        if (!formData.nome || !formData.email || !formData.telefone) {
            showFormMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Estado de loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            const webhookUrl = leadForm.dataset.webhook;
            const destinationEmail = leadForm.dataset.email;
            
            // Se houver webhook configurado, envia para lá
            if (webhookUrl && webhookUrl.trim() !== '') {
                await sendToWebhook(webhookUrl, formData);
            }
            
            // Armazena lead localmente também (backup)
            storeLeadLocally(formData);
            
            // Mostra mensagem de sucesso
            leadForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Dispara evento para analytics
            if (window.gtag) {
                gtag('event', 'lead_capture', {
                    'event_category': 'engagement',
                    'event_label': pageTitle
                });
            }
            
        } catch (error) {
            console.error('Erro ao enviar lead:', error);
            showFormMessage('Ocorreu um erro. Por favor, tente novamente.', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Máscara de telefone
    const phoneInput = leadForm.querySelector('#leadPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }
}

async function sendToWebhook(webhookUrl, data) {
    // Valida URL do webhook
    try {
        const url = new URL(webhookUrl);
        if (!['http:', 'https:'].includes(url.protocol)) {
            throw new Error('Protocolo não permitido');
        }
    } catch (e) {
        console.warn('Webhook URL inválida');
        return;
    }
    
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
    });
    
    if (!response.ok) {
        throw new Error('Falha ao enviar para webhook');
    }
    
    return response;
}

function storeLeadLocally(data) {
    try {
        const leads = JSON.parse(localStorage.getItem('xenon_leads') || '[]');
        leads.push(data);
        localStorage.setItem('xenon_leads', JSON.stringify(leads));
    } catch (e) {
        console.warn('Erro ao armazenar lead localmente:', e);
    }
}

function showFormMessage(message, type) {
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    const msgElement = document.createElement('div');
    msgElement.className = `form-message form-message-${type}`;
    msgElement.textContent = message;
    msgElement.style.cssText = `
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 15px;
        text-align: center;
        font-weight: 500;
        ${type === 'error' 
            ? 'background: rgba(217, 21, 24, 0.2); color: #ff6b6b; border: 1px solid rgba(217, 21, 24, 0.5);' 
            : 'background: rgba(63, 201, 155, 0.2); color: #3fc99b; border: 1px solid rgba(63, 201, 155, 0.5);'}
    `;
    
    const leadForm = document.getElementById('leadCaptureForm');
    leadForm.insertBefore(msgElement, leadForm.firstChild);
    
    setTimeout(() => msgElement.remove(), 5000);
}

// Inicializa o formulário de captura
document.addEventListener('DOMContentLoaded', initLeadCaptureForm);
