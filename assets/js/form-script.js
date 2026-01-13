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

// Contador para alternar entre versões de teste
let testDataIndex = 0;

// 5 versões de conteúdo de teste para o nicho de motel
const testDataVersions = [
    // ============================================
    // VERSÃO 1: Dicas para Noite Romântica
    // ============================================
    {
        h1Title: '5 Dicas para uma Noite Romântica Perfeita no Motel',
        slug: '5-dicas-noite-romantica-perfeita-motel-xenon',
        category: 'Dicas',
        author: 'Equipe Xenon',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        readTime: '6',
        primaryKeyword: 'noite romântica motel',
        secondaryKeywords: 'motel Criciúma, suíte luxo, romance, experiência casal, Motel Xenon',
        metaTitle: '5 Dicas para Noite Romântica Perfeita | Motel Xenon',
        metaDescription: 'Descubra como criar uma noite romântica inesquecível no Motel Xenon. Dicas exclusivas, suítes de luxo e experiências únicas em Criciúma. Confira!',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
        coverImageAlt: 'Suíte romântica decorada com pétalas de rosas e iluminação ambiente',
        coverImageCaption: 'Ambiente perfeito para momentos especiais a dois',
        introduction: 'Uma noite romântica no motel pode ser muito mais do que você imagina. No Motel Xenon, em Criciúma, oferecemos não apenas suítes luxuosas, mas toda a atmosfera e os detalhes que transformam um encontro comum em uma experiência inesquecível. Neste artigo, compartilhamos 5 dicas essenciais para você e seu par aproveitarem ao máximo sua visita.',
        contentBody: '<h2>1. Escolha a Suíte Ideal para o Momento</h2><p>O Motel Xenon oferece diferentes tipos de suítes, cada uma com seu charme único. Para uma noite romântica especial, nossas suítes premium contam com hidromassagem privativa, iluminação LED personalizável e decoração sofisticada.</p><h3>O Que Considerar na Escolha</h3><ul><li>Hidromassagem para relaxamento a dois</li><li>Sistema de som ambiente</li><li>Iluminação ajustável para criar o clima perfeito</li><li>Cama king size com roupa de cama premium</li></ul><h2>2. Aproveite Nosso Cardápio Especial</h2><p>O Motel Xenon oferece um cardápio exclusivo com opções que vão desde petiscos deliciosos até jantares completos. Não deixe de experimentar nossa garrafa de vinho especial.</p><h2>3. Reserve com Antecedência</h2><p>Para garantir a suíte dos seus sonhos, especialmente em finais de semana e datas especiais, recomendamos fazer sua reserva com antecedência.</p><h2>4. Planeje Surpresas Especiais</h2><p>O Motel Xenon pode ajudar você a preparar surpresas inesquecíveis. Entre em contato previamente e nossa equipe organizará decorações especiais.</p><h2>5. Relaxe e Aproveite a Privacidade</h2><p>No Motel Xenon, sua privacidade e conforto são nossa prioridade. Todas as nossas suítes oferecem total discrição e garagem privativa.</p>',
        conclusion: 'Uma noite romântica no Motel Xenon é mais do que hospedagem - é uma experiência completa. Com nossas suítes de luxo e atendimento impecável, garantimos que cada momento seja especial. Reserve agora sua suíte!',
        tags: 'motel Criciúma, noite romântica, suíte luxo, experiência casal, romance, Motel Xenon',
        relatedPosts: '/blog/suites-premium-xenon, /blog/gastronomia-especial-motel',
        formTitle: 'Quer Viver Esta Experiência?',
        formDescription: 'Deixe seus dados e nossa equipe entrará em contato para ajudá-lo a planejar sua noite perfeita no Motel Xenon.',
        formButtonText: 'Quero Reservar',
        formWebhookUrl: '',
        formDestinationEmail: 'contato@xenonmotel.com.br',
        siteUrl: 'https://xenonmotel.com.br',
        siteLogo: 'https://xenonmotel.com.br/logo.png'
    },
    
    // ============================================
    // VERSÃO 2: Suítes com Hidromassagem
    // ============================================
    {
        h1Title: 'Suítes com Hidromassagem: Por que Escolher o Motel Xenon',
        slug: 'suites-hidromassagem-motel-xenon-criciuma',
        category: 'Suítes',
        author: 'Equipe Xenon',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        readTime: '5',
        primaryKeyword: 'suíte hidromassagem motel',
        secondaryKeywords: 'motel com hidro, banheira casal, spa privativo, relaxamento, Criciúma',
        metaTitle: 'Suítes com Hidromassagem em Criciúma | Motel Xenon',
        metaDescription: 'Conheça as suítes com hidromassagem do Motel Xenon em Criciúma. Banheiras de casal, spa privativo e máximo conforto para você relaxar.',
        searchIntent: 'Transacional',
        coverImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200',
        coverImageAlt: 'Banheira de hidromassagem luxuosa com iluminação ambiente',
        coverImageCaption: 'Nossas suítes premium contam com hidromassagem para dois',
        introduction: 'Depois de uma semana agitada, nada como relaxar em uma banheira de hidromassagem com quem você ama. No Motel Xenon, oferecemos suítes especialmente projetadas para proporcionar momentos únicos de relaxamento e conexão. Descubra por que nossas hidros são as mais procuradas de Criciúma.',
        contentBody: '<h2>O Diferencial das Nossas Hidromassagens</h2><p>Todas as banheiras de hidromassagem do Motel Xenon são projetadas para casais, com espaço generoso, jatos terapêuticos e iluminação LED que cria um ambiente único e relaxante.</p><h3>Características das Nossas Hidros</h3><ul><li>Capacidade para dois com conforto total</li><li>Jatos terapêuticos reguláveis</li><li>Iluminação LED multicolorida</li><li>Temperatura controlável</li><li>Produtos de banho premium inclusos</li></ul><h2>Benefícios do Banho a Dois</h2><p>A hidromassagem não é apenas luxo - é uma forma comprovada de relaxamento que libera tensões, melhora a circulação e fortalece a conexão entre o casal.</p><h3>Para Corpo e Mente</h3><ul><li>Alívio de tensões musculares</li><li>Melhora da circulação sanguínea</li><li>Redução do estresse</li><li>Momento de intimidade e conexão</li></ul><h2>Tipos de Suítes com Hidro</h2><p>Oferecemos diferentes categorias de suítes com hidromassagem, desde as Standard até as Master, cada uma com características únicas para atender suas preferências.</p>',
        conclusion: 'Uma suíte com hidromassagem no Motel Xenon é o destino perfeito para casais que buscam relaxamento e privacidade. Nossas instalações são constantemente higienizadas e mantidas para garantir sua segurança e conforto. Agende sua visita!',
        tags: 'hidromassagem, suíte casal, spa privativo, motel Criciúma, relaxamento, Motel Xenon',
        relatedPosts: '/blog/noite-romantica-xenon, /blog/suites-master-xenon',
        formTitle: 'Reserve Sua Suíte com Hidro!',
        formDescription: 'Deixe seus dados e receba informações sobre disponibilidade e valores das nossas suítes com hidromassagem.',
        formButtonText: 'Quero Saber Mais',
        formWebhookUrl: '',
        formDestinationEmail: 'contato@xenonmotel.com.br',
        siteUrl: 'https://xenonmotel.com.br',
        siteLogo: 'https://xenonmotel.com.br/logo.png'
    },
    
    // ============================================
    // VERSÃO 3: Comemorar Aniversário de Namoro
    // ============================================
    {
        h1Title: 'Como Comemorar seu Aniversário de Namoro no Motel Xenon',
        slug: 'comemorar-aniversario-namoro-motel-xenon',
        category: 'Romance',
        author: 'Equipe Xenon',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        readTime: '7',
        primaryKeyword: 'aniversário de namoro motel',
        secondaryKeywords: 'comemoração casal, data especial, surpresa romântica, celebração, presente namoro',
        metaTitle: 'Aniversário de Namoro no Motel | Ideias Especiais | Xenon',
        metaDescription: 'Planejando uma comemoração especial de aniversário de namoro? O Motel Xenon tem pacotes exclusivos para tornar sua data inesquecível. Confira!',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200',
        coverImageAlt: 'Casal brindando com champagne em ambiente romântico',
        coverImageCaption: 'Celebre seu amor em grande estilo',
        introduction: 'Aniversário de namoro merece uma comemoração à altura do seu amor. No Motel Xenon, sabemos como tornar essa data ainda mais especial com suítes decoradas, pacotes românticos e um atendimento que cuida de cada detalhe. Confira nossas dicas para uma celebração perfeita.',
        contentBody: '<h2>Pacotes Especiais para Datas Comemorativas</h2><p>O Motel Xenon oferece pacotes exclusivos para aniversários de namoro que incluem decoração temática, espumante, chocolates finos e muito mais. Nossa equipe pode personalizar a experiência conforme suas preferências.</p><h3>O que Incluímos</h3><ul><li>Decoração com pétalas de rosas</li><li>Espumante nacional ou importado</li><li>Chocolates artesanais</li><li>Velas aromáticas</li><li>Playlist romântica personalizada</li></ul><h2>Surpresas que Podemos Preparar</h2><p>Quer surpreender seu amor? Entre em contato antes da data e nossa equipe preparará tudo para que a surpresa seja perfeita. Desde decorações especiais até presentes deixados na suíte.</p><h3>Ideias de Surpresas</h3><ul><li>Balões personalizados</li><li>Fotos do casal espalhadas pela suíte</li><li>Café da manhã especial</li><li>Jantar romântico servido na suíte</li></ul><h2>Escolha o Melhor Horário</h2><p>Para aniversários de namoro, recomendamos o pernoite. Assim vocês têm tempo para aproveitar cada momento sem pressa, desde o jantar até o café da manhã.</p>',
        conclusion: 'Seu aniversário de namoro merece ser comemorado em grande estilo. No Motel Xenon, cuidamos de todos os detalhes para que você e seu amor vivam uma experiência inesquecível. Entre em contato e planeje sua surpresa conosco!',
        tags: 'aniversário namoro, comemoração casal, surpresa romântica, motel Criciúma, data especial, Motel Xenon',
        relatedPosts: '/blog/dicas-noite-romantica, /blog/pacotes-especiais-xenon',
        formTitle: 'Planeje Sua Surpresa!',
        formDescription: 'Deixe seus dados e nossa equipe entrará em contato para ajudá-lo a preparar uma comemoração inesquecível.',
        formButtonText: 'Quero Surpreender',
        formWebhookUrl: '',
        formDestinationEmail: 'contato@xenonmotel.com.br',
        siteUrl: 'https://xenonmotel.com.br',
        siteLogo: 'https://xenonmotel.com.br/logo.png'
    },
    
    // ============================================
    // VERSÃO 4: Gastronomia no Motel
    // ============================================
    {
        h1Title: 'Gastronomia de Qualidade: O Cardápio Exclusivo do Motel Xenon',
        slug: 'gastronomia-cardapio-motel-xenon-criciuma',
        category: 'Gastronomia',
        author: 'Equipe Xenon',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
        readTime: '5',
        primaryKeyword: 'cardápio motel Criciúma',
        secondaryKeywords: 'comida motel, jantar romântico, gastronomia, vinhos, petiscos gourmet',
        metaTitle: 'Cardápio Gourmet do Motel Xenon | Gastronomia Premium',
        metaDescription: 'Conheça o cardápio exclusivo do Motel Xenon: vinhos selecionados, petiscos gourmet, jantares românticos e muito mais. Sabores que complementam sua experiência.',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
        coverImageAlt: 'Mesa com taças de vinho e petiscos gourmet em ambiente elegante',
        coverImageCaption: 'Gastronomia premium para momentos especiais',
        introduction: 'Uma experiência completa no motel vai além de suítes luxuosas. No Motel Xenon, nossa gastronomia é um diferencial que complementa sua visita com sabores únicos. De vinhos selecionados a petiscos gourmet, cada item do nosso cardápio foi pensado para tornar seu momento ainda mais especial.',
        contentBody: '<h2>Nossa Carta de Vinhos</h2><p>Selecionamos os melhores rótulos nacionais e importados para compor nossa adega. De tintos encorpados a brancos refrescantes, temos a opção perfeita para cada ocasião.</p><h3>Destaques da Adega</h3><ul><li>Vinhos chilenos e argentinos</li><li>Espumantes brasileiros premiados</li><li>Champagnes para ocasiões especiais</li><li>Vinhos rosés refrescantes</li></ul><h2>Petiscos e Pratos</h2><p>Nosso cardápio oferece desde petiscos rápidos até refeições completas. Tudo preparado com ingredientes frescos e servido com apresentação impecável.</p><h3>Favoritos dos Clientes</h3><ul><li>Tábua de frios gourmet</li><li>Bruschetta de tomate e manjericão</li><li>Carpaccio bovino</li><li>Fondue de chocolate para dois</li></ul><h2>Café da Manhã Especial</h2><p>Para quem escolhe o pernoite, oferecemos um café da manhã completo com frutas frescas, pães artesanais, sucos naturais e muito mais.</p>',
        conclusion: 'No Motel Xenon, gastronomia é parte da experiência. Cada prato, cada taça de vinho foi pensado para complementar seu momento especial. Visite-nos e descubra sabores que transformam uma visita comum em uma experiência memorável.',
        tags: 'gastronomia motel, cardápio gourmet, vinhos, petiscos, jantar romântico, Motel Xenon',
        relatedPosts: '/blog/noite-romantica-xenon, /blog/suites-premium-xenon',
        formTitle: 'Quer Conhecer Nosso Cardápio?',
        formDescription: 'Deixe seus dados e enviaremos nosso cardápio completo com fotos e preços atualizados.',
        formButtonText: 'Receber Cardápio',
        formWebhookUrl: '',
        formDestinationEmail: 'contato@xenonmotel.com.br',
        siteUrl: 'https://xenonmotel.com.br',
        siteLogo: 'https://xenonmotel.com.br/logo.png'
    },
    
    // ============================================
    // VERSÃO 5: Por que Escolher Pernoite
    // ============================================
    {
        h1Title: 'Por que o Pernoite é a Melhor Opção para Casais',
        slug: 'pernoite-melhor-opcao-casais-motel-xenon',
        category: 'Experiências',
        author: 'Equipe Xenon',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        readTime: '6',
        primaryKeyword: 'pernoite motel Criciúma',
        secondaryKeywords: 'motel pernoite, dormir no motel, noite inteira, casal pernoite, hospedagem motel',
        metaTitle: 'Pernoite em Motel: Vantagens e Dicas | Motel Xenon',
        metaDescription: 'Descubra por que o pernoite no Motel Xenon é a escolha ideal para casais. Mais tempo, mais conforto, café da manhã incluso. Conheça as vantagens!',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
        coverImageAlt: 'Quarto de motel luxuoso com cama king size e iluminação suave',
        coverImageCaption: 'Suítes confortáveis para uma noite completa de descanso',
        introduction: 'Quando o assunto é aproveitar cada momento com quem você ama, o pernoite é a opção que oferece a melhor experiência. No Motel Xenon, o pernoite vai muito além de apenas dormir - é uma experiência completa que inclui jantar, café da manhã e horas de privacidade e conforto.',
        contentBody: '<h2>Vantagens do Pernoite</h2><p>Diferente do período curto, o pernoite permite que você e seu par aproveitem sem pressa. São mais de 12 horas de exclusividade em uma suíte de luxo, tempo suficiente para relaxar, conversar e criar memórias.</p><h3>O Que Está Incluído</h3><ul><li>Entrada a partir das 20h</li><li>Saída até às 12h do dia seguinte</li><li>Café da manhã completo</li><li>Acesso a todas as comodidades da suíte</li><li>Estacionamento privativo</li></ul><h2>Custo-Benefício</h2><p>Quando você compara o valor do pernoite com duas ou três horas de período, percebe que o investimento é muito mais vantajoso. Você paga um pouco mais e ganha muito mais tempo e benefícios.</p><h3>Comparativo</h3><ul><li>Período 2h: tempo limitado, sem refeições</li><li>Período 4h: um pouco mais relaxado, ainda sem café</li><li>Pernoite: 12h+ de exclusividade, café da manhã incluso</li></ul><h2>Dicas para Aproveitar o Pernoite</h2><p>Para aproveitar ao máximo, leve roupas confortáveis, chegue cedo para jantar e não tenha pressa de dormir. Use a hidromassagem, peça algo do cardápio e relaxe completamente.</p>',
        conclusion: 'O pernoite no Motel Xenon é a experiência completa que todo casal merece. Mais tempo juntos, mais conforto e a tranquilidade de acordar sem pressa. Reserve seu pernoite e descubra uma nova forma de aproveitar momentos a dois.',
        tags: 'pernoite motel, noite inteira, hospedagem casal, motel Criciúma, café da manhã, Motel Xenon',
        relatedPosts: '/blog/suites-hidromassagem, /blog/gastronomia-xenon',
        formTitle: 'Reserve Seu Pernoite!',
        formDescription: 'Deixe seus dados e receba informações sobre valores e disponibilidade para pernoite.',
        formButtonText: 'Quero Reservar',
        formWebhookUrl: '',
        formDestinationEmail: 'contato@xenonmotel.com.br',
        siteUrl: 'https://xenonmotel.com.br',
        siteLogo: 'https://xenonmotel.com.br/logo.png'
    }
];

