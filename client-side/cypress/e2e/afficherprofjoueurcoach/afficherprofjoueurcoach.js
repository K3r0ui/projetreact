describe('Afficher profile joueur',()=>{
    beforeEach(() => {
        cy.login()
      })
it('Acceder a la home page then Afficher profile joueur via coach', () => {
    cy.visit('http://localhost:3000')
    cy.get('#collasible-nav-dropdown').click();
    cy.get('[href="/profilejoueur"]').click();
    cy.get('.table')
    .find('tbody tr:last')
    .get('.btn-secondary')
    .last()
    .click();
    // scroll to the bottom 
    cy.get('.ant-modal-wrap').scrollTo('bottom')
    cy.wait(8000);
    cy.get('.ant-btn-default').click();
})
})