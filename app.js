// Professional Website Checklist Application
class ChecklistApp {
    constructor() {
        // 1. Inicialização das propriedades da classe
        this.form = document.getElementById('checklistForm');
        this.progressBar = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.generatePdfBtn = document.getElementById('generatePdfBtn');
        this.accordionHeaders = document.querySelectorAll('.accordion-header');
        this.accordionContents = document.querySelectorAll('.accordion-content');
        this.totalFields = 0;
        this.completedFields = 0;

        this.sectionData = {
            'info-basicas': { total: 6, completed: 0 },
            'identidade-visual': { total: 13, completed: 0 },
            'estrutura-layout': { total: 13, completed: 0 },
            'responsividade': { total: 7, completed: 0 },
            'acessibilidade': { total: 10, completed: 0 },
            'performance': { total: 11, completed: 0 },
            'seo': { total: 11, completed: 0 },
            'seguranca': { total: 7, completed: 0 },
            'testes': { total: 10, completed: 0 },
            'pos-lancamento': { total: 7, completed: 0 }
        };

        this.helpData = {
            // ===== INFORMAÇÕES BÁSICAS DO PROJETO =====
            'nome-empresa': {
                title: 'Nome da Empresa',
                description: 'Nome oficial da empresa ou marca que será representada no site. Este será o nome principal que aparecerá em todo o site.',
                example: 'Ex: "TechSolutions Ltda", "Padaria do João", "Consultoria Digital Pro", "Clínica Vida Saudável"',
                tips: 'Use o nome completo e oficial. Ele aparecerá no título, rodapé, metadados e certificados SSL. Evite abreviações.',
                docs: 'https://developers.google.com/search/docs/appearance/site-names'
            },
            'setor-atuacao': {
                title: 'Setor de Atuação',
                description: 'Área de negócio ou mercado específico em que a empresa atua. Esta informação ajuda a personalizar o design e funcionalidades.',
                example: 'Ex: "Tecnologia da Informação", "Alimentação", "Consultoria Empresarial", "E-commerce de Moda", "Saúde"',
                tips: 'Seja específico para ajudar na personalização do design, cores, linguagem e funcionalidades do site.',
                docs: 'https://www.google.com/search?q=como+definir+setor+de+atua%C3%A7%C3%A3o+da+empresa'
            },
            'publico-alvo': {
                title: 'Público-Alvo',
                description: 'Descrição detalhada do público que o site pretende atingir, incluindo características demográficas e comportamentais.',
                example: 'Ex: "Empresas de médio porte", "Jovens de 18-35 anos interessados em tecnologia", "Mães de 25-45 anos"',
                tips: 'Inclua faixa etária, interesses, comportamento online e necessidades. Quanto mais detalhado, melhor a personalização.',
                docs: 'https://rockcontent.com/br/blog/buyer-persona/'
            },
            'objetivo-principal': {
                title: 'Objetivo Principal',
                description: 'Principal meta que o site deve alcançar. Define a estratégia de desenvolvimento e as métricas de sucesso.',
                example: 'Opções: Geração de Leads, Vendas Online, Divulgação da Marca, Suporte ao Cliente, Educação/Informação.',
                tips: 'Defina um objetivo claro e mensurável. Isso orientará todas as decisões de design e funcionalidades.',
                docs: 'https://resultadosdigitais.com.br/blog/objetivos-de-um-site/'
            },
            'url-desejada': {
                title: 'URL Desejada (Domínio)',
                description: 'Endereço web preferido para o site. Deve ser memorável e relacionado ao negócio.',
                example: 'Ex: "www.minhaempresa.com.br", "loja.exemplo.com", "consultoria-digital.com"',
                tips: 'Verifique a disponibilidade antes de decidir. Prefira nomes curtos e fáceis de lembrar. Considere a extensão .com.br para o Brasil.',
                docs: 'https://registro.br/dominio/regras/'
            },
            'data-entrega': {
                title: 'Data de Entrega Desejada',
                description: 'Prazo desejado para conclusão e lançamento do site.',
                example: 'Considere: Site simples (2-4 semanas), Site médio (1-2 meses), E-commerce (2-4 meses).',
                tips: 'Seja realista. Inclua tempo para desenvolvimento, testes, correções e treinamento. A complexidade do projeto impacta diretamente o prazo.',
                docs: 'https://www.google.com/search?q=como+definir+cronograma+de+projeto+web'
            },
            // ===== IDENTIDADE VISUAL E BRANDING =====
            'cor-primaria': {
                title: 'Cor Primária',
                description: 'A cor principal da marca, usada em elementos de destaque como botões e links.',
                example: 'Ex: #1E40AF (azul corporativo), #DC2626 (vermelho vibrante).',
                tips: 'Escolha uma cor que represente a personalidade da marca e tenha boa legibilidade.',
                docs: 'https://material.io/design/color/the-color-system.html#color-usage-and-palettes'
            },
            'cor-primaria-check': {
                title: 'Cor Primária Definida',
                description: 'Marque se a cor primária da identidade visual já foi formalmente definida.',
                example: 'A cor #1E40AF foi escolhida como a primária no manual da marca.',
                tips: 'Ter as cores definidas antes de iniciar o design acelera o processo e garante consistência.',
                docs: 'https://www.google.com/search?q=importancia+da+paleta+de+cores+no+branding'
            },
            'cor-secundaria': {
                title: 'Cor Secundária',
                description: 'Cor complementar usada em elementos secundários, hovers e detalhes.',
                example: 'Se a primária é azul, a secundária pode ser um laranja complementar ou um tom de azul mais claro.',
                tips: 'Deve harmonizar com a cor primária, mas ter contraste suficiente. Use a teoria das cores (complementares, análogas).',
                docs: 'https://www.adobe.com/br/creativecloud/design/discover/color-theory.html'
            },
            'cor-secundaria-check': {
                title: 'Cor Secundária Definida',
                description: 'Marque se a cor secundária já foi escolhida para complementar a cor primária.',
                example: 'A cor #F59E0B (laranja) foi escolhida como secundária.',
                tips: 'Uma boa cor secundária ajuda a criar hierarquia visual e a destacar informações sem competir com a cor primária.',
                docs: 'https://www.google.com/search?q=como+escolher+cores+secundarias'
            },
            'cores-neutras': {
                title: 'Cores Neutras',
                description: 'Paleta de cinzas, branco e preto para textos, fundos e elementos de interface.',
                example: 'Ex: #FFFFFF (branco), #F3F4F6 (cinza claro), #374151 (cinza escuro), #000000 (preto).',
                tips: 'Essencial para legibilidade e hierarquia visual. Inclua pelo menos 5 tons, do mais escuro ao mais claro.',
                docs: 'https://web.dev/learn/design/color/#neutral-colors'
            },
            'cores-neutras-check': {
                title: 'Cores Neutras Definidas',
                description: 'Marque se a paleta de cores neutras (cinzas, branco, etc.) foi definida.',
                example: 'Paleta de 5 tons de cinza, do branco ao preto, foi estabelecida.',
                tips: 'As cores neutras são a base para um design limpo e garantem que o conteúdo seja legível e agradável.',
                docs: 'https://www.google.com/search?q=uso+de+cores+neutras+no+design'
            },
            'cor-destaque': {
                title: 'Cor de Destaque (Accent Color)',
                description: 'Cor especial para chamar atenção em promoções, alertas ou CTAs importantes.',
                example: 'Ex: #F59E0B (laranja energia), #EF4444 (vermelho urgência), #10B981 (verde sucesso).',
                tips: 'Use com moderação para não perder o impacto. Ideal para botões de conversão e ofertas especiais.',
                docs: 'https://www.interaction-design.org/literature/topics/accent-colors'
            },
            'cor-destaque-check': {
                title: 'Cor de Destaque Definida',
                description: 'Marque se uma cor de destaque foi escolhida para ações importantes.',
                example: 'A cor #EF4444 (vermelho) será usada para alertas e promoções.',
                tips: 'A cor de destaque deve contrastar bem com as outras cores da paleta para ser eficaz.',
                docs: 'https://www.google.com/search?q=quando+usar+accent+color'
            },
            'fonte-principal': {
                title: 'Fonte Principal (Títulos)',
                description: 'Fonte principal usada nos títulos (headings) e elementos de destaque do site.',
                example: 'Ex: "Montserrat", "Poppins", "Playfair Display".',
                tips: 'Escolha fontes legíveis que reflitam a personalidade da marca. Use o Google Fonts para carregamento rápido.',
                docs: 'https://fonts.google.com/'
            },
            'fonte-principal-check': {
                title: 'Fonte Principal Definida',
                description: 'Marque se a fonte para títulos e cabeçalhos já foi definida.',
                example: 'A fonte "Montserrat" foi escolhida para todos os títulos.',
                tips: 'A fonte dos títulos tem grande impacto na personalidade do site. Deve ser legível e imponente.',
                docs: 'https://www.google.com/search?q=como+escolher+fonte+para+titulo'
            },
            'fonte-secundaria': {
                title: 'Fonte Secundária (Corpo de Texto)',
                description: 'Fonte complementar para textos corridos, parágrafos e elementos de interface.',
                example: 'Ex: "Inter", "Lato", "Source Sans Pro".',
                tips: 'Deve complementar a fonte principal e garantir excelente legibilidade em textos longos. Priorize a legibilidade.',
                docs: 'https://web.dev/learn/design/typography/'
            },
            'fonte-secundaria-check': {
                title: 'Fonte Secundária Definida',
                description: 'Marque se a fonte para o corpo de texto e parágrafos já foi definida.',
                example: 'A fonte "Lato" foi escolhida para o corpo de texto.',
                tips: 'A legibilidade é o fator mais importante para a fonte do corpo de texto. Teste em diferentes tamanhos.',
                docs: 'https://www.google.com/search?q=melhores+fontes+para+leitura+web'
            },
            'tamanho-base': {
                title: 'Tamanho Base da Fonte',
                description: 'Tamanho de fonte padrão para o corpo de texto, geralmente usado como base para outras medidas (rem).',
                example: '16px é o padrão recomendado para web para boa legibilidade.',
                tips: 'Usar 16px como base (1rem) é uma prática moderna que melhora a acessibilidade e a escalabilidade do design.',
                docs: 'https://web.dev/learn/design/typography/#base-font-size'
            },
            'tamanho-base-check': {
                title: 'Tamanho Base Definido',
                description: 'Marque se o tamanho da fonte base para o corpo de texto foi definido (geralmente 16px).',
                example: 'O tamanho base foi definido como 16px.',
                tips: 'Definir um tamanho base consistente ajuda a manter a proporção e a harmonia em todo o site.',
                docs: 'https://www.google.com/search?q=porque+usar+16px+fonte+base'
            },
            'hierarquia-definida': {
                title: 'Hierarquia Tipográfica Definida',
                description: 'Marque se a estrutura de tamanhos para títulos (H1, H2, H3...), parágrafos e outros textos foi definida.',
                example: 'H1: 36px, H2: 28px, H3: 22px, Parágrafo: 16px.',
                tips: 'Uma hierarquia clara ajuda os usuários a escanear o conteúdo e melhora o SEO.',
                docs: 'https://web.dev/learn/design/typography/#heading-and-text-scale'
            },
            'logo-alta-resolucao': {
                title: 'Logo em Alta Resolução',
                description: 'Marque se possui o logotipo oficial em formato vetorial (SVG, AI, EPS) ou em alta resolução (PNG, JPG).',
                example: 'Arquivo `logo.svg` ou `logo_300dpi.png`.',
                tips: 'O formato SVG é ideal para a web, pois é leve e escala perfeitamente sem perder qualidade.',
                docs: 'https://www.google.com/search?q=qual+o+melhor+formato+de+logo+para+site'
            },
            'versoes-logo': {
                title: 'Versões do Logo',
                description: 'Marque se possui diferentes versões do logo (ex: horizontal, vertical, apenas símbolo) para diversas aplicações.',
                example: 'Versão principal para o header, versão reduzida (só símbolo) para o favicon.',
                tips: 'Ter variações garante que a marca seja bem representada em qualquer contexto ou tamanho de tela.',
                docs: 'https://www.google.com/search?q=importancia+versoes+de+logo'
            },
            'favicon': {
                title: 'Favicon Definido',
                description: 'Marque se um favicon (ícone que aparece na aba do navegador) foi criado e está pronto para ser implementado.',
                example: 'Um arquivo `favicon.ico` ou `favicon.svg` de 32x32 pixels.',
                tips: 'O favicon é crucial para a identidade da marca no navegador. Inclua também versões para `apple-touch-icon`.',
                docs: 'https://web.dev/articles/add-manifest#icons'
            },
            'icones-personalizados': {
                title: 'Ícones Personalizados',
                description: 'Marque se o projeto utilizará um conjunto de ícones personalizados que seguem a identidade visual da marca.',
                example: 'Uso de um pack de ícones customizado em vez de ícones genéricos (ex: Font Awesome).',
                tips: 'Ícones personalizados reforçam a identidade da marca e criam uma experiência mais coesa.',
                docs: 'https://www.google.com/search?q=vantagens+de+icones+personalizados'
            },
            'imagens-qualidade': {
                title: 'Imagens de Alta Qualidade',
                description: 'Marque se há uma seleção de fotos e imagens de alta qualidade (e com direitos de uso) para o site.',
                example: 'Fotos do produto, imagens da equipe, fotos de bancos de imagem (ex: Unsplash, Adobe Stock).',
                tips: 'Imagens de baixa qualidade podem arruinar um bom design. Invista em fotografia profissional ou bancos de imagem de qualidade.',
                docs: 'https://www.google.com/search?q=impacto+da+qualidade+das+imagens+em+um+site'
            },
            'posicao-logo': {
                title: 'Posição do Logo no Header',
                description: 'Define a localização do logo no cabeçalho do site.',
                example: 'Esquerda é o padrão mais comum e esperado pelos usuários.',
                tips: 'A posição à esquerda é a mais tradicional e facilita a navegação, pois o usuário sabe que ao clicar ali voltará para a home.',
                docs: 'https://www.nngroup.com/articles/logo-placement-left-align/'
            },
            'menu-navegacao': {
                title: 'Menu de Navegação Principal',
                description: 'Marque se a estrutura do menu principal, com os links para as páginas mais importantes, está definida.',
                example: 'Home, Sobre, Serviços, Blog, Contato.',
                tips: 'Mantenha o menu simples, com no máximo 7 itens. Use submenus para organizar seções mais complexas.',
                docs: 'https://www.nngroup.com/articles/menu-design/'
            },
            'cta-principal': {
                title: 'Call-to-Action (CTA) Principal',
                description: 'A ação principal que você quer que o visitante realize no cabeçalho.',
                example: '"Solicite um Orçamento", "Compre Agora", "Fale Conosco".',
                tips: 'O CTA deve ser um botão com cor de destaque para ser facilmente identificado.',
                docs: 'https://rockcontent.com/br/blog/call-to-action/'
            },
            'cta-principal-check': {
                title: 'CTA Principal Definido',
                description: 'Marque se o texto e a ação do botão de CTA principal no header foram definidos.',
                example: 'O botão será "Agende uma Demonstração".',
                tips: 'O texto deve ser claro, direto e usar um verbo de ação.',
                docs: 'https://www.google.com/search?q=como+escrever+um+bom+cta'
            },
            'info-contato': {
                title: 'Informações de Contato Rápidas',
                description: 'Marque se informações de contato rápidas (como telefone ou e-mail) serão exibidas no header.',
                example: 'Um ícone de telefone com o número clicável ao lado.',
                tips: 'Para negócios locais ou serviços, ter o contato visível no topo pode aumentar significativamente as conversões.',
                docs: 'https://www.google.com/search?q=contato+no+header+do+site'
            },
            'hero-section': {
                title: 'Hero Section (Seção Principal)',
                description: 'A primeira seção visual do site, com a principal proposta de valor.',
                example: 'Headline impactante, um subtítulo explicativo e um botão de CTA.',
                tips: 'A headline deve capturar a atenção em menos de 5 segundos e comunicar claramente o que a empresa faz.',
                docs: 'https://www.google.com/search?q=o+que+e+hero+section'
            },
            'hero-section-check': {
                title: 'Hero Section Definida',
                description: 'Marque se o conteúdo (título, texto, imagem de fundo, CTA) da seção principal está definido.',
                example: 'Título: "Soluções Inovadoras para seu Negócio". CTA: "Descubra Como".',
                tips: 'Esta é a seção mais importante da sua página inicial. Invista tempo para torná-la clara e persuasiva.',
                docs: 'https://cxl.com/blog/hero-sections/'
            },
            'sobre-quem-somos': {
                title: 'Seção Sobre / Quem Somos',
                description: 'Marque se haverá uma seção na página inicial dedicada a apresentar a empresa, sua missão e valores.',
                example: 'Um breve texto sobre a história da empresa com uma foto da equipe.',
                tips: 'Esta seção ajuda a construir confiança e a conectar-se com o público em um nível mais pessoal.',
                docs: 'https://www.google.com/search?q=como+escrever+secao+sobre+nos'
            },
            'produtos-servicos': {
                title: 'Seção de Produtos / Serviços',
                description: 'Marque se os principais produtos ou serviços serão destacados na página inicial.',
                example: 'Cards com ícones, título e uma breve descrição para cada serviço oferecido.',
                tips: 'Foque nos benefícios para o cliente, não apenas nas características técnicas do serviço.',
                docs: 'https://www.google.com/search?q=como+apresentar+serviços+no+site'
            },
            'depoimentos': {
                title: 'Seção de Depoimentos (Prova Social)',
                description: 'Marque se haverá uma seção com depoimentos de clientes para gerar prova social.',
                example: 'Citações de clientes satisfeitos, com nome, foto e empresa.',
                tips: 'Depoimentos em vídeo são ainda mais poderosos. A prova social é um fator decisivo para muitos clientes.',
                docs: 'https://rockcontent.com/br/blog/prova-social/'
            },
            'contato': {
                title: 'Seção de Contato Simplificada',
                description: 'Marque se haverá uma seção de contato simplificada na página inicial.',
                example: 'Um formulário simples ou informações de contato diretas no final da página.',
                tips: 'Facilite ao máximo o contato. Incluir um formulário na própria home reduz o atrito.',
                docs: 'https://www.google.com/search?q=melhores+praticas+formulario+de+contato'
            },
            'links-importantes': {
                title: 'Links Importantes no Rodapé',
                description: 'Marque se o rodapé (footer) conterá links importantes, como mapa do site, páginas de serviço, etc.',
                example: 'Links para "Termos de Uso", "Política de Privacidade", "Carreiras".',
                tips: 'O rodapé funciona como uma segunda chance de navegação e é onde os usuários esperam encontrar links administrativos.',
                docs: 'https://www.nngroup.com/articles/footers/'
            },
            'redes-sociais': {
                title: 'Links para Redes Sociais',
                description: 'Marque se o rodapé terá ícones com links para os perfis da empresa nas redes sociais.',
                example: 'Ícones para Instagram, Facebook, LinkedIn.',
                tips: 'Ajuda a conectar a presença online da marca. Certifique-se de que os links abrem em uma nova aba.',
                docs: 'https://www.google.com/search?q=icones+redes+sociais+no+rodape'
            },
            'copyright': {
                title: 'Aviso de Copyright',
                description: 'Marque se o rodapé incluirá o aviso de direitos autorais.',
                example: '© 2024 Nome da Empresa. Todos os direitos reservados.',
                tips: 'É uma prática padrão que ajuda a proteger o conteúdo do site.',
                docs: 'https://www.google.com/search?q=como+escrever+aviso+de+copyright'
            },
            'mapa-site': {
                title: 'Link para o Mapa do Site',
                description: 'Marque se haverá um link para a página do mapa do site (HTML sitemap) no rodapé.',
                example: 'Um link de texto "Mapa do Site" no rodapé.',
                tips: 'Ajuda usuários e mecanismos de busca a encontrar todas as páginas do seu site. Diferente do sitemap.xml.',
                docs: 'https://www.google.com/search?q=diferen%C3%A7a+sitemap+html+e+xml'
            },
            'mobile-320-768': {
                title: 'Teste em Mobile (320px - 768px)',
                description: 'Marque se o layout será testado e adaptado para telas de smartphones.',
                example: 'Verificar se o menu se torna um "hambúrguer", se os textos são legíveis e os botões são fáceis de tocar.',
                tips: 'A maioria do tráfego web hoje vem de dispositivos móveis. Esta é a visualização mais crítica.',
                docs: 'https://developers.google.com/web/fundamentals/design-and-ux/responsive'
            },
            'tablet-768-1024': {
                title: 'Teste em Tablet (768px - 1024px)',
                description: 'Marque se o layout será testado e adaptado para telas de tablets, tanto na vertical quanto na horizontal.',
                example: 'Ajustar o layout de colunas para aproveitar melhor o espaço da tela.',
                tips: 'O layout de tablet é muitas vezes negligenciado, mas pode oferecer uma experiência rica se bem planejado.',
                docs: 'https://www.google.com/search?q=design+responsivo+para+tablets'
            },
            'desktop-1024': {
                title: 'Teste em Desktop (1024px+)',
                description: 'Marque se o layout será testado para desktops e telas grandes.',
                example: 'Garantir que o layout não "quebre" ou pareça vazio em monitores wide-screen.',
                tips: 'O design deve ser fluido e se adaptar bem a diferentes resoluções de desktop, não apenas a uma largura fixa.',
                docs: 'https://www.google.com/search?q=design+responsivo+para+telas+grandes'
            },
            'mobile-first': {
                title: 'Abordagem Mobile-First',
                description: 'Marque se o desenvolvimento seguirá a abordagem "Mobile-First", começando o design e o código pela versão mobile.',
                example: 'O CSS é escrito primeiro para telas pequenas e depois adaptado para telas maiores usando `min-width` media queries.',
                tips: 'Mobile-first é a metodologia recomendada pelo Google e resulta em um código mais limpo e performático.',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first'
            },
            'teste-dispositivos-reais': {
                title: 'Teste em Dispositivos Reais',
                description: 'Marque se os testes de responsividade serão feitos em aparelhos físicos (celulares, tablets) e não apenas em emuladores.',
                example: 'Testar o site em um iPhone e em um celular Android real.',
                tips: 'Emuladores são úteis, mas nada substitui o teste em dispositivos reais para verificar a performance e a experiência de toque.',
                docs: 'https://www.google.com/search?q=importancia+de+testar+em+dispositivos+reais'
            },
            'navegacao-touch': {
                title: 'Navegação por Toque (Touch)',
                description: 'Marque se a navegação e as interações (como sliders) foram otimizadas para gestos de toque.',
                example: 'Sliders que podem ser arrastados com o dedo.',
                tips: 'Garanta que não haja conflitos entre os gestos do navegador (como zoom) e os gestos do seu site.',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/API/Touch_events'
            },
            'elementos-touch-friendly': {
                title: 'Elementos "Touch-Friendly"',
                description: 'Marque se os botões, links e outros elementos clicáveis têm um tamanho adequado para o toque (mínimo de 48x48 pixels).',
                example: 'Botões grandes e com espaçamento suficiente entre eles para evitar toques acidentais.',
                tips: 'O Google recomenda um tamanho mínimo de 48x48dp para qualquer elemento de toque para garantir a acessibilidade.',
                docs: 'https://web.dev/articles/accessible-tap-targets'
            },
            'ratio-4-5-1': {
                title: 'Contraste 4.5:1 para Texto Normal',
                description: 'Marque se o contraste entre a cor do texto normal (até 18px) e a cor de fundo atende ao mínimo de 4.5:1 (WCAG AA).',
                example: 'Texto preto (#000000) em fundo branco (#FFFFFF) tem contraste de 21:1.',
                tips: 'Use ferramentas online como o "WebAIM Contrast Checker" para verificar todas as combinações de cores.',
                docs: 'https://webaim.org/resources/contrastchecker/'
            },
            'ratio-3-1': {
                title: 'Contraste 3:1 para Texto Grande',
                description: 'Marque se o contraste para textos grandes (acima de 18px com negrito, ou 24px normal) atende ao mínimo de 3:1 (WCAG AA).',
                example: 'Um título grande pode ter um contraste ligeiramente menor, mas ainda precisa ser legível.',
                tips: 'Esta regra também se aplica a elementos gráficos e de interface, como bordas de inputs.',
                docs: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'
            },
            'estados-foco-visiveis': {
                title: 'Estados de Foco Visíveis (Focus States)',
                description: 'Marque se todos os elementos interativos (links, botões, inputs) têm um indicador visual claro quando navegados via teclado (tecla Tab).',
                example: 'Um contorno (outline) azul ao redor do botão quando ele está em foco.',
                tips: 'Nunca remova o `outline` padrão sem fornecer uma alternativa de foco visível e com bom contraste. Ex: `outline: none;` é péssimo para acessibilidade.',
                docs: 'https://web.dev/articles/focus-indicator'
            },
            'navegacao-teclado': {
                title: 'Navegação Completa por Teclado',
                description: 'Marque se é possível acessar e operar todas as funcionalidades do site usando apenas o teclado.',
                example: 'Navegar com Tab, selecionar com Enter/Espaço, fechar modais com Esc.',
                tips: 'Desconecte seu mouse e tente usar o site. Você consegue fazer tudo? Isso é crucial para usuários com deficiências motoras.',
                docs: 'https://web.dev/articles/keyboard-access'
            },
            'skip-links': {
                title: 'Links de Pulo (Skip Links)',
                description: 'Marque se existe um link oculto no topo da página que permite aos usuários de teclado "pular" diretamente para o conteúdo principal.',
                example: 'Um link "Pular para o conteúdo" que aparece apenas quando recebe foco via Tab.',
                tips: 'Essencial para evitar que usuários de teclado tenham que navegar por todo o menu em cada página.',
                docs: 'https://www.sarasoueidan.com/blog/skip-links/'
            },
            'ordem-logica-tab': {
                title: 'Ordem Lógica de Tabulação',
                description: 'Marque se a ordem de navegação com a tecla Tab segue a ordem visual e lógica da página.',
                example: 'O foco se move de cima para baixo, da esquerda para a direita, seguindo o fluxo de leitura.',
                tips: 'Evite usar `tabindex` com valores positivos, pois isso bagunça a ordem natural. A ordem deve ser definida pela estrutura do HTML.',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex'
            },
            'alt-text-imagens': {
                title: 'Texto Alternativo (Alt Text) em Imagens',
                description: 'Marque se todas as imagens significativas têm um atributo `alt` que descreve seu conteúdo para leitores de tela.',
                example: '`<img src="cachorro.jpg" alt="Um cachorro golden retriever brincando na grama">`',
                tips: 'Se a imagem for puramente decorativa, use um `alt` vazio (`alt=""`) para que os leitores de tela a ignorem.',
                docs: 'https://www.w3.org/WAI/tutorials/images/decision-tree/'
            },
            'labels-formularios': {
                title: 'Rótulos (Labels) em Formulários',
                description: 'Marque se todos os campos de formulário (`input`, `textarea`, `select`) estão associados a um rótulo (`<label>`) visível.',
                example: '`<label for="email">E-mail:</label> <input type="email" id="email">`',
                tips: 'O atributo `for` na label deve corresponder ao `id` do input. Isso melhora a acessibilidade e a usabilidade (clicar na label foca o campo).',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/forms/HTML5_input_types'
            },
            'estrutura-semantica': {
                title: 'Estrutura Semântica HTML',
                description: 'Marque se o código HTML usa as tags corretas para seus propósitos, criando uma estrutura clara e significativa.',
                example: 'Uso de `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` em vez de apenas `<div>`.',
                tips: 'A semântica correta é um dos pilares da acessibilidade e do SEO, pois ajuda máquinas a entenderem a estrutura do seu conteúdo.',
                docs: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics'
            },
            'aria-attributes': {
                title: 'Uso de Atributos ARIA',
                description: 'Marque se atributos ARIA (Accessible Rich Internet Applications) são usados quando necessário para melhorar a acessibilidade de componentes complexos.',
                example: 'Uso de `aria-expanded="true"` em um menu accordion para indicar que ele está aberto.',
                tips: 'Use ARIA com cautela. A primeira regra do ARIA é: não use ARIA se um elemento HTML nativo já oferece a semântica que você precisa.',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques'
            },
            'formato-webp': {
                title: 'Formato de Imagem WebP',
                description: 'Marque se as imagens são servidas no formato WebP, que é mais leve que JPG e PNG.',
                example: 'Uma imagem que tinha 150KB em JPG pode ter 90KB em WebP com qualidade similar.',
                tips: 'Use a tag `<picture>` para oferecer WebP e um formato de fallback (como JPG) para navegadores mais antigos.',
                docs: 'https://web.dev/articles/serve-images-webp'
            },
            'compressao-adequada': {
                title: 'Compressão de Imagem Adequada',
                description: 'Marque se todas as imagens passaram por um processo de compressão para reduzir seu tamanho em KBs sem perda visível de qualidade.',
                example: 'Uso de ferramentas como TinyPNG, Squoosh ou plugins de otimização automática.',
                tips: 'A otimização de imagens é o fator que mais impacta a velocidade de carregamento da maioria dos sites.',
                docs: 'https://web.dev/articles/optimize-images'
            },
            'lazy-loading': {
                title: 'Lazy Loading para Imagens e Iframes',
                description: 'Marque se imagens e iframes que estão fora da tela inicial (below the fold) são carregados apenas quando o usuário rola a página até eles.',
                example: '`<img src="imagem.jpg" loading="lazy">`',
                tips: 'O lazy loading nativo (`loading="lazy"`) é suportado pela maioria dos navegadores modernos e é muito fácil de implementar.',
                docs: 'https://web.dev/articles/lazy-loading'
            },
            'responsive-images': {
                title: 'Imagens Responsivas',
                description: 'Marque se o site serve imagens de tamanhos diferentes para dispositivos diferentes, evitando carregar imagens gigantes em telas pequenas.',
                example: 'Uso do atributo `srcset` na tag `<img>` ou da tag `<picture>`.',
                tips: 'Isso evita que um celular baixe uma imagem de 1920px de largura, economizando dados e acelerando o carregamento.',
                docs: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images'
            },
            'minificacao-css': {
                title: 'Minificação de CSS',
                description: 'Marque se os arquivos CSS são "minificados", ou seja, têm espaços, comentários e quebras de linha removidos para reduzir seu tamanho.',
                example: '`style.css` (10KB) se torna `style.min.css` (7KB).',
                tips: 'Isso é geralmente feito automaticamente por ferramentas de build (como Webpack, Vite) ou otimizadores de cache.',
                docs: 'https://web.dev/articles/minify-css'
            },
            'minificacao-js': {
                title: 'Minificação de JavaScript',
                description: 'Marque se os arquivos JavaScript são minificados para reduzir seu tamanho.',
                example: '`app.js` (50KB) se torna `app.min.js` (30KB).',
                tips: 'Além da minificação, técnicas como "tree-shaking" (remoção de código não usado) são essenciais.',
                docs: 'https://web.dev/articles/minify-javascript'
            },
            'compressao-html': {
                title: 'Compressão de HTML',
                description: 'Marque se o servidor está configurado para comprimir o código HTML antes de enviá-lo ao navegador.',
                example: 'Uso de Gzip ou Brotli no servidor web.',
                tips: 'Esta é uma configuração do lado do servidor (ex: Apache, Nginx) que pode reduzir significativamente o tamanho do HTML transferido.',
                docs: 'https://web.dev/articles/compress-text-based-assets'
            },
            'remove-codigo-nao-usado': {
                title: 'Remoção de Código Não Usado',
                description: 'Marque se foi feita uma análise para remover CSS e JavaScript que não são utilizados em cada página.',
                example: 'Usar a aba "Coverage" no DevTools do Chrome para identificar código não utilizado.',
                tips: 'Frameworks CSS como Bootstrap podem carregar muitas regras que você não usa. Ferramentas como PurgeCSS podem ajudar a limpar.',
                docs: 'https://web.dev/articles/remove-unused-css'
            },
            'lcp-2-5s': {
                title: 'LCP < 2.5s (Core Web Vitals)',
                description: 'Marque se o "Largest Contentful Paint" (tempo para renderizar o maior elemento da tela) está abaixo de 2.5 segundos.',
                example: 'Medido com o Google PageSpeed Insights.',
                tips: 'O LCP é a principal métrica de velocidade percebida pelo usuário. Geralmente, o elemento LCP é a imagem principal ou o bloco de texto.',
                docs: 'https://web.dev/articles/lcp'
            },
            'fid-100ms': {
                title: 'FID < 100ms (Core Web Vitals)',
                description: 'Marque se o "First Input Delay" (tempo de resposta à primeira interação do usuário) está abaixo de 100 milissegundos.',
                example: 'Medido com o Google PageSpeed Insights (dados de campo).',
                tips: 'JavaScript pesado e tarefas longas bloqueando a thread principal são os maiores vilões do FID. Use `requestIdleCallback` ou Web Workers.',
                docs: 'https://web.dev/articles/fid'
            },
            'cls-0-1': {
                title: 'CLS < 0.1 (Core Web Vitals)',
                description: 'Marque se o "Cumulative Layout Shift" (estabilidade visual da página) tem uma pontuação abaixo de 0.1.',
                example: 'Evitar que elementos pulem na tela enquanto a página carrega.',
                tips: 'Sempre defina as dimensões (`width` e `height`) em imagens e vídeos para evitar que o layout mude quando eles carregarem.',
                docs: 'https://web.dev/articles/cls'
            },
            'title-tag': {
                title: 'Title Tag',
                description: 'O título da página que aparece na aba do navegador e nos resultados de busca do Google.',
                example: '`<title>Consultoria de SEO para E-commerce | Nome da Agência</title>`',
                tips: 'Deve ter entre 50-60 caracteres, incluir a palavra-chave principal e ser atrativo para o clique.',
                docs: 'https://developers.google.com/search/docs/appearance/title-link'
            },
            'title-tag-check': {
                title: 'Title Tag Otimizada',
                description: 'Marque se cada página possui uma tag `<title>` única e otimizada para SEO.',
                example: 'A página de serviço tem um título, a de contato tem outro, etc.',
                tips: 'Títulos duplicados são um problema de SEO. Garanta que cada página tenha um título descritivo e único.',
                docs: 'https://www.google.com/search?q=evitar+title+tags+duplicadas'
            },
            'meta-description': {
                title: 'Meta Description',
                description: 'A descrição que aparece abaixo do título nos resultados de busca. Não é um fator de ranking, mas influencia a taxa de cliques (CTR).',
                example: '`<meta name="description" content="Aumente suas vendas com nossa consultoria de SEO. Estratégias personalizadas para e-commerce. Peça uma análise grátis!">`',
                tips: 'Deve ter entre 150-160 caracteres, ser uma chamada para ação e incluir a palavra-chave.',
                docs: 'https://developers.google.com/search/docs/appearance/snippet'
            },
            'meta-description-check': {
                title: 'Meta Description Otimizada',
                description: 'Marque se cada página possui uma meta description única e persuasiva.',
                example: 'Cada página tem uma descrição que resume seu conteúdo e incentiva o clique.',
                tips: 'Se você não fornecer uma, o Google escolherá um trecho da página, que nem sempre é o ideal.',
                docs: 'https://www.google.com/search?q=como+escrever+meta+description'
            },
            'meta-keywords': {
                title: 'Meta Keywords',
                description: 'Uma antiga meta tag para listar palavras-chave. Hoje, é ignorada pela maioria dos buscadores, incluindo o Google.',
                example: '`<meta name="keywords" content="seo, marketing, site">`',
                tips: 'É seguro não usar esta tag. Focar seu tempo em outras otimizações de SEO trará mais resultados.',
                docs: 'https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag'
            },
            'meta-keywords-check': {
                title: 'Meta Keywords (Opcional)',
                description: 'Marque se definiu as meta keywords. Lembre-se que o Google não as utiliza mais para ranking.',
                example: 'Campo preenchido, ciente do seu baixo impacto.',
                tips: 'Alguns buscadores menores (como Yandex) ainda podem considerá-la, mas para o Google é irrelevante.',
                docs: 'https://www.google.com/search?q=meta+keywords+ainda+funciona'
            },
            'open-graph-tags': {
                title: 'Open Graph Tags',
                description: 'Tags que controlam como o conteúdo do seu site aparece quando compartilhado em redes sociais como Facebook, LinkedIn e WhatsApp.',
                example: '`og:title`, `og:description`, `og:image`, `og:url`.',
                tips: 'Definir uma imagem de alta qualidade (`og:image`) é crucial para aumentar o engajamento dos seus links nas redes sociais.',
                docs: 'https://ogp.me/'
            },
            'urls-amigaveis': {
                title: 'URLs Amigáveis',
                description: 'Marque se as URLs são curtas, descritivas e fáceis de ler para humanos e mecanismos de busca.',
                example: 'Bom: `/servicos/consultoria-seo`. Ruim: `/page.php?id=123`.',
                tips: 'Use hífens para separar palavras, inclua a palavra-chave principal e mantenha a URL o mais curta possível.',
                docs: 'https://developers.google.com/search/docs/crawling-indexing/url-structure'
            },
            'estrutura-headings': {
                title: 'Estrutura de Headings (H1, H2, H3)',
                description: 'Marque se a página usa as tags de cabeçalho (H1, H2, etc.) de forma hierárquica e lógica.',
                example: 'Apenas um H1 por página, com H2s para subseções e H3s para sub-subseções.',
                tips: 'Uma boa estrutura de headings ajuda no SEO e na acessibilidade, permitindo que os usuários entendam a estrutura do conteúdo.',
                docs: 'https://www.semrush.com/blog/h1-tag/'
            },
            'sitemap-xml': {
                title: 'Sitemap.xml',
                description: 'Marque se um arquivo `sitemap.xml` foi criado e enviado ao Google Search Console.',
                example: 'Um arquivo XML que lista todas as URLs importantes do site que devem ser indexadas.',
                tips: 'A maioria dos plugins de SEO (como Yoast, Rank Math) gera e atualiza o sitemap automaticamente.',
                docs: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap'
            },
            'robots-txt': {
                title: 'Robots.txt',
                description: 'Marque se o arquivo `robots.txt` está configurado corretamente para guiar os robôs de busca.',
                example: 'Bloquear páginas de admin, resultados de busca internos e apontar para o `sitemap.xml`.',
                tips: 'Cuidado para não bloquear acidentalmente recursos importantes como CSS ou JS, pois isso pode prejudicar a renderização e o ranking.',
                docs: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro'
            },
            'pesquisa-keywords': {
                title: 'Pesquisa de Palavras-chave',
                description: 'Marque se foi realizada uma pesquisa para identificar os termos que o público-alvo usa para buscar seus produtos/serviços.',
                example: 'Uso de ferramentas como Google Keyword Planner, SEMrush, Ahrefs.',
                tips: 'Foque em palavras-chave de "cauda longa" (long-tail), que são mais específicas e geralmente têm maior intenção de compra.',
                docs: 'https://rockcontent.com/br/blog/o-que-e-palavra-chave/'
            },
            'conteudo-otimizado': {
                title: 'Conteúdo Otimizado para SEO',
                description: 'Marque se o conteúdo textual do site (títulos, parágrafos) foi escrito de forma natural para incluir as palavras-chave pesquisadas.',
                example: 'O texto responde às perguntas dos usuários e usa a palavra-chave principal e suas variações.',
                tips: 'Escreva para pessoas, não para robôs. O conteúdo de qualidade que resolve o problema do usuário é o melhor SEO.',
                docs: 'https://www.google.com/search?q=como+escrever+conteudo+otimizado+para+seo'
            },
            'schema-markup': {
                title: 'Schema Markup (Dados Estruturados)',
                description: 'Marque se o site usa dados estruturados (Schema.org) para ajudar o Google a entender melhor o conteúdo e exibir "rich snippets".',
                example: 'Schema de "LocalBusiness" para uma loja física, "Product" para um e-commerce, "FAQPage" para uma página de FAQ.',
                tips: 'Dados estruturados podem melhorar drasticamente sua aparência nos resultados de busca, aumentando o CTR.',
                docs: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data'
            },
            'certificado-ssl': {
                title: 'Certificado SSL Instalado',
                description: 'Marque se um certificado SSL está instalado e ativado, fazendo o site rodar em HTTPS.',
                example: 'O cadeado verde/fechado aparece na barra de endereço do navegador.',
                tips: 'HTTPS é um fator de ranking do Google e essencial para a segurança e confiança do usuário. Use Let\'s Encrypt para uma opção gratuita.',
                docs: 'https://web.dev/articles/why-https-matters'
            },
            'redirect-https': {
                title: 'Redirecionamento para HTTPS',
                description: 'Marque se todas as requisições HTTP são automaticamente redirecionadas para a versão segura HTTPS.',
                example: 'Digitar `http://meusite.com` leva automaticamente para `https://meusite.com`.',
                tips: 'Isso garante que todos os usuários e robôs acessem a versão segura do site, evitando conteúdo duplicado.',
                docs: 'https://www.google.com/search?q=como+redirecionar+http+para+https'
            },
            'hsts-headers': {
                title: 'Cabeçalhos HSTS',
                description: 'Marque se o cabeçalho HTTP Strict-Transport-Security (HSTS) está ativado para forçar o navegador a usar apenas HTTPS.',
                example: '`Strict-Transport-Security: max-age=31536000; includeSubDomains`',
                tips: 'HSTS aumenta a segurança ao prevenir ataques de "man-in-the-middle". Implemente com cuidado, pois pode quebrar o site se o SSL falhar.',
                docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security'
            },
            'sanitizacao-inputs': {
                title: 'Sanitização de Entradas (Inputs)',
                description: 'Marque se todas as entradas de dados do usuário (formulários, URLs) são validadas e sanitizadas no servidor para prevenir ataques.',
                example: 'Remover tags HTML de um campo de nome para prevenir XSS (Cross-Site Scripting).',
                tips: 'Nunca confie nos dados enviados pelo usuário. Valide no frontend para UX e sanitize no backend para segurança.',
                docs: 'https://owasp.org/www-community/attacks/xss/'
            },
            'protecao-csrf': {
                title: 'Proteção contra CSRF',
                description: 'Marque se os formulários estão protegidos contra ataques de Cross-Site Request Forgery (CSRF) usando tokens.',
                example: 'Um token único e secreto é gerado para cada sessão de usuário e validado a cada envio de formulário.',
                tips: 'Frameworks modernos geralmente têm proteção contra CSRF embutida, mas é crucial garantir que ela esteja ativada e configurada.',
                docs: 'https://owasp.org/www-community/attacks/csrf'
            },
            'headers-seguranca': {
                title: 'Outros Cabeçalhos de Segurança',
                description: 'Marque se outros cabeçalhos de segurança (como Content-Security-Policy, X-Frame-Options) estão implementados.',
                example: 'CSP para evitar XSS, X-Frame-Options para prevenir clickjacking.',
                tips: 'Use uma ferramenta como o securityheaders.com para escanear seu site e ver recomendações.',
                docs: 'https://web.dev/articles/security-headers'
            },
            'backup-regular': {
                title: 'Rotina de Backup Regular',
                description: 'Marque se existe um sistema de backup automático para os arquivos e o banco de dados do site.',
                example: 'Backups diários armazenados em um local externo (ex: Amazon S3).',
                tips: 'Não basta fazer o backup, é preciso testar a restauração periodicamente para garantir que ele funciona.',
                docs: 'https://www.google.com/search?q=importancia+de+backup+de+site'
            },
            'todos-links': {
                title: 'Teste de Todos os Links',
                description: 'Marque se todos os links internos e externos do site foram clicados para garantir que não há links quebrados (erro 404).',
                example: 'Verificar links no menu, no corpo do texto e no rodapé.',
                tips: 'Use ferramentas online como o "Broken Link Checker" para automatizar essa verificação em sites grandes.',
                docs: 'https://www.google.com/search?q=broken+link+checker+online'
            },
            'formularios': {
                title: 'Teste de Formulários',
                description: 'Marque se todos os formulários foram testados: envio, validação de campos, mensagens de erro e recebimento de notificações.',
                example: 'Preencher o formulário de contato e verificar se o e-mail de notificação chega corretamente.',
                tips: 'Teste cenários de sucesso e de erro (ex: e-mail inválido, campo obrigatório em branco).',
                docs: 'https://www.google.com/search?q=como+testar+formularios+web'
            },
            'funcionalidades-js': {
                title: 'Teste de Funcionalidades JavaScript',
                description: 'Marque se todas as funcionalidades interativas que dependem de JavaScript (sliders, modais, menus, etc.) estão funcionando corretamente.',
                example: 'Abrir e fechar um modal, navegar em um carrossel de imagens.',
                tips: 'Teste com o console do navegador aberto (F12) para verificar se há algum erro de JavaScript sendo exibido.',
                docs: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/JavaScript_troubleshooting'
            },
            'chrome': {
                title: 'Teste no Chrome',
                description: 'Marque se o site foi testado na versão mais recente do Google Chrome, o navegador mais popular.',
                example: 'Verificar layout, fontes e funcionalidades no Chrome para Desktop e Android.',
                tips: 'O Chrome domina o mercado, então a compatibilidade com ele é obrigatória.',
                docs: 'https://www.google.com/chrome/'
            },
            'firefox': {
                title: 'Teste no Firefox',
                description: 'Marque se o site foi testado na versão mais recente do Mozilla Firefox.',
                example: 'Verificar se não há problemas de renderização ou de comportamento de scripts.',
                tips: 'O Firefox tem um motor de renderização diferente do Chrome (Gecko), então é importante testar nele para garantir a compatibilidade.',
                docs: 'https://www.mozilla.org/firefox/new/'
            },
            'safari': {
                title: 'Teste no Safari',
                description: 'Marque se o site foi testado no Safari, o navegador padrão em dispositivos Apple (Mac, iPhone, iPad).',
                example: 'Verificar no Safari para macOS e iOS.',
                tips: 'O Safari é conhecido por ter algumas peculiaridades de CSS e JavaScript. O teste é crucial se seu público usa produtos Apple.',
                docs: 'https://www.apple.com/safari/'
            },
            'edge': {
                title: 'Teste no Edge',
                description: 'Marque se o site foi testado no Microsoft Edge.',
                example: 'Verificar o site no navegador padrão do Windows.',
                tips: 'As versões mais recentes do Edge usam o mesmo motor do Chrome (Chromium), o que simplifica os testes. Versões antigas podem exigir mais atenção.',
                docs: 'https://www.microsoft.com/edge'
            },
            'pagespeed-insights': {
                title: 'Teste no PageSpeed Insights',
                description: 'Marque se o site foi analisado com a ferramenta do Google PageSpeed Insights para verificar a performance e os Core Web Vitals.',
                example: 'Obter uma pontuação acima de 90 para Mobile e Desktop.',
                tips: 'A ferramenta dá um diagnóstico completo e sugestões de otimização. Siga as recomendações para melhorar a performance.',
                docs: 'https://pagespeed.web.dev/'
            },
            'gtmetrix': {
                title: 'Teste no GTmetrix',
                description: 'Marque se o site foi analisado com o GTmetrix para obter uma visão detalhada da performance e da estrutura.',
                example: 'Analisar a "cachoeira" (waterfall) de carregamento para identificar gargalos.',
                tips: 'O GTmetrix oferece relatórios detalhados que ajudam a entender exatamente o que está lento no seu site.',
                docs: 'https://gtmetrix.com/'
            },
            'lighthouse': {
                title: 'Teste com o Lighthouse',
                description: 'Marque se uma auditoria completa foi realizada usando o Lighthouse (integrado ao Chrome DevTools).',
                example: 'Rodar o Lighthouse para auditar Performance, Acessibilidade, Melhores Práticas e SEO.',
                tips: 'O Lighthouse é uma ferramenta fantástica para um checklist final, pois cobre várias áreas importantes do desenvolvimento web.',
                docs: 'https://developer.chrome.com/docs/lighthouse/overview/'
            },
            'google-analytics': {
                title: 'Google Analytics Instalado',
                description: 'Marque se o código de acompanhamento do Google Analytics 4 (GA4) foi instalado em todas as páginas do site.',
                example: 'A tag do GA4 está presente no código-fonte de todas as páginas.',
                tips: 'Instale o GA4 desde o primeiro dia para começar a coletar dados. Dados históricos são extremamente valiosos.',
                docs: 'https://support.google.com/analytics/answer/9304153'
            },
            'google-search-console': {
                title: 'Google Search Console Configurado',
                description: 'Marque se a propriedade do site foi verificada no Google Search Console e o sitemap.xml foi enviado.',
                example: 'O site está verificado e o GSC está recebendo dados.',
                tips: 'O Search Console é essencial para monitorar a saúde do seu site no Google, ver erros de rastreamento, problemas de indexação e performance de busca.',
                docs: 'https://search.google.com/search-console/about'
            },
            'metas-conversao': {
                title: 'Metas de Conversão Configuradas',
                description: 'Marque se as ações mais importantes (conversões) foram configuradas como metas no Google Analytics.',
                example: 'Configurar uma meta para cada envio do formulário de contato ou cada venda concluída.',
                tips: 'Sem metas, você mede apenas o tráfego, não os resultados. Defina o que é uma conversão para o seu negócio e meça.',
                docs: 'https://support.google.com/analytics/answer/1032415'
            },
            'atualizacoes-seguranca': {
                title: 'Plano de Atualizações de Segurança',
                description: 'Marque se há um plano definido para manter a plataforma (ex: WordPress), temas e plugins sempre atualizados.',
                example: 'Verificar e aplicar atualizações semanalmente.',
                tips: 'A maioria das invasões a sites acontece por meio de software desatualizado. Manter tudo atualizado é a principal linha de defesa.',
                docs: 'https://www.google.com/search?q=importancia+de+manter+site+atualizado'
            },
            'backup-regular-pos': {
                title: 'Backup Regular (Pós-lançamento)',
                description: 'Marque se a rotina de backups automáticos está ativa e funcionando após o lançamento do site.',
                example: 'Confirmar que os backups diários estão sendo gerados e salvos externamente.',
                tips: 'Agende um lembrete trimestral para testar a restauração de um backup. Um backup que não funciona é inútil.',
                docs: 'https://www.google.com/search?q=plano+de+backup+para+sites'
            },
            'monitoramento-uptime': {
                title: 'Monitoramento de Uptime',
                description: 'Marque se uma ferramenta externa está monitorando o site 24/7 para alertar caso ele saia do ar.',
                example: 'Uso de serviços como UptimeRobot, Pingdom.',
                tips: 'Configure alertas por e-mail ou SMS para ser notificado imediatamente sobre qualquer indisponibilidade e poder agir rápido.',
                docs: 'https://uptimerobot.com/'
            },
            'otimizacoes-continuas': {
                title: 'Plano de Otimizações Contínuas',
                description: 'Marque se há um plano para analisar os dados do Analytics e do Search Console periodicamente para identificar oportunidades de melhoria.',
                example: 'Análise mensal de dados para otimizar páginas com alta taxa de rejeição ou melhorar o SEO de páginas com bom potencial.',
                tips: 'Um site nunca está "pronto". O lançamento é apenas o começo. A otimização contínua baseada em dados é o que gera crescimento a longo prazo.',
                docs: 'https://cxl.com/blog/cro-process/'
            }
        };

        // 2. Chamada final para iniciar a aplicação
        this.init();
    }

