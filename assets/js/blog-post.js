// Blog Post - Funcionalidades Interativas
// Grupo AMCC - Assessoria Contábil

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
