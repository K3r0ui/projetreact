
describe('Test Crud Lieu',()=>{
    beforeEach(() => {
        cy.login()
      })
    it('Acceder a la home page then ajouter un lieu', () => {
     cy.visit('http://localhost:3000')
     cy.get('#collasible-nav-dropdown').click();
     cy.get('[href="/lieu"]').click();
     cy.url().should('include', '/lieu')

     // click on button add lieu
     cy.get('.btn-primary').click();
     // header should have this text to confirm existance of popup
     cy.get('.ant-modal-header').should('include.text','Ajouter un Lieu');

     cy.get('#name').clear().type("Tunis1");
     cy.get('#city').type("California Gym LAC 2");

     cy.get('#country').click().type("Tunisia").type('{enter}');
     cy.get('#adresse').type("Fondé en 200010");
    
     // Click on submiut in the modal 
     cy.get('.ant-space-item > .ant-btn').click();
     cy.get('.table').find('tbody').last().should('contain', "Tunis1")
     
    
    })
    it('Acceder a la home page then Modifier un lieu', () => {
        cy.visit('http://localhost:3000')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/lieu"]').click();


        // acceder a table then click on grey button of modification
        cy.get('.table')
          .find('tbody tr:last')
          .get('.btn-secondary')
          .last()
          .click();
          
          cy.get('#name').should('have.value','Tunis1');
          cy.get('#city').should('have.value','California Gym LAC 2');
          cy.get('.ant-select-selection-item').should('have.text','Tunisia');
          cy.get('#adresse').should('have.value','Fondé en 200010');


          cy.get('#name').clear().type('Manouba Update').should('have.value','Manouba Update');
          cy.get('#city').clear().type('City Update').should('have.value','City Update');
          cy.get('#adresse').clear().type('Description Update').should('contain', "Description Update")
          cy.get('.ant-space-item > .ant-btn').click();
          cy.get('.table').find('tbody').last().should('contain', "Manouba Update")

    })
    it('tester la suppression d un Lieu', () => {
        
  
       
   
        cy.visit('/')
        cy.get('#collasible-nav-dropdown').click();
        cy.get('[href="/lieu"]').click();

        cy.get('.table')
         .find('tbody tr:last')
         .get('.btn-danger')
         .last()
         .click()
         .get('.ant-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content > .ant-popover-buttons > .ant-btn-primary')
          .click()
        })
})