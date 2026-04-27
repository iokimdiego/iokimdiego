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
        liveUrl: "https://www.gerlenmascarenhas.com.br",
        status: "live"
    },
    {
        id: "erp-school-api",
        category: "Backend / .NET APIs",
        title: "ERPSchoolAPI",
        shortDescription: "API REST em desenvolvimento para gestão escolar — cadastro de alunos, turmas e operações administrativas.",
        longDescription: "Projeto real em desenvolvimento ativo, construído com ASP.NET Core e Entity Framework Core. A API cobre operações de gestão escolar como cadastro de alunos, turmas e relacionamentos entre entidades. Desenvolvido com foco em arquitetura em camadas, boas práticas de C# e evolução contínua.",
        problem: "Sistemas de gestão escolar frequentemente mistura regras de negócio com acesso a dados, dificultando manutenção e evolução. O objetivo é construir uma API que separe essas responsabilidades de forma clara.",
        solution: "Estruturei a API em camadas distintas — Web (controllers), Application (regras) e Console (utilitários) — usando Entity Framework Core para persistência e ASP.NET Core como framework principal.",
        architecture: [
            "ERPSchoolAPI.Web — camada de API com controllers e configuração do ASP.NET Core",
            "ERPSchoolAPI.Console — utilitários e ferramentas de suporte ao projeto",
            "Persistência com Entity Framework Core e SQL Server",
            "Separação de responsabilidades entre camadas desde o início"
        ],
        decisions: [
            "Separação em projetos distintos para isolar responsabilidades desde o início",
            "Uso de Entity Framework Core com Code First para facilitar evolução do schema",
            "ASP.NET Core como framework principal pela maturidade e suporte do ecossistema .NET"
        ],
        tradeOffs: [
            "Projeto em desenvolvimento ativo — funcionalidades ainda sendo implementadas",
            "Optei por estrutura de camadas desde o início, o que aumenta o volume de código inicial mas facilita a evolução",
            "Priorizei organização e boas práticas em vez de velocidade de entrega"
        ],
        details: [
            "Projeto real em desenvolvimento ativo — 15 commits",
            "100% C# com ASP.NET Core e Entity Framework Core",
            "Arquitetura em camadas aplicada desde o início do projeto"
        ],
        techs: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
        image: "../public/images/placeholder-api-gestao.png",
        repoUrl: "https://github.com/iokimdiego/ERPSchoolAPI",
        liveUrl: null,
        status: "in-progress"
    }
];

window.PROJECT_CATEGORIES = [
    "Backend / .NET APIs",
    "Frontend / Landing Pages"
];
