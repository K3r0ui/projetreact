
describe('Login Coach',()=>{
    it('Acceder a la login page then write un lieu', () => {
     cy.visit('http://localhost:3000')
     cy.get('.container > :nth-child(2)').click();
    //
    //  cy.get('#collasible-nav-dropdown').click();
    //  cy.get('[href="/lieu"]').click();
    //  cy.url().should('include', '/lieu')

     // click on button add lieu
    //  cy.get('.btn-primary').click();
    //  // header should have this text to confirm existance of popup
    //  cy.get('.ant-modal-header').should('include.text','Ajouter un Lieu');

    //  cy.get('#name').clear().type("Tunis1");
    //  cy.get('#city').type("California Gym LAC 2");

    //  cy.get('#country').click().type("Tunisia").type('{enter}');
    //  cy.get('#adresse').type("Fondé en 200010");
    
    //  // Click on submiut in the modal 
    //  cy.get('.ant-space-item > .ant-btn').click();
    //  cy.get('.table').find('tbody').last().should('contain', "Tunis1")
     
    
    })
   
})