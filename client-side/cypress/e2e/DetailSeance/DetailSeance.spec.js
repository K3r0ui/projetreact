
describe('Test Detail seance ', () => {
    beforeEach(() => {
        cy.login()
    })
    it('test l url /seance', () => {
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/seances"]').click();
        cy.url().should('include', '/seances')
        cy.get('[data-row-key="626b1354e9047b937de83551"] > :nth-child(1) > a').click()
        cy.url().should("include", "/626b1354e9047b937de83551")

    })
})