    // 3. Definição de todos os métodos da classe
    init() {
        this.setupAccordion();
        this.setupFormValidation();
        this.setupProgressTracking();
        this.setupPdfGeneration();
        this.setupClearDataButton();
        this.setupKeyboardNavigation();
        this.loadSavedData();
        this.calculateTotalFields();
        this.updateProgress();
        
        setTimeout(() => {
            this.setupHelpSystem();
        }, 100);
    }

    setupClearDataButton() {
        const footerContainer = document.querySelector('.footer .container');
        if (!footerContainer) {
            console.error('Container do rodapé não encontrado para adicionar o botão de limpar.');
            return;
        }

        // Previne a adição de múltiplos botões
        if (document.getElementById('clearDataBtn')) return;

        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.id = 'clearDataBtn';
        clearBtn.className = 'btn btn--secondary';
        clearBtn.textContent = '🗑️ Limpar Dados';
        clearBtn.setAttribute('title', 'Limpa todos os dados preenchidos no formulário');

        footerContainer.appendChild(clearBtn);

        clearBtn.addEventListener('click', () => {
            const wantsToClear = confirm('Você tem certeza que deseja apagar todo o progresso? Esta ação não pode ser desfeita.');
            
            if (wantsToClear) {
                sessionStorage.removeItem('checklistData');
                location.reload();
            }
        });
    }

