describe('Test Update Joueur', () => {
    beforeEach(() => {
        cy.login()
    })

    it('tester l url /profilejoueur && creer une profilejoueur de test', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/profilejoueur"]').click();
        cy.url().should('include', '/profilejoueur')

        cy.wait(1000)

        cy.get(':nth-child(3) > :nth-child(5) > .btn-group > .btn-success').click();
        cy.get('.ant-modal-header').should('have.text', 'Modifier Profile')
        cy.wait(2000)

        cy.get('#firstName').clear().type("Name test");
        cy.get('#lastName').clear().type("lastName test");

        cy.get('.ant-picker').click();
        cy.contains('19').click()

        //cy.get('.ant-picker-input').clear().type(`2022-05-04{enter}`);

        cy.get("#pob").clear().type("Test Lieu");
        cy.get("#sexe > :nth-child(1) > :nth-child(2)").click()
        cy.get("#ville").clear().type("Test Ville");
        cy.get("#telephone").clear().type("26414723");
        cy.get("#poid").clear().type(80);
        cy.get("#price").clear().type(20);
        cy.get('.ant-space-item > .ant-btn > span').click();
        cy.wait(2000)

        cy.get('.table').find('tbody')
            .last().should('contain', "zacachref123@gmail.com")
    })


});