// Preenche formulário com dados fictícios para teste
function fillTestData() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Seleciona a versão atual e incrementa o índice para a próxima
    const testData = { ...testDataVersions[testDataIndex], datePublished: dateTimeLocal };
    const versionNumber = testDataIndex + 1;
    
    // Incrementa o índice para próxima versão (volta ao início se passar de 5)
    testDataIndex = (testDataIndex + 1) % testDataVersions.length;
    
    // Mostra qual versão está sendo usada
    console.log(`🧪 Preenchendo com versão ${versionNumber}/5: "${testData.h1Title}"`);
    
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
        internalImageUrls[0].value = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
        internalImageUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlts[0]) {
        internalImageAlts[0].value = 'Casal relaxando em banheira de hidromassagem com champagne';
        internalImageAlts[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche a segunda imagem interna (se existir)
    if (internalImageUrls[1]) {
        internalImageUrls[1].value = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800';
        internalImageUrls[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlts[1]) {
        internalImageAlts[1].value = 'Mesa decorada com velas e taças de vinho em ambiente romântico';
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
        internalLinkUrls[0].value = 'https://xenonmotel.com.br/#suites';
        internalLinkUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalLinkAnchors[0]) {
        internalLinkAnchors[0].value = 'nossas suítes de luxo';
        internalLinkAnchors[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche o segundo link interno
    if (internalLinkUrls[1]) {
        internalLinkUrls[1].value = 'https://xenonmotel.com.br/#diferenciais';
        internalLinkUrls[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalLinkAnchors[1]) {
        internalLinkAnchors[1].value = 'diferenciais do Motel Xenon';
        internalLinkAnchors[1].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Preenche links externos (1 link)
    const externalLinkUrls = form.querySelectorAll('[name="externalLinkUrl[]"]');
    const externalLinkAnchors = form.querySelectorAll('[name="externalLinkAnchor[]"]');
    
    if (externalLinkUrls[0]) {
        externalLinkUrls[0].value = 'https://www.tripadvisor.com.br/';
        externalLinkUrls[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (externalLinkAnchors[0]) {
        externalLinkAnchors[0].value = 'avaliações de clientes no TripAdvisor';
        externalLinkAnchors[0].dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Salva os dados no localStorage
    saveFormToLocalStorage();
    
    // Feedback visual mostrando qual versão foi usada
    const statusDiv = document.getElementById('autoSaveStatus');
    if (statusDiv) {
        statusDiv.innerHTML = `🧪 ✅ Versão ${versionNumber}/5: <strong>${testData.h1Title.substring(0, 40)}...</strong>`;
        statusDiv.style.opacity = '1';
        statusDiv.style.color = '#27ae60';
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 4000);
    }
    
    console.log('✅ Formulário preenchido COMPLETAMENTE com dados de teste');
    console.log(`   Próximo clique usará a versão ${(testDataIndex % testDataVersions.length) + 1}`);
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
            
            <div class="lead-form-preview">
                <h3>${data.formTitle}</h3>
                <p>${data.formDescription}</p>
                <div class="form-preview-fields">
                    <input type="text" placeholder="Nome" disabled>
                    <input type="email" placeholder="E-mail" disabled>
                    <input type="tel" placeholder="Telefone" disabled>
                    <button class="cta-btn" disabled>${data.formButtonText}</button>
                </div>
                <small>🔒 Formulário de captura de leads</small>
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
        formTitle: formData.get('formTitle'),
        formDescription: formData.get('formDescription'),
        formButtonText: formData.get('formButtonText'),
        formWebhookUrl: formData.get('formWebhookUrl') || '',
        formDestinationEmail: formData.get('formDestinationEmail') || 'contato@xenonmotel.com.br',
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
        
        // Formulário de Captura de Leads
        template = template.replace(/{{FORM_TITLE}}/g, escapeHtml(data.formTitle));
        template = template.replace(/{{FORM_DESCRIPTION}}/g, escapeHtml(data.formDescription));
        template = template.replace(/{{FORM_BUTTON_TEXT}}/g, escapeHtml(data.formButtonText));
        template = template.replace(/{{FORM_WEBHOOK_URL}}/g, sanitizeUrl(data.formWebhookUrl || ''));
        template = template.replace(/{{FORM_DESTINATION_EMAIL}}/g, escapeHtml(data.formDestinationEmail || ''));
        
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
        messageElement.style.color = '#ffffff';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#1a1a1a';
        messageElement.style.borderRadius = '5px';
        messageElement.style.whiteSpace = 'pre-wrap';
        modal.querySelector('.modal-content').appendChild(messageElement);
    }
    
    if (result && result.method === 'github') {
        // Publicado com sucesso no GitHub
        messageElement.innerHTML = `
            <strong>🎉 Post publicado automaticamente no GitHub!</strong><br><br>
            📁 Arquivo: <code style="background:#0a0a0a;padding:4px 8px;border-radius:4px;color:#3fc99b;">${postPath}</code><br>
            🌐 URL pública: <a href="${result.publicUrl}" target="_blank" style="color: #3fc99b;">${result.publicUrl}</a><br><br>
            ⏳ <em>Aguarde 1-2 minutos para o GitHub Pages processar o arquivo.</em>
        `;
        messageElement.style.backgroundColor = '#0d2818';
        messageElement.style.color = '#ffffff';
        messageElement.style.fontWeight = 'normal';
        messageElement.style.border = '1px solid #3fc99b';
        
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
        messageElement.style.backgroundColor = '#2d1f00';
        messageElement.style.color = '#f2b900';
        messageElement.style.fontWeight = 'normal';
        messageElement.style.border = '1px solid #f2b900';
        
    } else {
        // Download manual (sem token configurado)
        messageElement.innerHTML = `
            <strong>✅ Post gerado com sucesso!</strong><br><br>
            ⚠️ <em>GitHub API Token não configurado.</em><br>
            📥 Use o botão abaixo para download manual.<br><br>
            💡 <strong>Dica:</strong> Configure o token em "⚙️ Configurar GitHub API" para publicação automática!
        `;
        messageElement.style.backgroundColor = '#0d2818';
        messageElement.style.color = '#ffffff';
        messageElement.style.fontWeight = 'normal';
        messageElement.style.border = '1px solid #3fc99b';
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
