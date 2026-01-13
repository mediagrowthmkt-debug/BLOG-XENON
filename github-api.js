/**
 * GitHub API Integration
 * Grupo AMCC Blog - Salva posts automaticamente no repositório via API
 */

class GitHubBlogPublisher {
    constructor(config) {
        this.owner = config.owner; // mediagrowthmkt-debug
        this.repo = config.repo;   // grupo-amcc-blog
        this.token = config.token; // Personal Access Token
        this.branch = config.branch || 'main';
    }

    /**
     * Salvar post no GitHub
     */
    async savePost(slug, htmlContent) {
        const path = `posts/${slug}.html`;
        const message = `Add new blog post: ${slug}`;
        
        try {
            // Verificar se arquivo já existe
            const existingFile = await this.getFile(path);
            
            if (existingFile) {
                // Atualizar arquivo existente
                return await this.updateFile(path, htmlContent, message, existingFile.sha);
            } else {
                // Criar novo arquivo
                return await this.createFile(path, htmlContent, message);
            }
        } catch (error) {
            console.error('Erro ao salvar no GitHub:', error);
            throw error;
        }
    }

    /**
     * Verificar se arquivo existe
     */
    async getFile(path) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        try {
            const response = await fetch(url, {
                headers: this.getHeaders()
            });
            
            if (response.status === 404) {
                return null; // Arquivo não existe
            }
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.message.includes('404')) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Criar novo arquivo
     */
    async createFile(path, content, message) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                message: message,
                content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
                branch: this.branch
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`GitHub API error: ${error.message}`);
        }

        return await response.json();
    }

    /**
     * Atualizar arquivo existente
     */
    async updateFile(path, content, message, sha) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                message: message,
                content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
                sha: sha, // SHA do arquivo existente
                branch: this.branch
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`GitHub API error: ${error.message}`);
        }

        return await response.json();
    }

    /**
     * Headers para autenticação
     */
    getHeaders() {
        return {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
    }

    /**
     * Obter URL pública do post
     */
    getPublicUrl(slug) {
        // GitHub Pages URL
        return `https://mediagrowthmkt-debug.github.io/grupo-amcc-blog/posts/${slug}.html`;
    }
}

/**
 * Configuração
 * IMPORTANTE: Guardar o token de forma segura!
 */
function initGitHubPublisher() {
    // Token deve ser configurado pelo usuário
    // Criar em: https://github.com/settings/tokens
    // Permissões: repo (full control)
    
    const token = localStorage.getItem('github_token');
    
    if (!token) {
        console.warn('GitHub token não configurado');
        return null;
    }
    
    return new GitHubBlogPublisher({
        owner: 'mediagrowthmkt-debug',
        repo: 'grupo-amcc-blog',
        token: token,
        branch: 'main'
    });
}

/**
 * Salvar token (primeira vez)
 */
function saveGitHubToken(token) {
    localStorage.setItem('github_token', token);
    console.log('Token salvo com sucesso');
}

/**
 * Exemplo de uso
 */
async function publishPost(slug, htmlContent) {
    const publisher = initGitHubPublisher();
    
    if (!publisher) {
        throw new Error('GitHub token não configurado. Use saveGitHubToken() primeiro.');
    }
    
    try {
        await publisher.savePost(slug, htmlContent);
        const publicUrl = publisher.getPublicUrl(slug);
        return publicUrl;
    } catch (error) {
        console.error('Erro ao publicar:', error);
        throw error;
    }
}

// Exportar para uso global
window.GitHubBlogPublisher = GitHubBlogPublisher;
window.initGitHubPublisher = initGitHubPublisher;
window.saveGitHubToken = saveGitHubToken;
window.publishPost = publishPost;
