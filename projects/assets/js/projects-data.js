window.PROJECTS_CATALOG = [
    {
        id: "landing-gerlen",
        category: "Frontend / Landing Pages",
        title: "Landing Page - Gerlen Mascarenhas",
        shortDescription: "Landing page profissional para captação de clientes.",
        longDescription: "Projeto focado em conversão, posicionamento digital e apresentação profissional de serviços. Estrutura pensada para clareza de comunicação, performance e SEO técnico.",
        problem: "A presença digital precisava transmitir credibilidade rapidamente e converter visitantes em contatos qualificados, sem depender de um discurso excessivamente técnico.",
        solution: "Estruturei uma landing page objetiva, com proposta clara, CTA visível e narrativa orientada a resultado, para reduzir atrito e aumentar a chance de conversão.",
        architecture: [
            "Seções em sequência lógica: proposta, prova social, serviços e contato",
            "HTML semântico para facilitar manutenção e SEO",
            "CSS modular com foco em responsividade e velocidade de carregamento"
        ],
        decisions: [
            "Priorizei copy curta e direta para leitura rápida",
            "Usei hierarquia visual forte para guiar a atenção até o CTA",
            "Mantive a estrutura simples para permitir evolução contínua"
        ],
        tradeOffs: [
            "Menos blocos de conteúdo significam menos espaço para detalhamento técnico",
            "A simplicidade favorece conversão, mas reduz personalização profunda por segmento",
            "Alguns efeitos visuais foram contidos para preservar performance"
        ],
        details: [
            "Seções orientadas a conversão com CTA estratégico",
            "Foco em acessibilidade, semântica e performance",
            "Arquitetura simples para manutenção contínua"
        ],
        techs: ["HTML", "CSS", "JavaScript", "SEO"],
        image: "../public/images/placeholder-gerlenmascarenhas.png",
        repoUrl: "https://github.com/iokimdiego/gerlen-mascarenhas-site",
        liveUrl: "https://www.gerlenmascarenhas.com.br"
    },
    {
        id: "api-gestao",
        category: "Backend / .NET APIs",
        title: "API de Gestão",
        shortDescription: "API REST em C# .NET para operações de cadastro, autenticação e relatórios.",
        longDescription: "API desenhada para cenários corporativos com foco em confiabilidade e evolução. Organizada em camadas, com validação de entrada, regras de negócio e persistência desacoplada.",
        problem: "Sistemas internos precisavam expor operações de cadastro e consulta com segurança, consistência e manutenção simples ao longo do tempo.",
        solution: "Modelei uma API REST em camadas, com responsabilidade bem distribuída, contratos previsíveis e base pronta para autenticação, relatórios e integrações.",
        architecture: [
            "Camada de API para expor endpoints e versionamento",
            "Camada de aplicação para orquestrar regras de negócio",
            "Persistência isolada com Entity Framework e SQL Server"
        ],
        decisions: [
            "Usei separação de responsabilidades para reduzir acoplamento",
            "Adotei validação de entrada próxima da borda da aplicação",
            "Mantive o design orientado a integração com múltiplos consumidores"
        ],
        tradeOffs: [
            "Mais camadas aumentam o volume inicial de código",
            "A modularidade melhora evolução, mas exige disciplina de organização",
            "Algumas decisões priorizaram previsibilidade em vez de atalho de implementação"
        ],
        details: [
            "Autenticação e autorização para endpoints críticos",
            "Padrão REST com contratos consistentes",
            "Pronta para integração com aplicações web e mobile"
        ],
        techs: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server"],
        image: "../public/images/placeholder-api-gestao.png",
        repoUrl: "https://github.com/iokimdiego",
        liveUrl: null
    },
    {
        id: "dashboard-analytics",
        category: "Fullstack Projects",
        title: "Dashboard Analytics",
        shortDescription: "Painel web para visualização de métricas e monitoramento de indicadores.",
        longDescription: "Aplicação fullstack voltada para visualização de dados operacionais. O backend organiza as fontes de dados e o frontend apresenta indicadores com foco em leitura rápida para tomada de decisão.",
        problem: "Times de negócio precisavam acompanhar métricas operacionais sem depender de planilhas ou múltiplas consultas dispersas.",
        solution: "Consolidei as informações em um painel com leitura rápida, permitindo visão executiva dos indicadores e acesso mais ágil aos dados importantes.",
        architecture: [
            "Backend responsável por consolidar e servir os dados",
            "Frontend focado em visualização objetiva e navegação rápida",
            "Camada de gráficos e cards para tradução clara de indicadores"
        ],
        decisions: [
            "Optei por uma interface enxuta para destacar dados críticos",
            "Estruturei o fluxo de dados para atualização mais previsível",
            "Mantive a aplicação orientada a uso interno e análise rápida"
        ],
        tradeOffs: [
            "Dashboard visualmente rico pode exigir mais esforço de manutenção",
            "Leitura executiva foi priorizada em detrimento de densidade extrema de dados",
            "Integrações adicionais ficam mais fáceis com uma base modular, porém mais extensa"
        ],
        details: [
            "Painéis com indicadores e gráficos em tempo real",
            "Integração de API com camadas de consulta",
            "Interface orientada a usabilidade para times de negócio"
        ],
        techs: [".NET", "REST APIs", "Charting", "SQL"],
        image: "../public/images/placeholder-dashboard-analytics.png",
        repoUrl: "https://github.com/iokimdiego",
        liveUrl: null
    },
    {
        id: "cloud-apis",
        category: "Backend / .NET APIs",
        title: "Arquitetura Cloud para APIs",
        shortDescription: "Estudo aplicado de deploy e observabilidade para APIs .NET em ambiente cloud.",
        longDescription: "Projeto de referência para práticas de cloud-native com APIs .NET, incluindo pipeline de entrega e monitoramento básico para ambientes de produção.",
        problem: "Uma API pronta para produção precisa ir além do código funcional: precisa ser implantável, observável e consistente em ambientes diferentes.",
        solution: "Estruturei a base para execução em cloud com containerização, pipeline de entrega e práticas mínimas de observabilidade para apoiar operação real.",
        architecture: [
            "API preparada para execução em container",
            "Pipeline de CI/CD para automatizar entrega",
            "Estratégia inicial de logs e métricas para suporte operacional"
        ],
        decisions: [
            "Padronizei a execução para reduzir diferenças entre ambientes",
            "Priorizei visibilidade operacional desde o início",
            "Desenhei o fluxo para simplificar futuras evoluções de infraestrutura"
        ],
        tradeOffs: [
            "A abordagem cloud-native adiciona complexidade de infra",
            "Automação exige mais configuração inicial, mas reduz risco depois",
            "Alguns recursos avançados de observabilidade foram deixados para evolução posterior"
        ],
        details: [
            "Containerização da API para implantação consistente",
            "Estrutura de CI/CD para entrega contínua",
            "Base de observabilidade para logs e métricas"
        ],
        techs: ["Azure", "Docker", ".NET", "CI/CD"],
        image: "../public/images/placeholder-dashboard-analytics.png",
        repoUrl: "https://github.com/iokimdiego",
        liveUrl: null
    }
];

window.PROJECT_CATEGORIES = [
    "Backend / .NET APIs",
    "Fullstack Projects",
    "Frontend / Landing Pages"
];
