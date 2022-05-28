describe('Test CRUD Competence', () => {
    beforeEach(() => {
        cy.login()
    })

    it('tester l url /compentence && creer une compentencede teste', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/compentence"]').click();
        cy.url().should('include', '/compentence')

        cy.wait(1000)

        cy.contains('description Competence test').should('not.exist');

        cy.get('.btn-primary').click();
        cy.get('.ant-modal-header').should('have.text', 'Ajouter une Competence')
        cy.wait(2000)


        cy.get('#title').clear().type("Title Competence test");
        cy.get('#link').clear().type("https://localhost:3000");
        cy.get('#description').clear().type("description Competence test");
        cy.get('.ant-form-item-control-input-content > .ant-rate > :nth-child(3) > [role="radio"] > .ant-rate-star-first').click();
        cy.get('#isVisible').click();
        cy.get('.ant-space-item > .ant-btn > span').click();
        cy.wait(2000)

        cy.get('.table').find('tbody')
            .last().should('contain', "description Competence test")
    })


    it('update Competence testing', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/compentence"]').click();
        cy.url().should('include', '/compentence')
        cy.wait(1000)

        cy.get('.table')
            .find('tbody tr:last')
            .get('.btn-secondary')
            .last()
            .click()

        cy.get('#title').should('have.value', 'Title Competence test');
        cy.get('#description').should('have.value', 'description Competence test');
        cy.get('#description').clear().type('description Competence test update').should('have.value', 'description Competence test update');

        cy.get('.ant-space-item > .ant-btn > span').click();
        //cy.wait(2000)
        cy.get('.table').find('tbody').get('tr')
            .last().should('contain', "description Competence test update")
    })

    it('delete Competence test', () => {

        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/compentence"]').click();
        cy.url().should('include', '/compentence')
        cy.get('.table')
            .find('tbody tr:last')
            .get('.btn-danger')
            .last()
            .click()
            .get('.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
            .click()

    })

});