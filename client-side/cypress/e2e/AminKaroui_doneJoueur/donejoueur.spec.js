describe('Show Defi and Do DONE',()=>{
    beforeEach(() => {
        cy.loginJoueur()
      })
    it('Acceder a la register page then sinscrire', () => {
     cy.visit('http://localhost:3000')
     cy.get('#collasible-nav-dropdown').click();
     cy.get('.dropdown-menu > :nth-child(3)').click();
     cy.url().should('include', '/joueur/defi')
     cy.get('.table').find('tbody').first().should('contain', "googleeeee")
     cy.get('.btn').click();
     cy.get('.ant-popover-message-title').should('include.text','Title')
     cy.get('.ant-btn-primary').click();
    })
   
})