    setupHelpSystem() {
        this.addHelpIcons();
        
        document.addEventListener('click', (e) => {
            const helpIcon = e.target.closest('.help-icon');
            if (helpIcon) {
                e.preventDefault();
                e.stopPropagation();
                this.showTooltip(helpIcon);
            } else if (!e.target.closest('.tooltip')) {
                this.hideAllTooltips();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllTooltips();
            }
        });
    }

    addHelpIcons() {
        const formElements = this.form.querySelectorAll('input[name], select[name], textarea[name]');
        
        formElements.forEach(element => {
            const fieldName = element.getAttribute('name');
            
            if (this.helpData[fieldName]) {
                const label = this.findLabelForInput(element);
                
                if (label && !label.querySelector('.help-icon')) {
                    const helpIcon = this.createHelpIcon(fieldName);
                    label.appendChild(helpIcon);
                }
            }
        });
    }

    findLabelForInput(input) {
        if (input.id) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) return label;
        }
        
        const parentLabel = input.closest('label');
        if (parentLabel) return parentLabel;
        
        let sibling = input.previousElementSibling;
        while (sibling) {
            if (sibling.tagName === 'LABEL') return sibling;
            sibling = sibling.previousElementSibling;
        }
        
        const container = input.closest('.form-group, .fieldset, .checkbox-group');
        if (container) {
            const label = container.querySelector('label');
            if (label) return label;
        }
        
        return null;
    }

    createHelpIcon(fieldName) {
        const helpIcon = document.createElement('button');
        helpIcon.className = 'help-icon';
        helpIcon.type = 'button';
        helpIcon.setAttribute('data-field', fieldName);
        helpIcon.setAttribute('aria-label', `Ajuda para ${this.helpData[fieldName].title}`);
        helpIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        `;
        return helpIcon;
    }

    showTooltip(helpIcon) {
        const fieldName = helpIcon.getAttribute('data-field');
        const helpInfo = this.helpData[fieldName];
        
        if (!helpInfo) return;

        this.hideAllTooltips();

        let docsLink = '';
        if (helpInfo.docs) {
            docsLink = `
                <div class="tooltip-docs">
                    <a href="${helpInfo.docs}" target="_blank" rel="noopener noreferrer">
                        Ler documentação completa ↗
                    </a>
                </div>
            `;
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h4 class="tooltip-title">${helpInfo.title}</h4>
                <button class="tooltip-close" aria-label="Fechar ajuda">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="tooltip-content">
                <p class="tooltip-description">${helpInfo.description}</p>
                <div class="tooltip-example"><strong>Exemplo:</strong><p>${helpInfo.example}</p></div>
                <div class="tooltip-tips"><strong>Dica:</strong><p>${helpInfo.tips}</p></div>
                ${docsLink}
            </div>
        `;
        
        document.body.appendChild(tooltip);
        this.positionTooltip(tooltip, helpIcon);
        
        tooltip.querySelector('.tooltip-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideAllTooltips();
        });

        tooltip.setAttribute('tabindex', '-1');
        tooltip.focus();
    }

    positionTooltip(tooltip, trigger) {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let top = triggerRect.top + scrollTop - tooltipRect.height - 10;
        let left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);

        if (left + tooltipRect.width > viewportWidth + scrollLeft - 20) left = viewportWidth + scrollLeft - tooltipRect.width - 20;
        if (left < scrollLeft + 20) left = scrollLeft + 20;
        if (top < scrollTop + 20) top = triggerRect.bottom + scrollTop + 10;

        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.zIndex = '10000';
    }

    hideAllTooltips() {
        document.querySelectorAll('.tooltip').forEach(tooltip => tooltip.remove());
    }

    setupAccordion() {
        this.accordionHeaders.forEach((header, index) => {
            header.addEventListener('click', () => this.toggleAccordion(header));
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleAccordion(header);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.focusNextHeader(index);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.focusPrevHeader(index);
                }
            });
        });
    }

    toggleAccordion(header) {
        const content = document.getElementById(header.getAttribute('aria-controls'));
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        this.accordionHeaders.forEach(h => {
            if (h !== header) {
                h.setAttribute('aria-expanded', 'false');
                document.getElementById(h.getAttribute('aria-controls')).classList.remove('expanded');
            }
        });

        header.setAttribute('aria-expanded', String(!isExpanded));
        content.classList.toggle('expanded', !isExpanded);

        if (!isExpanded) {
            setTimeout(() => header.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
        }
    }

    focusNextHeader(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.accordionHeaders.length;
        this.accordionHeaders[nextIndex].focus();
    }

    focusPrevHeader(currentIndex) {
        const prevIndex = (currentIndex - 1 + this.accordionHeaders.length) % this.accordionHeaders.length;
        this.accordionHeaders[prevIndex].focus();
    }

    setupFormValidation() {
        this.form.querySelectorAll('input[required], select[required]').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.validateField(field));
        });
    }

    validateField(field) {
        const isEmpty = !field.value.trim();
        field.classList.toggle('error', isEmpty);
        this.updateProgress();
    }

    setupProgressTracking() {
        this.form.addEventListener('input', () => this.updateProgress());
    }

    calculateTotalFields() {
        this.totalFields = this.form.querySelectorAll('[data-section]').length;
    }

    updateProgress() {
        let totalCompleted = 0;
        Object.keys(this.sectionData).forEach(sectionId => {
            const sectionFields = this.form.querySelectorAll(`[data-section="${sectionId}"]`);
            let sectionCompleted = 0;
            sectionFields.forEach(field => {
                if ((field.type === 'checkbox' && field.checked) || (field.type !== 'checkbox' && field.value.trim())) {
                    sectionCompleted++;
                }
            });
            this.sectionData[sectionId].completed = sectionCompleted;
            totalCompleted += sectionCompleted;
            const counter = document.getElementById(`counter-${sectionId}`);
            if (counter) {
                counter.textContent = `${sectionCompleted}/${this.sectionData[sectionId].total}`;
            }
        });

        this.completedFields = totalCompleted;
        const percentage = this.totalFields > 0 ? Math.round((this.completedFields / this.totalFields) * 100) : 0;
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}% Completo`;
        this.saveData();
    }

    setupPdfGeneration() {
        this.generatePdfBtn.addEventListener('click', () => this.generatePDF());
    }

    setupKeyboardNavigation() {
        // Lógica de navegação por teclado pode ser mantida ou adicionada aqui
    }

    saveData() {
        const data = {};
        const formData = new FormData(this.form);
        for (const [key, value] of formData.entries()) {
            if (data[key]) {
                if (!Array.isArray(data[key])) data[key] = [data[key]];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        // Garante que checkboxes desmarcados sejam salvos como 'false'
        this.form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            if (!cb.checked) {
                if (data[cb.name] === undefined) data[cb.name] = false;
            }
        });
        sessionStorage.setItem('checklistData', JSON.stringify(data));
    }

    loadSavedData() {
        const savedData = sessionStorage.getItem('checklistData');
        if (!savedData) return;
        
        const data = JSON.parse(savedData);
        Object.entries(data).forEach(([key, value]) => {
            const elements = this.form.querySelectorAll(`[name="${key}"]`);
            if (elements.length > 0) {
                const el = elements[0];
                if (el.type === 'checkbox') {
                    elements.forEach(cb => {
                        if (Array.isArray(value)) cb.checked = value.includes(cb.value);
                        else cb.checked = (value === true || value === cb.value);
                    });
                } else if (el.type === 'radio') {
                    elements.forEach(rb => rb.checked = rb.value === value);
                } else {
                    el.value = value || '';
                }
            }
        });
    }

    async loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf && window.jspdf.jsPDF) return resolve(window.jspdf.jsPDF);
            if (window.jsPDF) return resolve(window.jsPDF); // Fallback for some versions
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => resolve(window.jspdf.jsPDF || window.jsPDF);
            script.onerror = () => reject(new Error('Erro ao carregar jsPDF'));
            document.head.appendChild(script);
        });
    }

 async generatePDF() {
        this.generatePdfBtn.classList.add('loading');
        this.generatePdfBtn.disabled = true;
        this.generatePdfBtn.textContent = 'Carregando biblioteca...';

        try {
            const jsPDF = await this.loadJsPDF();
            this.generatePdfBtn.textContent = 'Gerando PDF...';
            await new Promise(resolve => setTimeout(resolve, 100));

            const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            const margin = 15;
            const pageWidth = doc.internal.pageSize.width;
            const usableWidth = pageWidth - (margin * 2);
            let y = margin;

            const checkPageBreak = (neededHeight = 10) => {
                if (y + neededHeight > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    y = margin;
                }
            };

            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('Checklist de Site Profissional', margin, y);
            y += 8;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const today = new Date().toLocaleDateString('pt-BR');
            const nomeEmpresa = this.form.querySelector('#nome-empresa').value;
            doc.text(`Projeto: ${nomeEmpresa || 'Não informado'} | Gerado em: ${today}`, margin, y);
            y += 12;

            this.accordionHeaders.forEach((header) => {
                const sectionId = header.getAttribute('aria-controls');
                const sectionTitle = header.querySelector('.section-title').textContent;
                const sectionNumber = header.querySelector('.section-number').textContent;

                checkPageBreak(12);
                doc.setFontSize(13);
                doc.setFont(undefined, 'bold');
                doc.text(`${sectionNumber}. ${sectionTitle}`, margin, y);
                y += 8;

                const sectionElement = document.getElementById(sectionId);
                const fields = sectionElement.querySelectorAll('input, select, textarea');

                // --- INÍCIO DA LÓGICA DE FORMATAÇÃO FINAL ---
                fields.forEach(field => {
                    if (!field.name) return;
                    checkPageBreak(15); // Aumenta o espaço verificado

                    const label = this.getFieldLabel(field);
                    let valueText = '';
                    let statusSymbol = '';

                    // Define o símbolo e o texto do valor
                    if (field.type === 'checkbox') {
                        statusSymbol = field.checked ? '✔' : '✗';
                        valueText = field.checked ? 'Sim' : 'Não';
                    } else if (field.type === 'radio') {
                        if (!field.checked) return;
                        statusSymbol = '✔';
                        valueText = field.value || 'Opção selecionada';
                    } else {
                        statusSymbol = field.value.trim() ? '✔' : '✗';
                        valueText = field.value.trim() || 'Não preenchido';
                    }

                    doc.setFontSize(9);
                    
                    // 1. Desenha o label principal, com quebra de linha na largura total
                    doc.setFont(undefined, 'normal');
                    const labelFinalText = `${statusSymbol} ${label}`;
                    const labelLines = doc.splitTextToSize(labelFinalText, usableWidth);
                    doc.text(labelLines, margin, y);

                    // 2. Incrementa Y baseado na altura do label que acabou de ser desenhado
                    y += (labelLines.length * 4.5); // Incremento baseado no número de linhas do label
                    checkPageBreak(10);

                    // 3. Desenha o valor na linha de baixo, com recuo e em negrito
                    doc.setFont(undefined, 'bold');
                    const valueFinalText = `↳ ${valueText}`;
                    doc.text(valueFinalText, margin + 5, y);
                    
                    // 4. Incremento final para o próximo item
                    y += 4.5 + 3; // Incrementa a altura de uma linha + espaçamento
                });
                // --- FIM DA LÓGICA DE FORMATAÇÃO FINAL ---

                y += 4; // Espaço extra entre as seções
            });

            // Adiciona numeração nas páginas
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: 'right' });
            }

            const fileName = `checklist-site-${(nomeEmpresa || 'projeto').toLowerCase().replace(/\s/g, '_')}.pdf`;
            doc.save(fileName);

            this.showNotification('PDF gerado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            this.showNotification('Erro ao gerar o PDF. Verifique a conexão.', 'error');
        } finally {
            this.generatePdfBtn.classList.remove('loading');
            this.generatePdfBtn.disabled = false;
            this.generatePdfBtn.textContent = '📄 Gerar PDF';
        }
    }
    
    showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
    
    collectFormData() {
        const data = {};
        new FormData(this.form).forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    
    getFieldLabel(field) {
        let labelElement = this.findLabelForInput(field);
        if (labelElement) {
            const labelText = labelElement.cloneNode(true);
            const helpIcon = labelText.querySelector('.help-icon');
            if (helpIcon) helpIcon.remove();
            const checkmark = labelText.querySelector('.checkmark');
            if(checkmark) checkmark.remove();
            return labelText.textContent.replace(/\s*\*\s*$/, '').trim();
        }
        return field.name || field.id || 'Campo sem nome';
    }
}

// Inicialização da aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new ChecklistApp();
});

// Estilos CSS completos injetados via JS
const style = document.createElement('style');
style.textContent = `
    /* ESTILOS PARA BOTÕES DO RODAPÉ */
    .footer .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        align-items: center;
    }
    #clearDataBtn {
        background-color: var(--color-surface-alt, #4a4a4a);
        color: var(--color-text-secondary, #ccc);
        border: 1px solid var(--color-border, #555);
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
    }
    #clearDataBtn:hover {
        background-color: #c53030; /* Vermelho perigo */
        color: #fff;
        border-color: #c53030;
        transform: translateY(-2px);
    }

    /* ESTILOS GERAIS E DE COMPONENTES */
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .notification {
        position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 6px;
        color: white; font-weight: 500; z-index: 10000; max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease;
        background-color: #6c7477; /* info */
    }
    .notification--success { background-color: #32b8c6; }
    .notification--error { background-color: #ff5459; }

    .help-icon {
        background: none; border: none; color: var(--color-primary); cursor: pointer;
        padding: 4px; margin-left: 8px; border-radius: 50%; display: inline-flex;
        align-items: center; justify-content: center; transition: all 0.2s ease;
        vertical-align: middle; line-height: 1; width: 24px; height: 24px; flex-shrink: 0;
    }
    .help-icon:hover {
        background-color: var(--color-primary); color: var(--color-background); transform: scale(1.1);
    }
    .help-icon:focus {
        outline: 2px solid var(--color-primary); outline-offset: 2px;
    }
    .help-icon svg { width: 16px; height: 16px; pointer-events: none; }

    .tooltip {
        position: absolute; background: var(--color-surface); border: 1px solid var(--color-border);
        border-radius: 12px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15); padding: 0;
        max-width: 420px; min-width: 320px; z-index: 10000; animation: tooltipFadeIn 0.3s ease;
        font-family: var(--font-family-base);
    }
    @keyframes tooltipFadeIn {
        from { opacity: 0; transform: translateY(-10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .tooltip-header {
        display: flex; justify-content: space-between; align-items: center; padding: 16px 20px;
        border-bottom: 1px solid var(--color-border);
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    }
    .tooltip-title {
        margin: 0; font-size: 16px; font-weight: 600; color: var(--color-background);
    }
    .tooltip-close {
        background: none; border: none; color: var(--color-background); cursor: pointer;
        padding: 6px; border-radius: 50%; display: flex; transition: all 0.2s ease; opacity: 0.8;
    }
    .tooltip-close:hover {
        background-color: rgba(255, 255, 255, 0.2); opacity: 1; transform: rotate(90deg);
    }
    .tooltip-close svg { width: 18px; height: 18px; pointer-events: none; stroke: currentColor; stroke-width: 2.5; }
    .tooltip-content { padding: 20px; }
    .tooltip-description {
        margin: 0 0 16px 0; color: var(--color-text); font-size: 14px; line-height: 1.6;
    }
    .tooltip-example, .tooltip-tips {
        margin: 16px 0 0 0; padding: 14px 16px; border-radius: 8px; font-size: 13px;
        line-height: 1.5; border-left: 4px solid;
    }
    .tooltip-example {
        background-color: rgba(var(--color-success-rgb), 0.08);
        border-left-color: var(--color-success);
    }
    .tooltip-example strong {
        color: var(--color-success); font-weight: 600; font-size: 12px;
        text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;
    }
    .tooltip-tips {
        background-color: rgba(var(--color-warning-rgb), 0.08);
        border-left-color: var(--color-warning);
    }
    .tooltip-tips strong {
        color: var(--color-warning); font-weight: 600; font-size: 12px;
        text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;
    }
    .tooltip-example p, .tooltip-tips p { margin: 0; color: var(--color-text); }
    .tooltip-docs {
        margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--color-border);
        text-align: center;
    }
    .tooltip-docs a {
        color: var(--color-primary); text-decoration: none; font-weight: 600; font-size: 13px;
    }
    .tooltip-docs a:hover { text-decoration: underline; }
    .form-label {
        display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
    }
    .checkbox-label .help-icon { margin-left: auto; }
`;
document.head.appendChild(style);

// Outros listeners globais
document.addEventListener('submit', (e) => {
    if (e.target.id === 'checklistForm') {
        e.preventDefault();
        return false;
    }
});

window.ChecklistApp = ChecklistApp;
