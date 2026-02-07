# 🚀 Portfolio Azure & SupportSync AI

## Visão Geral do Projeto

Este repositório apresenta um portfólio pessoal hospedado no Azure, com foco em demonstrar proficiência em **Machine Learning**, **Business Intelligence (B.I.)** e **Cloud Computing**. O projeto de destaque, **SupportSync AI**, é uma aplicação prática desenvolvida para simular um sistema de suporte de TI inteligente, exibindo habilidades em triagem automatizada, análise de dados e gestão de incidentes.

O objetivo principal é ilustrar a capacidade de transformar dados em decisões acionáveis, com ênfase em automação, integração de sistemas e desenvolvimento de soluções escaláveis para problemas de negócio reais.

## ✨ SupportSync AI - Funcionalidades Detalhadas

O SupportSync AI é uma ferramenta multifuncional projetada para otimizar operações de suporte de TI. Suas principais funcionalidades incluem:

| Funcionalidade | Descrição Detalhada |
|----------------|---------------------|
| **Triagem Inteligente de Tickets (IA)** | Utiliza algoritmos de Machine Learning e Processamento de Linguagem Natural (NLP) para classificar automaticamente tickets de suporte por prioridade e tema, direcionando-os para as equipes corretas e acelerando o tempo de resposta. |
| **Kanban ITSM** | Um painel de gerenciamento de tickets estilo Kanban (similar ao Jira), permitindo a visualização e o arrasto e solta de tickets entre diferentes estágios do fluxo de trabalho (e.g., Aberto, Em Andamento, Resolvido), facilitando a gestão visual de tarefas. |
| **Análise de Logs em Tempo Real** | Um visualizador interativo que permite monitorar e analisar logs de sistema em tempo real, auxiliando na identificação rápida de problemas e na depuração. |
| **Query SQL Interativa** | Uma interface para demonstração interativa de consultas SQL, permitindo a exploração de dados e a validação de informações diretamente no sistema. |
| **Detecção Proativa de Padrões** | Implementa lógica para identificar padrões recorrentes em incidentes e logs, gerando alertas proativos para potenciais problemas antes que escalem, contribuindo para a manutenção preditiva. |
| **Dashboard de Business Intelligence (B.I.)** | Um painel de controle com gráficos e métricas que visualizam dados de incidentes por sistema, categoria e status, fornecendo insights valiosos para a tomada de decisões estratégicas e melhoria contínua dos serviços de TI. |

## 🚀 Arquitetura e Tecnologias (Custo Zero)

Este projeto foi arquitetado para ser **altamente eficiente e de custo zero** para hospedagem, utilizando os serviços gratuitos do Azure. A estrutura é composta por:

-   **Frontend**: Desenvolvido com **HTML5**, **CSS3** e **JavaScript**, hospedado no **Azure Static Web Apps**. Esta abordagem garante alta disponibilidade e escalabilidade sem custos de infraestrutura.
-   **Backend/API**: Implementado com **Azure Functions** em **Python**. As funções serverless fornecem uma API RESTful para processamento de dados, integração com modelos de ML e interação com o banco de dados, operando sob o **Plano de Consumo** do Azure, que é pago por execução, resultando em custo zero para uso de baixo volume.
-   **Visualização de Dados**: Utiliza a biblioteca **Chart.js** para renderizar gráficos interativos e dinâmicos no dashboard de B.I., proporcionando uma experiência rica ao usuário.

### Stack Tecnológica Completa

-   **Linguagens**: `Python`, `JavaScript`, `HTML5`, `CSS3`
-   **Cloud**: `Azure` (Static Web Apps, Functions)
-   **Banco de Dados**: `SQL` (para demonstrações interativas)
-   **Inteligência Artificial**: `NLP` (Processamento de Linguagem Natural para triagem de tickets)

## ⚙️ Como Executar (Ambiente de Desenvolvimento)

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clonar o Repositório**:
    ```bash
    git clone https://github.com/athosroque/projeto_suporte.git
    cd projeto_suporte
    ```

2.  **Configurar o Frontend (Client)**:
    O frontend é uma aplicação estática. Você pode abri-lo diretamente no navegador ou usar um servidor web local simples.
    ```bash
    # Para abrir diretamente (exemplo)
    # open client/index.html
    # Ou usar um servidor Python simples
    # cd client
    # python -m http.server 8000
    ```

3.  **Configurar o Backend (Azure Functions)**:
    As Azure Functions requerem o Azure Functions Core Tools e um ambiente Python.
    ```bash
    # Instalar dependências Python
    pip install -r api/requirements.txt
    # Iniciar as Azure Functions localmente
    func start --python
    ```

    Certifique-se de que o frontend esteja configurado para se comunicar com o endpoint local das suas funções (geralmente `http://localhost:7071`).

## 🌐 Deploy no Azure Static Web Apps

O deploy deste projeto é automatizado via GitHub Actions. Qualquer push para a branch `master` (ou a branch configurada) irá disparar um workflow que:

1.  Compila e empacota o frontend.
2.  Empacota as Azure Functions.
3.  Realiza o deploy de ambos para o Azure Static Web Apps.

O workflow pode ser encontrado em `.github/workflows/azure-static-web-apps-*.yml`.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para sugestões ou melhorias, ou enviar Pull Requests.

---

Desenvolvido por **Athos Roque Barros**

[LinkedIn](https://www.linkedin.com/in/athos-roque-barros-622038152/)
[GitHub](https://github.com/athosroque)
