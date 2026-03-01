// Blog Post - Funcionalidades Interativas
// SUA EMPRESA

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    initBackToTop();
    
    // Share Functionality
    initShareButton();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Reading Progress Bar (opcional)
    initReadingProgress();
    
    // Related Posts - Carrega posts da página principal
    loadRelatedPosts();
    
    // Table of Contents (opcional)
    // initTableOfContents();
});

// ======================
// RELATED POSTS
// ======================
async function loadRelatedPosts() {
    const relatedGrid = document.querySelector('.related-posts .related-grid');
    if (!relatedGrid) return;
    
    try {
        // Detecta se está rodando localmente ou no GitHub Pages
        const isLocal = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.protocol === 'file:';
        
        let htmlFiles = [];
        
        if (isLocal) {
            // Modo LOCAL - Lista manual de posts
            htmlFiles = [
                { name: 'window-replacement-massachusetts-guide' }
            ];
        } else {
            // Modo GITHUB PAGES - Busca via API
            const repoName = 'BLOG-XENON';
            
            const response = await fetch(`https://api.github.com/repos/mediagrowthmkt-debug/${repoName}/contents/posts`);
            
            if (!response.ok) throw new Error('Erro ao buscar posts');
            
            const files = await response.json();
            htmlFiles = files.filter(file => 
                file.name.endsWith('.html') && 
                file.name !== 'index.html' &&
                file.type === 'file'
            ).map(file => ({ name: file.name }));
        }
        
        // Pega o slug do post atual para excluí-lo
        const currentPath = window.location.pathname;
        const currentSlug = currentPath.split('/').pop();
        
        // Filtra para não mostrar o post atual
        htmlFiles = htmlFiles.filter(file => file.name !== currentSlug);
        
        // Limita a 3 posts relacionados
        const postsToShow = htmlFiles.slice(0, 3);
        
        if (postsToShow.length === 0) {
            const message = document.createElement('p');
            message.style.textAlign = 'center';
            message.style.color = 'rgba(255,255,255,0.5)';
            message.textContent = 'Nenhum post relacionado disponível.';
            relatedGrid.replaceChildren(message);
            return;
        }
        
        // Carrega metadados de cada post
        const posts = await Promise.all(postsToShow.map(file => loadPostMetadata(file.name)));
        const validPosts = posts.filter(p => p !== null);
        
        // Renderiza os posts
        relatedGrid.replaceChildren(...validPosts.map(post => createRelatedCard(post)));
        
        console.log('✅ Posts relacionados carregados:', validPosts.length);
        
    } catch (error) {
        console.error('❌ Erro ao carregar posts relacionados:', error);
    const message = document.createElement('p');
    message.style.textAlign = 'center';
    message.style.color = 'rgba(255,255,255,0.5)';
    message.textContent = 'Erro ao carregar posts relacionados.';
    relatedGrid.replaceChildren(message);
    }
}

async function loadPostMetadata(filename) {
    try {
        // Determina o caminho base
        const basePath = window.location.pathname.includes('/posts/') ? '' : 'posts/';
        // Adiciona .html para buscar o arquivo físico, mas a URL exibida será sem extensão
        const fileToFetch = filename.endsWith('.html') ? filename : filename + '.html';
        const url = basePath + fileToFetch;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Post não encontrado');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract metadata
        const title = doc.querySelector('h1')?.textContent || doc.querySelector('title')?.textContent || 'Post sem título';
        const description = doc.querySelector('meta[name="description"]')?.content || 
                          doc.querySelector('.post-intro p')?.textContent?.substring(0, 120) || '';
        const image = doc.querySelector('meta[property="og:image"]')?.content || 
                     doc.querySelector('.cover-image img')?.src || 
                     '../assets/images/logo-motel-xenon.png';
        const category = doc.querySelector('meta[name="category"]')?.content || 
                        doc.querySelector('.category-badge')?.textContent || 'Geral';
        
        return {
            title: title.trim(),
            excerpt: description.trim().substring(0, 100) + (description.length > 100 ? '...' : ''),
            image: image,
            category: category.trim(),
            url: filename.replace('.html', '') // Remove .html da URL exibida
        };
    } catch (error) {
        console.error('Erro ao carregar post:', filename, error);
        return null;
    }
}

function escapeHtmlAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

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
        
        // Sanitiza URL - usa apenas origin + pathname, descarta query/hash potencialmente maliciosos
    const url = sanitizeUrl(window.location.origin + window.location.pathname);
        
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
            // Fallback: copia URL para clipboard
            copyToClipboard(url);
            showNotification('Link copiado para área de transferência! 📋');
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        console.warn('Clipboard API não disponível neste navegador.');
    }
}

function createRelatedCard(post) {
    const card = document.createElement('a');
    card.className = 'related-card';
    card.href = sanitizeUrl(post.url);

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'related-image';

    const image = document.createElement('img');
    image.loading = 'lazy';
    image.src = sanitizeUrl(post.image);
    image.alt = escapeHtmlAttr(post.title);
    image.onerror = () => {
        image.src = '../assets/images/logo-motel-xenon.png';
    };

    imageWrapper.appendChild(image);

    const content = document.createElement('div');
    content.className = 'related-content';

    const category = document.createElement('span');
    category.className = 'related-category';
    category.textContent = escapeHtmlAttr(post.category);

    const title = document.createElement('h3');
    title.className = 'related-title';
    title.textContent = escapeHtmlAttr(post.title);

    const excerpt = document.createElement('p');
    excerpt.className = 'related-excerpt';
    excerpt.textContent = escapeHtmlAttr(post.excerpt);

    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(excerpt);

    card.appendChild(imageWrapper);
    card.appendChild(content);

    return card;
}

function sanitizeUrl(url) {
    if (!url) return '#';
    const trimmed = String(url).trim();
    if (/^(\/(?!\/)|\.\/|\.\.\/)/.test(trimmed)) {
        return trimmed;
    }
    try {
        const parsed = new URL(trimmed);
        const protocol = parsed.protocol.toLowerCase();
        if (protocol === 'http:' || protocol === 'https:') {
            return parsed.href;
        }
    } catch (error) {
        return '#';
    }
    return '#';
}

function showNotification(message) {
    const notification = document.createElement('div');
    // Sanitiza a mensagem para prevenir XSS
    notification.textContent = String(message).replace(/[<>]/g, '');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
        background: linear-gradient(90deg, #3498db, #2ecc71);
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
// TABLE OF CONTENTS (Opcional)
// ======================
function initTableOfContents() {
    const contentArea = document.querySelector('.post-content');
    if (!contentArea) return;
    
    const headings = contentArea.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Só cria TOC se tiver 3+ headings
    
    // Cria container do TOC
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Neste Artigo</h3><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    // Adiciona headings ao TOC
    headings.forEach((heading, index) => {
        // Adiciona ID ao heading se não tiver
        if (!heading.id) {
            heading.id = `section-${index}`;
        }
        
        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        tocList.appendChild(li);
    });
    
    // Insere TOC após a introdução
    const intro = document.querySelector('.post-intro');
    if (intro) {
        intro.after(toc);
    }
    
    // Estilo do TOC
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            border-left: 4px solid #3498db;
        }
        
        .table-of-contents h3 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .table-of-contents ul {
            list-style: none;
            margin: 0;
        }
        
        .table-of-contents li {
            margin-bottom: 8px;
        }
        
        .table-of-contents li.h3 {
            margin-left: 20px;
        }
        
        .table-of-contents a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .table-of-contents a:hover {
            color: #2c3e50;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
}

// ======================
// LAZY LOADING IMAGES
// ======================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ======================
// COPY CODE BLOCKS
// ======================
function initCodeCopy() {
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        
        // Adiciona botão de copiar
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copiar';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            copyToClipboard(block.textContent);
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
            }, 2000);
        });
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

// Inicializa funções adicionais
initExternalLinks();
// initLazyLoading();
// initCodeCopy();

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
    
    // Aqui você pode enviar para Google Analytics ou outro serviço
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
