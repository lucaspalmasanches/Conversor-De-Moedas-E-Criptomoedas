# Conversor de Moedas e Criptomoedas 💱₿

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen)

## Sobre o Projeto ✨

Este projeto, inicialmente desenvolvido a partir de uma aula introdutória de JavaScript do [DevClub](https://www.devclub.com.br/), foi **totalmente aprimorado e expandido** para se tornar uma ferramenta web interativa para **conversão de moedas fiduciárias e a criptomoeda Bitcoin**. Atingindo um novo patamar de qualidade, o conversor agora conta com **total responsividade**, garantindo uma experiência de usuário impecável em qualquer dispositivo (desktop, tablet e mobile), além de diversas **correções de bugs no JavaScript** e otimizações no HTML.

Com este projeto, demonstro minhas habilidades na integração de **duas APIs externas distintas** — a **Exchangerate API** para cotações de moedas tradicionais e a **Binance API** para cotações do **Bitcoin** em tempo real. Além disso, o projeto aborda a importância da segurança no gerenciamento da chave da Exchangerate API, utilizando variáveis de ambiente. Este foi um desafio enriquecedor, que me levou a explorar áreas mais avançadas do JavaScript, APIs complexas e a aprimorar minhas capacidades de pesquisa e resolução de problemas, **indo muito além do proposto na aula**.

---

## 💻 Tecnologias Utilizadas

Aqui estão as tecnologias que utilizei para construir este projeto:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Exchangerate API](https://img.shields.io/badge/Exchangerate%20API-4A90E2?style=for-the-badge&logo=appveyor&logoColor=white)
![Binance API](https://img.shields.io/badge/Binance%20API-FCD535?style=for-the-badge&logo=binance&logoColor=black)
![REST API](https://img.shields.io/badge/REST%20API-00599C?style=for-the-badge&logo=rest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

---

## ✨ Funcionalidades

*   **Design Totalmente Responsivo:** Layout que se adapta de forma fluida e elegante para visualização em **desktops, tablets e smartphones**, oferecendo uma experiência de usuário consistente e otimizada.

*   **Conversão de Moedas Fiduciárias:** Realiza conversões entre diversas moedas tradicionais (ex: BRL, USD, EUR) com cotações em tempo real via Exchangerate API.

*   **Conversão de Bitcoin:** Permite a conversão do Bitcoin e moedas fiduciárias, utilizando cotações em tempo real via Binance API (acessada via link público).

*   **Integração com Duas APIs Distintas:** Gerencia e consome dados de duas fontes de API diferentes (Exchangerate e Binance).

*   **Manipulação de DOM Dinâmica:** Atualiza a interface do usuário em tempo real com os resultados das conversões.

*   **Gerenciamento Seguro da Chave da Exchangerate API:** Implementação segura utilizando variáveis de ambiente.

---

## 📸 Visualização do Projeto

Confira o design responsivo do projeto em diferentes dispositivos:

<p align="center">
  <img src="https://raw.githubusercontent.com/lucaspalmasanches/Conversor-De-Moedas-E-Criptomoedas/main/assets/ConversorMoedaDesktop.png" alt="Conversor de Moedas e Criptomoedas - Versão Desktop" width="40%">
  <img src="https://raw.githubusercontent.com/lucaspalmasanches/Conversor-De-Moedas-E-Criptomoedas/main/assets/ConversorMoedaTablet.png" alt="Conversor de Moedas e Criptomoedas - Versão Tablet" width="28%">
  <img src="https://raw.githubusercontent.com/lucaspalmasanches/Conversor-De-Moedas-E-Criptomoedas/main/assets/ConversorMoedaCelular.png" alt="Conversor de Moedas e Criptomoedas - Versão Mobile" width="18%">
</p>

---

## 🚀 Como Rodar o Projeto (Localmente)

Para rodar este projeto em sua máquina local, siga os passos abaixo. Este projeto requer uma chave de API da Exchangerate para funcionar.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/lucaspalmasanches/Conversor-De-Moedas-E-Criptomoedas.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Conversor-De-Moedas-E-Criptomoedas
    ```

3.  **Configurar a Chave de API da Exchangerate (Essencial):**
    *   **Importante:** A chave de API é uma informação sensível e **não deve ser commitada no Git**. Este repositório já está configurado com um arquivo `.gitignore` para ignorar o arquivo `.env`.
    *   Para que o projeto funcione localmente, é necessário fornecer sua própria chave de API da Exchangerate (obtida gratuitamente no site deles).
    *   **Crie um arquivo chamado `.env`** na raiz do projeto (na mesma pasta do `index.html`).
    *   Dentro do arquivo `.env`, adicione sua chave de API no seguinte formato:
        ```
        EXCHANGERATE_API_KEY="SUA_CHAVE_DE_API_DA_EXCHANGERATE_AQUI"
        ```
        *   **Substitua `"SUA_CHAVE_DE_API_DA_EXCHANGERATE_AQUI"` pela sua chave real.**
    *   **Observação:** A Binance API é acessada diretamente via um link público e não requer configuração de chave. Este projeto acessa as APIs diretamente do JavaScript no navegador. Para o desenvolvimento local, a chave da Exchangerate API será lida do ambiente de execução. Para um deploy em produção (ex: GitHub Pages), a prática recomendada é usar um backend (servidor) para intermediar as chamadas à **Exchangerate API**, protegendo sua chave de ser exposta no código cliente.

4.  **Abra o arquivo `index.html`:**
    *   Simplesmente abra o arquivo `index.html` em seu navegador web preferido para visualizar e interagir com o conversor.

---

## 📚 Aprendizados

Este projeto foi uma experiência valiosa e desafiadora, consolidando meus conhecimentos em:

*   **Desenvolvimento Responsivo:** Implementação de um layout que se adapta perfeitamente a diferentes dispositivos (desktop, tablet e mobile), **indo além do escopo inicial da aula**.

*   **Depuração e Correção de Bugs:** Habilidade aprimorada na identificação e resolução de problemas no JavaScript, garantindo a robustez da aplicação.

*   **Integração de Múltiplas APIs Distintas:** Gerenciamento e consumo de dados de duas fontes de API diferentes (Exchangerate para moedas fiduciárias e Binance para Bitcoin).

*   **JavaScript Assíncrono:** Utilização de `fetch` e `async/await` para lidar com requisições de API de forma eficiente e robusta.

*   **Manipulação de DOM Avançada:** Criação de interfaces dinâmicas e responsivas que reagem aos dados das APIs e interações do usuário.

*   **Segurança em Desenvolvimento:** A importância e implementação correta do gerenciamento da chave da Exchangerate API com `.env` e `.gitignore`.

*   **Habilidade de Pesquisa e Resolução de Problemas:** Superar desafios complexos, como a integração de APIs de diferentes domínios e a manipulação de dados do Bitcoin, buscando soluções para funcionalidades avançadas.

*   **HTML Semântico e Otimização:** Criação de estruturas web claras e estilização adaptável para diferentes dispositivos, incluindo a organização e o título do HTML.

*   **Controle de Versão:** Gerenciamento eficiente de código com Git e GitHub.

---

## Conecte-se Comigo 🤝

Estou sempre aberto a novas conexões e oportunidades. Sinta-se à vontade para entrar em contato!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-palma-sanches-082902426)
[![E-mail](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lucaspalma331@gmail.com)
