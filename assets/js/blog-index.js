// ========================================
// BLOG INDEX - Motel Xenon
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize blog
    initBlog();
});

// ========================================
// BLOG INITIALIZATION
// ========================================

let allPosts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

async function initBlog() {
    try {
        // Load posts from posts folder
        await loadPosts();
        
        // Setup search
        setupSearch();
        
        // Setup category filter
        setupCategoryFilter();
        
        // Render posts
        renderPosts();
    } catch (error) {
        console.error('Erro ao inicializar blog:', error);
        showEmptyState();
    }
}

// ========================================
// LOAD POSTS
// ========================================

async function loadPosts() {
    try {
        // Detectar se está rodando localmente ou no GitHub Pages
        const isLocal = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.protocol === 'file:';
        
        console.log('🌍 Ambiente:', isLocal ? 'LOCAL' : 'GITHUB PAGES');
        
        let htmlFiles = [];
        
        if (isLocal) {
            // Modo LOCAL - Lista vazia (posts são carregados via API em produção)
            htmlFiles = [];
            console.log('📁 Modo local: nenhum post de teste carregado');
        } else {
            // Modo GITHUB PAGES - Busca via API
            const response = await fetch('https://api.github.com/repos/mediagrowthmkt-debug/BLOG-XENON/contents/posts');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar posts da API');
            }
            
            const files = await response.json();
            console.log('📁 Arquivos da API:', files.length);
            
            // Filtrar apenas arquivos HTML (excluir README.md e index.html)
            htmlFiles = files.filter(file => 
                file.name.endsWith('.html') && 
                file.name !== 'index.html' &&
                file.type === 'file'
            ).map(file => ({ name: file.name }));
            
            console.log('✅ Posts encontrados:', htmlFiles.length);
        }
        
        // Carregar metadados de cada post
        const postPromises = htmlFiles.map(file => 
            loadPostMetadata(`posts/${file.name}`)
        );
        
        allPosts = await Promise.all(postPromises);
        allPosts = allPosts.filter(post => post !== null);
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log('📚 Total de posts carregados:', allPosts.length);
        
    } catch (error) {
        console.error('❌ Erro ao carregar posts:', error);
        // Fallback: use example post
        allPosts = getExamplePosts();
    }
}

async function loadPostMetadata(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract metadata from post
        const title = doc.querySelector('h1')?.textContent || doc.querySelector('title')?.textContent || 'Post sem título';
        const description = doc.querySelector('meta[name="description"]')?.content || 
                          doc.querySelector('p')?.textContent.substring(0, 150) || '';
        const image = doc.querySelector('meta[property="og:image"]')?.content || 
                     doc.querySelector('img')?.src || '';
        const category = doc.querySelector('meta[name="category"]')?.content || 'Geral';
    const author = doc.querySelector('meta[name="author"]')?.content || 'Motel Xenon';
        const dateStr = doc.querySelector('meta[name="publish-date"]')?.content || 
                       doc.querySelector('time')?.getAttribute('datetime') || 
                       new Date().toISOString();
        
        return {
            title: title.trim(),
            excerpt: description.trim(),
            image: image,
            category: category.trim(),
            author: author.trim(),
            date: dateStr,
            url: url
        };
    } catch (error) {
        console.error('Erro ao carregar post:', url, error);
        return null;
    }
}

function getExamplePosts() {
    // Retorna array vazio - posts reais são carregados via GitHub API
    // Apenas posts publicados pelo postin.html devem aparecer
    return [];
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchTerm = e.target.value.toLowerCase();
            renderPosts();
        }, 300);
    });
}

// ========================================
// CATEGORY FILTER
// ========================================

function setupCategoryFilter() {
    // Get unique categories
    const categories = ['all', ...new Set(allPosts.map(post => post.category))];
    
    // Create category buttons
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';
    categories.forEach(cat => {
        const button = document.createElement('button');
        button.className = `category-btn ${cat === 'all' ? 'active' : ''}`;
        button.dataset.category = cat;
        button.textContent = cat === 'all' ? 'Todos' : cat;
        categoryFilter.appendChild(button);
    });
    
    // Add click listeners
    categoryFilter.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryFilter.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category and render
            currentCategory = this.dataset.category;
            renderPosts();
        });
    });
}

// ========================================
// RENDER POSTS
// ========================================

function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Filter posts
    let filteredPosts = allPosts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
    }
    
    // Filter by search term
    if (currentSearchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.category.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    // Show empty state if no posts
    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Render posts
    postsGrid.replaceChildren(...filteredPosts.map(post => createPostCard(post)));
}

function createPostCard(post) {
    const date = formatDate(post.date);
    const safeTitle = escapeHtml(post.title);
    const safeExcerpt = escapeHtml(post.excerpt);
    const safeCategory = escapeHtml(post.category);
    const safeAuthor = escapeHtml(post.author);
    const safeUrl = sanitizeUrl(post.url);
    const safeImage = sanitizeUrl(post.image || 'assets/images/logo-motel-xenon.png');

    const card = document.createElement('a');
    card.className = 'post-card';
    card.href = safeUrl;

    const image = document.createElement('img');
    image.className = 'post-image';
    image.loading = 'lazy';
    image.src = safeImage;
    image.alt = safeTitle;
    image.onerror = () => {
        image.src = 'assets/images/logo-motel-xenon.png';
    };

    const content = document.createElement('div');
    content.className = 'post-content';

    const category = document.createElement('span');
    category.className = 'post-category';
    category.textContent = safeCategory;

    const title = document.createElement('h2');
    title.className = 'post-title';
    title.textContent = safeTitle;

    const excerpt = document.createElement('p');
    excerpt.className = 'post-excerpt';
    excerpt.textContent = safeExcerpt;

    const meta = document.createElement('div');
    meta.className = 'post-meta';

    const author = document.createElement('span');
    author.className = 'post-author';
    author.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    const authorName = document.createElement('span');
    authorName.textContent = safeAuthor;
    author.appendChild(authorName);

    const postDate = document.createElement('span');
    postDate.className = 'post-date';
    postDate.textContent = date;

    meta.appendChild(author);
    meta.appendChild(postDate);

    content.appendChild(category);
    content.appendChild(title);
    content.appendChild(excerpt);
    content.appendChild(meta);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function showEmptyState() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    postsGrid.innerHTML = '';
    emptyState.style.display = 'block';
}

function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function sanitizeUrl(url) {
    if (!url) return '#';
    const trimmed = String(url).trim();
    
    // Permitir caminhos relativos seguros:
    // - posts/xxx.html (pasta/arquivo)
    // - ./xxx, ../xxx, /xxx (caminhos relativos)
    // Regex: aceita caminhos que começam com letra/número (pode ter hífen/underscore) seguido de /
    if (/^(\/(?!\/)|\.\/|\.\.\/|[a-zA-Z0-9][a-zA-Z0-9_-]*\/)/.test(trimmed)) {
        // Verificar se não contém protocolos perigosos escondidos
        if (!trimmed.includes('javascript:') && !trimmed.includes('data:')) {
            return trimmed;
        }
    }
    
    // Permitir arquivos .html (pode ter hífens e underscores no nome)
    if (/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.html$/.test(trimmed)) {
        return trimmed;
    }
    
    // Permitir caminhos completos como posts/nome-do-post.html
    if (/^[a-zA-Z0-9][a-zA-Z0-9_-]*\/[a-zA-Z0-9][a-zA-Z0-9_-]*\.html$/.test(trimmed)) {
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

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
