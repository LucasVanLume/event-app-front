# 🧪 Geração Automatizada de Cenários BDD com LLMs

Este repositório contém todos os materiais utilizados no projeto de pesquisa *"Geração Inteligente de Examples BDD com LLMs: Um Estudo sobre Eficiência, Qualidade e Consistência"*, desenvolvido como parte da disciplina Testes de Software.

## 📋 Descrição do Projeto

O projeto investiga o uso de Modelos de Linguagem de Grande Escala (LLMs) para automatizar a geração de cenários BDD (*Behavior-Driven Development*), comparando sua eficácia com abordagens manuais tradicionais. A pesquisa aborda aspectos como cobertura de testes, tempo de geração, consistência e aderência às regras de negócio.

## 📁 Estrutura do Repositório
```bash
📦 projeto  
├── 📂 cypress  
│   ├── 📂 downloads  
│   ├── 📂 e2e  
│   │   ├── 📂 features  
│   │   ├── 📂 step_definitions  
│   │   │   ├── 📂 event_form_step  
│   │   │   │   ├── 📂 event_form  
│   │   │   │   │   ├── event_form.js  
│   │   │   │   │   ├── event_form.feature  
│   │   │   ├── 📂 login_step  
│   │   │   │   ├── 📂 login  
│   │   │   │   │   ├── login.js  
│   │   │   │   │   ├── login.feature  
│   │   │   ├── 📂 signup_step  
│   │   │   │   ├── 📂 signup  
│   │   │   │   │   ├── signup.js  
│   │   │   │   │   ├── signup.feature  
│  
├── 📂 test_support  
│   ├── 📂 scripts  
│   │   ├── form-script-feature.js  
│   ├── 📂 utils  
│   │   ├── filesUtils.js  
│   │   ├── openaiClient.js  
│   │   ├── eventExamples.js  
│   │   ├── loginExamples.js  
│   │   ├── signupExamples.js  

```
📌 Descrição das Pastas
* cypress/ → Contém os testes automatizados com Cypress e Cucumber.

* e2e/features/ → Armazena os arquivos .feature com os cenários de BDD.

* step_definitions/ → Contém os passos (.js) implementados para os cenários BDD e armazena os arquivos .feature com os cenários de BDD.

* test_support/ → Contém scripts auxiliares para geração de testes usando LLMs.

* test_support/scripts/ → Automação de prompts para geração dos examples dos cenários.

* test_support/utils/ → Módulos de suporte para manipulação de arquivos, integração com OpenAI e exemplos de entrada.

## ⚙️ Tecnologias Utilizadas

* OpenAI GPT (via ChatGPT)
* Gemini API
* Cypress
* Cucumber
* Pairwise Online Tool


## 📌 Objetivos da Pesquisa

* Avaliar se LLMs conseguem gerar exemplos BDD com cobertura igual ou superior à manual.
* Medir o tempo de geração dos exemplos com e sem automação.
* Analisar a qualidade, clareza e aderência às regras de negócio nos cenários gerados.
* Verificar se a automação contribui para a padronização e consistência dos testes.

## 🧪 Comandos de Teste

- `node test_support/featureExamples.js`  
  Executa o gerador de examples BDD automatizados a partir dos dados de entrada e prompts definidos.

- `npm run form-feature <nomeDaFeature>`  
  Gera os arquivos `.js` para um formulário específico. Esse aqui conterá o prompt para gerar os examples para uma feature definida.

## 📥 Como Executar os Scripts com Cypress/Cucumber

```bash
npx cypress open

Certifique-se de ter as bibliotecas necessárias instaladas via npm install.

```


# EventAppFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
