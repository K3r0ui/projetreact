
describe('Test Detail seance ', () => {
    beforeEach(() => {
        cy.loginJoueur()
    })
    it('test l url /profile', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/profile"]').click();
        cy.url().should('include', '/profile')
        cy.wait(5000)
    })

    it("test modifier joueur", () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/profile"]').click();
        cy.url().should('include', '/profile')
        cy.wait(2000);
        cy.get(".col-sm-12 > :nth-child(1)").click()
        cy.get("#firstName").clear().type("najib1")
        cy.get("#lastName").clear().type("belhadj")
        cy.get("#pob").clear().type("djerba")
        cy.get("#taille").clear().type(188);
        cy.get("#poid").clear().type(80)

        cy.wait(2000);
        cy.get(".ant-space-item > .ant-btn > span").click()
        cy.reload()
        cy.wait(2000);
    })

    it("test modifier Password", () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/profile"]').click();
        cy.url().should('include', '/profile')
        cy.wait(2000);
        cy.get(".col-sm-12 > :nth-child(2)").click();
        cy.get("#oldPassword").clear().type("12345678");
        cy.get("#newPassword").clear().type("12345678");
        cy.get("#confirm").clear().type("12345678");
        cy.get(".ant-space-item > .ant-btn > span").click()
    })
})