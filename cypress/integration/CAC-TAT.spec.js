//cd /c/workspaces/cypress-basico-v2
/// <reference types="Cypress"/>
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type('teste')
        cy.get('#lastName').type('teste 2')
        cy.get('#email').type('teste@gmai.com')
        cy.get('#phone').type('teste')
        cy.get('#phone').should('be.empty')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        cy.get('#firstName').type('teste')
        cy.get('#lastName').type('teste 2')
        cy.get('#email').type('teste@gmai,com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '
        
        cy.get('#firstName').type('teste')
        cy.get('#lastName').type('teste 2')
        cy.get('#email').type('teste@gmai.com')
        cy.get('#phone').type('dsadasd').should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, '

        cy.get('#firstName').type('teste').should('have.value','teste').clear().should('have.value', '')
        cy.get('#lastName').type('teste 2').should('have.value','teste 2').clear().should('have.value', '')
        cy.get('#email').type('teste@gmai.com').should('have.value','teste@gmai.com').clear().should('have.value', '')
        cy.get('#phone').type('996022028').should('have.value','996022028').clear().should('have.value', '')
        cy.get('#open-text-area').type(longText, { delay: 0}).clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto - Ex:0', function(){
        cy.get('#product').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value) - Ex:1', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice - Ex:1', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"]').check('feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('[type="radio"]').check('ajuda').should('be.checked')
        cy.get('[type="radio"]').check('elogio').should('be.checked')
        cy.get('[type="radio"]').check('feedback').should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })    
    
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function($input) {
           expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
         })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr', 'target', '_blank')
        
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function(){
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
  })