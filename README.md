# YOYOYO — Made to Play. Built to Connect.

## Descrição do Projeto
O **YOYOYO** é uma landing page moderna e imersiva de alta performance, projetada para entregar a melhor experiência de usuário no nicho de tecnologia criativa. O projeto apresenta produtos (iôiôs modernos) e experiências que misturam diversão física com criatividade digital. A interface foi construída visando o máximo engajamento visual através de rolagem suave (smooth scroll) e animações responsivas e complexas disparadas pelo comportamento do usuário.

## Funcionalidades
- **Scroll Suave (Smooth Scrolling):** Integração com Lenis para uma experiência de navegação contínua e fluida.
- **Animações Avançadas (GSAP):**
  - Textos heróis com revelação em cascata.
  - Imagens com efeito Parallax leve (`float-slow`).
  - Animações de entrada para cartões de produtos (Fade In).
  - Retração rápida e otimizada (Reverse rápido) ao rolar a página para cima.
  - Footer com animação condicional de surgimento a partir da base da tela.
- **Imagens Otimizadas:** Todo o catálogo de assets foi convertido para o formato `.webp`, reduzindo drasticamente o consumo de banda sem perda de qualidade visual.
- **Navegação Inteligente:** Barra superior e rodapé mapeados com âncoras para rolagem inteligente entre as seções (Home, About, Products, Play).
- **Tratamento de Hydration:** Configuração reforçada contra *Hydration Mismatch* em nível de raiz.

## Tecnologias Utilizadas
- **[Next.js](https://nextjs.org/)** (v16.2.3 - Turbopack)
- **[React](https://react.dev/)** (v19)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.0)
- **[GSAP](https://gsap.com/)** (Core & ScrollTrigger)
- **[@studio-freight/react-lenis](https://lenis.studiofreight.com/)**
- **[Lucide React](https://lucide.dev/)** (Ícones)

## Pré-requisitos
Antes de iniciar, certifique-se de ter o seguinte instalado em sua máquina:
- **Node.js** (versão 20 ou superior)
- **npm**, **yarn**, **pnpm** ou **bun**

## Instalação e Execução

1. Clone este repositório para a sua máquina local:
```bash
git clone https://github.com/HenriqueSS0/YoyoYo.git
```

2. Acesse a pasta do projeto:
```bash
cd YoyoYo
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra seu navegador e acesse:
[http://localhost:3000](http://localhost:3000)

## Como Usar
- Apenas navegue pelo site rolando para baixo para visualizar a física de entrada e saída dos elementos.
- Utilize os botões do cabeçalho (*Home, About, Products, Play*) para ser transportado suavemente para a seção correspondente.
- A página foi desenhada considerando conceitos responsivos de *mobile-first*, podendo ser testada livremente redimensionando a janela do navegador.

## Estrutura do Projeto
```text
YoyoYo/
├── public/                 # Imagens originais otimizadas (.webp) e SVGs básicos
│   └── images/
├── src/
│   └── app/
│       ├── globals.css     # Estilos globais Tailwind e keyframes de animação
│       ├── layout.tsx      # Configuração global HTML/Body e Metadata
│       └── page.tsx        # Página principal (Lógica GSAP, Lenis e interface UI)
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tailwind.config.ts      # (Se aplicável nas configurações V4)
```

## Contribuição
Feedbacks, dicas de otimização e sugestões são extremamente bem-vindos! Sinta-se à vontade para abrir uma *Issue*, fazer um *Fork* e sugerir melhorias.

##Link de visualização: **[https://henriquess0.github.io/YoyoYo/]**

## Contato
Desenvolvido por **[Henrique Sartori]**  
🔗 **Portfólio:** [https://sartt.site]  
💼 **LinkedIn:** [https://linkedin.com.br/in/henriquesartorii]  
📧 **Email:** [henriquesartori2801@gmail.com]
