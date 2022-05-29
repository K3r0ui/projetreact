describe('Test Inviter Joueur', () => {
    beforeEach(() => {
        cy.login()
    })

    it('tester l url /invitation && creer une invitation de test', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/invitation"]').click();
        cy.url().should('include', '/invitation')

        cy.wait(1000)
        cy.contains('test@gmail.com').should('not.exist');

        cy.get('.btn-primary').click();
        cy.get('.ant-modal-header').should('have.text', 'Inviter Joueur')
        cy.wait(2000)

        cy.get('#firstName').clear().type("Name test");
        cy.get('#lastName').clear().type("lastName test");
        cy.get('#email').clear().type("test@gmail.com");

        cy.get(":nth-child(4) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > center > .ant-space > .ant-space-item > .ant-btn > span").click();
        cy.get('.ant-picker').click();
        cy.contains('19').click()

        //cy.get('.ant-picker-input').clear().type(`2022-05-04{enter}`);

        cy.get("#pob").clear().type("Test Lieu");
        cy.get("#sexe > :nth-child(1) > :nth-child(2)").click()
        cy.get("#ville").clear().type("Test Ville");
        cy.get("#telephone").clear().type("26414723");
        cy.get("#poid").clear().type(80);
        cy.get("#price").clear().type(20);
        cy.get(':nth-child(17) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > center > .ant-space > .ant-space-item > .ant-btn > span').click();
        cy.wait(2000)

        cy.get('.table').find('tbody')
            .last().should('contain', "test@gmail.com")
    })



    it('delete invitation test', () => {

        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/invitation"]').click();
        cy.url().should('include', '/invitation')

        cy.wait(1000);

        cy.get('.table')
            .find('tbody tr:last')
            .get('.btn-danger')
            .last()
            .click()
            .get('.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
            .click()

    })

});