// Sistema de Criação de Posts - Blog SUA EMPRESA
// Autor: SUA EMPRESA
// Data: 2026

// ======================
// AUTO-SAVE SYSTEM
// ======================

const AUTO_SAVE_KEY = 'blog_template_form_data';
let autoSaveTimeout = null;

// Salva os dados do formulário no LocalStorage
function saveFormToLocalStorage() {
    const formData = {};
    const form = document.getElementById('blogForm');
    
    // Salva todos os inputs e textareas (exceto aiTemplate)
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'button' || field.type === 'submit') return;
        if (field.id === 'aiTemplate') return; // Não salvar o template de IA
        
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
            // Não restaurar o template de IA
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
        
        // Restaura campos múltiplos (arrays) - usando método diferente
        Object.keys(formData).forEach(key => {
            if (key.includes('[]') && Array.isArray(formData[key])) {
                // Busca todos os campos com esse name usando getAttribute
                const allFields = Array.from(form.querySelectorAll('input')).filter(
                    input => input.getAttribute('name') === key
                );
                
                formData[key].forEach((value, index) => {
                    if (allFields[index]) {
                        allFields[index].value = value;
                    } else {
                        // Se não existe campo suficiente, cria novos
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
    }, 2000); // 2 segundos
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
        // Limpa o formulário
        document.getElementById('blogForm').reset();
        
        // Limpa o LocalStorage
        localStorage.removeItem(AUTO_SAVE_KEY);
        
        // Feedback visual
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

// ======================
// 5 VERSÕES DE TESTE
// ======================
// Alterna entre 5 versões de conteúdo a cada clique do botão "Preencher Teste"
// Personalize para o nicho do seu cliente!

let currentTestVersion = 0;

const testDataVersions = [
    // VERSÃO 1: Marble vs Granite
    {
        h1Title: 'Marble vs Granite: Complete Guide for Worcester Homes',
        slug: 'marble-or-granite-guide-for-your-home-in-worcester',
        metaDescription: 'Discover the pros and cons of marble and granite countertops. Expert comparison guide for Worcester homeowners making the right choice.',
        category: 'Guia',
        author: 'Equipe Editorial',
        primaryKeyword: 'marble vs granite',
        secondaryKeywords: 'granite countertops, marble countertops, kitchen renovation, Worcester countertops',
        metaTitle: 'Marble vs Granite: Which is Best for Your Home?',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
        coverImageAlt: 'Beautiful granite countertop installation in modern kitchen',
        coverImageCaption: 'Professional granite countertop installation',
        internalImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        internalImageAlt: 'Professional granite installation process in Worcester home',
        introduction: 'Choosing between marble and granite countertops is one of the most important decisions for your Worcester home renovation. Both materials offer unique benefits and aesthetic appeal, but understanding their differences is crucial for making the right choice.',
        contentBody: '<h2>Understanding Marble Countertops</h2><p>Marble is a classic choice known for its elegant veining and timeless beauty. It\'s perfect for homeowners who want a sophisticated look in their kitchen or bathroom.</p><h3>Advantages of Marble</h3><ul><li>Unique veining patterns</li><li>Cool surface temperature</li><li>Increases home value</li></ul><h2>Why Choose Granite</h2><p>Granite is incredibly durable and comes in hundreds of color options. It\'s the perfect choice for busy Worcester families who need a practical yet beautiful solution.</p><h3>Benefits of Granite</h3><ul><li>Extremely durable</li><li>Heat resistant</li><li>Low maintenance</li><li>Variety of colors</li></ul>',
        conclusion: 'Both marble and granite are excellent choices for Worcester homes. The decision ultimately depends on your lifestyle, budget, and aesthetic preferences. Contact SUA EMPRESA today for a free consultation.',
        tags: 'granite, marble, countertops, kitchen renovation, Worcester',
        ctaTitle: 'Ready to Transform Your Kitchen?',
        ctaText: 'Get a free consultation and quote from Worcester\'s trusted countertop experts!',
        ctaButtonText: 'Schedule Free Consultation',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 2: Kitchen Island Ideas
    {
        h1Title: 'Kitchen Island Ideas: Granite Countertops Guide',
        slug: 'kitchen-island-ideas-granite-countertops-guide',
        metaDescription: 'Transform your kitchen with stunning granite island ideas. Expert tips for choosing colors, edges, and styles for Worcester homes.',
        category: 'Dicas',
        author: 'Equipe Editorial',
        primaryKeyword: 'kitchen island granite',
        secondaryKeywords: 'granite island, kitchen countertops, island design, countertop edges',
        metaTitle: 'Kitchen Island Ideas with Granite Countertops',
        searchIntent: 'Comercial',
        coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200',
        coverImageAlt: 'Modern kitchen island with granite countertop',
        coverImageCaption: 'Elegant kitchen island with premium granite',
        internalImageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        internalImageAlt: 'Kitchen island edge profiles and granite colors',
        introduction: 'A kitchen island with a stunning granite countertop can completely transform your cooking space. Whether you\'re renovating or building new, the right island design enhances functionality and adds thousands to your home value.',
        contentBody: '<h2>Popular Kitchen Island Shapes</h2><p>The shape of your island depends on your kitchen layout and cooking needs. L-shaped islands work great for open floor plans, while rectangular islands suit galley kitchens.</p><h3>Granite Color Selection</h3><ul><li>Black Galaxy - dramatic and modern</li><li>Santa Cecilia - warm gold tones</li><li>Bianco Romano - elegant white with gray veining</li><li>Blue Pearl - unique blue sparkle</li></ul><h2>Edge Profile Options</h2><p>The edge profile adds personality to your island. Popular choices include bullnose, beveled, and ogee edges.</p>',
        conclusion: 'Your kitchen island is the heart of your home. Let SUA EMPRESA help you design the perfect centerpiece with premium materials and expert craftsmanship.',
        tags: 'kitchen island, granite, countertops, kitchen design, home renovation',
        ctaTitle: 'Design Your Dream Kitchen Island',
        ctaText: 'Our experts will help you choose the perfect granite for your island. Free in-home consultation!',
        ctaButtonText: 'Get Free Design Consultation',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 3: Quartz vs Granite
    {
        h1Title: 'Quartz vs Granite: Pros and Cons for 2026',
        slug: 'quartz-vs-granite-pros-and-cons-2026',
        metaDescription: 'Complete comparison of quartz and granite countertops. Learn which material is best for your budget, lifestyle, and design preferences.',
        category: 'Tutorial',
        author: 'Equipe Editorial',
        primaryKeyword: 'quartz vs granite',
        secondaryKeywords: 'quartz countertops, engineered stone, natural stone, countertop comparison',
        metaTitle: 'Quartz vs Granite: Complete 2026 Comparison',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200',
        coverImageAlt: 'Quartz and granite countertop samples side by side',
        coverImageCaption: 'Comparing quartz and granite materials',
        internalImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        internalImageAlt: 'Modern kitchen with quartz countertop installation',
        introduction: 'The quartz vs granite debate is one of the most common questions we hear from homeowners. Both materials are excellent choices, but they have distinct differences that may make one better suited for your specific needs.',
        contentBody: '<h2>What is Granite?</h2><p>Granite is a natural stone quarried from the earth. Each slab is unique with natural variations in color and pattern. It\'s been a premium countertop choice for decades.</p><h2>What is Quartz?</h2><p>Quartz countertops are engineered from natural quartz crystals mixed with resins. This creates a consistent, non-porous surface with predictable patterns.</p><h3>Durability Comparison</h3><ul><li>Granite: Heat resistant, requires annual sealing</li><li>Quartz: Scratch resistant, maintenance-free</li></ul><h3>Cost Comparison</h3><ul><li>Granite: $50-100 per square foot installed</li><li>Quartz: $60-120 per square foot installed</li></ul>',
        conclusion: 'Both quartz and granite are excellent investments for your home. Consider your lifestyle, design preferences, and budget when making your decision. SUA EMPRESA offers both options with expert installation.',
        tags: 'quartz, granite, countertops, comparison, kitchen',
        ctaTitle: 'Need Help Choosing?',
        ctaText: 'Visit our showroom to see quartz and granite samples in person. Our experts will guide you to the perfect choice.',
        ctaButtonText: 'Schedule Showroom Visit',
        ctaLink: 'https://www.SEU-DOMINIO.com/showroom'
    },
    // VERSÃO 4: Bathroom Vanity Countertops
    {
        h1Title: 'Bathroom Vanity Countertops: Best Stone Options',
        slug: 'bathroom-vanity-countertops-best-stone-options',
        metaDescription: 'Upgrade your bathroom with premium stone vanity countertops. Compare marble, granite, and quartz for bathroom installations.',
        category: 'Blog',
        author: 'Equipe Editorial',
        primaryKeyword: 'bathroom vanity countertops',
        secondaryKeywords: 'bathroom granite, vanity marble, bathroom renovation, stone countertops',
        metaTitle: 'Best Stone Countertops for Bathroom Vanities',
        searchIntent: 'Comercial',
        coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200',
        coverImageAlt: 'Luxury bathroom with marble vanity countertop',
        coverImageCaption: 'Elegant marble bathroom vanity',
        internalImageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        internalImageAlt: 'Modern bathroom vanity with granite countertop',
        introduction: 'Your bathroom vanity is more than just a sink base—it\'s a design statement. The right stone countertop can transform your bathroom from ordinary to extraordinary while adding lasting value to your home.',
        contentBody: '<h2>Best Stones for Bathrooms</h2><p>Unlike kitchens, bathroom countertops don\'t face heat from cooking. This opens up more material options including delicate marble that might not be suitable for kitchen use.</p><h3>Marble Vanity Tops</h3><ul><li>Luxurious, timeless elegance</li><li>Perfect for low-traffic bathrooms</li><li>Requires sealing and care</li></ul><h3>Granite Vanity Tops</h3><ul><li>Extremely durable</li><li>Wide variety of colors</li><li>Resists water and stains</li></ul><h2>Sizing Considerations</h2><p>Standard vanity countertops range from 22-25 inches deep. We custom cut every piece to fit your exact specifications.</p>',
        conclusion: 'A premium stone vanity countertop is an investment that pays dividends in beauty and home value. Contact SUA EMPRESA for bathroom countertop installation in Worcester.',
        tags: 'bathroom, vanity, countertops, marble, granite',
        ctaTitle: 'Transform Your Bathroom',
        ctaText: 'Get a free quote for your bathroom vanity countertop project. We handle everything from template to installation.',
        ctaButtonText: 'Request Bathroom Quote',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 5: How to Care for Granite
    {
        h1Title: 'How to Care for Granite Countertops: Pro Tips',
        slug: 'how-to-care-for-granite-countertops-pro-tips',
        metaDescription: 'Keep your granite countertops looking new with these expert care tips. Learn proper cleaning, sealing, and maintenance from the pros.',
        category: 'Dicas',
        author: 'Equipe Editorial',
        primaryKeyword: 'granite care tips',
        secondaryKeywords: 'granite maintenance, clean granite, seal granite, countertop care',
        metaTitle: 'How to Care for Granite Countertops | Pro Tips',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
        coverImageAlt: 'Cleaning granite countertop with microfiber cloth',
        coverImageCaption: 'Proper granite cleaning technique',
        internalImageUrl: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800',
        internalImageAlt: 'Granite sealing products and tools',
        introduction: 'Granite countertops are one of the most durable surfaces for your kitchen, but proper care ensures they stay beautiful for decades. These professional tips will help you maintain your investment and keep your countertops looking brand new.',
        contentBody: '<h2>Daily Cleaning Routine</h2><p>For everyday cleaning, use warm water with a few drops of dish soap. Wipe with a soft microfiber cloth and dry to prevent water spots.</p><h3>What NOT to Use</h3><ul><li>Vinegar or acidic cleaners</li><li>Bleach or ammonia</li><li>Abrasive scrubbers</li><li>Generic multipurpose cleaners</li></ul><h2>Sealing Your Granite</h2><p>Most granite should be sealed annually. To test if you need sealing, place a few drops of water on the surface. If it absorbs within 5 minutes, it\'s time to seal.</p><h3>Sealing Steps</h3><ol><li>Clean surface thoroughly</li><li>Apply sealer evenly</li><li>Wait 15-20 minutes</li><li>Wipe off excess</li><li>Allow 24 hours to cure</li></ol>',
        conclusion: 'With proper care, your granite countertops will look stunning for 30+ years. SUA EMPRESA offers professional sealing services and care products for all our customers.',
        tags: 'granite care, maintenance, cleaning, sealing, countertops',
        ctaTitle: 'Need Professional Sealing?',
        ctaText: 'Our team provides professional granite sealing and restoration services. Mantenha seu investimento protegido!',
        ctaButtonText: 'Book Sealing Service',
        ctaLink: 'https://www.SEU-DOMINIO.com/services'
    }
];

// Preenche formulário com dados fictícios para teste (alterna entre 5 versões)
function fillTestData() {
    // Formata data corretamente para datetime-local (YYYY-MM-DDTHH:MM)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Pega versão atual e prepara próxima
    const testData = { ...testDataVersions[currentTestVersion] };
    testData.datePublished = dateTimeLocal;
    
    const versionNumber = currentTestVersion + 1;
    
    // Avança para próxima versão (ciclo 1-5)
    currentTestVersion = (currentTestVersion + 1) % testDataVersions.length;
    
    // Preenche os campos
    Object.keys(testData).forEach(key => {
        if (key === 'internalImageUrl' || key === 'internalImageAlt') return; // Trata separadamente
        
        const field = document.getElementById(key);
        if (field) {
            field.value = testData[key];
            // Dispara evento para atualizar contadores de caracteres
            field.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    
    // Preenche imagem interna (primeira)
    const internalImageUrl = document.querySelector('[name="internalImageUrl[]"]');
    const internalImageAlt = document.querySelector('[name="internalImageAlt[]"]');
    if (internalImageUrl && testData.internalImageUrl) {
        internalImageUrl.value = testData.internalImageUrl;
        internalImageUrl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlt && testData.internalImageAlt) {
        internalImageAlt.value = testData.internalImageAlt;
        internalImageAlt.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Feedback visual com número da versão
    const statusDiv = document.getElementById('autoSaveStatus');
    if (statusDiv) {
        statusDiv.textContent = `🧪 Versão ${versionNumber}/5 carregada`;
        statusDiv.style.opacity = '1';
        statusDiv.style.color = '#28a745';
        setTimeout(() => {
            statusDiv.style.opacity = '0.5';
            statusDiv.style.color = '';
        }, 3000);
    }
    
    console.log(`✅ Formulário preenchido com dados de teste (Versão ${versionNumber}/5)`);
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
 * Suporta formatos:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * @param {string} url - URL original do Google Drive
 * @returns {string} - URL direta da imagem ou URL original se não for do Google Drive
 */
function convertGoogleDriveUrl(url) {
    if (!url || typeof url !== 'string') {
        return url;
    }
    
    url = url.trim();
    
    // Verifica se é uma URL do Google Drive
    if (!url.includes('drive.google.com')) {
        return url; // Não é do Google Drive, retorna URL original
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
    
    // Se encontrou o ID, converte para URL direta
    if (fileId) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('✅ Google Drive URL convertida:', url, '->', convertedUrl);
        return convertedUrl;
    }
    
    // Se não encontrou nenhum padrão, retorna a URL original
    console.warn('⚠️ Não foi possível extrair o ID do arquivo do Google Drive:', url);
    return url;
}

/**
 * Processa todas as URLs de imagem em um texto HTML, convertendo Google Drive
 * @param {string} html - Conteúdo HTML com possíveis URLs do Google Drive
 * @returns {string} - HTML com URLs convertidas
 */
function processImagesInHtml(html) {
    if (!html) return html;
    
    // Remove lixo de templates que podem ter sido colados acidentalmente
    // Ex: "[SEMPRE use HTML formatado: <h2>, <h3>, <p>, <ul>, <li>]:" 
    // Quando isso é renderizado, as tags vazias são interpretadas e sobram só as vírgulas
    html = html.replace(/\[SEMPRE use[^\]]*\]:?/gi, '');
    html = html.replace(/\[\d+-\d+\s*palavras?\]:?/gi, '');
    html = html.replace(/\(SEMPRE use[^)]*\):?/gi, '');
    html = html.replace(/\(\d+-\d+\s*palavras?\):?/gi, '');
    
    // Remove padrões de vírgulas órfãs que sobram quando tags HTML vazias são removidas
    // Padrão: linhas que contêm apenas vírgulas, espaços e quebras de linha
    html = html.replace(/^[\s,]+$/gm, '');
    html = html.replace(/^,\s*$/gm, '');
    html = html.replace(/\n\s*,\s*\n/g, '\n');
    
    // Procura por tags img com src
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
    
    // Carrega dados salvos ao carregar a página
    loadFormFromLocalStorage();
    
    // Auto-save em todos os campos do formulário
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit') {
            field.addEventListener('input', scheduleAutoSave);
            field.addEventListener('change', scheduleAutoSave);
        }
    });
    
    // Botão de limpar campos
    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFormData);
    }
    
    // Botão de preencher dados de teste
    const fillTestBtn = document.getElementById('fillTestData');
    if (fillTestBtn) {
        fillTestBtn.addEventListener('click', fillTestData);
    }
    
    // Salva antes de sair da página
    window.addEventListener('beforeunload', function() {
        saveFormToLocalStorage();
    });
    
    console.log('✅ Sistema de auto-save ativado');
    
    // ======================
    // FORM BEHAVIORS
    // ======================
    
    // Auto-gera slug quando o título muda
    h1TitleInput.addEventListener('input', function() {
        const slug = removeStopwords(generateSlug(this.value));
        slugInput.value = slug;
        
        // Atualiza contador de caracteres
        const counter = this.parentElement.querySelector('.char-counter');
        updateCharCounter(this, counter);
    });
    
    // Auto-preenche meta title com H1 se estiver vazio
    h1TitleInput.addEventListener('blur', function() {
        const metaTitleInput = document.getElementById('metaTitle');
        if (!metaTitleInput.value && this.value) {
            metaTitleInput.value = this.value;
        }
    });
    
    // Sugere alt text baseado na keyword
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
    
    // Botões de adicionar campos dinâmicos
    setupDynamicFields();
    
    // Editor toolbar buttons
    setupEditorToolbar();
    
    // Preview button
    document.getElementById('previewBtn').addEventListener('click', showPreview);
    
    // Form submit
    form.addEventListener('submit', handleFormSubmit);
    
    // Modal close
    setupModals();
});

// ======================
// DYNAMIC FIELDS
// ======================

function setupDynamicFields() {
    // Adicionar imagens internas
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
    
    // Adicionar links internos
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
    
    // Adicionar links externos
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
    
    // Remove buttons existentes
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
    
    // Debug: mostra quantas imagens internas foram coletadas
    console.log('📸 Imagens Internas no Preview:', formData.internalImages);
    console.log('🔗 URLs das imagens:', formData.internalImages?.map(img => img.url) || []);
    console.log('📦 Total de imagens:', formData.internalImages?.length || 0);
    
    const previewHtml = generateFullPreviewPage(formData);
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) {
        alert('⚠️ Bloqueador de pop-up detectado! Por favor, permita pop-ups para este site.');
        return;
    }
    previewWindow.document.open();
    previewWindow.document.write(previewHtml);
    previewWindow.document.close();
}

// ======================
// GERADOR DE FORMULÁRIO DE LEAD (MINIMALISTA)
// ======================
function generateLeadFormHtml(data) {
    // Se não tiver nenhum campo marcado, retorna vazio
    if (!(data.formCollectName || data.formCollectEmail || data.formCollectPhone)) {
        return '';
    }
    
    // Detecta idioma baseado no conteúdo
    const contentText = (data.h1Title || '') + ' ' + (data.contentBody || '');
    const isEnglish = /\b(the|and|for|with|your|home|how|what|why|best|guide|tips)\b/i.test(contentText);
    
    // Textos por idioma
    const i18n = isEnglish ? {
        title: data.formTitle || 'Get Your Free Quote',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        phonePlaceholder: '(000) 000-0000',
        button: data.formButtonText || 'Get Started'
    } : {
        title: data.formTitle || 'Solicite um Orçamento',
        namePlaceholder: 'Seu nome',
        emailPlaceholder: 'seu@email.com',
        phonePlaceholder: '(00) 00000-0000',
        button: data.formButtonText || 'Começar Agora'
    };
    
    // Gera os campos do formulário
    let formFields = '';
    if (data.formCollectName) {
        formFields += `<input type="text" name="name" placeholder="${i18n.namePlaceholder}" required style="flex: 1; min-width: 150px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">`;
    }
    if (data.formCollectEmail) {
        formFields += `<input type="email" name="email" placeholder="${i18n.emailPlaceholder}" required style="flex: 1; min-width: 180px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">`;
    }
    if (data.formCollectPhone) {
        formFields += `<input type="tel" name="phone" placeholder="${i18n.phonePlaceholder}" required style="flex: 1; min-width: 140px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">`;
    }
    
    return `
        <!-- LEAD CAPTURE FORM - MINIMALISTA -->
        <section style="margin: 50px 0; padding: 35px 25px; background: rgba(235, 122, 61, 0.08); border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; color: #EB7A3D; margin: 0 0 25px 0; font-weight: 600;">${i18n.title}</h3>
            <form id="leadCaptureForm" data-webhook="${data.webhookUrl || ''}" style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 600px; margin: 0 auto;">
                ${formFields}
                <button type="submit" style="padding: 14px 28px; background: #EB7A3D; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; white-space: nowrap;">${i18n.button}</button>
            </form>
            <div id="formMessage" style="margin-top: 15px; font-size: 0.9rem; display: none;"></div>
        </section>`;
}

function generateFullPreviewPage(data) {
    // Debug de imagens
    console.log('🎨 Gerando preview com dados:', {
        totalImagens: data.internalImages?.length || 0,
        imagens: data.internalImages
    });
    
    // Processa o conteúdo e distribui as imagens ao longo dele
    let contentWithImages = data.contentBody || '<p>Conteúdo do post será exibido aqui...</p>';
    
    if (data.internalImages && data.internalImages.length > 0) {
        // Filtra imagens válidas e remove duplicatas da imagem de capa
        const validImages = data.internalImages.filter(img => {
            if (!img.url || img.url.trim() === '') return false;
            // Remove se for a mesma URL da imagem de capa (evita duplicação)
            if (data.coverImage && img.url.trim() === data.coverImage.trim()) {
                console.log('⚠️ Imagem interna ignorada (mesma URL da capa):', img.url);
                return false;
            }
            return true;
        });
        
        // Limita a 3 imagens para manter proporção consistente
        const imagesToUse = validImages.slice(0, 3);
        
        if (imagesToUse.length > 0) {
            console.log(`🎨 Distribuindo ${imagesToUse.length} imagens ao longo do conteúdo`);
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentWithImages;
            
            // Encontra todos os H2 para distribuir imagens
            const h2Elements = tempDiv.querySelectorAll('h2');
            const h2Array = Array.from(h2Elements);
            
            // SISTEMA ADAPTÁVEL:
            // - 1ª imagem: FULL WIDTH - destaque principal (grande)
            // - 2ª imagem: LEFT - menor, texto flui ao lado
            // - 3ª imagem: LEFT - menor, texto flui ao lado
            const layoutSequence = ['image-full', 'image-left', 'image-left'];
            
            imagesToUse.forEach((img, index) => {
                const layout = layoutSequence[index];
                
                // Cria o elemento de imagem com clearfix automático para full
                const needsClear = layout === 'image-full' ? ' style="clear:both;"' : '';
                const imageHTML = `
                    <figure class="dynamic-image ${layout}"${needsClear}>
                        <img src="${img.url}" 
                             alt="${img.alt || 'Imagem do artigo'}" 
                             loading="lazy">
                        ${img.alt ? `<figcaption>${img.alt}</figcaption>` : ''}
                    </figure>
                `;
                
                // Distribui as imagens de forma inteligente
                if (index === 0) {
                    // 1ª imagem: após o primeiro H2 (ou no início se não houver)
                    if (h2Array[0]) {
                        h2Array[0].insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('afterbegin', imageHTML);
                    }
                } else if (index === 1) {
                    // 2ª imagem: após o segundo H2 (ou terceiro se não houver segundo)
                    const targetH2 = h2Array[1] || h2Array[2] || h2Array[h2Array.length - 1];
                    if (targetH2) {
                        targetH2.insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('beforeend', imageHTML);
                    }
                } else if (index === 2) {
                    // 3ª imagem: após o terceiro H2 ou quarto
                    const targetH2 = h2Array[3] || h2Array[2] || h2Array[h2Array.length - 1];
                    if (targetH2 && targetH2 !== h2Array[1]) {
                        targetH2.insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('beforeend', imageHTML);
                    }
                }
            });
            
            contentWithImages = tempDiv.innerHTML;
            console.log(`✅ ${imagesToUse.length} imagens distribuídas`);
        } else {
            console.log('⚠️ Nenhuma imagem válida encontrada');
        }
    } else {
        console.log('⚠️ Nenhuma imagem interna fornecida');
    }
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pré-visualização: ${data.h1Title || 'Novo Post'}</title>
    <link rel="stylesheet" href="assets/css/blog-post.css">
    <style>
        /* Banner de Preview */
        body::before {
            content: "👁️ MODO PREVIEW - Este é o layout exato do post publicado";
            display: block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 15px;
            font-weight: bold;
            font-size: 14px;
            position: sticky;
            top: 0;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .category-badge {
            display: inline-block;
            padding: 6px 16px;
            background: #EB7A3D;
            color: #fff;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        h1 {
            font-family: 'Mazzard H', sans-serif;
            font-size: 2.5rem;
            color: #fff;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        .meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.95rem;
        }
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .cover-image {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            object-position: center;
            border-radius: 16px;
            margin: 30px 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
        }
        .content p {
            margin-bottom: 20px;
        }
        .content h2 {
            font-family: 'Mazzard H', sans-serif;
            font-size: 2rem;
            color: #EB7A3D;
            margin-top: 40px;
            margin-bottom: 20px;
            clear: both;
        }
        .content h3 {
            font-size: 1.5rem;
            color: #fff;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        /* Apenas listas ficam abaixo das imagens - parágrafos fluem ao lado */
        .content ul, .content ol,
        .post-content ul, .post-content ol {
            margin-left: 30px;
            margin-bottom: 20px;
            overflow: hidden;
            clear: both;
        }
        .content li, .post-content li {
            margin-bottom: 10px;
        }
        /* Parágrafos fluem ao lado das imagens */
        .content p, .post-content p {
            overflow: hidden;
        }
        
        /* Layouts de Imagens Dinâmicos */
        .main-content {
            overflow: auto;
        }
        
        /* Container para imagens laterais - NÃO faz clear */
        .image-container {
            margin: 20px 0;
        }
        .image-container.image-full {
            clear: both;
            margin: 40px 0;
        }
        
        .dynamic-image {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .dynamic-image.image-left {
            float: left;
            width: 40%;
            max-width: 450px;
            margin: 0 25px 15px 0;
        }
        
        .dynamic-image.image-right {
            float: right;
            width: 40%;
            max-width: 450px;
            margin: 0 0 15px 25px;
        }
        
        .dynamic-image.image-full {
            width: 100%;
            max-width: 100%;
            margin: 30px 0;
            clear: both;
        }
        
        .dynamic-image img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 10;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .dynamic-image img:hover {
            transform: scale(1.02);
        }
        
        .dynamic-image figcaption {
            padding: 12px 15px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
            background: rgba(0, 0, 0, 0.3);
        }
        
        /* Clearfix para floats */
        .content::after,
        .main-content::after,
        .post-content::after {
            content: "";
            display: table;
            clear: both;
        }
        
        /* Responsivo */
        @media (max-width: 768px) {
            .image-container,
            .image-container.image-left,
            .image-container.image-right {
                clear: both;
            }
            .dynamic-image.image-left,
            .dynamic-image.image-right {
                float: none;
                width: 100%;
                max-width: 100%;
                margin: 20px 0;
            }
            
            .preview-container {
                padding: 30px 20px;
            }
        }
        
        .internal-images figure {
            margin: 30px 0;
            overflow: hidden;
            border-radius: 12px;
        }
        .internal-images img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            object-position: center;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }
        .internal-images img:hover {
            transform: scale(1.02);
        }
        .internal-images figcaption {
            margin-top: 12px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
            text-align: center;
        }
        .tags {
            margin: 40px 0;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tag {
            display: inline-block;
            padding: 6px 14px;
            background: rgba(235, 122, 61, 0.15);
            color: #EB7A3D;
            border: 1px solid rgba(235, 122, 61, 0.3);
            border-radius: 20px;
            font-size: 0.85rem;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .preview-notice {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(235, 122, 61, 0.95);
            color: #fff;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 20px rgba(235, 122, 61, 0.4);
            z-index: 1000;
        }
        
        /* Header com Logo */
        .site-header {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-logo {
            height: 40px;
            width: auto;
        }
        .header-nav {
            display: flex;
            gap: 30px;
            align-items: center;
        }
        .header-nav a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }
        .header-nav a:hover {
            color: #EB7A3D;
        }
        
        /* Footer com Logo */
        .site-footer {
            background: rgba(255, 255, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 60px 30px 40px;
            margin-top: 80px;
            text-align: center;
        }
        .footer-container {
            max-width: 900px;
            margin: 0 auto;
        }
        .footer-logo {
            height: 50px;
            width: auto;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .footer-tagline {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            margin-bottom: 10px;
        }
        .footer-subtitle {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.9rem;
            margin-bottom: 20px;
        }
        .footer-love {
            color: #EB7A3D;
        }
        .footer-copyright {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.85rem;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        @media (max-width: 768px) {
            .header-container {
                flex-direction: column;
                gap: 15px;
            }
            .header-nav {
                gap: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <header class="site-header">
        <div class="header-container">
            <img src="../assets/images/logo-mediagrowth.webp" alt="MediaGrowth" class="header-logo">
            <nav class="header-nav">
                <a href="https://mediagrowth.com.br">Site Oficial</a>
                <a href="https://blogs.mediagrowth.com.br">Ver Todos os Blogs</a>
            </nav>
        </div>
    </header>

    <!-- ARTICLE CONTAINER -->
    <article class="blog-post">
        <!-- HEADER -->
        <header class="post-header">
            <!-- CATEGORY BADGE -->
            <div class="post-meta-top">
                <span class="category-badge">${data.category || 'Categoria'}</span>
                <span class="read-time">⏱️ ${data.readTime || '5'} min de leitura</span>
            </div>
            
            <!-- H1 TITLE -->
            <h1 class="post-title">${data.h1Title || 'Título do Post'}</h1>
            
            <!-- AUTHOR & DATE -->
            <div class="post-meta">
                <div class="author-info">
                    <img src="${data.authorAvatar || 'https://via.placeholder.com/100'}" alt="${data.author || 'Autor'}" class="author-avatar">
                    <div>
                        <span class="author-name">${data.author || 'Autor'}</span>
                        <time datetime="${data.datePublishedISO || new Date().toISOString()}" class="publish-date">${data.datePublishedFormatted || new Date().toLocaleDateString('pt-BR')}</time>
                    </div>
                </div>
                <div class="post-actions">
                    <button class="share-btn" aria-label="Compartilhar">🔗 Compartilhar</button>
                </div>
            </div>
        </header>

        <!-- COVER IMAGE -->
        <figure class="post-cover">
            <img src="${data.coverImage || 'https://via.placeholder.com/1200x630'}" 
                 alt="${data.coverImageAlt || 'Imagem de capa'}" 
                 width="1200" 
                 height="630"
                 loading="eager">
            <figcaption>${data.coverImageCaption || ''}</figcaption>
        </figure>

        <!-- INTRODUCTION -->
        <div class="post-intro">
            ${data.introduction || '<p>Introdução do post...</p>'}
        </div>

        <!-- MAIN CONTENT -->
        <div class="post-content">
            ${contentWithImages}
        </div>

        <!-- CONCLUSION -->
        <div class="post-conclusion">
            ${data.conclusion || '<p>Conclusão do post...</p>'}
        </div>
        
        ${generateLeadFormHtml(data)}

        <!-- TAGS -->
        <footer class="post-footer">
            <div class="tags">
                <strong>Tags:</strong>
                ${data.tagsArray ? data.tagsArray.map(tag => `<span class="tag">#${tag}</span>`).join(' ') : ''}
            </div>
        </footer>
    </article>

    <!-- RELATED POSTS -->
    <aside class="related-posts">
        <h2>${/\b(the|and|for|with|your|home|how|what|why|best|guide|tips)\b/i.test(data.h1Title || '') ? 'Related Posts' : 'Posts Relacionados'}</h2>
        <div class="related-grid" id="relatedGrid">
            <p style="text-align: center; color: rgba(255,255,255,0.5);">Loading...</p>
        </div>
    </aside>

    <!-- FOOTER -->
    <footer class="site-footer">
        <div class="footer-container">
            <img src="../assets/images/logo-mediagrowth.webp" alt="MediaGrowth" class="footer-logo">
            <p class="footer-tagline">Blog desenvolvido pela MediaGrowth</p>
            <p class="footer-subtitle">Feito com <span class="footer-love">♥</span> e tecnologia</p>
            <p class="footer-copyright">© ${new Date().getFullYear()} MediaGrowth. Todos os direitos reservados.</p>
        </div>
    </footer>

    <!-- BACK TO TOP -->
    <button id="backToTop" class="back-to-top" aria-label="Voltar ao topo">↑</button>

    <!-- SCRIPTS -->
    <script src="assets/js/blog-post.js"></script>
</body>
</html>`;
}

// ======================
// FORM SUBMIT
// ======================

// Variável global para armazenar o último HTML gerado
let lastGeneratedHtml = null;
let lastGeneratedSlug = null;

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Mostra loading
    showLoading();
    
    try {
        // Coleta dados do formulário
        const formData = collectFormData();
        
        console.log('📦 Dados coletados:', formData);
        console.log('🖼️ Imagens internas:', formData.internalImages);
        
        // Gera HTML do post
        const postHtml = await generatePostHtml(formData);
        
        console.log('📄 HTML gerado, tamanho:', postHtml.length, 'caracteres');
        console.log('📄 Primeiros 100 chars do HTML:', postHtml.substring(0, 100));
        
        // Salva HTML globalmente para permitir download posterior
        lastGeneratedHtml = postHtml;
        lastGeneratedSlug = formData.slug;
        
        console.log('💾 HTML salvo globalmente!');
        console.log('💾 lastGeneratedHtml length:', lastGeneratedHtml.length);
        console.log('💾 lastGeneratedSlug:', lastGeneratedSlug);
        
        // Gera o post para download (GitHub Pages workflow)
        const result = await savePostToServer(postHtml, formData.slug);
        
        // Mostra sucesso (mesmo que tenha sido download)
        showSuccess(formData.slug, result);
        
    } catch (error) {
        console.error('❌ Erro ao gerar post:', error);
        alert('Erro ao gerar o post: ' + error.message);
    } finally {
        hideLoading();
    }
}

async function savePostToServer(html, slug) {
    // Verifica se há token GitHub configurado
    const githubToken = localStorage.getItem('github_token');
    
    if (githubToken) {
        // ✅ Token configurado - publica automaticamente no GitHub
        console.log('🚀 Token GitHub encontrado! Publicando automaticamente...');
        
        try {
            const publisher = window.initGitHubPublisher();
            
            if (publisher) {
                console.log('📤 Enviando post para GitHub /posts/...');
                await publisher.savePost(slug, html);
                const publicUrl = publisher.getPublicUrl(slug);
                
                console.log('✅ Post publicado com sucesso!');
                console.log('🔗 URL:', publicUrl);
                
                return {
                    success: true,
                    method: 'github-api',
                    filename: slug + '.html',
                    url: publicUrl,
                    message: '✅ Post publicado automaticamente no GitHub!'
                };
            }
        } catch (error) {
            console.error('❌ Erro ao publicar no GitHub:', error);
            console.warn('⚠️ Fallback para download manual...');
            // Continua para download manual como fallback
        }
    }
    
    // ❌ Sem token ou erro - usa download manual
    console.log('📥 Preparando post para download manual...');
    return savePostAsDownload(html, slug);
}

function savePostAsDownload(html, slug) {
    console.log('📥 Preparando download do post...');
    console.log('📏 Tamanho do HTML:', html.length, 'caracteres');
    
    if (!html || html.trim().length === 0) {
        console.error('❌ HTML vazio!');
        throw new Error('HTML está vazio');
    }
    
    // Download será feito manualmente pelo botão no modal
    // Depois, o arquivo deve ser commitado no GitHub
    
    return {
        success: true,
        method: 'download',
        filename: slug + '.html',
        message: '✅ Post gerado! Use o botão "📥 Baixar HTML" para baixar e depois faça commit no GitHub.'
    };
}


function collectFormData() {
    const form = document.getElementById('blogForm');
    const formData = new FormData(form);
    
    // Data de publicação
    let datePublished = formData.get('datePublished');
    if (!datePublished) {
        datePublished = new Date();
    } else {
        datePublished = new Date(datePublished);
    }
    
    // Tempo de leitura
    let readTime = formData.get('readTime');
    if (!readTime) {
        const allText = formData.get('introduction') + ' ' + 
                       formData.get('contentBody') + ' ' + 
                       formData.get('conclusion');
        readTime = calculateReadTime(allText);
    }
    
    // Processa arrays
    const internalImages = [];
    const internalImageUrls = formData.getAll('internalImageUrl[]');
    const internalImageAlts = formData.getAll('internalImageAlt[]');
    
    console.log('🔍 Debug - Coletando imagens do formulário:');
    console.log('  - URLs encontradas:', internalImageUrls.length);
    console.log('  - Alts encontrados:', internalImageAlts.length);
    console.log('  - URLs raw:', internalImageUrls);
    
    for (let i = 0; i < internalImageUrls.length; i++) {
        const rawUrl = internalImageUrls[i];
        const url = rawUrl ? rawUrl.trim() : '';
        
        console.log(`  � Processando imagem ${i+1}/${internalImageUrls.length}:`, {
            index: i,
            rawUrl: rawUrl,
            urlTrimmed: url,
            urlLength: url.length,
            isEmpty: !url || url.length === 0,
            isPlaceholder: url.includes('[URL') || url.includes('URL]')
        });
        
        // Aceita URLs válidas (não vazias e não placeholders)
        if (url && url.length > 0 && !url.includes('[URL') && !url.includes('URL]')) {
            const convertedUrl = convertGoogleDriveUrl(url);
            const imgObj = {
                url: convertedUrl,
                alt: internalImageAlts[i] || `Imagem ${i+1}`
            };
            internalImages.push(imgObj);
            console.log(`  ✅ Imagem ${i+1} adicionada:`, imgObj);
        } else {
            console.log(`  ⚠️ Imagem ${i+1} ignorada (vazia, inválida ou placeholder)`);
        }
    }
    
    console.log('📦 Total de imagens internas processadas:', internalImages.length);
    console.log('📸 Array final de imagens:', internalImages);
    
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
    
    // Tags
    const tagsString = formData.get('tags');
    const tagsArray = tagsString.split(',').map(t => t.trim()).filter(t => t);
    
    // Keywords
    const allKeywords = [
        formData.get('primaryKeyword'),
        ...formData.get('secondaryKeywords').split(',').map(k => k.trim()).filter(k => k)
    ].join(', ');
    
    const slug = formData.get('slug');
    const siteUrl = formData.get('siteUrl').replace(/\/$/, '');
    const categorySlug = generateSlug(formData.get('category'));
    
    return {
        // Bloco 1
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
        
        // Bloco 2
        primaryKeyword: formData.get('primaryKeyword'),
        secondaryKeywords: formData.get('secondaryKeywords'),
        keywords: allKeywords,
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
        searchIntent: formData.get('searchIntent'),
        
        // Bloco 3
        coverImage: convertGoogleDriveUrl(formData.get('coverImage')), // Converte Google Drive
        coverImageAlt: formData.get('coverImageAlt'),
        coverImageCaption: formData.get('coverImageCaption') || '',
        internalImages: internalImages,
        
        // Bloco 4
        introduction: processImagesInHtml(formData.get('introduction')), // Converte URLs do Drive no HTML
        contentBody: processImagesInHtml(formData.get('contentBody')),   // Converte URLs do Drive no HTML
        conclusion: processImagesInHtml(formData.get('conclusion')),     // Converte URLs do Drive no HTML
        
        // Bloco 5
        internalLinks: internalLinks,
        externalLinks: externalLinks,
        
        // Bloco 6
        tags: tagsString,
        tagsArray: tagsArray,
        relatedPosts: formData.get('relatedPosts'),
        
        // Bloco 7 - Formulário
        formTitle: formData.get('formTitle'),
        formSubtitle: formData.get('formSubtitle'),
        formButtonText: formData.get('formButtonText'),
        webhookUrl: formData.get('webhookUrl'),
        campaignName: formData.get('campaignName'),
        qualifiedQuestion: formData.get('qualifiedQuestion') || '',
        formCollectEmail: formData.get('formCollectEmail') === 'on',
        formCollectPhone: formData.get('formCollectPhone') === 'on',
        formCollectName: formData.get('formCollectName') === 'on',
        
        // Bloco 8
        siteUrl: siteUrl,
        siteLogo: formData.get('siteLogo') || `${siteUrl}/logo.png`,
        enableComments: formData.get('enableComments') === 'on',
        enableShare: formData.get('enableShare') === 'on',
        
        // URLs
        canonicalUrl: `${siteUrl}/blog/${slug}`,
        blogUrl: `${siteUrl}/blog`,
        categoryUrl: `${siteUrl}/blog/${categorySlug}`
    };
}

async function generatePostHtml(data) {
    console.log('📥 Gerando HTML do post (mesmo formato do preview)...');
    
    // Sanitiza URLs para prevenir JavaScript injection
    const sanitizeUrl = (url) => {
        if (!url) return '';
        const urlStr = String(url).trim();
        const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
        if (dangerousProtocols.test(urlStr)) return '';
        return urlStr;
    };
    
    // Sanitiza conteúdo HTML
    const sanitizeHtmlContent = (html) => {
        if (!html) return '';
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/data:text\/html/gi, '');
    };
    
    // Processa o conteúdo e distribui as imagens ao longo dele
    let contentWithImages = sanitizeHtmlContent(data.contentBody) || '<p>Conteúdo do post...</p>';
    
    if (data.internalImages && data.internalImages.length > 0) {
        // Filtra imagens válidas e remove duplicatas da imagem de capa
        const validImages = data.internalImages.filter(img => {
            if (!img.url || img.url.trim() === '') return false;
            // Remove se for a mesma URL da imagem de capa (evita duplicação)
            if (data.coverImage && img.url.trim() === data.coverImage.trim()) {
                console.log('⚠️ Imagem interna ignorada (mesma URL da capa):', img.url);
                return false;
            }
            return true;
        });
        
        // Limita a 3 imagens para manter proporção consistente
        const imagesToUse = validImages.slice(0, 3);
        
        if (imagesToUse.length > 0) {
            console.log(`🎨 Distribuindo ${imagesToUse.length} imagens ao longo do conteúdo`);
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentWithImages;
            
            // Encontra todos os H2 para distribuir imagens
            const h2Elements = tempDiv.querySelectorAll('h2');
            const h2Array = Array.from(h2Elements);
            
            // SISTEMA ADAPTÁVEL:
            // - 1ª imagem: FULL WIDTH - destaque principal (grande)
            // - 2ª imagem: LEFT - menor, texto flui ao lado
            // - 3ª imagem: LEFT - menor, texto flui ao lado
            const layoutSequence = ['image-full', 'image-left', 'image-left'];
            
            imagesToUse.forEach((img, index) => {
                const layout = layoutSequence[index];
                
                // Cria o elemento de imagem com clearfix automático para full
                const needsClear = layout === 'image-full' ? ' style="clear:both;"' : '';
                const imageHTML = `
                    <figure class="dynamic-image ${layout}"${needsClear}>
                        <img src="${sanitizeUrl(img.url)}" 
                             alt="${escapeHtml(img.alt || 'Imagem do artigo')}" 
                             loading="lazy">
                        ${img.alt ? `<figcaption>${escapeHtml(img.alt)}</figcaption>` : ''}
                    </figure>
                `;
                
                // Distribui as imagens de forma inteligente
                if (index === 0) {
                    // 1ª imagem: após o primeiro H2 (ou no início se não houver)
                    if (h2Array[0]) {
                        h2Array[0].insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('afterbegin', imageHTML);
                    }
                } else if (index === 1) {
                    // 2ª imagem: após o segundo H2 (ou terceiro se não houver segundo)
                    const targetH2 = h2Array[1] || h2Array[2] || h2Array[h2Array.length - 1];
                    if (targetH2) {
                        targetH2.insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('beforeend', imageHTML);
                    }
                } else if (index === 2) {
                    // 3ª imagem: após o terceiro H2 ou quarto
                    const targetH2 = h2Array[3] || h2Array[2] || h2Array[h2Array.length - 1];
                    if (targetH2 && targetH2 !== h2Array[1]) {
                        targetH2.insertAdjacentHTML('afterend', imageHTML);
                    } else {
                        tempDiv.insertAdjacentHTML('beforeend', imageHTML);
                    }
                }
            });
            
            contentWithImages = tempDiv.innerHTML;
            console.log(`✅ ${imagesToUse.length} imagens distribuídas`);
        }
    }
    
    // Gera HTML das tags (não clicáveis)
    const tagsHtml = data.tagsArray ? data.tagsArray.map(tag => 
        `<span class="tag">#${escapeHtml(tag)}</span>`
    ).join(' ') : '';
    
    // Detecta idioma baseado no conteúdo
    const contentText = (data.h1Title || '') + ' ' + (data.contentBody || '');
    const isEnglish = /\b(the|and|for|with|your|home|how|what|why|best|guide|tips)\b/i.test(contentText);
    
    // Textos por idioma
    const i18n = isEnglish ? {
        title: data.formTitle || 'Get Your Free Quote',
        name: 'Your name',
        email: 'your@email.com',
        phone: '(000) 000-0000',
        button: data.formButtonText || 'Get Started',
        sending: 'Sending...',
        success: '✅ Message sent! We will contact you soon.',
        error: '❌ Error sending. Try again.'
    } : {
        title: data.formTitle || 'Solicite um Orçamento',
        name: 'Seu nome',
        email: 'seu@email.com',
        phone: '(00) 00000-0000',
        button: data.formButtonText || 'Começar Agora',
        sending: 'Enviando...',
        success: '✅ Mensagem enviada! Entraremos em contato em breve.',
        error: '❌ Erro ao enviar. Tente novamente.'
    };
    
    // Gera o formulário minimalista
    const showLeadForm = data.formCollectName || data.formCollectEmail || data.formCollectPhone;
    const leadFormHtml = showLeadForm ? `
        <!-- LEAD CAPTURE FORM - MINIMALISTA -->
        <section class="lead-capture-section" style="margin: 50px 0; padding: 35px 25px; background: rgba(235, 122, 61, 0.08); border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; color: #EB7A3D; margin: 0 0 25px 0; font-weight: 600;">${escapeHtml(i18n.title)}</h3>
            
            <form id="leadCaptureForm" data-webhook="${sanitizeUrl(data.webhookUrl || '')}" style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 600px; margin: 0 auto;">
                ${data.formCollectName ? `<input type="text" name="name" placeholder="${escapeHtml(i18n.name)}" required style="flex: 1; min-width: 150px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">` : ''}
                ${data.formCollectEmail ? `<input type="email" name="email" placeholder="${escapeHtml(i18n.email)}" required style="flex: 1; min-width: 180px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">` : ''}
                ${data.formCollectPhone ? `<input type="tel" name="phone" placeholder="${escapeHtml(i18n.phone)}" required style="flex: 1; min-width: 140px; padding: 14px 16px; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; background: rgba(255,255,255,0.05); color: #fff; font-size: 0.95rem;">` : ''}
                <button type="submit" style="padding: 14px 28px; background: #EB7A3D; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; white-space: nowrap;">${escapeHtml(i18n.button)}</button>
            </form>
            <div id="formMessage" style="margin-top: 15px; font-size: 0.9rem; display: none;"></div>
        </section>
        
        ${data.webhookUrl ? `<script>
        document.getElementById('leadCaptureForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const btn = this.querySelector('button[type="submit"]');
            const msg = document.getElementById('formMessage');
            
            btn.disabled = true;
            btn.textContent = '${escapeHtml(i18n.sending)}';
            
            try {
                const response = await fetch('${sanitizeUrl(data.webhookUrl)}', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get('name') || '',
                        email: formData.get('email') || '',
                        phone: formData.get('phone') || '',
                        campaign_name: '${escapeHtml(data.campaignName || '')}',
                        page_name: '${escapeHtml(data.h1Title || '')}',
                        FONTE: window.location.href,
                        PLATAFORMA: 'BLOG'
                    })
                });
                
                if (response.ok) {
                    msg.style.display = 'block';
                    msg.style.color = '#4ade80';
                    msg.textContent = '${escapeHtml(i18n.success)}';
                    this.reset();
                } else { throw new Error(); }
            } catch (e) {
                msg.style.display = 'block';
                msg.style.color = '#f87171';
                msg.textContent = '${escapeHtml(i18n.error)}';
            } finally {
                btn.disabled = false;
                btn.textContent = '${escapeHtml(i18n.button)}';
            }
        });
        </script>` : ''}
    ` : '';
    
    // HTML COMPLETO - IGUAL AO PREVIEW
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO ESSENCIAL -->
    <title>${escapeHtml(data.metaTitle || data.h1Title)}</title>
    <meta name="description" content="${escapeHtml(data.metaDescription)}">
    <meta name="keywords" content="${escapeHtml(data.keywords)}">
    <meta name="author" content="${escapeHtml(data.author)}">
    
    <!-- CANONICAL -->
    <link rel="canonical" href="${sanitizeUrl(data.canonicalUrl)}">
    
    <!-- OPEN GRAPH -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(data.metaTitle || data.h1Title)}">
    <meta property="og:description" content="${escapeHtml(data.metaDescription)}">
    <meta property="og:image" content="${sanitizeUrl(data.coverImage)}">
    <meta property="og:url" content="${sanitizeUrl(data.canonicalUrl)}">
    <meta property="article:published_time" content="${data.datePublishedISO}">
    <meta property="article:modified_time" content="${data.dateModifiedISO}">
    <meta property="article:author" content="${escapeHtml(data.author)}">
    <meta property="article:section" content="${escapeHtml(data.category)}">
    
    <!-- TWITTER CARD -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(data.metaTitle || data.h1Title)}">
    <meta name="twitter:description" content="${escapeHtml(data.metaDescription)}">
    <meta name="twitter:image" content="${sanitizeUrl(data.coverImage)}">
    
    <!-- SCHEMA.ORG -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${escapeHtml(data.h1Title)}",
        "image": "${sanitizeUrl(data.coverImage)}",
        "author": { "@type": "Person", "name": "${escapeHtml(data.author)}" },
        "publisher": {
            "@type": "Organization",
            "name": "MediaGrowth",
            "logo": { "@type": "ImageObject", "url": "${sanitizeUrl(data.siteLogo)}" }
        },
        "datePublished": "${data.datePublishedISO}",
        "dateModified": "${data.dateModifiedISO}",
        "description": "${escapeHtml(data.metaDescription)}",
        "mainEntityOfPage": { "@type": "WebPage", "@id": "${sanitizeUrl(data.canonicalUrl)}" }
    }
    </script>
    
    <!-- STYLES -->
    <link rel="stylesheet" href="../assets/css/blog-post.css">
    
    <!-- FAVICON -->
    <link rel="icon" type="image/webp" href="../assets/images/faviconmd.webp">
    
    <style>
        /* Estilos adicionais para imagens dinâmicas e formulário */
        
        /* Container para imagens laterais - NÃO faz clear */
        .image-container {
            margin: 20px 0;
        }
        .image-container.image-full {
            clear: both;
            margin: 40px 0;
        }
        
        .dynamic-image {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .dynamic-image.image-left {
            float: left;
            width: 40%;
            max-width: 450px;
            margin: 0 25px 15px 0;
        }
        
        .dynamic-image.image-right {
            float: right;
            width: 40%;
            max-width: 450px;
            margin: 0 0 15px 25px;
        }
        
        .dynamic-image.image-full {
            width: 100%;
            max-width: 100%;
            margin: 30px 0;
            clear: both;
        }
        
        .dynamic-image img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 10;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .dynamic-image img:hover {
            transform: scale(1.02);
        }
        
        .dynamic-image figcaption {
            padding: 12px 15px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            font-style: italic;
            background: rgba(0, 0, 0, 0.3);
        }
        
        .post-content::after {
            content: "";
            display: table;
            clear: both;
        }
        
        /* Listas não colidem com imagens flutuantes */
        .post-content ul, .post-content ol {
            overflow: hidden;
            clear: both;
            margin-bottom: 20px;
        }
        .post-content h2, .post-content h3 {
            clear: both;
        }
        
        @media (max-width: 768px) {
            .image-container,
            .image-container.image-left,
            .image-container.image-right {
                clear: both;
            }
            .dynamic-image.image-left,
            .dynamic-image.image-right {
                float: none;
                width: 100%;
                max-width: 100%;
                margin: 20px 0;
            }
        }
        
        /* Lead Capture Form Styles */
        .lead-capture-section {
            margin: 60px 0;
            padding: 40px;
            background: linear-gradient(135deg, rgba(235, 122, 61, 0.1) 0%, rgba(235, 122, 61, 0.05) 100%);
            border: 1px solid rgba(235, 122, 61, 0.3);
            border-radius: 20px;
        }
        .lead-capture-container {
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        }
        .lead-capture-title {
            font-size: 1.8rem;
            color: #EB7A3D;
            margin-bottom: 10px;
        }
        .lead-capture-subtitle {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 30px;
        }
        .lead-capture-form .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        .lead-capture-form label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
        }
        .lead-capture-form input {
            width: 100%;
            padding: 14px 18px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        .lead-capture-form input:focus {
            outline: none;
            border-color: #EB7A3D;
            background: rgba(255, 255, 255, 0.1);
        }
        .lead-capture-form input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        .lead-capture-button {
            width: 100%;
            padding: 16px 32px;
            background: linear-gradient(135deg, #EB7A3D 0%, #d4692e 100%);
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        .lead-capture-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(235, 122, 61, 0.4);
        }
        .lead-capture-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        .form-message {
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            font-weight: 600;
            display: none;
        }
        .form-message.success {
            background: rgba(74, 222, 128, 0.2);
            color: #4ade80;
            display: block;
        }
        .form-message.error {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
            display: block;
        }
        
        /* Header com Logo */
        .site-header {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-logo {
            height: 40px;
            width: auto;
        }
        .header-nav {
            display: flex;
            gap: 30px;
            align-items: center;
        }
        .header-nav a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }
        .header-nav a:hover {
            color: #EB7A3D;
        }
        
        /* Footer com Logo */
        .site-footer {
            background: rgba(255, 255, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 60px 30px 40px;
            margin-top: 80px;
            text-align: center;
        }
        .footer-container {
            max-width: 900px;
            margin: 0 auto;
        }
        .footer-logo {
            height: 50px;
            width: auto;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .footer-tagline {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            margin-bottom: 10px;
        }
        .footer-subtitle {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.9rem;
            margin-bottom: 20px;
        }
        .footer-love {
            color: #EB7A3D;
        }
        .footer-copyright {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.85rem;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        @media (max-width: 768px) {
            .header-container {
                flex-direction: column;
                gap: 15px;
            }
            .header-nav {
                gap: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <header class="site-header">
        <div class="header-container">
            <img src="../assets/images/logo-mediagrowth.webp" alt="MediaGrowth" class="header-logo">
            <nav class="header-nav">
                <a href="https://mediagrowth.com.br">Site Oficial</a>
                <a href="https://blogs.mediagrowth.com.br">Ver Todos os Blogs</a>
            </nav>
        </div>
    </header>

    <!-- ARTICLE CONTAINER -->
    <article class="blog-post">
        <!-- HEADER -->
        <header class="post-header">
            <div class="post-meta-top">
                <span class="category-badge">${escapeHtml(data.category || 'Categoria')}</span>
                <span class="read-time">⏱️ ${data.readTime || '5'} min de leitura</span>
            </div>
            
            <h1 class="post-title">${escapeHtml(data.h1Title || 'Título do Post')}</h1>
            
            <div class="post-meta">
                <div class="author-info">
                    <img src="${sanitizeUrl(data.authorAvatar) || 'https://via.placeholder.com/100'}" alt="${escapeHtml(data.author)}" class="author-avatar">
                    <div>
                        <span class="author-name">${escapeHtml(data.author || 'Autor')}</span>
                        <time datetime="${data.datePublishedISO}" class="publish-date">${data.datePublishedFormatted || new Date().toLocaleDateString('pt-BR')}</time>
                    </div>
                </div>
                ${data.enableShare ? `
                <div class="post-actions">
                    <button class="share-btn" aria-label="Compartilhar" onclick="navigator.share ? navigator.share({title: '${escapeHtml(data.h1Title)}', url: window.location.href}) : alert('Link copiado!')">🔗 Compartilhar</button>
                </div>
                ` : ''}
            </div>
        </header>

        <!-- COVER IMAGE -->
        <figure class="post-cover">
            <img src="${sanitizeUrl(data.coverImage) || 'https://via.placeholder.com/1200x630'}" 
                 alt="${escapeHtml(data.coverImageAlt || 'Imagem de capa')}" 
                 width="1200" 
                 height="630"
                 loading="eager">
            ${data.coverImageCaption ? `<figcaption>${escapeHtml(data.coverImageCaption)}</figcaption>` : ''}
        </figure>

        <!-- INTRODUCTION -->
        <div class="post-intro">
            ${sanitizeHtmlContent(data.introduction) || '<p>Introdução do post...</p>'}
        </div>

        <!-- MAIN CONTENT -->
        <div class="post-content">
            ${contentWithImages}
        </div>

        <!-- CONCLUSION -->
        <div class="post-conclusion">
            ${sanitizeHtmlContent(data.conclusion) || '<p>Conclusão do post...</p>'}
        </div>
        
        ${leadFormHtml}

        <!-- TAGS -->
        <footer class="post-footer">
            <div class="tags">
                <strong>Tags:</strong>
                ${tagsHtml}
            </div>
        </footer>
    </article>

    <!-- RELATED POSTS -->
    <aside class="related-posts">
        <h2>${isEnglish ? 'Related Posts' : 'Posts Relacionados'}</h2>
        <div class="related-grid" id="relatedGrid">
            <p style="text-align: center; color: rgba(255,255,255,0.5);">${isEnglish ? 'Loading...' : 'Carregando...'}</p>
        </div>
    </aside>

    <!-- FOOTER -->
    <footer class="site-footer">
        <div class="footer-container">
            <img src="../assets/images/logo-mediagrowth.webp" alt="MediaGrowth" class="footer-logo">
            <p class="footer-tagline">Blog desenvolvido pela MediaGrowth</p>
            <p class="footer-subtitle">Feito com <span class="footer-love">♥</span> e tecnologia</p>
            <p class="footer-copyright">© ${new Date().getFullYear()} MediaGrowth. Todos os direitos reservados.</p>
        </div>
    </footer>

    <!-- BACK TO TOP -->
    <button id="backToTop" class="back-to-top" aria-label="${isEnglish ? 'Back to top' : 'Voltar ao topo'}">↑</button>

    <!-- SCRIPTS -->
    <script src="../assets/js/blog-post.js"></script>
</body>
</html>`;
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
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Click outside modal
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Success modal buttons
    document.getElementById('openPost')?.addEventListener('click', function() {
        // Abre o post gerado
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
    console.log('🎉 showSuccess chamado!');
    console.log('🎉 slug:', slug);
    console.log('🎉 result:', result);
    console.log('🎉 lastGeneratedHtml disponível?', !!lastGeneratedHtml);
    console.log('🎉 lastGeneratedSlug:', lastGeneratedSlug);
    
    const modal = document.getElementById('successModal');
    const pathElement = document.getElementById('postPath');
    
    // GitHub Pages workflow - mostra onde o arquivo deve ser salvo
    const postPath = `posts/${slug}.html`;
    pathElement.textContent = postPath;
    
    // Mostra mensagem adicional baseada no método usado
    const messageElement = document.querySelector('.success-message') || document.createElement('p');
    if (!document.querySelector('.success-message')) {
        messageElement.className = 'success-message';
        messageElement.style.marginTop = '10px';
        messageElement.style.fontSize = '0.9em';
        messageElement.style.color = '#666';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#f0f0f0';
        messageElement.style.borderRadius = '5px';
        modal.querySelector('.modal-content').appendChild(messageElement);
    }
    
    if (result && result.method === 'github-api') {
        // ✅ Publicado automaticamente via GitHub API
        messageElement.innerHTML = '🚀 <strong>Post publicado automaticamente no GitHub!</strong><br>O post já está online em <code>/posts/</code>. Aguarde ~1 minuto para o GitHub Pages atualizar.';
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.fontWeight = 'bold';
        
        // Se tiver URL, mostra
        if (result.url) {
            messageElement.innerHTML += `<br><br>🔗 <a href="${result.url}" target="_blank" style="color: #155724;">${result.url}</a>`;
        }
    } else if (result && result.method === 'download') {
        messageElement.innerHTML = '✅ <strong>Post gerado com sucesso!</strong><br>Baixe o HTML e faça commit na pasta <code>posts/</code> do GitHub.';
        messageElement.style.backgroundColor = '#fff3cd';
        messageElement.style.color = '#856404';
        messageElement.style.fontWeight = 'bold';
    } else {
        messageElement.textContent = '✅ Post gerado com sucesso!';
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
    }
    
    // Adiciona ou atualiza botão de download do HTML
    let downloadBtn = document.getElementById('downloadHtmlBtn');
    if (!downloadBtn) {
        downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadHtmlBtn';
        downloadBtn.className = 'btn-secondary';
        downloadBtn.style.marginTop = '15px';
        downloadBtn.style.padding = '10px 20px';
        downloadBtn.style.backgroundColor = '#007bff';
        downloadBtn.style.color = 'white';
        downloadBtn.style.border = 'none';
        downloadBtn.style.borderRadius = '5px';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.fontSize = '14px';
        downloadBtn.innerHTML = '📥 Baixar HTML Completo';
        
        modal.querySelector('.modal-content').appendChild(downloadBtn);
    }
    
    // Sempre atualiza o evento onclick para garantir que funcione
    downloadBtn.onclick = function() {
        console.log('🔍 Debug - Botão clicado!');
        console.log('🔍 Debug - lastGeneratedHtml existe?', !!lastGeneratedHtml);
        console.log('🔍 Debug - lastGeneratedSlug:', lastGeneratedSlug);
        
        if (lastGeneratedHtml && lastGeneratedSlug) {
            console.log('📥 Iniciando download manual do HTML...');
            console.log('📏 Tamanho:', lastGeneratedHtml.length, 'caracteres');
            
            try {
                const blob = new Blob([lastGeneratedHtml], { type: 'text/html; charset=utf-8' });
                console.log('📦 Blob criado, tamanho:', blob.size, 'bytes');
                
                const url = URL.createObjectURL(blob);
                console.log('🔗 URL criada:', url.substring(0, 50) + '...');
                
                const link = document.createElement('a');
                link.href = url;
                link.download = lastGeneratedSlug + '.html';
                
                console.log('📎 Link criado, filename:', link.download);
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                console.log('✅ Download concluído!');
                alert('✅ Download iniciado! Verifique sua pasta de downloads.');
            } catch (error) {
                console.error('❌ Erro ao criar download:', error);
                alert('❌ Erro ao criar download: ' + error.message);
            }
        } else {
            console.error('❌ HTML não disponível!');
            console.log('lastGeneratedHtml:', lastGeneratedHtml ? 'existe' : 'null');
            console.log('lastGeneratedSlug:', lastGeneratedSlug ? lastGeneratedSlug : 'null');
            alert('❌ Erro: HTML não disponível. Gere o post novamente.');
        }
    };
    
    modal.style.display = 'flex';
}

function showLoading() {
    // Você pode adicionar um spinner aqui
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// ======================
// TEMPLATE PARA IA
// ======================

// Botão copiar template
document.getElementById('copyTemplate')?.addEventListener('click', function() {
    const template = document.getElementById('aiTemplate');
    const status = document.getElementById('copyStatus');
    
    if (template) {
        const templateText = template.value;
        
        // Copia usando a API moderna
        if (navigator.clipboard) {
            navigator.clipboard.writeText(templateText).then(() => {
                // Mostra feedback de sucesso
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
            // Fallback para navegadores antigos
            template.select();
            
            try {
                document.execCommand('copy');
                status.textContent = '✅ Template copiado!';
                status.style.color = '#27ae60';
            } catch (err) {
                status.textContent = '❌ Erro ao copiar. Tente novamente.';
                status.style.color = '#e74c3c';
                console.error('Erro ao copiar:', err);
            }
            
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    }
});

// ======================
// EXPORT FUNCTIONS
// ======================

// ======================
// GITHUB INTEGRATION
// ======================

// Modal de configuração do GitHub
const githubModal = document.getElementById('githubModal');
const configBtn = document.getElementById('configGitHub');
const closeGithubModal = document.getElementById('closeGithubModal');
const saveTokenBtn = document.getElementById('saveToken');
const testTokenBtn = document.getElementById('testToken');
const githubTokenInput = document.getElementById('githubToken');
const tokenStatus = document.getElementById('tokenStatus');

// Abrir modal
configBtn?.addEventListener('click', () => {
    githubModal.style.display = 'flex';
    // Carregar token salvo (mascarado)
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
        githubTokenInput.value = '••••••••••••••••••••';
        tokenStatus.textContent = '✅ Token já configurado';
        tokenStatus.className = 'success';
    }
});

// Fechar modal
closeGithubModal?.addEventListener('click', () => {
    githubModal.style.display = 'none';
});

// Salvar token
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
    
    // Mascarar token
    setTimeout(() => {
        githubTokenInput.value = '••••••••••••••••••••';
    }, 1000);
});

// Testar conexão
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
        const result = await window.testGitHubConnection();
        tokenStatus.textContent = `✅ Conexão OK! Repositório: ${result.repo}`;
        tokenStatus.className = 'success';
    } catch (error) {
        tokenStatus.textContent = `❌ ${error.message}`;
        tokenStatus.className = 'error';
    }
});

// ======================
// AUTO-FILL FUNCTIONALITY
// ======================

document.addEventListener('DOMContentLoaded', function() {
    const autoFillBtn = document.getElementById('autoFillBtn');
    const clearAutofillBtn = document.getElementById('clearAutofillBtn');
    const aiAutofillText = document.getElementById('aiAutofillText');
    const autofillStatus = document.getElementById('autofillStatus');

    // Mapeamento de campos (suporta português e inglês)
    const fieldMapping = {
        // BLOCK 1
        'title principal|título principal|h1': 'h1Title',
        'slug|url amigável': 'slug',
        'category|categoria': 'category',
        'author|autor': 'author',
        'avatar do autor': 'authorAvatar',
        'data de publicação|date published': 'datePublished',
        'tempo de leitura': 'readTime',
        
        // BLOCK 2
        'palavra-chave principal|primary keyword': 'primaryKeyword',
        'palavras-chave secundárias|secondary keywords': 'secondaryKeywords',
        'meta title': 'metaTitle',
        'meta description': 'metaDescription',
        'intenção de busca|search intent': 'searchIntent',
        
        // BLOCK 3
        'url da imagem de capa|cover image url': 'coverImage',
        'alt text da imagem principal|cover image alt': 'coverImageAlt',
        'legenda da imagem|image caption': 'coverImageCaption',
        
        // BLOCK 4
        'introdução|introduction': 'introduction',
        'conteúdo principal|main content': 'contentBody',
        'conclusão|conclusion': 'conclusion',
        
        // BLOCK 6
        'tags do post|post tags': 'tags',
        'posts relacionados|related posts': 'relatedPosts',
        
        // BLOCK 7
        'título do formulário|form title': 'formTitle',
        'subtítulo|descrição do formulário|form subtitle': 'formSubtitle',
        'texto do botão|button text': 'formButtonText',
        'webhook url': 'webhookUrl',
        'nome da campanha|campaign name': 'campaignName',
        'pergunta qualificatória|qualifying question': 'qualifiedQuestion',
        
        // BLOCK 8
        'url base do site|site url': 'siteUrl',
        'url do logo': 'siteLogo'
    };

    // =========================================================================
    // 🔒 FUNÇÃO CRÍTICA: Auto-Preenchimento de Formulário
    // =========================================================================
    // ⚠️ ATENÇÃO: Esta função contém lógica crítica para coleta de HTML
    // 
    // ANTES DE MODIFICAR, LEIA: docs/updates/HTML-CONTENT-COLLECTION-PROTECTION.md
    //
    // Principais funcionalidades:
    // 1. Pré-processamento de HTML inline (quebra tags em linhas separadas)
    // 2. Coleta completa de conteúdo HTML (não para até "Conclusão:")
    // 3. Preenchimento automático de todos os campos do formulário
    // 4. Validação e logs detalhados
    //
    // ⚠️ NÃO MODIFICAR as seguintes seções sem testar completamente:
    //    - Flag isCollectingHTML
    //    - Detecção de início de HTML (hasHTML && !isCollectingHTML)
    //    - Continuação de coleta (hasHTML && isCollectingHTML)
    //    - Detecção de fim (isConclusionField)
    //    - Adição de linhas durante coleta
    //
    // Última modificação: 19/02/2026
    // Status: ✅ Testado e funcionando
    // =========================================================================
    
    autoFillBtn?.addEventListener('click', function() {
        const text = aiAutofillText.value.trim();
        
        if (!text) {
            showStatus('Por favor, cole o texto formatado antes de preencher.', 'error');
            return;
        }

        try {
            let lines = text.split('\n');
            
            // PRÉ-PROCESSAMENTO: Quebra HTML em linhas separadas
            console.log('🔧 Pré-processando HTML...');
            lines = lines.map(line => {
                // Verifica se a linha tem HTML inline (múltiplas tags em uma linha)
                if (/<(h[1-6]|p|ul|ol|li|div|strong|em)\b[^>]*>/i.test(line)) {
                    // Quebra tags em linhas separadas
                    let formattedLine = line
                        // Quebra antes de tags de abertura
                        .replace(/(<h[1-6][^>]*>)/gi, '\n$1')
                        .replace(/(<p[^>]*>)/gi, '\n$1')
                        .replace(/(<ul[^>]*>)/gi, '\n$1')
                        .replace(/(<ol[^>]*>)/gi, '\n$1')
                        .replace(/(<li[^>]*>)/gi, '\n$1')
                        // Quebra após tags de fechamento
                        .replace(/(<\/h[1-6]>)/gi, '$1\n')
                        .replace(/(<\/p>)/gi, '$1\n')
                        .replace(/(<\/ul>)/gi, '$1\n')
                        .replace(/(<\/ol>)/gi, '$1\n')
                        .replace(/(<\/li>)/gi, '$1\n');
                    
                    // Retorna array de linhas
                    return formattedLine.split('\n').filter(l => l.trim());
                }
                return line;
            }).flat(); // Achata arrays aninhados
            
            console.log('✅ HTML formatado! Linhas antes:', text.split('\n').length, '| depois:', lines.length);
            
            let fieldsCount = 0;
            let currentField = '';
            let currentValue = '';
            let internalImages = [];
            let internalLinks = [];
            let externalLinks = [];
            
            // ⚠️ CRITICAL: Flag para controle de coleta de HTML
            // Esta flag garante que TODO o conteúdo HTML seja capturado
            // NÃO MODIFICAR esta lógica sem testar completamente
            let isCollectingHTML = false;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                // ====================================================================
                // STEP 1: Pular linhas vazias e separadores FORA da coleta de HTML
                // ====================================================================
                if (!isCollectingHTML && (!line || line.startsWith('=') || line.startsWith('🧱') || line.startsWith('🧠') || 
                    line.startsWith('🖼️') || line.startsWith('✍️') || line.startsWith('🔗') || 
                    line.startsWith('🏷️') || line.startsWith('🚀') || line.startsWith('⚙️'))) {
                    continue;
                }
                
                // DEBUG: Log de linhas processadas durante coleta de HTML
                if (isCollectingHTML) {
                    console.log(`📄 Linha ${i}: ${line.substring(0, 60)}${line.length > 60 ? '...' : ''}`);
                }

                // ====================================================================
                // STEP 2: Detectar início de HTML (tags <h2>, <p>, <ul>, etc)
                // ====================================================================
                const hasHTML = /<(h[1-6]|p|ul|ol|li|div|span|strong|em|a)\b[^>]*>/i.test(line);
                
                // ⚠️ CRITICAL: Iniciar coleta quando encontrar primeira tag HTML
                // Não modificar esta condição sem entender o fluxo completo
                if (hasHTML && !isCollectingHTML) {
                    currentField = 'conteúdo principal';
                    currentValue = line; // Primeira linha do HTML
                    isCollectingHTML = true;
                    console.log('🎨 HTML detectado na linha', i + '! Iniciando coleta de Conteúdo Principal...');
                    console.log('📝 Primeira linha:', line.substring(0, 80));
                    continue;
                }
                
                // ⚠️ CRITICAL: Adicionar linhas HTML subsequentes
                // Se já está coletando e encontra mais HTML, SEMPRE adiciona
                if (hasHTML && isCollectingHTML) {
                    currentValue += '\n' + line;
                    console.log('➕ HTML linha:', line.substring(0, 50) + '...');
                    continue;
                }
                
                // ====================================================================
                // STEP 3: Processar linhas DURANTE coleta de HTML
                // ====================================================================
                if (isCollectingHTML) {
                    // ⚠️ CRITICAL: Detectar fim do conteúdo HTML
                    // Só para quando encontrar "Conclusão:" ou "Conclusion:"
                    const lowerLine = line.toLowerCase();
                    const isConclusionField = (lowerLine.startsWith('conclus') || lowerLine.startsWith('conclusion')) && line.includes(':');
                    
                    if (isConclusionField) {
                        // Salvar TODO o conteúdo HTML coletado
                        if (currentField && currentValue) {
                            setFieldValue(currentField, currentValue, fieldMapping);
                            fieldsCount++;
                            console.log('✅ Conteúdo HTML completo salvo! Total de linhas:', currentValue.split('\n').length);
                            console.log('📦 Primeiros 200 chars:', currentValue.substring(0, 200) + '...');
                        }
                        isCollectingHTML = false;
                        
                        // Processar o campo "Conclusão"
                        const parts = line.split(':');
                        currentField = parts[0].trim().toLowerCase();
                        currentValue = parts.slice(1).join(':').trim();
                        continue;
                    }
                    
                    // ⚠️ CRITICAL: Adicionar TODAS as linhas durante coleta
                    // Isso inclui: texto puro, linhas vazias, etc.
                    // Necessário para preservar a formatação HTML completa
                    currentValue += '\n' + line;
                    console.log('📝 Texto linha:', line.substring(0, 50) + '...');
                    continue;
                }

                // ====================================================================
                // STEP 4: Processar campos normais (fora de coleta de HTML)
                // ====================================================================
                if (line.includes(':') && !isCollectingHTML) {
                    // Salvar campo anterior se existir
                    if (currentField && currentValue) {
                        setFieldValue(currentField, currentValue, fieldMapping);
                        fieldsCount++;
                    }

                    // Extrair novo campo
                    const parts = line.split(':');
                    const fieldName = parts[0].trim().toLowerCase();
                    const fieldValue = parts.slice(1).join(':').trim();

                    // Detectar se é campo "Conteúdo Principal" com texto adicional
                    // Ex: "Conteúdo Principal [SEMPRE use HTML formatado: <h2>, <h3>, <p>, <ul>, <li>]:"
                    if (fieldName.includes('conteúdo principal') || fieldName.includes('main content')) {
                        currentField = 'conteúdo principal';
                        currentValue = fieldValue || '';
                        isCollectingHTML = true; // Ativa modo de coleta de HTML
                        console.log('📝 Campo "Conteúdo Principal" detectado! Aguardando HTML...');
                        continue;
                    }

                    // Tratamento especial para imagens internas
                    if (fieldName.includes('imagem interna') || fieldName.includes('internal image')) {
                        const imgMatch = fieldName.match(/\d+/);
                        const imgIndex = imgMatch ? parseInt(imgMatch[0]) - 1 : 0;
                        
                        if (fieldName.includes('url')) {
                            if (!internalImages[imgIndex]) internalImages[imgIndex] = {};
                            internalImages[imgIndex].url = fieldValue;
                        } else if (fieldName.includes('alt')) {
                            if (!internalImages[imgIndex]) internalImages[imgIndex] = {};
                            internalImages[imgIndex].alt = fieldValue;
                        }
                        currentField = '';
                        currentValue = '';
                        continue;
                    }

                    // Tratamento especial para links internos
                    if (fieldName.includes('link interno') || fieldName.includes('internal link')) {
                        const linkMatch = fieldName.match(/\d+/);
                        const linkIndex = linkMatch ? parseInt(linkMatch[0]) - 1 : 0;
                        
                        if (fieldName.includes('url')) {
                            if (!internalLinks[linkIndex]) internalLinks[linkIndex] = {};
                            internalLinks[linkIndex].url = fieldValue;
                        } else if (fieldName.includes('texto âncora') || fieldName.includes('anchor')) {
                            if (!internalLinks[linkIndex]) internalLinks[linkIndex] = {};
                            internalLinks[linkIndex].anchor = fieldValue;
                        }
                        currentField = '';
                        currentValue = '';
                        continue;
                    }

                    // Tratamento especial para links externos
                    if (fieldName.includes('link externo') || fieldName.includes('external link')) {
                        const linkMatch = fieldName.match(/\d+/);
                        const linkIndex = linkMatch ? parseInt(linkMatch[0]) - 1 : 0;
                        
                        if (fieldName.includes('url')) {
                            if (!externalLinks[linkIndex]) externalLinks[linkIndex] = {};
                            externalLinks[linkIndex].url = fieldValue;
                        } else if (fieldName.includes('texto âncora') || fieldName.includes('anchor')) {
                            if (!externalLinks[linkIndex]) externalLinks[linkIndex] = {};
                            externalLinks[linkIndex].anchor = fieldValue;
                        }
                        currentField = '';
                        currentValue = '';
                        continue;
                    }

                    // Checkboxes especiais
                    if (fieldName.includes('coletar nome') || fieldName.includes('collect name')) {
                        document.getElementById('formCollectName').checked = !line.includes('☐');
                        currentField = '';
                        currentValue = '';
                        continue;
                    }
                    if (fieldName.includes('coletar e-mail') || fieldName.includes('collect email')) {
                        document.getElementById('formCollectEmail').checked = !line.includes('☐');
                        currentField = '';
                        currentValue = '';
                        continue;
                    }
                    if (fieldName.includes('coletar telefone') || fieldName.includes('collect phone')) {
                        document.getElementById('formCollectPhone').checked = !line.includes('☐');
                        currentField = '';
                        currentValue = '';
                        continue;
                    }
                    if (fieldName.includes('habilitar comentários') || fieldName.includes('enable comments')) {
                        document.getElementById('enableComments').checked = fieldValue.toLowerCase().includes('yes') || fieldValue.toLowerCase().includes('sim');
                        currentField = '';
                        currentValue = '';
                        continue;
                    }
                    if (fieldName.includes('habilitar botões') || fieldName.includes('enable share')) {
                        document.getElementById('enableShare').checked = fieldValue.toLowerCase().includes('yes') || fieldValue.toLowerCase().includes('sim');
                        currentField = '';
                        currentValue = '';
                        continue;
                    }

                    currentField = fieldName;
                    currentValue = fieldValue;
                } else if (currentField || isCollectingHTML) {
                    // Continuar valor do campo anterior (multi-linha ou HTML)
                    if (isCollectingHTML) {
                        // Durante coleta de HTML, preservar linhas vazias e formatação
                        currentValue += '\n' + line;
                    } else if (currentField) {
                        // Para campos normais, continuar concatenando
                        currentValue += '\n' + line;
                    }
                }
            }

            // ====================================================================
            // STEP 5: Salvar último campo (proteção final)
            // ====================================================================
            // ⚠️ CRITICAL: Garantir que o último campo seja salvo
            // Isso é essencial se o HTML não terminar com "Conclusão:"
            if (currentField && currentValue) {
                setFieldValue(currentField, currentValue, fieldMapping);
                fieldsCount++;
                if (isCollectingHTML) {
                    console.log('⚠️ HTML salvo no final (não encontrou "Conclusão:")');
                    console.log('📦 Total de caracteres:', currentValue.length);
                }
            }

            // ====================================================================
            // STEP 6: Validação de Conteúdo HTML
            // ====================================================================
            // Verificar se o campo "Conteúdo Principal" foi preenchido corretamente
            const contentBodyField = document.getElementById('contentBody');
            if (contentBodyField && contentBodyField.value) {
                const contentLength = contentBodyField.value.length;
                const hasHTMLTags = /<(h[2-3]|p|ul|ol|li)>/i.test(contentBodyField.value);
                
                if (contentLength < 100) {
                    console.warn('⚠️ ATENÇÃO: Conteúdo Principal parece muito curto!');
                    console.warn('📏 Tamanho:', contentLength, 'caracteres');
                }
                
                if (!hasHTMLTags) {
                    console.warn('⚠️ ATENÇÃO: Conteúdo Principal não contém tags HTML esperadas!');
                }
                
                console.log('✅ Conteúdo Principal validado:', {
                    tamanho: contentLength,
                    temHTML: hasHTMLTags,
                    linhas: contentBodyField.value.split('\n').length
                });
            }

            // ====================================================================
            // STEP 7: Adicionar imagens, links e outros campos
            // ====================================================================
            // Adicionar imagens internas
            if (internalImages.length > 0) {
                const container = document.getElementById('internalImagesContainer');
                container.innerHTML = '';
                internalImages.forEach(img => {
                    if (img.url || img.alt) {
                        addInternalImageField(img.url || '', img.alt || '');
                        fieldsCount++;
                    }
                });
            }

            // Adicionar links internos
            if (internalLinks.length > 0) {
                const container = document.getElementById('internalLinksContainer');
                container.innerHTML = '';
                internalLinks.forEach(link => {
                    if (link.url || link.anchor) {
                        addInternalLinkField(link.url || '', link.anchor || '');
                        fieldsCount++;
                    }
                });
            }

            // Adicionar links externos
            if (externalLinks.length > 0) {
                const container = document.getElementById('externalLinksContainer');
                container.innerHTML = '';
                externalLinks.forEach(link => {
                    if (link.url || link.anchor) {
                        addExternalLinkField(link.url || '', link.anchor || '');
                        fieldsCount++;
                    }
                });
            }

            showStatus(`✅ ${fieldsCount} campos preenchidos com sucesso! Revise os dados e clique em "Gerar Post".`, 'success');
            
            // ====================================================================
            // GERAR PROMPTS AUTOMÁTICOS PARA IMAGENS
            // ====================================================================
            generateImagePrompts();
            
            // Scroll suave para o primeiro campo preenchido
            document.getElementById('h1Title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } catch (error) {
            console.error('Erro ao preencher campos:', error);
            showStatus('❌ Erro ao processar o texto. Verifique o formato e tente novamente.', 'error');
        }
    });

    clearAutofillBtn?.addEventListener('click', function() {
        aiAutofillText.value = '';
        showStatus('🗑️ Texto limpo. Cole um novo texto formatado.', 'info');
    });

    function setFieldValue(fieldName, value, mapping) {
        // Detectar se o valor contém HTML
        const hasHTML = /<(h[1-6]|p|ul|ol|li|div|span|strong|em|a)\b[^>]*>/i.test(value);
        
        // Para conteúdo HTML, não limpar os colchetes (pode ser código)
        if (!hasHTML) {
            value = value.replace(/\[.*?\]/g, '').trim();
        } else {
            value = value.trim();
            console.log('🎨 Detectado HTML no valor, preservando formatação');
        }
        
        if (!value || value === '(opcional)' || value === 'optional') return;

        // Encontrar campo correspondente
        for (const [key, id] of Object.entries(mapping)) {
            const keywords = key.split('|');
            if (keywords.some(keyword => fieldName.includes(keyword))) {
                const element = document.getElementById(id);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = value.toLowerCase().includes('yes') || value.toLowerCase().includes('sim');
                    } else {
                        element.value = value;
                        // Trigger eventos para atualizar contadores
                        element.dispatchEvent(new Event('input'));
                        
                        // Log especial para campos HTML
                        if (hasHTML) {
                            console.log(`✅ Campo "${id}" preenchido com HTML (${value.split('\n').length} linhas)`);
                        }
                    }
                }
                return;
            }
        }
    }

    function addInternalImageField(url, alt) {
        const container = document.getElementById('internalImagesContainer');
        const div = document.createElement('div');
        div.className = 'internal-image-item';
        div.innerHTML = `
            <input type="url" name="internalImageUrl[]" value="${url}" placeholder="URL da imagem">
            <input type="text" name="internalImageAlt[]" value="${alt}" placeholder="Alt text descritivo">
            <button type="button" class="btn-remove" onclick="this.parentElement.remove()">✕</button>
        `;
        container.appendChild(div);
    }

    function addInternalLinkField(url, anchor) {
        const container = document.getElementById('internalLinksContainer');
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
            <input type="url" name="internalLinkUrl[]" value="${url}" placeholder="URL interna">
            <input type="text" name="internalLinkAnchor[]" value="${anchor}" placeholder="Texto âncora">
            <button type="button" class="btn-remove" onclick="this.parentElement.remove()">✕</button>
        `;
        container.appendChild(div);
    }

    function addExternalLinkField(url, anchor) {
        const container = document.getElementById('externalLinksContainer');
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
            <input type="url" name="externalLinkUrl[]" value="${url}" placeholder="URL externa">
            <input type="text" name="externalLinkAnchor[]" value="${anchor}" placeholder="Texto âncora">
            <button type="button" class="btn-remove" onclick="this.parentElement.remove()">✕</button>
        `;
        container.appendChild(div);
    }

    function showStatus(message, type) {
        if (!autofillStatus) return;
        
        autofillStatus.textContent = message;
        autofillStatus.className = `autofill-status ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                autofillStatus.style.display = 'none';
            }, 5000);
        }
    }
});

// ======================
// GERADOR DE PROMPTS PARA IMAGENS
// ======================

function generateImagePrompts() {
    const container = document.getElementById('imagePromptsContainer');
    const promptsList = document.getElementById('imagePromptsList');
    
    if (!container || !promptsList) return;
    
    // Pega os dados do formulário
    const h1Title = document.getElementById('h1Title')?.value || '';
    const category = document.getElementById('category')?.value || '';
    const contentBody = document.getElementById('contentBody')?.value || '';
    
    if (!h1Title) {
        container.style.display = 'none';
        return;
    }
    
    // Detecta idioma
    const isEnglish = /\b(the|and|for|with|your|home|how|what|why|best|guide|tips)\b/i.test(h1Title + ' ' + contentBody);
    
    // Extrai H2s do conteúdo para criar prompts específicos
    const h2Matches = contentBody.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h2Titles = h2Matches.map(h2 => h2.replace(/<[^>]+>/g, '').trim()).slice(0, 3);
    
    // Detecta o tipo de negócio/serviço baseado no conteúdo
    const businessKeywords = extractBusinessKeywords(h1Title + ' ' + contentBody);
    
    // Gera prompts baseados no conteúdo
    const prompts = [];
    
    // Prompt 1: Imagem principal (hero/capa)
    if (isEnglish) {
        prompts.push({
            label: '🖼️ Cover Image (Hero)',
            prompt: `Create a professional, high-quality photograph showing ${businessKeywords.service || 'professional service'}. Scene: ${businessKeywords.scene || 'modern workspace'}. Style: Clean, professional, well-lit. Subject: ${h1Title.substring(0, 50)}. Photorealistic, 16:9 aspect ratio, suitable for blog header.`
        });
    } else {
        prompts.push({
            label: '🖼️ Imagem de Capa (Hero)',
            prompt: `Crie uma fotografia profissional de alta qualidade mostrando ${businessKeywords.service || 'serviço profissional'}. Cenário: ${businessKeywords.scene || 'ambiente moderno'}. Estilo: Limpo, profissional, bem iluminado. Tema: ${h1Title.substring(0, 50)}. Fotorrealista, proporção 16:9, adequado para cabeçalho de blog.`
        });
    }
    
    // Prompt 2: Baseado no primeiro H2 ou tema principal
    const topic1 = h2Titles[0] || h1Title;
    if (isEnglish) {
        prompts.push({
            label: '📸 Image 2 (Content)',
            prompt: `Professional photograph of ${businessKeywords.worker || 'professional'} ${businessKeywords.action || 'working'}. Context: ${topic1.substring(0, 40)}. Setting: ${businessKeywords.location || 'professional environment'}. High quality, natural lighting, 16:10 aspect ratio.`
        });
    } else {
        prompts.push({
            label: '📸 Imagem 2 (Conteúdo)',
            prompt: `Fotografia profissional de ${businessKeywords.worker || 'profissional'} ${businessKeywords.action || 'trabalhando'}. Contexto: ${topic1.substring(0, 40)}. Ambiente: ${businessKeywords.location || 'ambiente profissional'}. Alta qualidade, iluminação natural, proporção 16:10.`
        });
    }
    
    // Prompt 3: Baseado no segundo H2 ou detalhe
    const topic2 = h2Titles[1] || businessKeywords.detail || 'details';
    if (isEnglish) {
        prompts.push({
            label: '📷 Image 3 (Detail)',
            prompt: `Close-up professional photo showing ${businessKeywords.detail || 'professional details'} related to ${topic2.substring(0, 30)}. ${businessKeywords.materials ? 'Materials: ' + businessKeywords.materials + '.' : ''} High resolution, sharp focus, professional quality, 16:10 aspect ratio.`
        });
    } else {
        prompts.push({
            label: '📷 Imagem 3 (Detalhe)',
            prompt: `Foto profissional em close-up mostrando ${businessKeywords.detail || 'detalhes profissionais'} relacionados a ${topic2.substring(0, 30)}. ${businessKeywords.materials ? 'Materiais: ' + businessKeywords.materials + '.' : ''} Alta resolução, foco nítido, qualidade profissional, proporção 16:10.`
        });
    }
    
    // Renderiza os prompts
    promptsList.innerHTML = prompts.map((p, i) => `
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #fff; font-size: 0.85rem;">${p.label}</span>
                <button type="button" class="copy-prompt-btn" data-prompt="${i}" style="padding: 4px 10px; font-size: 0.75rem; background: #EB7A3D; color: #fff; border: none; border-radius: 4px; cursor: pointer;">📋 Copy</button>
            </div>
            <textarea readonly style="width: 100%; min-height: 60px; padding: 10px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: rgba(255,255,255,0.8); font-size: 0.85rem; resize: vertical; font-family: inherit;">${p.prompt}</textarea>
        </div>
    `).join('');
    
    // Mostra o container
    container.style.display = 'block';
    
    // Event listeners para copiar
    promptsList.querySelectorAll('.copy-prompt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.prompt);
            const textarea = this.closest('div').querySelector('textarea');
            copyToClipboard(textarea.value);
            this.textContent = '✅ Copied!';
            setTimeout(() => { this.textContent = '📋 Copy'; }, 2000);
        });
    });
    
    // Copiar todos
    document.getElementById('copyAllPrompts')?.addEventListener('click', function() {
        const allPrompts = prompts.map(p => `${p.label}\n${p.prompt}`).join('\n\n---\n\n');
        copyToClipboard(allPrompts);
        this.textContent = '✅ Copiado!';
        setTimeout(() => { this.textContent = '📋 Copiar Todos'; }, 2000);
    });
    
    console.log('✅ Prompts de imagem gerados:', prompts.length);
}

function extractBusinessKeywords(text) {
    const keywords = {
        service: null,
        worker: null,
        action: null,
        scene: null,
        location: null,
        detail: null,
        materials: null
    };
    
    // Detecta tipo de serviço/negócio
    const servicePatterns = {
        // Construção
        'window|janela': { service: 'window replacement/installation', worker: 'contractor', action: 'installing windows', scene: 'home exterior', location: 'residential home', detail: 'window frame and glass', materials: 'vinyl, wood, glass' },
        'roof|telhado': { service: 'roofing work', worker: 'roofer', action: 'installing shingles', scene: 'house rooftop', location: 'residential roof', detail: 'roofing materials', materials: 'shingles, tiles, metal' },
        'marble|granite|countertop|bancada|mármore|granito': { service: 'countertop installation', worker: 'stone installer', action: 'measuring and installing countertops', scene: 'modern kitchen', location: 'kitchen interior', detail: 'stone surface texture and veining', materials: 'marble, granite, quartz' },
        'hvac|air condition|heating|ar condicionado|aquecimento': { service: 'HVAC installation', worker: 'HVAC technician', action: 'installing AC unit', scene: 'home interior', location: 'utility room', detail: 'HVAC equipment', materials: 'ductwork, units' },
        'plumb|encanamento|hidráulica': { service: 'plumbing work', worker: 'plumber', action: 'repairing pipes', scene: 'bathroom or kitchen', location: 'under sink', detail: 'pipes and fittings', materials: 'copper, PVC pipes' },
        'electric|elétric': { service: 'electrical work', worker: 'electrician', action: 'wiring installation', scene: 'home interior', location: 'electrical panel', detail: 'wires and connections', materials: 'wiring, outlets' },
        'paint|pintura': { service: 'painting service', worker: 'painter', action: 'painting walls', scene: 'room interior', location: 'living room', detail: 'paint finish and color', materials: 'paint, brushes, rollers' },
        'floor|piso|carpet|carpete': { service: 'flooring installation', worker: 'flooring installer', action: 'laying floor', scene: 'room interior', location: 'living space', detail: 'floor texture and pattern', materials: 'hardwood, tile, carpet' },
        'landscap|jardim|paisagismo': { service: 'landscaping', worker: 'landscaper', action: 'planting and designing', scene: 'backyard garden', location: 'outdoor space', detail: 'plants and design elements', materials: 'plants, stones, mulch' },
        'clean|limpeza': { service: 'cleaning service', worker: 'cleaning professional', action: 'cleaning home', scene: 'clean interior', location: 'tidy room', detail: 'spotless surfaces', materials: 'cleaning supplies' },
        // Geral
        'home|casa|residência': { service: 'home improvement', worker: 'contractor', action: 'home renovation', scene: 'beautiful home', location: 'residential property', detail: 'home features', materials: 'construction materials' }
    };
    
    for (const [pattern, values] of Object.entries(servicePatterns)) {
        if (new RegExp(pattern, 'i').test(text)) {
            Object.assign(keywords, values);
            break;
        }
    }
    
    // Fallback se nada for detectado
    if (!keywords.service) {
        keywords.service = 'professional service';
        keywords.worker = 'professional';
        keywords.action = 'providing service';
        keywords.scene = 'modern workspace';
        keywords.location = 'professional setting';
        keywords.detail = 'work details';
    }
    
    return keywords;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ======================
// EXPORT FUNCTIONS
// ======================

// Permite usar estas funções em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSlug,
        removeStopwords,
        calculateReadTime,
        formatDateISO,
        formatDatePTBR
    };
}
