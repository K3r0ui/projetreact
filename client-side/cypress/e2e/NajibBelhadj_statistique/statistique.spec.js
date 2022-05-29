describe('Test CRUD Statistique', () => {
    beforeEach(() => {
        cy.login()
    })

    it('tester l url /stat && creer une statistique teste', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/stat"]').click();
        cy.url().should('include', '/stat')

        cy.wait(1000)
        cy.contains('description Stat test').should('not.exist');

        cy.get('.btn-primary').click();
        cy.get('.ant-modal-header').should('have.text', 'Ajouter une Statistique')
        cy.wait(2000)

        cy.get('#title').clear().type("Title Stat test");
        cy.get('#description').clear().type("description Stat test");
        cy.get('#lien').clear().type("https://localhost:3000");
        cy.get('#type').clear().type("type de test");
        cy.get('#unite').clear().type("(CM)")
        cy.get("#max > :nth-child(1) > :nth-child(2)").click()
        cy.get('#isVisible').click();
        cy.get('.ant-space-item > .ant-btn > span').click();
        cy.wait(2000)

        cy.get('.table').find('tbody')
            .last().should('contain', "description Stat test")
    })


    it('update Stat testing', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/stat"]').click();
        cy.url().should('include', '/stat')
        cy.wait(1000)
        cy.get('.table')
            .find('tbody tr:last')
            .get('.btn-secondary')
            .last()
            .click()
        cy.get('#description').clear().type('description Stat test update').should('have.value', 'description Stat test update');
        cy.get("#max > :nth-child(2) > :nth-child(2)").click()
        cy.get('.ant-space-item > .ant-btn > span').click();
        cy.get('.table').find('tbody').get('tr')
            .last().should('contain', "description Stat test update")
        cy.wait(2000)
    })

    it('delete Stat test', () => {

        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/stat"]').click();
        cy.url().should('include', '/stat')
        cy.wait(1000)

        cy.get('.table')
            .find('tbody tr:last')
            .get('.btn-danger')
            .last()
            .click()
            .get('.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
            .click()

    })

});